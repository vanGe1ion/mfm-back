import { Field, Int, ObjectType } from '@nestjs/graphql';
import ApiMovie from './object-movie.dto';

@ObjectType()
export default class FindMoviesOutputDto {
  @Field((type) => [ApiMovie])
  movies: ApiMovie[];

  @Field((type) => Int)
  page: number;

  @Field((type) => Int)
  totalResults: number;

  @Field((type) => Int)
  totalPages: number;
}
