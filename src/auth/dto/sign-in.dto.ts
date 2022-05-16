import { Field, InputType } from '@nestjs/graphql';

@InputType()
export default class SignInDto {
  @Field()
  login: string;

  @Field()
  password: string;
}
