import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import CurrentUserDto from 'src/auth/dto/current-user.dto';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { Genre } from './genre.entity';
import { GenreService } from './genre.service';

@Resolver()
export class GenreResolver {
  constructor(private genreService: GenreService) {}

  @Mutation((returns) => Genre)
  async addGenre(
    @CurrentUser() user: CurrentUserDto,
    @Args('genreId', { type: () => Int })
    genreId: number,
  ): Promise<Genre> {
    return await this.genreService.addGenre(user.id, genreId);
  }

  @Mutation((returns) => Number)
  async removeGenre(
    @CurrentUser() user: CurrentUserDto,
    @Args('genreId', { type: () => Int })
    genreId: number,
  ): Promise<number> {
    return await this.genreService.removeGenre(user.id, genreId);
  }
}
