import { Box, Flex, Button, Link } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import router from "next/router";
import React, { useEffect } from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrappers";
import { useCreatePostMutation, useMeQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { toErrorMaps } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { Layout } from "../components/Layout";
import { useIsAuth } from "../utils/useIsAuth";

const CreatePost: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [, createPost] = useCreatePostMutation();
  useIsAuth()
  return (
    <Layout variant="small">
      <Formik
        initialValues={{ title: "", text: "" }}
        onSubmit={async (values) => {
          const { error } = await createPost({ input: values });
          if (!error) {
            router.push("/");
          }
        }}
      >
        {(isSubmitting) => (
          <Form>
            <InputField
              name="title"
              placeholder="title"
              label="title"
              textarea={false}
            />
            <Box mt={4}>
              <InputField
                name="text"
                placeholder="text..."
                label="body"
                textarea
              />
            </Box>
            <Button mt={4} type="submit" color="teal">
              create post
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(CreatePost);
