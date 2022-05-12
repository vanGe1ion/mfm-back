import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class ApiGenre {
  @Field((type) => Int)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  isFavourite?: boolean;
}
