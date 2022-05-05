import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateGenreDto {
  @Field((type) => Int)
  genreId: number;

  @Field((type) => Int)
  userId: number;
}
