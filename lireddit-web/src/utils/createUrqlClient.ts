import { CombinedError, dedupExchange, Exchange, fetchExchange } from "urql";
import { betterUpdateQuery } from "./betterUpdateQuery";
import { cacheExchange, Cache } from "@urql/exchange-graphcache";
import {
  DeletePostMutationVariables,
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
  RegisterMutation,
  VoteMutationVariables,
} from "../generated/graphql";
import { pipe, tap } from "wonka";
import Router from "next/router";
import gql from 'graphql-tag'

const errorExchange: Exchange =
  ({ forward }) =>
  (ops$) => {
    return pipe(
      forward(ops$),
      tap(({ error }) => {
        if (error?.message.includes("you must be logged in to create a post")) {
          Router.replace("/login");
        }
      })
    );
  };

import { stringifyVariables } from '@urql/core';
import { Resolver, Variables, NullArray } from '../types';
import { graphql } from "graphql";
import { isServer } from "./isServer";

export type MergeMode = 'before' | 'after';

export interface PaginationParams {
  offsetArgument?: string;
  limitArgument?: string;
  mergeMode?: MergeMode;
}

export const cursorPagination = (): Resolver => {
 
  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info;
    const allFields = cache.inspectFields(entityKey);
    const fieldInfos = allFields.filter(info => info.fieldName === fieldName);
    const size = fieldInfos.length;
    if (size === 0) {
      return undefined;
    }
    
    // allows for pagination check if there is data in the cache
    const fieldkey = `${fieldName}(${stringifyVariables(fieldArgs)})`
    const isItInTheCache = cache.resolve( entityKey ,fieldkey) 

    info.partial = !isItInTheCache;

    let hasMore = true;
    
    const results:string[] = [];
    fieldInfos.forEach((fi:any) =>{
      const key = cache.resolve(entityKey, fi.fieldKey) as string[];
      const data = cache.resolve(key, 'posts')
      const _hasMore = cache.resolve(key, 'hasMore')
      if(!_hasMore){
        hasMore = _hasMore as boolean
      }
      results.push(...data)
    
    })
    
    return {__typename: "PaginatedPosts",hasMore, posts:results}
    // const visited = new Set();
    // let result: NullArray<string> = [];
    // let prevOffset: number | null = null;

    // for (let i = 0; i < size; i++) {
    //   const { fieldKey, arguments: args } = fieldInfos[i];
    //   if (args === null || !compareArgs(fieldArgs, args)) {
    //     continue;
    //   }

    //   const links = cache.resolve(entityKey, fieldKey) as string[];
    //   const currentOffset = args[offsetArgument];

    //   if (
    //     links === null ||
    //     links.length === 0 ||
    //     typeof currentOffset !== 'number'
    //   ) {
    //     continue;
    //   }

    //   const tempResult: NullArray<string> = [];

    //   for (let j = 0; j < links.length; j++) {
    //     const link = links[j];
    //     if (visited.has(link)) continue;
    //     tempResult.push(link);
    //     visited.add(link);
    //   }

    //   if (
    //     (!prevOffset || currentOffset > prevOffset) ===
    //     (mergeMode === 'after')
    //   ) {
    //     result = [...result, ...tempResult];
    //   } else {
    //     result = [...tempResult, ...result];
    //   }

    //   prevOffset = currentOffset;
    // }

    // const hasCurrentPage = cache.resolve(entityKey, fieldName, fieldArgs);
    // if (hasCurrentPage) {
    //   return result;
    // } else if (!(info as any).store.schema) {
    //   return undefined;
    // } else {
    //   info.partial = true;
    //   return result;
    // }
  };
};
// const errorExchange: Exchange =
//   ({ forward }) =>
//   (ops$) => {
//     return pipe(
//       forward(ops$),
//       tap(({ error }) => {

        // if (error?.message.includes("not authenticated")) {
        //   console.log(error)
        //   // Router.replace("/login");
        // }
//       })
//     );
//   };

function invalidateAllPosts(cache:Cache){
  const allFields = cache.inspectFields('Query');
  const fieldInfos = allFields.filter((info)=> info.fieldName === 'posts')
  fieldInfos.forEach((fi)=>{
    cache.invalidate("Query","posts", fi.arguments || null );
  })
}

export const createUrqlClient = (ssrExhange: any, ctx: any) => {
  let cookie = ""
  if (isServer()){
    cookie = ctx?.req?.headers?.cookie;
  }
  return {
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include" as const,
    // headers: cookie
    // ? {
    //   cookie,
    // }: undefined,
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      keys:{
        PaginatedPosts: ()=>null
      },
      resolvers:{
        Query:{
          posts:cursorPagination(),
        }
      },
      updates: {
        Mutation: {
          deletePost:(_result, args, cache, info)=>{
            cache.invalidate({__typename:"Post", id:(args as DeletePostMutationVariables).id})
          },
          vote: (_result, args, cache, info) =>{
            const {postId, value} = args as VoteMutationVariables;
            const data = cache.readFragment(
              gql`
                fragment _ on Post{
                  id
                  points
                  voteStatus
                }
              `,
              {id: postId}
            );
            
            if (data){
              if (data?.voteStatus === value){
                return
              }
              const newPoints = (data?.points ) + (!data.voteStatus ? 1: 2) * value
           
              cache.writeFragment(gql`
                fragment __ on Post{
                  points
                  voteStatus
                }
              `,{id:postId, points: newPoints, voteStatus:value})

            }
          },
          createPost: (_result, args, cache, info) =>{
            invalidateAllPosts(cache)
          
          },
          logout: (_result, args, cache, info) => {
            betterUpdateQuery<LogoutMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              () => ({ me: null })
            );
          },

          login: (_result, args, cache, info) => {
            betterUpdateQuery<LoginMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.login.errors) {
                  return query;
                } else {
                  return {
                    me: result.login.user,
                  };
                }
              }
            );
            invalidateAllPosts(cache)
          },
          register: (_result: LoginMutation, args, cache, info) => {
            betterUpdateQuery<RegisterMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.register.errors) {
                  return query;
                } else {
                  return {
                    me: result.register.user,
                  };
                }
              }
            );
          },
        },
      },
    }),
    errorExchange,
    ssrExhange,
    fetchExchange,
  ],
}};
