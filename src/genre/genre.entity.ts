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
  @Column('int')
  genreId: number;

  @Field((type) => Int)
  @Column('int')
  userId: number;

  @Field((type) => User)
  @ManyToOne(() => User, (user) => user.genres)
  @JoinColumn({ name: 'userId' })
  user: User;
}
