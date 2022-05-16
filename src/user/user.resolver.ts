import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import CurrentUserDto from 'src/auth/dto/current-user.dto';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { Public } from 'src/decorators/public.decorator';
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
    @CurrentUser() user: CurrentUserDto
  ): Promise<User> {
    return await this.userService.getUserById(user.id);
  }

  @Public()
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