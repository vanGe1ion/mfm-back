import { ApiMovie } from './object-types';

export interface moviesAPIRequestParams {
  with_genres?: string;
  primary_release_year?: number;
  'vote_average.gte'?: number;
  'vote_average.lte'?: number;
  page?: number;
}

export interface moviesAPIRsponseParams {
  results: TMDBMovie[];
  page: number;
  total_pages: number;
  total_results: number;
}

export interface TMDBMovie {
  poster_path?: string | null;
  adult?: boolean;
  overview?: string;
  release_date?: string;
  genre_ids: number[];
  id?: number;
  original_title?: string;
  original_language?: string;
  title?: string;
  backdrop_path?: string;
  popularity?: number;
  vote_count?: number;
  video?: boolean;
  vote_average?: number;
}

export interface IGetMoviesParams {
  withGenres?: number[];
  primaryReleaseYear?: number;
  voteAverage?: IRange;
  page?: number;
}

interface IRange {
  gte?: number;
  lte?: number;
}

export interface IGetMoviesResponse {
  movies: ApiMovie[];
  page: number;
  totalResults: number;
  totalPages: number;
}
