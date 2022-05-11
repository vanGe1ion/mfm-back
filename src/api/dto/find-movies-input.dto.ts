import { Field, Float, InputType, Int } from '@nestjs/graphql';

@InputType()
class Range {
  @Field((type) => Float, { nullable: true })
  gte?: number;

  @Field((type) => Float, { nullable: true })
  lte?: number;
}

@InputType()
export default class FindMoviesInputDto {
  @Field((type) => [Int], { nullable: true })
  withGenres?: number[];

  @Field((type) => Int, { nullable: true })
  primaryReleaseYear?: number;

  @Field((type) => Range, { nullable: true })
  voteAverage?: Range;

  @Field((type) => Int, { nullable: true })
  page?: number;
}
