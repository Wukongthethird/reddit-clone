// import { EntityManager, Connection, IDatabaseDriver } from "@mikro-orm/core";
import { Request, Response } from "express";
import { Session, SessionData } from "express-session";
import {Redis} from 'ioredis'
import { createUserLoader } from "src/utils/createUserLoader";
import { createUpvoteLoader } from "src/utils/createUpvoteLoader";
interface MySession extends Session {
  userId?: string | number;
}

// interface MySessionData extends SessionData{
//   userId?: string|number
// }

export type MyContext = {
  req: Request & { session: MySession };
  res: Response;
  redis: Redis;
  userLoader: ReturnType<typeof createUserLoader>
  upvoteLoader: ReturnType<typeof createUpvoteLoader>
};
