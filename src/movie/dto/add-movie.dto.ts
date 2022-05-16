import { Field, Float, InputType, Int } from '@nestjs/graphql';

@InputType()
export default class AddMovieDto {
  @Field((type) => Int)
  movieId: number;

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

  @Field((type) => Int)
  voteCount: number;

  @Field((type) => Float)
  voteAverage: number;

  @Field((type) => [String])
  genres: string[];
}
