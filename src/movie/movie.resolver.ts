import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import CurrentUserDto from 'src/auth/dto/current-user.dto';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import AddMovieDto from './dto/add-movie.dto';
import UpdateMovieDto from './dto/update-movie.dto';
import { Movie } from './movie.entity';
import { MovieService } from './movie.service';

@Resolver()
export class MovieResolver {
  constructor(private movieService: MovieService) {}

  @Mutation((returns) => Movie)
  async addMovie(
    @CurrentUser() user: CurrentUserDto,
    @Args('addMovieDto', { type: () => AddMovieDto })
    addMovieDto: AddMovieDto,
  ): Promise<Movie> {
    return await this.movieService.addMovie(user.id, addMovieDto);
  }

  @Mutation((returns) => Movie)
  async updateMovie(
    @CurrentUser() user: CurrentUserDto,
    @Args('updateMovieDto', { type: () => UpdateMovieDto })
    updateMovieDto: UpdateMovieDto,
  ): Promise<Movie> {
    return await this.movieService.updateMovie(user.id, updateMovieDto);
  }

  @Mutation((returns) => Number)
  async removeMovie(
    @CurrentUser() user: CurrentUserDto,
    @Args('movieId', { type: () => Int })
    movieId: number,
  ): Promise<number> {
    return await this.movieService.removeMovie(user.id, movieId);
  }
}
