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
@Entity('genre')
export class Genre extends BaseEntity {
  @Field((type) => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field((type) => Int)
  @Column()
  genreId: number;

  @Field((type) => Int)
  userId:number;

  @JoinColumn({name: "userId"})
  @ManyToOne(() => User, (user) => user.genres)
  user: User;
}
