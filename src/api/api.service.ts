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
import { GenreService } from 'src/genre/genre.service';

@Injectable()
export class ApiService {
  constructor(
    private configService: ConfigService,
    private genreService: GenreService,
  ) {}

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

  async getGenresWithFavourites(userId: number): Promise<ApiGenre[]> {
    const favouriteGenres = await this.genreService.getGenresOfUser(userId);
    const favGenresIds = favouriteGenres.map(({ genreId }) => genreId);
    return (await this.getGenres()).map((genre) => ({
      ...genre,
      isFavourite: favGenresIds.includes(genre.id),
    }));
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
      with_genres: withGenres?.join(' | '),
      primary_release_year: primaryReleaseYear,
      'vote_average.gte': voteAverage?.gte,
      'vote_average.lte': voteAverage?.lte,
      page,
    };
  };

  private toFindMoviesOutputDto = (
    TMDBResponse: IGetMoviesTMDBResponse,
  ): FindMoviesOutputDto => {
    const { results, ...rest } = TMDBResponse;

    const newResult: ApiMovie[] = results.map(
      ({ release_date, poster_path, ...resultRest }: TMDBMovie) => {
        return {
          poster_path: poster_path ?? '',
          release_year: release_date
            ? new Date(release_date).getFullYear()
            : null,
          ...resultRest,
        };
      },
    );

    return {
      result: newResult,
      ...rest,
    };
  };
}
