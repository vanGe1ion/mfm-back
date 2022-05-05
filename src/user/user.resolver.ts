import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
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
}
