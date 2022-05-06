import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class AddGenreDto {
  @Field((type) => Int)
  genreId: number;

  @Field((type) => Int)
  userId: number;
}
