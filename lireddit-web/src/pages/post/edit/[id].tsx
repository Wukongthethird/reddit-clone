import { Box, Flex, Button, Link } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";

import React from "react";
import { InputField } from "../../../components/InputField";

import {
  usePostQuery,
  useUpdatePostMutation,
} from "../../../generated/graphql";
import { createUrqlClient } from "../../../utils/createUrqlClient";

import { useRouter } from "next/router";
import { Layout } from "../../../components/Layout";

import { useGetIntid } from "../../../utils/useGetIntid";

const EditPost = ({}) => {
  const router = useRouter();
  const intId = useGetIntid();
  const [{ data, error, fetching }] = usePostQuery({
    pause: intId === -1,
    variables: {
      identifier: intId,
    },
  });
  const [, updatePost] = useUpdatePostMutation();
  if (fetching) {
    return <div>loading...</div>;
  }
  if (!data?.post) {
    return (
      <Layout>
        <Box>could not find post</Box>
      </Layout>
    );
  }

  return (
    <Layout variant="small">
      <Formik
        initialValues={{ title: data.post.title, text: data.post.text }}
        onSubmit={async (values) => {
          updatePost({ id: intId, ...values });
          router.back();
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
              update post
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(EditPost);
