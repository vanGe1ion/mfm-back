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
  @Column({ unique: true })
  login: string;

  @Field()
  @Column()
  password: string;

  @Field((type) => [Genre], { nullable: true })
  @OneToMany(() => Genre, (genre) => genre.user)
  genres?: Genre[];

  @Field((type) => [Movie], { nullable: true })
  @OneToMany(() => Movie, (movie) => movie.user)
  movies?: Movie[];
}
