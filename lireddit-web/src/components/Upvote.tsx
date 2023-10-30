import { Box } from "@chakra-ui/react";
import { Flex, IconButton } from "@chakra-ui/core";
import React, { useState } from "react";
import { PostSnippetFragment, useVoteMutation } from "../generated/graphql";

interface UpvoteProps {
  post: PostSnippetFragment;
}

export const UpvoteSection: React.FC<UpvoteProps> = ({ post }) => {
  const [loadingState, setLoadingState] = useState<'upvote-loading' | 'downvote-loading' |'not-loading'>()
  const [ , vote] = useVoteMutation();
  return (
    <Box>
      <Flex direction="column" justifyItems="center" alignItems="center" mr={4}>
        <IconButton
          onClick={async() => {
            if (post.voteStatus === 1){
              return
            }
            setLoadingState('upvote-loading')
            await vote({ postId: post.id, value: 1 })
            setLoadingState('not-loading')
          }}
          // variantColor = {post.Status ===1 ? "green": undefined}
          // color = "green"
          isLoading={loadingState==='upvote-loading'}
          aria-label="upvote"
        />
        {post.points}
        <IconButton
          onClick={async() => {
            if (post.voteStatus === -1){
              return
            }
            setLoadingState('downvote-loading')
            await vote({ postId: post.id, value: -1 })
            setLoadingState('not-loading')
          }}
          isLoading={loadingState==='downvote-loading'}
          aria-label="downvote"
        />
      </Flex>
    </Box>
  );
};
