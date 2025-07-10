import * as Sentry from '@sentry/node';
import { movieCache } from './cache.js';
import type {
  Movie,
  OmdbMovie,
  TmdbMovie,
  TmdbMovieDetails,
  TmdbMovieSearchResult,
  UpdateUserPreferencesInput,
} from './schema/__generated__/resolvers-types';
import { createUserClient, supabase } from './supabase.js';
import { normalizeMovieData } from './utils/movieUtils.js';

const resolvers = {
  Query: {
    searchMovies: async (_: unknown, { query }: { query: string }) => {
      if (!query || query.trim().length < 2) {
        return [];
      }

      const trimmedQuery = query.trim();

      try {
        // 1. Check cache first
        const cachedResult = await movieCache.getMovieSearch(trimmedQuery);
        if (cachedResult) {
          console.log('🎯 Cache hit for query:', trimmedQuery);
          return cachedResult.results;
        }

        console.log('❌ Cache miss for query:', trimmedQuery);

        // 2. Fetch from TMDB API
        const TMDB_READ_ACCESS_TOKEN = process.env.TMDB_READ_ACCESS_TOKEN;

        if (!TMDB_READ_ACCESS_TOKEN) {
          throw new Error('TMDB_READ_ACCESS_TOKEN is not set');
        }

        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`,
          },
        };
        const searchUrl = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(trimmedQuery)}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;

        const response = await fetch(searchUrl, options);

        if (!response.ok) {
          throw new Error(
            `TMDB API error: ${response.status} ${response.statusText}`
          );
        }

        const data: TmdbMovieSearchResult = await response.json();

        const results =
          data?.results
            ?.sort((a, b) => b.popularity - a.popularity)
            ?.map((movie: TmdbMovie) => ({
              title: movie.title || '',
              released: movie.release_date || '',
              tmdbId: movie.id || 0,
            })) || [];

        // 3. Cache the results
        await movieCache.setMovieSearch(trimmedQuery, results);
        console.log('💾 Cached results for query:', trimmedQuery);

        return results;
      } catch (error) {
        console.error('Error searching movies:', error);

        // Capture error in Sentry with context
        Sentry.captureException(error, {
          tags: {
            resolver: 'searchMovies',
            query: trimmedQuery,
          },
          extra: {
            query: trimmedQuery,
            error: error instanceof Error ? error.message : String(error),
          },
        });

        throw new Error('Failed to search movies');
      }
    },
    movieDetails: async (_: unknown, { tmdbId }: { tmdbId: number }) => {
      if (!Number.isInteger(tmdbId) || tmdbId <= 0 || tmdbId > 999999999) {
        const error = new Error('Invalid tmdbId: must be a positive integer');
        Sentry.captureException(error, {
          tags: {
            resolver: 'movieDetails',
          },
          extra: {
            tmdbId,
          },
        });
        throw error;
      }
      try {
        const TMDB_READ_ACCESS_TOKEN = process.env.TMDB_READ_ACCESS_TOKEN;

        if (!TMDB_READ_ACCESS_TOKEN) {
          const error = new Error('TMDB_READ_ACCESS_TOKEN is not set');
          Sentry.captureException(error, {
            tags: {
              resolver: 'movieDetails',
              tmdbId: tmdbId.toString(),
            },
            extra: {
              tmdbId,
              error: 'Missing TMDB token',
            },
          });
          throw error;
        }
        // 1. Check cache first
        const cachedResult = await movieCache.getMovieDetails(tmdbId);
        if (cachedResult) {
          console.log('🎯 Cache hit for tmdbId:', tmdbId);
          return cachedResult.data;
        }

        console.log('❌ Cache miss for query:', tmdbId);

        // 2. Fetch from TMDB API

        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`,
          },
        };
        const tmdbSearchUrl = `https://api.themoviedb.org/3/movie/${tmdbId}?language=en-US`;

        const response = await fetch(tmdbSearchUrl, options);

        if (!response.ok) {
          const error = new Error(
            `TMDB API error: ${response.status} ${response.statusText}`
          );
          Sentry.captureException(error, {
            tags: {
              resolver: 'movieDetails',
              tmdbId: tmdbId.toString(),
              tmdbStatus: response.status.toString(),
            },
            extra: {
              tmdbId,
              status: response.status,
              statusText: response.statusText,
              url: tmdbSearchUrl,
            },
          });
          throw error;
        }

        // First fetch the TMDB movie details
        const tmdbMovie: TmdbMovieDetails = await response.json();
        // Fetch the OMDB movie details to get the ratings data from RT, IMDb and Metacritic
        const omdbSearchUrl = `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${tmdbMovie.imdb_id}`;
        const omdbResponse = await fetch(omdbSearchUrl);
        const omdbMovie: OmdbMovie = await omdbResponse.json();
        const normalizedMovie = normalizeMovieData({
          omdbMovie,
          tmdbMovie,
        });

        await movieCache.setMovieDetails(tmdbId, normalizedMovie);
        console.log('💾 Cached results for query:', tmdbId);

        return normalizedMovie;
      } catch (error) {
        console.error('Error fetching movie details:', error);

        // Capture error in Sentry with context
        Sentry.captureException(error, {
          tags: {
            resolver: 'movieDetails',
            tmdbId: tmdbId.toString(),
          },
          extra: {
            tmdbId,
            error: error instanceof Error ? error.message : String(error),
          },
        });

        throw new Error('Failed to fetch movie details');
      }
    },
    me: async (
      _: unknown,
      __: unknown,
      context: { user: { id: string } | null }
    ) => {
      try {
        const user = context.user;

        if (!user) {
          throw new Error('Authentication required');
        }

        // Fetch user data from Supabase
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching user:', error);
          throw new Error('Failed to fetch user data');
        }

        return {
          id: data.id,
          username: data.username,
          email: data.email,
          createdAt: data.created_at,
          updatedAt: data.updated_at,
          preferences: data.preferences || {},
        };
      } catch (error) {
        console.error('Error in me query:', error);

        Sentry.captureException(error, {
          tags: {
            resolver: 'me',
          },
          extra: {
            error: error instanceof Error ? error.message : String(error),
          },
        });

        throw new Error('Failed to fetch user data');
      }
    },
  },
  Mutation: {
    updateUserPreferences: async (
      _: unknown,
      { preferences }: { preferences: UpdateUserPreferencesInput },
      context: { user: { id: string } | null; token: string }
    ) => {
      try {
        // Get authenticated user from context
        const user = context.user;

        if (!user) {
          throw new Error('Authentication required');
        }

        console.log('Authenticated user:', user);
        console.log('User ID being used:', user.id);
        console.log('Supabase URL:', process.env.SUPABASE_URL);
        console.log(
          'Supabase anon key exists:',
          !!process.env.SUPABASE_ANON_KEY
        );

        // Create a Supabase client with the user's JWT token
        const userClient = createUserClient(
          context.token.replace('Bearer ', '')
        );

        // First, try to get the user to see if they exist
        console.log('Querying users table for ID:', user.id);
        const { data: existingUser, error: fetchError } = await userClient
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single();

        console.log('Query result - data:', existingUser);
        console.log('Query result - error:', fetchError);

        if (fetchError && fetchError.code === 'PGRST116') {
          // User doesn't exist, create them
          console.log('User not found, creating new user record for:', user.id);
          const { data: newUser, error: createError } = await userClient
            .from('users')
            .insert({
              id: user.id,
              email: '', // We'll need to get this from auth context
              preferences: preferences,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            })
            .select()
            .single();

          if (createError) {
            console.error('Error creating user:', createError);
            throw new Error(`Failed to create user: ${createError.message}`);
          }

          return {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
            createdAt: newUser.created_at,
            updatedAt: newUser.updated_at,
            preferences: newUser.preferences || {},
          };
        }

        if (fetchError) {
          console.error('Error fetching user:', fetchError);
          throw new Error(`Failed to fetch user: ${fetchError.message}`);
        }

        // User exists, update their preferences
        const { data, error } = await userClient
          .from('users')
          .update({
            preferences: preferences,
            updated_at: new Date().toISOString(),
          })
          .eq('id', user.id)
          .select()
          .single();

        if (error) {
          console.error('Error updating user preferences:', error);
          console.error('User ID:', user.id);
          console.error('Preferences being updated:', preferences);
          throw new Error(
            `Failed to update user preferences: ${error.message}`
          );
        }

        // Return the updated user
        return {
          id: data.id,
          username: data.username,
          email: data.email,
          createdAt: data.created_at,
          updatedAt: data.updated_at,
          preferences: data.preferences || {},
        };
      } catch (error) {
        console.error('Error in updateUserPreferences:', error);

        // Capture error in Sentry
        Sentry.captureException(error, {
          tags: {
            resolver: 'updateUserPreferences',
          },
          extra: {
            error: error instanceof Error ? error.message : String(error),
          },
        });

        throw new Error('Failed to update user preferences');
      }
    },
    clearCache: async () => {
      try {
        await movieCache.clear();
        console.log('🗑️ Cache cleared successfully');
        return true;
      } catch (error) {
        console.error('Error clearing cache:', error);

        Sentry.captureException(error, {
          tags: {
            resolver: 'clearCache',
          },
          extra: {
            error: error instanceof Error ? error.message : String(error),
          },
        });

        return false;
      }
    },
  },
  User: {
    preferences: (parent: { preferences?: Record<string, unknown> }) => {
      return parent.preferences || {};
    },
  },
};

export { resolvers };
