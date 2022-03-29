import { Box, Button, Flex, Link } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import { InputField } from "../../components/InputField";
import { Wrapper } from "../../components/Wrappers";
import { useRouter } from "next/router";
import { useChangePasswordMutation } from "../../generated/graphql";
import { toErrorMaps } from "../../utils/toErrorMap";
import { useState } from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import NextLink from 'next/link'

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  const [, changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState('')
  const router = useRouter();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ newPassword: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await changePassword({
            newPassword: values.newPassword,
            token,
          });
          if (response.data?.changePassword?.errors) {
            const errorMap = toErrorMaps(response.data.changePassword.errors)
            if( 'token' in errorMap){
              setTokenError(errorMap.token);
            }
            setErrors(errorMap);
          } else if (response.data?.changePassword?.user) {
            //worked
            console.log(response.data?.changePassword?.user);
            router.push("/");
          }
        }}
      >
        {(isSubmitting) => (
          <Form>
            <InputField
              name="newPassword"
              placeholder="new password"
              label="New password"
              type="password"
            />
           {tokenError?
           <Flex>
           <Box>
            <Box mr={2} color = 'red'> {tokenError}</Box>
            <NextLink href='/forgot-password'>
              <Link>
                Click here for new Token
              </Link>
            </NextLink>
            </Box>
            </Flex>
            :null }
            <Button mt={4} type="submit">
              change password
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

ChangePassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  };
};

export default withUrqlClient(createUrqlClient, {ssr:false})(ChangePassword);
