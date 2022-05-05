import { Field, ID, ObjectType } from '@nestjs/graphql';
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
  @Field((type) => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true, nullable: false })
  login: string;

  @Field()
  @Column()
  password: string;

  @Field((type) => [Genre])
  @OneToMany(() => Genre, (genre) => genre.user, {
    cascade: true,
  })
  genres: Genre[];

  @Field((type) => [Movie])
  @OneToMany(() => Movie, (movie) => movie.user, {
    cascade: true,
  })
  movies: Movie[];
}
