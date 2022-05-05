import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateGenreDto } from './dto/create-genre.dto';
import { RemoveGenreDto } from './dto/remove-genre.dto';
import { Genre } from './genre.entity';
import { GenreService } from './genre.service';

@Resolver()
export class GenreResolver {
  constructor(private genreService: GenreService) {}

  @Mutation((returns) => Genre)
  async createGenre(
    @Args('createGenreDto', { type: () => CreateGenreDto })
    createGenreDto: CreateGenreDto,
  ): Promise<Genre> {
    return await this.genreService.createGenre(createGenreDto);
  }

  @Mutation((returns) => Number)
  async removeGenre(
    @Args('removeGenreDto', { type: () => RemoveGenreDto })
    removeGenreDto: RemoveGenreDto,
  ): Promise<number> {
    return await this.genreService.removeGenre(removeGenreDto);
  }
}
