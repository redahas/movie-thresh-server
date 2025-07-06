import type {
  Movie,
  OmdbMovie,
  TmdbMovieDetails,
} from '../schema/__generated__/resolvers-types';

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
    ratings: omdbMovie.Ratings.map((rating) => ({
      source: rating.Source,
      value: rating.Value,
    })),
  };
};
