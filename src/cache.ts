import * as Sentry from '@sentry/node';
import Keyv from 'keyv';
import type {
  Movie,
  TmdbMovieSearchResult,
} from './schema/__generated__/resolvers-types';

// Cache configuration
const CACHE_CONFIG = {
  namespace: 'movies',
  ttl: 7776000, // 90 days in seconds
  // In development: uses memory (no Redis needed)
  // In production: uses Redis/ElastiCache via REDIS_URL env var
};

// Cache keys for different data types
export const CACHE_KEYS = {
  MOVIE_SEARCH: (query: string) => `search:${query.toLowerCase().trim()}`,
  MOVIE_DETAILS: (tmdbId: number) => `movie:${tmdbId}`,
  GENRE_MOVIES: (genreId: number) => `genre:${genreId}`,
} as const;

// Cache data types
export interface CachedMovieSearch {
  query: string;
  results: Array<{
    title: string;
    released: string;
    tmdbId: number;
  }>;
  timestamp: number;
}

export interface CachedMovieDetails {
  tmdbId: number;
  data: Movie; // Normalized movie details from OMDB keyed by TMDB ID
  timestamp: number;
}

// Cache service class
export class MovieCache {
  private cache: Keyv;
  private stats = {
    hits: 0,
    misses: 0,
    sets: 0,
    deletes: 0,
  };

  constructor() {
    // Use Redis if REDIS_URL is provided, otherwise use memory
    const redisUrl = process.env.REDIS_URL;

    if (redisUrl) {
      console.log('🔗 Using Redis cache:', redisUrl);
      this.cache = new Keyv({
        ...CACHE_CONFIG,
        store: new (require('@keyv/redis'))(redisUrl),
      });
    } else {
      console.log('💾 Using in-memory cache (development mode)');
      this.cache = new Keyv(CACHE_CONFIG);
    }

    // Handle cache errors gracefully
    this.cache.on('error', (err) => {
      console.error('Cache error:', err);
      Sentry.captureException(err, {
        tags: {
          component: 'MovieCache',
          operation: 'cache_connection',
        },
        extra: {
          error: err.message,
          cacheType: redisUrl ? 'redis' : 'memory',
        },
      });
    });
  }

  // Generic get method
  async get<T>(key: string): Promise<T | undefined> {
    try {
      const value = await this.cache.get(key);
      if (value) {
        this.stats.hits++;
        return JSON.parse(value);
      }
      this.stats.misses++;
      return undefined;
    } catch (error) {
      console.error('Cache get error:', error);
      this.stats.misses++;

      Sentry.captureException(error, {
        tags: {
          component: 'MovieCache',
          operation: 'get',
        },
        extra: {
          key,
          error: error instanceof Error ? error.message : String(error),
        },
      });

      return undefined;
    }
  }

  // Generic set method
  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    try {
      const serialized = JSON.stringify(value);
      if (ttl) {
        await this.cache.set(key, serialized, ttl * 1000); // Convert to milliseconds
      } else {
        await this.cache.set(key, serialized);
      }
      this.stats.sets++;
    } catch (error) {
      console.error('Cache set error:', error);

      Sentry.captureException(error, {
        tags: {
          component: 'MovieCache',
          operation: 'set',
        },
        extra: {
          key,
          ttl,
          error: error instanceof Error ? error.message : String(error),
        },
      });
    }
  }

  // Delete method
  async delete(key: string): Promise<boolean> {
    try {
      const result = await this.cache.delete(key);
      if (result) {
        this.stats.deletes++;
      }
      return result;
    } catch (error) {
      console.error('Cache delete error:', error);

      Sentry.captureException(error, {
        tags: {
          component: 'MovieCache',
          operation: 'delete',
        },
        extra: {
          key,
          error: error instanceof Error ? error.message : String(error),
        },
      });

      return false;
    }
  }

  // Clear all cache
  async clear(): Promise<void> {
    try {
      await this.cache.clear();
      // Reset stats when clearing cache
      this.stats = {
        hits: 0,
        misses: 0,
        sets: 0,
        deletes: 0,
      };
      console.log('🗑️ Cache cleared and stats reset');
    } catch (error) {
      console.error('Cache clear error:', error);

      Sentry.captureException(error, {
        tags: {
          component: 'MovieCache',
          operation: 'clear',
        },
        extra: {
          error: error instanceof Error ? error.message : String(error),
        },
      });
    }
  }

  // Reset stats only (keep cache data)
  resetStats(): void {
    this.stats = {
      hits: 0,
      misses: 0,
      sets: 0,
      deletes: 0,
    };
    console.log('📊 Cache stats reset');
  }

  // Movie search specific methods
  async getMovieSearch(query: string): Promise<CachedMovieSearch | undefined> {
    const key = CACHE_KEYS.MOVIE_SEARCH(query);
    return this.get<CachedMovieSearch>(key);
  }

  async setMovieSearch(
    query: string,
    results: Array<{
      title: string;
      released: string;
      tmdbId: number;
    }>
  ): Promise<void> {
    const key = CACHE_KEYS.MOVIE_SEARCH(query);
    const data: CachedMovieSearch = {
      query,
      results,
      timestamp: Date.now(),
    };
    await this.set(key, data);
  }

  // Movie details specific methods
  async getMovieDetails(
    tmdbId: number
  ): Promise<CachedMovieDetails | undefined> {
    const key = CACHE_KEYS.MOVIE_DETAILS(tmdbId);
    console.log('🔍 Cache.getMovieDetails called with key:', key);
    const result = await this.get<CachedMovieDetails>(key);
    console.log(
      '🔍 Cache.getMovieDetails result for key:',
      key,
      ':',
      result ? 'FOUND' : 'NOT FOUND'
    );
    return result;
  }

  async setMovieDetails(tmdbId: number, data: Movie): Promise<void> {
    const key = CACHE_KEYS.MOVIE_DETAILS(tmdbId);
    const cachedData: CachedMovieDetails = {
      tmdbId,
      data,
      timestamp: Date.now(),
    };
    await this.set(key, cachedData);
  }

  // Cache statistics
  async getStats(): Promise<{
    size: number;
    keys: string[];
    hitRate?: number;
    message?: string;
    operations?: {
      hits: number;
      misses: number;
      sets: number;
      deletes: number;
    };
  }> {
    try {
      const totalRequests = this.stats.hits + this.stats.misses;
      const hitRate =
        totalRequests > 0 ? (this.stats.hits / totalRequests) * 100 : 0;

      return {
        size: 0, // Keyv doesn't provide size info
        keys: [], // Keyv doesn't provide keys list
        hitRate: Math.round(hitRate * 100) / 100, // Round to 2 decimal places
        operations: {
          hits: this.stats.hits,
          misses: this.stats.misses,
          sets: this.stats.sets,
          deletes: this.stats.deletes,
        },
        message: process.env.REDIS_URL
          ? 'Redis cache - operation stats available'
          : 'In-memory cache - operation stats available',
      };
    } catch (error) {
      console.error('Cache stats error:', error);
      return {
        size: 0,
        keys: [],
        hitRate: 0,
        operations: this.stats,
      };
    }
  }
}

// Export singleton instance
export const movieCache = new MovieCache();
