import { ApiMovie } from '../object-types';
import {
  IGetMoviesParams,
  IGetMoviesResponse,
  TMDBMovie,
  moviesAPIRequestParams,
  moviesAPIRsponseParams,
} from '../types';

export const toMoviesAPIRequestParams = (
  appParams: IGetMoviesParams,
): moviesAPIRequestParams => {
  const { withGenres, primaryReleaseYear, voteAverage, page } = appParams;
  return {
    with_genres: withGenres?.join(', '),
    primary_release_year: primaryReleaseYear,
    'vote_average.gte': voteAverage?.gte,
    'vote_average.lte': voteAverage?.lte,
    page,
  };
};

export const toIGetMoviesResponse = (
  APIResponse: moviesAPIRsponseParams,
): IGetMoviesResponse => {
  const { results, page, total_results, total_pages } = APIResponse;

  const movies: ApiMovie[] = results.map(
    ({
      poster_path,
      release_date,
      genre_ids,
      original_title,
      vote_count,
      vote_average,
      id,
      overview,
      title,
    }: TMDBMovie) => {
      return {
        posterPath: poster_path ?? '',
        releaseYear: release_date ? new Date(release_date).getFullYear() : null,
        genreIds: Array.from(genre_ids),
        originalTitle: original_title ?? '',
        voteCount: vote_count ?? null,
        voteAverage: vote_average ?? null,
        id: id!,
        overview: overview ?? '',
        title: title!,
      };
    },
  );

  return {
    movies,
    page,
    totalResults: total_results,
    totalPages: total_pages,
  };
};
