import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
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
  @Column({ nullable: false })
  movieId: number;

  @Field()
  @Column({ nullable: false })
  title: string;

  @Field()
  @Column({ nullable: false })
  originalTitle: string;

  @Field((type) => Int)
  @Column()
  releaseYear: number;

  @Field()
  @Column()
  overview: string;

  @Field()
  @Column()
  posterPath: string;

  @Field((type) => Int)
  @Column()
  voteCount: number;

  @Field((type) => Int)
  @Column()
  voteAverage: number;

  @Field((type) => [Int])
  @Column('int', { array: true })
  genreIds: number[];

  @Field({ defaultValue: false })
  @Column({ default: false })
  isViewed: boolean;

  @Field((type) => Int)
  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.movies)
  @JoinColumn({ name: 'userId' })
  @Field((type) => User)
  user: User;
}
