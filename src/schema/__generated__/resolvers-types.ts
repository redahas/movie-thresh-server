import { GraphQLResolveInfo } from 'graphql';
import { ApolloServerContext } from '../index.js';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Movie = {
  __typename?: 'Movie';
  director: Scalars['String']['output'];
  genre: Scalars['String']['output'];
  language: Scalars['String']['output'];
  plot: Scalars['String']['output'];
  posters: Array<Scalars['String']['output']>;
  rated: Scalars['String']['output'];
  ratings: Array<MovieRating>;
  released: Scalars['String']['output'];
  runtime: Scalars['String']['output'];
  title: Scalars['String']['output'];
  writer: Scalars['String']['output'];
  year: Scalars['String']['output'];
};

export type MovieRating = {
  __typename?: 'MovieRating';
  source: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type MovieSearchResult = {
  __typename?: 'MovieSearchResult';
  released: Scalars['String']['output'];
  title: Scalars['String']['output'];
  tmdbId: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  updateUserPreferences: User;
};


export type MutationUpdateUserPreferencesArgs = {
  preferences: UpdateUserPreferencesInput;
};

export type OmdbMovie = {
  __typename?: 'OmdbMovie';
  Actors: Scalars['String']['output'];
  Country: Scalars['String']['output'];
  Director: Scalars['String']['output'];
  Genre: Scalars['String']['output'];
  Language: Scalars['String']['output'];
  Plot: Scalars['String']['output'];
  Poster: Scalars['String']['output'];
  Rated: Scalars['String']['output'];
  Ratings: Array<OmdbRating>;
  Released: Scalars['String']['output'];
  Runtime: Scalars['String']['output'];
  Title: Scalars['String']['output'];
  Writer: Scalars['String']['output'];
  Year: Scalars['String']['output'];
};

export type OmdbRating = {
  __typename?: 'OmdbRating';
  Source: Scalars['String']['output'];
  Value: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  movieDetails: Movie;
  searchMovies: Array<MovieSearchResult>;
};


export type QueryMovieDetailsArgs = {
  tmdbId: Scalars['Int']['input'];
};


export type QuerySearchMoviesArgs = {
  query: Scalars['String']['input'];
};

export type TmdbGenre = {
  __typename?: 'TmdbGenre';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type TmdbMovie = {
  __typename?: 'TmdbMovie';
  adult: Scalars['Boolean']['output'];
  backdrop_path: Scalars['String']['output'];
  genre_ids: Array<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  original_language: Scalars['String']['output'];
  original_title: Scalars['String']['output'];
  overview: Scalars['String']['output'];
  popularity: Scalars['Float']['output'];
  poster_path: Scalars['String']['output'];
  release_date: Scalars['String']['output'];
  title: Scalars['String']['output'];
  video: Scalars['Boolean']['output'];
  vote_average: Scalars['Float']['output'];
  vote_count: Scalars['Int']['output'];
};

export type TmdbMovieDetails = {
  __typename?: 'TmdbMovieDetails';
  genres: Array<TmdbGenre>;
  id: Scalars['Int']['output'];
  imdb_id?: Maybe<Scalars['String']['output']>;
  origin_country: Array<Scalars['String']['output']>;
  original_language: Scalars['String']['output'];
  original_title: Scalars['String']['output'];
  overview: Scalars['String']['output'];
  popularity: Scalars['Float']['output'];
  poster_path?: Maybe<Scalars['String']['output']>;
  production_companies: Array<TmdbProductionCompany>;
  production_countries: Array<TmdbProductionCountry>;
  release_date: Scalars['String']['output'];
  runtime?: Maybe<Scalars['Int']['output']>;
  spoken_languages: Array<TmdbSpokenLanguage>;
  title: Scalars['String']['output'];
};

export type TmdbMovieSearchResult = {
  __typename?: 'TmdbMovieSearchResult';
  page: Scalars['Int']['output'];
  results: Array<TmdbMovie>;
  total_pages: Scalars['Int']['output'];
  total_results: Scalars['Int']['output'];
};

export type TmdbProductionCompany = {
  __typename?: 'TmdbProductionCompany';
  id: Scalars['Int']['output'];
  logo_path?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  origin_country: Scalars['String']['output'];
};

export type TmdbProductionCountry = {
  __typename?: 'TmdbProductionCountry';
  iso_3166_1: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type TmdbSpokenLanguage = {
  __typename?: 'TmdbSpokenLanguage';
  english_name: Scalars['String']['output'];
  iso_639_1: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type UpdateUserPreferencesInput = {
  animationsEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  autoPlayEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  imdbThreshold?: InputMaybe<Scalars['Float']['input']>;
  metacriticThreshold?: InputMaybe<Scalars['Float']['input']>;
  rottenTomatoesThreshold?: InputMaybe<Scalars['Float']['input']>;
  smoothScrollingEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  soundEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  theme?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  preferences?: Maybe<UserPreferences>;
  updatedAt: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type UserPreferences = {
  __typename?: 'UserPreferences';
  animationsEnabled?: Maybe<Scalars['Boolean']['output']>;
  autoPlayEnabled?: Maybe<Scalars['Boolean']['output']>;
  imdbThreshold?: Maybe<Scalars['Float']['output']>;
  metacriticThreshold?: Maybe<Scalars['Float']['output']>;
  rottenTomatoesThreshold?: Maybe<Scalars['Float']['output']>;
  smoothScrollingEnabled?: Maybe<Scalars['Boolean']['output']>;
  soundEnabled?: Maybe<Scalars['Boolean']['output']>;
  theme?: Maybe<Scalars['String']['output']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Movie: ResolverTypeWrapper<Movie>;
  MovieRating: ResolverTypeWrapper<MovieRating>;
  MovieSearchResult: ResolverTypeWrapper<MovieSearchResult>;
  Mutation: ResolverTypeWrapper<{}>;
  OmdbMovie: ResolverTypeWrapper<OmdbMovie>;
  OmdbRating: ResolverTypeWrapper<OmdbRating>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  TmdbGenre: ResolverTypeWrapper<TmdbGenre>;
  TmdbMovie: ResolverTypeWrapper<TmdbMovie>;
  TmdbMovieDetails: ResolverTypeWrapper<TmdbMovieDetails>;
  TmdbMovieSearchResult: ResolverTypeWrapper<TmdbMovieSearchResult>;
  TmdbProductionCompany: ResolverTypeWrapper<TmdbProductionCompany>;
  TmdbProductionCountry: ResolverTypeWrapper<TmdbProductionCountry>;
  TmdbSpokenLanguage: ResolverTypeWrapper<TmdbSpokenLanguage>;
  UpdateUserPreferencesInput: UpdateUserPreferencesInput;
  User: ResolverTypeWrapper<User>;
  UserPreferences: ResolverTypeWrapper<UserPreferences>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Movie: Movie;
  MovieRating: MovieRating;
  MovieSearchResult: MovieSearchResult;
  Mutation: {};
  OmdbMovie: OmdbMovie;
  OmdbRating: OmdbRating;
  Query: {};
  String: Scalars['String']['output'];
  TmdbGenre: TmdbGenre;
  TmdbMovie: TmdbMovie;
  TmdbMovieDetails: TmdbMovieDetails;
  TmdbMovieSearchResult: TmdbMovieSearchResult;
  TmdbProductionCompany: TmdbProductionCompany;
  TmdbProductionCountry: TmdbProductionCountry;
  TmdbSpokenLanguage: TmdbSpokenLanguage;
  UpdateUserPreferencesInput: UpdateUserPreferencesInput;
  User: User;
  UserPreferences: UserPreferences;
};

export type MovieResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['Movie'] = ResolversParentTypes['Movie']> = {
  director?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  genre?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  language?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  plot?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  posters?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  rated?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ratings?: Resolver<Array<ResolversTypes['MovieRating']>, ParentType, ContextType>;
  released?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  runtime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  writer?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  year?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MovieRatingResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['MovieRating'] = ResolversParentTypes['MovieRating']> = {
  source?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MovieSearchResultResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['MovieSearchResult'] = ResolversParentTypes['MovieSearchResult']> = {
  released?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tmdbId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  updateUserPreferences?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateUserPreferencesArgs, 'preferences'>>;
};

export type OmdbMovieResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['OmdbMovie'] = ResolversParentTypes['OmdbMovie']> = {
  Actors?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  Country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  Director?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  Genre?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  Language?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  Plot?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  Poster?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  Rated?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  Ratings?: Resolver<Array<ResolversTypes['OmdbRating']>, ParentType, ContextType>;
  Released?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  Runtime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  Title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  Writer?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  Year?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OmdbRatingResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['OmdbRating'] = ResolversParentTypes['OmdbRating']> = {
  Source?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  Value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  movieDetails?: Resolver<ResolversTypes['Movie'], ParentType, ContextType, RequireFields<QueryMovieDetailsArgs, 'tmdbId'>>;
  searchMovies?: Resolver<Array<ResolversTypes['MovieSearchResult']>, ParentType, ContextType, RequireFields<QuerySearchMoviesArgs, 'query'>>;
};

export type TmdbGenreResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['TmdbGenre'] = ResolversParentTypes['TmdbGenre']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TmdbMovieResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['TmdbMovie'] = ResolversParentTypes['TmdbMovie']> = {
  adult?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  backdrop_path?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  genre_ids?: Resolver<Array<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  original_language?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  original_title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  overview?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  popularity?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  poster_path?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  release_date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  video?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  vote_average?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  vote_count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TmdbMovieDetailsResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['TmdbMovieDetails'] = ResolversParentTypes['TmdbMovieDetails']> = {
  genres?: Resolver<Array<ResolversTypes['TmdbGenre']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  imdb_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  origin_country?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  original_language?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  original_title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  overview?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  popularity?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  poster_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  production_companies?: Resolver<Array<ResolversTypes['TmdbProductionCompany']>, ParentType, ContextType>;
  production_countries?: Resolver<Array<ResolversTypes['TmdbProductionCountry']>, ParentType, ContextType>;
  release_date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  runtime?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  spoken_languages?: Resolver<Array<ResolversTypes['TmdbSpokenLanguage']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TmdbMovieSearchResultResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['TmdbMovieSearchResult'] = ResolversParentTypes['TmdbMovieSearchResult']> = {
  page?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  results?: Resolver<Array<ResolversTypes['TmdbMovie']>, ParentType, ContextType>;
  total_pages?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  total_results?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TmdbProductionCompanyResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['TmdbProductionCompany'] = ResolversParentTypes['TmdbProductionCompany']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  logo_path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  origin_country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TmdbProductionCountryResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['TmdbProductionCountry'] = ResolversParentTypes['TmdbProductionCountry']> = {
  iso_3166_1?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TmdbSpokenLanguageResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['TmdbSpokenLanguage'] = ResolversParentTypes['TmdbSpokenLanguage']> = {
  english_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  iso_639_1?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  preferences?: Resolver<Maybe<ResolversTypes['UserPreferences']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserPreferencesResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['UserPreferences'] = ResolversParentTypes['UserPreferences']> = {
  animationsEnabled?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  autoPlayEnabled?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  imdbThreshold?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  metacriticThreshold?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  rottenTomatoesThreshold?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  smoothScrollingEnabled?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  soundEnabled?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  theme?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = ApolloServerContext> = {
  Movie?: MovieResolvers<ContextType>;
  MovieRating?: MovieRatingResolvers<ContextType>;
  MovieSearchResult?: MovieSearchResultResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  OmdbMovie?: OmdbMovieResolvers<ContextType>;
  OmdbRating?: OmdbRatingResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  TmdbGenre?: TmdbGenreResolvers<ContextType>;
  TmdbMovie?: TmdbMovieResolvers<ContextType>;
  TmdbMovieDetails?: TmdbMovieDetailsResolvers<ContextType>;
  TmdbMovieSearchResult?: TmdbMovieSearchResultResolvers<ContextType>;
  TmdbProductionCompany?: TmdbProductionCompanyResolvers<ContextType>;
  TmdbProductionCountry?: TmdbProductionCountryResolvers<ContextType>;
  TmdbSpokenLanguage?: TmdbSpokenLanguageResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserPreferences?: UserPreferencesResolvers<ContextType>;
};

