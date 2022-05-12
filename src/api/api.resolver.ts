import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { ApiService } from './api.service';
import FindMoviesInputDto from './dto/find-movies-input.dto';
import FindMoviesOutputDto from './dto/find-movies-output.dto';
import ApiGenre from './dto/object-genre.dto';

@Resolver()
export class ApiResolver {
  constructor(private apiService: ApiService) {}

  @Query((returns) => [ApiGenre])
  async getGenres(): Promise<ApiGenre[]> {
    return await this.apiService.getGenres();
  }

  @Query((returns) => [ApiGenre])
  async getGenresWithFavourites(
    @Args('userId', { type: () => Int }) userId: number,
  ): Promise<ApiGenre[]> {
    return await this.apiService.getGenresWithFavourites(userId);
  }

  @Query((returns) => FindMoviesOutputDto)
  async findMovies(
    @Args('findMoviesInputDto', { type: () => FindMoviesInputDto })
    findMoviesInputDto: FindMoviesInputDto,
  ): Promise<FindMoviesOutputDto> {
    return await this.apiService.findMovies(findMoviesInputDto);
  }

  @Query((returns) => FindMoviesOutputDto)
  async findMoviesWithFavourites(
    @Args('userId', { type: () => Int })
    userId: number,
    @Args('findMoviesInputDto', { type: () => FindMoviesInputDto })
    findMoviesInputDto: FindMoviesInputDto,
  ): Promise<FindMoviesOutputDto> {
    return await this.apiService.findMoviesWithFavourites(
      userId,
      findMoviesInputDto,
    );
  }
}
