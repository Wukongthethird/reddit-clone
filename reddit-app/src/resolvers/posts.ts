import { isAuth } from "../middleware/isAuth";
import { MyContext } from "src/types/MyContext";
import {
  Resolver,
  Query,
  Ctx,
  Arg,
  Int,
  Mutation,
  InputType,
  Field,
  UseMiddleware,
  FieldResolver,
  Root,
  ObjectType,
  Info,
} from "type-graphql";
import { Post } from "../entities/Post";
import { getConnection } from "typeorm";
import { Upvote } from "../entities/Upvote";

@InputType()
class PostInput {
  @Field()
  title: string;

  @Field()
  text: string;
}

@ObjectType()
class PaginatedPosts {
  @Field(() => [Post])
  posts: Post[];
  @Field()
  hasMore: boolean;
}

@Resolver(Post)
export class PostResolver {
  @FieldResolver(() => String)
  textSnippet(@Root() root: Post) {
    return root.text.slice(0, 50);
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async vote(
    @Arg('postId', ()=> Int) postId:number,
    @Arg('value', ()=> Int) value:number,
    @Ctx() {req}: MyContext
    ){
    const isUpvote = value !== -1;
    const realValue = isUpvote? 1:-1
    const {userId} = req.session as any
    

    // await Upvote.insert({
    //   userId, 
    //   postId,
    //   value: realValue,
    // })

    // INSERT into upvote ("userId" ,"postId", value)
    // values (${userId}, ${postId}, ${realValue})

    await getConnection().query(
      `
      START TRANSACTION;

      INSERT into upvote ("userId" ,"postId", value)
      values (${userId}, ${postId}, ${realValue});

      UPDATE post
      SET points = points + ${realValue}
      WHERE id = ${postId};

      COMMIT
    `)

    //kinda works

    // try {
    //   await getConnection()
    //     .createQueryBuilder()
    //     .insert()
    //     .into(Upvote)
    //     .values({
    //       userId,
    //       postId,
    //       value:realValue
    //     }).returning("*")
    //     .execute();
         
    //     await getConnection()
    //     .createQueryBuilder()
    //     .update(
    //       Post
    //     ).set( { points: ()=>`points + ${realValue}`})
    //     .where( { id: postId })
    //     .returning("*")
    //     .execute();

   
   
    // } catch (err) {
    //   console.log(err)
    //   }
    

    return true
  }


  @Query(() => PaginatedPosts)
  async posts(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null,
   ): Promise<PaginatedPosts> {
    const realLimit = Math.min(50, limit);
    const realLimitPlusOne = realLimit + 1;

    const replacements: any[] = [realLimitPlusOne];

    if (cursor) {
      replacements.push(new Date(parseInt(cursor)));
    }
    // json_build_object('username' , u.username) creator
    const posts = await getConnection().query(
      `
      select p.* ,
      json_build_object( 
        'id', u.id, 
        'username' , u.username, 
        'email', u.email,
        'createAt', u."createAt",
        'updatedAt', u."updatedAt"
         ) creator
      from post p  
      inner join public.users u on u.id = p."creatorId"
      ${cursor ? `Where p."createdAt" < $2` : " "}
      order by p."createdAt" DESC
      limit $1
    `,
      replacements
    );

    // const qb = getConnection()
    //   .getRepository(Post)
    //   .createQueryBuilder("p")
    //   .innerJoinAndSelect("p.creator", "u", 'u.id = p."creatorId"')
    //   .orderBy('p."createdAt"', "DESC")
    //   .take(realLimitPlusOne);

    // if (cursor) {
    //   qb.where('p."createdAt" < :cursor', {
    //     cursor: new Date(parseInt(cursor)),
    //   });
    // }

    // const posts = await qb.getMany();

    return {
      posts: posts.slice(0, realLimit),
      hasMore: posts.length === realLimitPlusOne,
    };

    // return Post.find();
  }

  @Query(() => Post, { nullable: true })
  post(@Arg("identifier") id: number): Promise<Post | undefined> {
    return Post.findOne(id);
  }

  @Mutation(() => Post)
  @UseMiddleware(isAuth)
  async createPost(
    @Arg("input") input: PostInput,
    @Ctx() { req }: MyContext
  ): Promise<Post> {
    return Post.create({
      ...input,
      creatorId: +(req.session.userId as any),
    }).save();
  }

  @Mutation(() => Post)
  @UseMiddleware(isAuth)
  async updatePost(
    @Arg("id") id: number,
    @Arg("title", () => String, { nullable: true }) title: string
  ): Promise<Post | undefined> {
    const post = await Post.findOne(id);

    if (!post) {
      return undefined;
    }
    if (typeof title !== "undefined") {
      await Post.update({ id }, { title });
    }
    return post;
  }

  @Mutation(() => Boolean)
  async deletePost(@Arg("id") id: number): Promise<Boolean> {
    await Post.delete(id);
    return true;
  }
}
