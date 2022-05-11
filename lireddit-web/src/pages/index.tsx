import { withUrqlClient } from "next-urql";
import { NavBar } from "../components/NavBar";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";
import { Layout } from "../components/Layout";
import NextLink from "next/link";
import { Box, Heading, Link, Stack, Text } from "@chakra-ui/react";

const Index = () => {
  const [{ data }] = usePostsQuery({
    variables: {
      limit: 10,
    },
  });

  return (
    <Layout>
      <NextLink href="/create-post">
        <Link>createpost</Link>
      </NextLink>
      {!data ? (
        <div>loading...</div>
      ) : (
        <Stack spacing={8}>
          {data.posts.map((p) => (
            <div key={p.id}>
            <div >{p.title}</div>
            <Box key={p.id} p={5} shadow="md" borderwidth = "1px">
              <Heading fontSize="xl"> {p.title}</Heading>
              <Text mt={4}> {p.textSnippet}</Text>
            </Box>
            </div>
          ))}
        </Stack>
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
