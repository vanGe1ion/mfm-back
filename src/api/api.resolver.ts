import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import CurrentUserDto from 'src/auth/dto/current-user.dto';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { ApiService } from './api.service';
import FindMoviesInputDto from './dto/find-movies-input.dto';
import FindMoviesOutputDto from './dto/find-movies-output.dto';
import ApiGenre from './dto/object-genre.dto';

@Resolver()
export class ApiResolver {
  constructor(private apiService: ApiService) {}

  @Query((returns) => [ApiGenre])
  async getGenresWithFavourites(
    @CurrentUser() user: CurrentUserDto,
  ): Promise<ApiGenre[]> {
    return await this.apiService.getGenresWithFavourites(user.id);
  }

  @Query((returns) => FindMoviesOutputDto)
  async findMoviesWithFavourites(
    @CurrentUser() user: CurrentUserDto,
    @Args('findMoviesInputDto', { type: () => FindMoviesInputDto })
    findMoviesInputDto: FindMoviesInputDto,
  ): Promise<FindMoviesOutputDto> {
    return await this.apiService.findMoviesWithFavourites(
      user.id,
      findMoviesInputDto,
    );
  }
}
