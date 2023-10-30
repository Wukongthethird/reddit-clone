import { Box, Heading, withDefaultProps } from "@chakra-ui/react";
import React from "react";
import {createUrqlClient} from '../../utils/createUrqlClient'
  import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { usePostQuery } from "../../generated/graphql";
import {Layout} from '../../components/Layout' 
import { useGetPostFromUrl } from "../../utils/useGetPostFromUrl";
import { EditDeletePostButton } from "../../components/EditDeletePostButton";


export const Post = ({}) =>{
  const [{data, error, fetching}] = useGetPostFromUrl()

  if(fetching){
    return(
      <Layout>
        <div>loading...</div>
      </Layout>

    )
  }
  if(!data?.post){
    return <Layout>
      <Box>
        could not find post
      </Box>
    </Layout>
  }

  return (
    <Layout>
      <Heading mb={4}>{data?.post?.title}</Heading>
      <Box ml={4}> 
      {data?.post?.text}
      <EditDeletePostButton id={data.post.id} creatorId={data.post.creator.id}/>
      </Box>
    </Layout>

  );

}

export default withUrqlClient(createUrqlClient, {ssr: false})(Post);