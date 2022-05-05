import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export default class RemoveMovieDto {
  @Field((type) => Int)
  movieId: number;

  @Field((type) => Int)
  userId: number;
}
