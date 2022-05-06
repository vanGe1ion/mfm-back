import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserDto {
  @Field()
  private login: string;

  @Field()
  private password: string;
}
