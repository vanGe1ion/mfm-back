import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class AccessTokenDto {
  @Field()
  access_token: string;
}
