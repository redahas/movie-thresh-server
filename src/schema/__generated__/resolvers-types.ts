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
  Source: Scalars['String']['output'];
  Value: Scalars['String']['output'];
};

export type MovieSearchResult = {
  __typename?: 'MovieSearchResult';
  released: Scalars['String']['output'];
  title: Scalars['String']['output'];
  tmdbId: Scalars['Int']['output'];
};

export type OmdbMovie = {
  __typename?: 'OmdbMovie';
  Director: Scalars['String']['output'];
  Genre: Scalars['String']['output'];
  Language: Scalars['String']['output'];
  Plot: Scalars['String']['output'];
  Rated: Scalars['String']['output'];
  Ratings: Array<MovieRating>;
  Released: Scalars['String']['output'];
  Runtime: Scalars['String']['output'];
  Title: Scalars['String']['output'];
  Writer: Scalars['String']['output'];
  Year: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  searchMovies: Array<MovieSearchResult>;
};


export type QuerySearchMoviesArgs = {
  query: Scalars['String']['input'];
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

export type TmdbMovieSearchResult = {
  __typename?: 'TmdbMovieSearchResult';
  page: Scalars['Int']['output'];
  results: Array<TmdbMovie>;
  total_pages: Scalars['Int']['output'];
  total_results: Scalars['Int']['output'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  updatedAt: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

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
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Movie: ResolverTypeWrapper<Movie>;
  MovieRating: ResolverTypeWrapper<MovieRating>;
  MovieSearchResult: ResolverTypeWrapper<MovieSearchResult>;
  OmdbMovie: ResolverTypeWrapper<OmdbMovie>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  TmdbMovie: ResolverTypeWrapper<TmdbMovie>;
  TmdbMovieSearchResult: ResolverTypeWrapper<TmdbMovieSearchResult>;
  User: ResolverTypeWrapper<User>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean']['output'];
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Movie: Movie;
  MovieRating: MovieRating;
  MovieSearchResult: MovieSearchResult;
  OmdbMovie: OmdbMovie;
  Query: {};
  String: Scalars['String']['output'];
  TmdbMovie: TmdbMovie;
  TmdbMovieSearchResult: TmdbMovieSearchResult;
  User: User;
}>;

export type MovieResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['Movie'] = ResolversParentTypes['Movie']> = ResolversObject<{
  director?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  genre?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  language?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  plot?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  rated?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ratings?: Resolver<Array<ResolversTypes['MovieRating']>, ParentType, ContextType>;
  released?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  runtime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  writer?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  year?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MovieRatingResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['MovieRating'] = ResolversParentTypes['MovieRating']> = ResolversObject<{
  Source?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  Value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MovieSearchResultResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['MovieSearchResult'] = ResolversParentTypes['MovieSearchResult']> = ResolversObject<{
  released?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tmdbId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type OmdbMovieResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['OmdbMovie'] = ResolversParentTypes['OmdbMovie']> = ResolversObject<{
  Director?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  Genre?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  Language?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  Plot?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  Rated?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  Ratings?: Resolver<Array<ResolversTypes['MovieRating']>, ParentType, ContextType>;
  Released?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  Runtime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  Title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  Writer?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  Year?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  searchMovies?: Resolver<Array<ResolversTypes['MovieSearchResult']>, ParentType, ContextType, RequireFields<QuerySearchMoviesArgs, 'query'>>;
}>;

export type TmdbMovieResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['TmdbMovie'] = ResolversParentTypes['TmdbMovie']> = ResolversObject<{
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
}>;

export type TmdbMovieSearchResultResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['TmdbMovieSearchResult'] = ResolversParentTypes['TmdbMovieSearchResult']> = ResolversObject<{
  page?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  results?: Resolver<Array<ResolversTypes['TmdbMovie']>, ParentType, ContextType>;
  total_pages?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  total_results?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = ApolloServerContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = ApolloServerContext> = ResolversObject<{
  Movie?: MovieResolvers<ContextType>;
  MovieRating?: MovieRatingResolvers<ContextType>;
  MovieSearchResult?: MovieSearchResultResolvers<ContextType>;
  OmdbMovie?: OmdbMovieResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  TmdbMovie?: TmdbMovieResolvers<ContextType>;
  TmdbMovieSearchResult?: TmdbMovieSearchResultResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
}>;

