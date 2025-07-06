# Cache Implementation Guide

This server implements a flexible caching layer using **Keyv** that supports both in-memory (development) and Redis (production) backends.

## Features

- ✅ **Automatic cache-first strategy** for external API calls
- ✅ **Environment-aware**: Uses memory in dev, Redis in production
- ✅ **Type-safe**: Full TypeScript support
- ✅ **Error resilient**: Graceful fallback if cache fails
- ✅ **Easy management**: REST endpoints for cache operations

## How It Works

### Cache-First Strategy
```
1. Request comes in for movie data
2. Check cache first (Redis/memory)
   ├─ If found: Return cached data immediately
   └─ If not found: Fetch from external API → Cache result → Return to client
```

### Current Implementation
- **Movie Search**: Caches TMDB search results for 90 days
- **Cache Keys**: `search:{query}`, `movie:{tmdbId}`, `genre:{genreId}`
- **TTL**: 90 days (7776000 seconds)

## Environment Setup

### Development (In-Memory Cache)
```bash
# No additional setup needed - uses memory cache
yarn dev
```

### Production (Redis Cache)
```bash
# Set Redis URL in environment
REDIS_URL=redis://your-elasticache-endpoint:6379
```

## API Endpoints

### GraphQL
- `POST /graphql` - All GraphQL queries (now cached automatically)

### Cache Management
- `GET /cache/stats` - Get cache statistics
- `DELETE /cache/clear` - Clear all cached data
- `GET /health` - Health check

## Usage Examples

### GraphQL Query (Automatically Cached)
```graphql
query SearchMovies($query: String!) {
  searchMovies(query: $query) {
    title
    released
    tmdbId
  }
}
```

### Cache Management via REST
```bash
# Check cache stats
curl http://localhost:4000/cache/stats

# Clear all cache
curl -X DELETE http://localhost:4000/cache/clear
```

## Configuration

### Environment Variables
```env
# Cache Configuration
REDIS_URL=                    # Leave empty for memory cache
TMDB_READ_ACCESS_TOKEN=       # Required for TMDB API calls
```

### Cache Configuration (src/cache.ts)
```typescript
const CACHE_CONFIG = {
  namespace: 'movies',        // Cache namespace
  ttl: 7776000,              // 90 days in seconds
};
```

## Adding New Cached Endpoints

### 1. Add Cache Key
```typescript
// In src/cache.ts
export const CACHE_KEYS = {
  MOVIE_SEARCH: (query: string) => `search:${query.toLowerCase().trim()}`,
  MOVIE_DETAILS: (tmdbId: number) => `movie:${tmdbId}`,
  // Add your new key here
  NEW_ENDPOINT: (param: string) => `new:${param}`,
};
```

### 2. Add Cache Methods
```typescript
// In src/cache.ts - MovieCache class
async getNewData(param: string): Promise<CachedData | undefined> {
  const key = CACHE_KEYS.NEW_ENDPOINT(param);
  return this.get<CachedData>(key);
}

async setNewData(param: string, data: any): Promise<void> {
  const key = CACHE_KEYS.NEW_ENDPOINT(param);
  await this.set(key, data);
}
```

### 3. Update Resolver
```typescript
// In src/resolvers.ts
newResolver: async (_, { param }) => {
  // 1. Check cache
  const cached = await movieCache.getNewData(param);
  if (cached) {
    console.log('🎯 Cache hit for:', param);
    return cached.data;
  }

  // 2. Fetch from API
  const data = await fetchFromExternalAPI(param);

  // 3. Cache result
  await movieCache.setNewData(param, data);

  return data;
}
```

## Monitoring & Debugging

### Log Messages
- `🎯 Cache hit for query: {query}` - Data found in cache
- `❌ Cache miss for query: {query}` - Data not in cache
- `💾 Cached results for query: {query}` - Data stored in cache
- `🔗 Using Redis cache: {url}` - Redis connection established
- `💾 Using in-memory cache (development mode)` - Memory cache active

### Cache Statistics
```bash
curl http://localhost:4000/cache/stats
```

## Production Deployment

### AWS ElastiCache Setup
1. Create ElastiCache Redis cluster
2. Set `REDIS_URL` environment variable
3. Ensure security groups allow connection
4. Monitor cache hit rates and performance

### Environment Variables
```env
# Production
REDIS_URL=redis://your-elasticache-endpoint:6379
NODE_ENV=production
TMDB_READ_ACCESS_TOKEN=your-tmdb-token
```

## Performance Benefits

- **Faster Response Times**: Cache hits are ~10-100x faster than API calls
- **Reduced API Costs**: Fewer calls to TMDB/OMDB APIs
- **Better UX**: Consistent response times for users
- **API Rate Limiting**: Less likely to hit rate limits
- **Offline Resilience**: Cached data available even if APIs are down

## Troubleshooting

### Cache Not Working
1. Check `REDIS_URL` environment variable
2. Verify Redis connection in logs
3. Check cache statistics endpoint
4. Ensure TTL is not too short

### Memory Issues
1. Monitor cache size in production
2. Consider reducing TTL for large datasets
3. Implement cache eviction policies if needed

### Performance Issues
1. Check cache hit rates
2. Monitor Redis memory usage
3. Consider Redis clustering for high traffic
