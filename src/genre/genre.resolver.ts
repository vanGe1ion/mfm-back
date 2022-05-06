import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AddGenreDto } from './dto/add-genre.dto';
import { RemoveGenreDto } from './dto/remove-genre.dto';
import { Genre } from './genre.entity';
import { GenreService } from './genre.service';

@Resolver()
export class GenreResolver {
  constructor(private genreService: GenreService) {}

  @Mutation((returns) => Genre)
  async addGenre(
    @Args('addGenreDto', { type: () => AddGenreDto })
    addGenreDto: AddGenreDto,
  ): Promise<Genre> {
    return await this.genreService.addGenre(addGenreDto);
  }

  @Mutation((returns) => Number)
  async removeGenre(
    @Args('removeGenreDto', { type: () => RemoveGenreDto })
    removeGenreDto: RemoveGenreDto,
  ): Promise<number> {
    return await this.genreService.removeGenre(removeGenreDto);
  }
}
