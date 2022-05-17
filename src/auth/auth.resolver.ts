import { Args, Query, Resolver } from '@nestjs/graphql';
import { Public } from 'src/decorators/public.decorator';
import { AuthService } from './auth.service';
import AccessTokenDto from './dto/access-token.dto';
import SignInDto from './dto/sign-in.dto';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Public()
  @Query((returns) => AccessTokenDto)
  async login(
    @Args('signInDto', { type: () => SignInDto }) signInDto: SignInDto,
  ) {
    return await this.authService.login(signInDto);
  }
}
