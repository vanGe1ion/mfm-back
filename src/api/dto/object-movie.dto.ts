import { Field, Int, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class ApiMovie {
  @Field((type) => Int)
  movieId: number;

  @Field()
  title: string;

  @Field()
  originalTitle: string;

  @Field((type) => Int, { nullable: true })
  releaseYear: number;

  @Field()
  overview: string;

  @Field()
  posterPath: string;

  @Field((type) => [Int])
  genreIds: number[];

  @Field((type) => Int, { nullable: true })
  voteCount: number;

  @Field((type) => Float, { nullable: true })
  voteAverage: number;
}
