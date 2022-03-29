import React from "react";
import { Form, Formik } from "formik";
import {
  Box,
  Button,
} from "@chakra-ui/react";
import { Wrapper } from "../components/Wrappers";
import { InputField } from "../components/InputField";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMaps } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";

interface registerProps {}

export const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [, register] = useRegisterMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "", email:"" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register({options:values});
          if (response.data?.register?.errors) {
            setErrors(toErrorMaps(response.data.register.errors));
          } else if (response.data?.register?.user) {
            //worked
            console.log(response.data?.register?.user);
            router.push("/");
          }
        }}
      >
        {(isSubmitting) => (
          <Form>
            <Box mt={4}>
              <InputField
                name="email"
                placeholder="email"
                label="email"
              />
            </Box>
            <Box mt={4}>
            <InputField
              name="username"
              placeholder="username"
              label="Username"
            />
            </Box>
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
            </Box>
            <Button mt={4} type="submit">
              register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Register);
