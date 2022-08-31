import { withUrqlClient } from "next-urql";
import { NavBar } from "../components/NavBar";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";
import { Layout } from "../components/Layout";
import NextLink from "next/link";
import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  others,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

const Index = () => {
  const [variables, setVariables] = useState({limit:15, cursor:null as null | string});
  const [{ data, fetching, ...other }] = usePostsQuery({
    variables,
  });
  console.log(fetching, other)
  if (!fetching && !data) {
    return <div> something failed</div>;
  }
  return (
    <Layout>
      <Flex align="center">
        <Heading>SNOO</Heading>
        <NextLink href="/create-post">
          <Link ml="auto">createpost</Link>
        </NextLink>
      </Flex>
      {!data && fetching ? (
        <div>loading...</div>
      ) : (
        <Stack spacing={8}>
          {data!.posts.posts.map((p) => (
            <div key={p.id}>
              <Box key={p.id} p={5} shadow="md" borderwidth="1px">
                <Heading fontSize="xl"> {p.title}</Heading>
                <Text > posted by {p.creator.username} </Text>
                <Text mt={4}> {p.textSnippet}</Text>{p.points}
              </Box>
            </div>
          ))}
        </Stack>
      )}
      {data && data.posts.hasMore ? (
        <Flex>
          <Button onClick={()=>{
            setVariables({
              limit: variables.limit,
              cursor: data.posts.posts[data.posts.posts.length-1].createdAt
            })
          }} isLoading={fetching} m="auto" my={8}>
            load more
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
