import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Genre } from 'src/genre/genre.entity';
import { Movie } from 'src/movie/movie.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver((of) => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query((returns) => User)
  async getUserById(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<User> {
    return await this.userService.getUserById(id);
  }

  @Mutation((returns) => User)
  async createUser(
    @Args('createUserDto', { type: () => CreateUserDto })
    createUserDto: CreateUserDto,
  ): Promise<User> {
    return await this.userService.createUser(createUserDto);
  }

  @ResolveField((returns) => [Genre])
  async genres(@Parent() user: User): Promise<Genre[]> {
    return await this.userService.getGenres(user.id);
  }

  @ResolveField((returns) => [Movie])
  async movies(@Parent() user: User): Promise<Movie[]> {
    return await this.userService.getMovies(user.id);
  }
}
