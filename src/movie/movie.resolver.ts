import { Args, Mutation, Resolver } from '@nestjs/graphql';
import AddMovieDto from './dto/add-movie.dto';
import RemoveMovieDto from './dto/remove-movie.dto';
import UpdateMovieDto from './dto/update-movie.dto';
import { Movie } from './movie.entity';
import { MovieService } from './movie.service';

@Resolver()
export class MovieResolver {
  constructor(private movieService: MovieService) {}

  @Mutation((returns) => Movie)
  async addMovie(
    @Args('addMovieDto', { type: () => AddMovieDto })
    addMovieDto: AddMovieDto,
  ): Promise<Movie> {
    return await this.movieService.addMovie(addMovieDto);
  }

  @Mutation((returns) => Movie)
  async updateMovie(
    @Args('updateMovieDto', { type: () => UpdateMovieDto })
    updateMovieDto: UpdateMovieDto,
  ): Promise<Movie> {
    return await this.movieService.updateMovie(updateMovieDto);
  }

  @Mutation((returns) => Number)
  async removeMovie(
    @Args('removeMovieDto', { type: () => RemoveMovieDto })
    removeMovieDto: RemoveMovieDto,
  ): Promise<number> {
    return await this.movieService.removeMovie(removeMovieDto);
  }
}
