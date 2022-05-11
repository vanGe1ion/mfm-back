import { Field, Int, ObjectType } from '@nestjs/graphql';
import ApiMovie from './object-movie.dto';

@ObjectType()
export default class FindMoviesOutputDto {
  @Field((type) => [ApiMovie], { name: 'movies' })
  result: ApiMovie[];

  @Field((type) => Int)
  page: number;

  @Field((type) => Int, { name: 'totalResults' })
  total_results: number;

  @Field((type) => Int, { name: 'totalPages' })
  total_pages: number;
}
