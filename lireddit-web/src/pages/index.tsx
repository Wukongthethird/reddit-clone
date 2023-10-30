import {
  Box,
  Button, ChakraProvider, Flex,
  Heading,
  Link, Stack,
  Text
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import { useState } from "react";
import { EditDeletePostButton } from "../components/EditDeletePostButton";
import { Layout } from "../components/Layout";
import { UpvoteSection } from "../components/Upvote";
import { useMeQuery, usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 15,
    cursor: null as null | string,
  });
  const [{ data, fetching, ...other }] = usePostsQuery({
    variables,
  });

  

  if (!fetching && !data) {
    return <div> something failed</div>;
  }
  return (
    <ChakraProvider>
      <Layout>
        {!data && fetching ? (
          <div>loading...</div>
        ) : (
          <Stack spacing={8}>
            {data!.posts.posts.map((p) =>
              !p ? null : (
                <div key={p.id}>
                  <Flex key={p.id} p={5} shadow="md" borderwidth="1px">
                    <UpvoteSection post={p} />
                    <Box flex={1}>
                      <NextLink href={`/posts/${p.id}`} as={`/post/${p.id}`}>
                        <Link>
                          <Heading fontSize="xl"> {p.title}</Heading>
                        </Link>
                      </NextLink>
                      <Text> posted by {p.creator.username} </Text>
                      <Text mt={4}> {p.textSnippet}</Text>

                        <Box ml="auto">
                         <EditDeletePostButton id={p.id} creatorId={p.creator.id}/>
                        </Box>
                      
                    </Box>
                  </Flex>
                </div>
              )
            )}
          </Stack>
        )}
        {data && data.posts.hasMore ? (
          <Flex>
            <Button
              onClick={() => {
                setVariables({
                  limit: variables.limit,
                  cursor:
                    data.posts.posts[data.posts.posts.length - 1].createdAt,
                });
              }}
              isLoading={fetching}
              m="auto"
              my={8}
            >
              load more
            </Button>
          </Flex>
        ) : null}
      </Layout>
    </ChakraProvider>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Index);
