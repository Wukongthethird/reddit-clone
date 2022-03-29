import { Box, Button } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { withUrqlClient } from 'next-urql';

import React, { useState } from 'react'
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrappers';
import { createUrqlClient } from '../utils/createUrqlClient';


import { useForgotPasswordMutation } from '../generated/graphql';

const ForgotPassword: React.FC<{}> = ({}) =>{
  const [complete, setComplete] = useState(false);
  const [ , forgotPassword ] = useForgotPasswordMutation();
  return(
    <> <Wrapper variant="small">  
    <Formik
      initialValues={{ email: "" }}
      onSubmit={async (values, { setErrors }) => {
        const response = await forgotPassword(values);
        setComplete(true);
        
      }}
    >
      {(isSubmitting) => complete? <Box>if an account with an email that email exist, check email please, uwu</Box> : (
        <Form>
          <InputField
            name="email"
            placeholder="email"
            label="email"
            type = "email"
          />
          <Button mt={4} type="submit">
            Send
          </Button>
        </Form>
      )}
    </Formik>
  </Wrapper> </>
  )
}

export default withUrqlClient(createUrqlClient)(ForgotPassword);