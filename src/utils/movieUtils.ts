import type {
  Movie,
  OmdbMovie,
  TmdbMovieDetails,
} from '../schema/__generated__/resolvers-types';

// Enum for normalized rating sources
export enum RatingSource {
  IMDB = 'imdb',
  ROTTEN_TOMATOES = 'rotten_tomatoes',
  METACRITIC = 'metacritic',
}

// Function to normalize OMDB rating source names to enum values
export const normalizeRatingSource = (source: string): RatingSource | null => {
  const normalizedSource = source.toLowerCase().trim();

  if (
    normalizedSource.includes('internet movie database') ||
    normalizedSource.includes('imdb')
  ) {
    return RatingSource.IMDB;
  }

  if (normalizedSource.includes('rotten tomatoes')) {
    return RatingSource.ROTTEN_TOMATOES;
  }

  if (normalizedSource.includes('metacritic')) {
    return RatingSource.METACRITIC;
  }

  return null;
};

export const normalizeMovieData = ({
  omdbMovie,
  tmdbMovie,
}: {
  omdbMovie: OmdbMovie;
  tmdbMovie: TmdbMovieDetails;
}): Movie => {
  return {
    title: omdbMovie.Title,
    year: omdbMovie.Year,
    rated: omdbMovie.Rated,
    released: omdbMovie.Released,
    runtime: omdbMovie.Runtime,
    genre: omdbMovie.Genre,
    director: omdbMovie.Director,
    writer: omdbMovie.Writer,
    plot: omdbMovie.Plot,
    posters: [
      omdbMovie.Poster,
      tmdbMovie.poster_path
        ? `https://image.tmdb.org/t/p/w300${tmdbMovie.poster_path}`
        : null,
    ].filter(Boolean) as string[],
    language: omdbMovie.Language,
    ratings: omdbMovie.Ratings.map((rating) => {
      const normalizedSource = normalizeRatingSource(rating.Source);
      return {
        source: normalizedSource || rating.Source, // Fallback to original if not recognized
        value: rating.Value,
      };
    }),
  };
};
