import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export default class UpdateMovieDto {
  @Field((type) => Int)
  movieId: number;

  @Field((type) => Int)
  userId: number;

  @Field()
  isViewed: boolean;
}
