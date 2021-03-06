import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Genre } from 'src/genre/genre.entity';
import { Movie } from 'src/movie/movie.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity('user')
export class User extends BaseEntity {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column('varchar', { unique: true })
  login: string;

  @Field()
  @Column('varchar')
  password: string;

  @Field((type) => [Genre], { nullable: true })
  @OneToMany(() => Genre, (genre) => genre.user)
  genres?: Genre[];

  @Field((type) => [Movie], { nullable: true })
  @OneToMany(() => Movie, (movie) => movie.user)
  movies?: Movie[];
}
