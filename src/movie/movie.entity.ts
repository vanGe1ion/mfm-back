import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity('movie')
export class Movie extends BaseEntity {
  @Field((type) => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field((type) => Int)
  @Column('int')
  movieId: number;

  @Field()
  @Column('varchar')
  title: string;

  @Field()
  @Column('varchar')
  originalTitle: string;

  @Field((type) => Int)
  @Column('int')
  releaseYear: number;

  @Field()
  @Column('varchar')
  overview: string;

  @Field()
  @Column('varchar')
  posterPath: string;

  @Field((type) => Int)
  @Column('int')
  voteCount: number;

  @Field((type) => Float)
  @Column('float')
  voteAverage: number;

  @Field((type) => [String], { defaultValue: [] })
  @Column('varchar', { array: true, default: [] })
  genres: string[];

  @Field({ defaultValue: false })
  @Column('bool', { default: false })
  isViewed: boolean;

  @Field((type) => Int)
  @Column('int')
  userId: number;

  @Field((type) => User)
  @ManyToOne(() => User, (user) => user.movies)
  @JoinColumn({ name: 'userId' })
  user: User;
}
