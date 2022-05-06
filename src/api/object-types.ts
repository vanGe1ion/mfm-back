import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ApiMovie {
  @Field((type) => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  originalTitle: string;

  @Field((type) => Int)
  releaseYear: number;

  @Field()
  overview: string;

  @Field()
  posterPath: string;

  @Field((type) => [Int])
  genreIds: number[];

  @Field((type) => Int)
  voteCount: number;

  @Field((type) => Float)
  voteAverage: number;
}

@ObjectType()
export class ApiGenre {
  @Field((type) => Int)
  id: number;

  @Field()
  name: string;
}

export interface genresAPIRsponseParams {
  genres: ApiGenre[];
}
