import type {
  TmdbMovie,
  TmdbMovieSearchResult,
} from './schema/__generated__/resolvers-types';
import { supabase } from './supabase.js';

const resolvers = {
  Query: {
    searchMovies: async (_: unknown, { query }: { query: string }) => {
      console.log('Searching for:', query);

      if (!query || query.trim().length < 2) {
        return [];
      }

      try {
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
        const searchUrl = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query.trim())}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;

        const response = await fetch(searchUrl, options);
        const data: TmdbMovieSearchResult = await response.json();

        return data?.results
          ?.sort((a, b) => b.popularity - a.popularity)
          ?.map((movie: TmdbMovie) => ({
            title: movie.title || '',
            released: movie.release_date || '',
            tmdbId: movie.id || 0,
          }));
      } catch (error) {
        console.error('Error searching movies:', error);
        throw new Error('Failed to search movies');
      }
    },
    // searchMovies: async (_, { query }) => {
    //   console.log('Searching for:', query);

    //   if (!query || query.trim().length < 2) {
    //     return [];
    //   }

    //   try {
    //     // Call OMDB API
    //     const OMDB_API_KEY = process.env.OMDB_API_KEY || 'demo'; // Use demo key if not set
    //     const searchUrl = `http://www.omdbapi.com/?s=${encodeURIComponent(query.trim())}&apikey=${OMDB_API_KEY}`;

    //     const response = await fetch(searchUrl);
    //     const data = await response.json();

    //     console.log('OMDB API response:', data);

    //     if (data.Response === 'False') {
    //       console.error('OMDB API error:', data.Error);
    //       return [];
    //     }

    //     // Transform the results to match your GraphQL schema
    //     const movies = data.Search || [];
    //     return movies.map((movie) => ({
    //       Title: movie.Title || '',
    //       Year: movie.Year || '',
    //       Rated: 'N/A',
    //       Released: movie.Year || '',
    //       Runtime: 'N/A',
    //       Genre: 'N/A',
    //       Director: 'N/A',
    //       Writer: 'N/A',
    //       Plot: 'N/A',
    //       Language: 'N/A',
    //       Ratings: [],
    //     }));
    //   } catch (error) {
    //     console.error('Error searching movies:', error);
    //     throw new Error('Failed to search movies');
    //   }
    // },
  },
};

export { resolvers };

// return [].map((movie) => ({
//   ...movie,
//   releaseYear: movie.release_year,
//   createdAt: movie.created_at,
//   updatedAt: movie.updated_at,
// }));
