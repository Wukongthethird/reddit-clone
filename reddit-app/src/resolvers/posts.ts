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
import { MemoryCacheAdapter } from "@mikro-orm/core";
import { Users } from "../entities/Users";

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
  textSnippet(@Root() post: Post) {
    return post.text.slice(0, 50);
  }

  // @FieldResolver(() => Users)
  // creator(@Root() post: Post) {
  //   return Users.findOne(post.creatorId)
  // }

  @FieldResolver(() => Users)
  creator(@Root() post: Post, @Ctx() { userLoader }: MyContext) {
    const ret = userLoader.load(post.creatorId);
    return ret;
  }

  @FieldResolver(() => Int, { nullable: true })
  async voteStatus(
    @Root() post: Post,
    @Ctx() { upvoteLoader, req }: MyContext
  ) {
    if(!req.session.userId){
      return null
    }
    const upvote = await upvoteLoader.load({
      postId: post.id,
      userId: +req.session.userId,
    });
    return upvote? upvote.value : null;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async vote(
    @Arg("postId", () => Int) postId: number,
    @Arg("value", () => Int) value: number,
    @Ctx() { req }: MyContext
  ) {
    const isUpvote = value !== -1;
    const realValue = isUpvote ? 1 : -1;
    const { userId } = req.session as any;
    const upvote = await Upvote.findOne({ where: { postId, userId } });
    // user voted before and changing vote

    if (upvote && upvote.value !== realValue) {
      await getConnection().transaction(async (tm) => {
        await tm.query(
          `
      UPDATE upvote 
      SET value = $1
      WHERE "postId" = $2 AND "userId" = $3
    `,
          [realValue, postId, userId]
        );

        await tm.query(
          `
    UPDATE post
    SET points = points + $1
    WHERE id = $2;
    `,
          [2 * realValue, postId]
        );
      });
    } else if (!upvote) {
      // never voted
      await getConnection().transaction(async (tm) => {
        await tm.query(
          `
        INSERT into upvote ("userId" ,"postId", value)
        values ($1, $2, $3);
        `,
          [userId, postId, realValue]
        );
        await tm.query(
          `
        UPDATE post
        SET points = points + $1
        WHERE id = $2;
        `,
          [realValue, postId]
        );
      });
    }

    // await Upvote.insert({
    //   userId,
    //   postId,
    //   value: realValue,
    // })

    // INSERT into upvote ("userId" ,"postId", value)
    // values (${userId}, ${postId}, ${realValue})

    // await getConnection().query(
    //   `
    //   START TRANSACTION;

    //   INSERT into upvote ("userId" ,"postId", value)
    //   values (${userId}, ${postId}, ${realValue});

    //   UPDATE post
    //   SET points = points + ${realValue}
    //   WHERE id = ${postId};

    //   COMMIT
    // `
    // );

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

    return true;
  }

  @Query(() => PaginatedPosts)
  async posts(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null,
    @Ctx() { req }: MyContext
  ): Promise<PaginatedPosts> {
    const realLimit = Math.min(50, limit);
    const realLimitPlusOne = realLimit + 1;

    const replacements: any[] = [realLimitPlusOne];

    // if (req.session.userId) {
    //   replacements.push(req.session.userId);
    // }
    let cursorIdx = 3;
    if (cursor) {
      replacements.push(new Date(parseInt(cursor)));
      // cursorIdx = replacements.length;
    }
    // json_build_object('username' , u.username) creator
    const posts = await getConnection().query(
      `
      select p.* 
      from post p  
      ${cursor ? `Where p."createdAt" < $2` : " "}
      order by p."createdAt" DESC
      limit $1
    `,
      replacements
    );

    //   `
    //   select p.* ,
    //      ${
    //        req.session.userId
    //          ? '(select value from upvote where "userId" = $2 and "postId" = p.id)"voteStatus"'
    //          : 'null as "voteStatus"'
    //      }
    //   from post p
    //   ${cursor ? `Where p."createdAt" < $${cursorIdx}` : " "}
    //   order by p."createdAt" DESC
    //   limit $1
    // `,
    //   replacements
    // );
    // select p.* ,
    // json_build_object(
    //   'id', u.id,
    //   'username' , u.username,
    //   'email', u.email,
    //   'createAt', u."createAt",
    //   'updatedAt', u."updatedAt"
    //    ) creator,
    //    ${
    //      req.session.userId
    //        ? '(select value from upvote where "userId" = $2 and "postId" = p.id)"voteStatus"'
    //        : 'null as "voteStatus"'
    //    }
    // from post p
    // inner join public.users u on u.id = p."creatorId"
    // ${cursor ? `Where p."createdAt" < $${cursorIdx}` : " "}
    // order by p."createdAt" DESC
    // limit $1

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

  // @Query(() => Post, { nullable: true })
  // async post(@Arg("identifier", () => Int) id: number): Promise<Post | undefined> {
  //   console.log('HIHIHIHI')
  //   return await Post.findOne(id);

  // }

  @Query(() => Post)
  @UseMiddleware(isAuth)
  async post(
    @Arg("identifier", () => Int) id: number,
    @Ctx() { req }: MyContext
  ): Promise<Post | undefined> {
    const post = await Post.findOne(id);
    if (!post) {
      return undefined;
    }
    return post;
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
    @Arg("id", () => Int) id: number,
    @Arg("title") title: string,
    @Arg("text") text: string,
    @Ctx() { req }: MyContext
  ): Promise<Post | undefined> {
    const post = await Post.findOne(id);

    if (!post) {
      return undefined;
    }

    // const newPost = await Post.update({ id,creatorId:req?.session?.userId }, { title,text });

    // return newPost
    const result = await getConnection()
      .createQueryBuilder()
      .update(Post)
      .set({ title, text })
      .where('id=:id and "creatorId" = :creatorId', {
        id,
        creatorId: req.session.userId,
      })
      .returning("*")
      .execute();

    return result.raw[0];
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deletePost(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: MyContext
  ): Promise<Boolean> {
    const creatorId = req.session.userId;

    const post = await Post.findOne(id);
    if (!post) {
      return false;
    }
    if (post?.creatorId !== creatorId) {
      throw new Error("not authorized");
    }
    if (creatorId && id) {
      await Upvote.delete({ postId: id });
      await Post.delete({ id: +id, creatorId: +creatorId });
    }
    // await getConnection()
    // .createQueryBuilder()
    // .delete()
    // .from(Post)
    // .where("id = :id,  creatorId = :creatorId", { id: id, creatorId:creatorId })
    // .execute()

    return true;
  }
}
