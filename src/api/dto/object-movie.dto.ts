import { Field, Int, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class ApiMovie {
  @Field((type) => Int, { name: 'movieId' })
  id: number;

  @Field()
  title: string;

  @Field({ name: 'originalTitle' })
  original_title: string;

  @Field((type) => Int, { nullable: true, name: 'releaseYear' })
  release_year: number;

  @Field()
  overview: string;

  @Field({ name: 'posterPath' })
  poster_path: string;

  @Field((type) => [Int], { name: 'genreIds' })
  genre_ids: number[];

  @Field((type) => Int, { name: 'voteCount' })
  vote_count: number;

  @Field((type) => Float, { name: 'voteAverage' })
  vote_average: number;

  @Field((type) => [String], { nullable: true })
  genres?: string[];

  @Field({ name: 'isFavourite', nullable: true })
  is_favourite?: boolean;
}
