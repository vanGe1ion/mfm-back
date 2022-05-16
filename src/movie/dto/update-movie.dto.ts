import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export default class UpdateMovieDto {
  @Field((type) => Int)
  movieId: number;

  @Field()
  isViewed: boolean;
}
