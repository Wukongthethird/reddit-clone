// import { Entity, Property, PrimaryKey, DateType } from "@mikro-orm/core";
import { ObjectType, Field } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Post } from "./Post";
import { Upvote } from "./Upvote";

@ObjectType()
@Entity()
export class Users extends BaseEntity {
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column({ unique: true })
  username!: string;

  @Field(() => String)
  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;
  
  // @Field(() => Post)
  @OneToMany(() => Post, (post) => post.creator)
  posts: Post[];

  // @Field(() => Upvote)
  @OneToMany(() => Upvote, (upvote) => upvote.user)
  upvote: Upvote[];

  @Field(() => String)
  @CreateDateColumn()
  createAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
