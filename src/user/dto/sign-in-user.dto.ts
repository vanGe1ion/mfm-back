import { Field, InputType } from '@nestjs/graphql';

@InputType()
export default class SignInUserDto {
  @Field()
  login: string;

  @Field()
  password: string;
}
