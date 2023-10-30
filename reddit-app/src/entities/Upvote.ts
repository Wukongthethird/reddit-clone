import { ObjectType, Field } from "type-graphql";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Post } from "./Post";
import { Users } from "./Users";

@ObjectType()
@Entity()
export class Upvote extends BaseEntity {
  @Field()
  @Column({ type: "int" })
  value: number;

  @Field()
  @PrimaryColumn()
  userId: number;

  @Field(() => Users)
  @ManyToOne(() => Users, (user) => user.upvote)
  user: Users;

  @Field()
  @PrimaryColumn()
  postId: number;

  @Field(() => Post)
  @ManyToOne(() => Post, (post) => post.upvote)
  post: Post;

  // @ManyToOne( ()=> Post, (post)=>post.upvote,{
  //   onDelete:"CASCADE",
  //   cascade:true
  // })
  // post:Post;
}
