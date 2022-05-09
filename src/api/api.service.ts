import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import {
  IGetMoviesTMDBParams,
  IGetMoviesTMDBResponse,
  TMDBMovie,
} from './types';
import ApiGenre from './dto/object-genre.dto';
import FindMoviesInputDto from './dto/find-movies-input.dto';
import FindMoviesOutputDto from './dto/find-movies-output.dto';
import ApiMovie from './dto/object-movie.dto';

@Injectable()
export class ApiService {
  constructor(private configService: ConfigService) {}

  private movieDBClient = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    params: {
      api_key: this.configService.get<string>('TMDB_API_KEY'),
      language: 'en-EN',
    },
  });

  async getGenres(): Promise<ApiGenre[]> {
    return await this.errorHandler(async () => {
      const response = await this.movieDBClient.get('/genre/movie/list');
      return await response.data.genres;
    });
  }

  async findMovies(
    findMoviesInputDto: FindMoviesInputDto,
  ): Promise<FindMoviesOutputDto> {
    return await this.errorHandler(async () => {
      const TMDBRequestParams = this.toIGetMoviesTMDBParams(findMoviesInputDto);
      const response = await this.movieDBClient.get('/discover/movie', {
        params: TMDBRequestParams,
      });
      return this.toFindMoviesOutputDto(response.data);
    });
  }

  private async errorHandler(callback: () => Promise<any>): Promise<any> {
    try {
      return await callback();
    } catch (error) {
      if (error instanceof Error)
        throw new HttpException(
          `Access TMDB resource failed: ${error.message}`,
          HttpStatus.FAILED_DEPENDENCY,
        );
    }
  }

  private toIGetMoviesTMDBParams = (
    appParams: FindMoviesInputDto,
  ): IGetMoviesTMDBParams => {
    const { withGenres, primaryReleaseYear, voteAverage, page } = appParams;
    return {
      with_genres: withGenres?.join(', '),
      primary_release_year: primaryReleaseYear,
      'vote_average.gte': voteAverage?.gte,
      'vote_average.lte': voteAverage?.lte,
      page,
    };
  };

  private toFindMoviesOutputDto = (
    TMDBResponse: IGetMoviesTMDBResponse,
  ): FindMoviesOutputDto => {
    const { results, page, total_results, total_pages } = TMDBResponse;

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
          releaseYear: release_date
            ? new Date(release_date).getFullYear()
            : null,
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
}
