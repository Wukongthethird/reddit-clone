import { Box, Link, Heading, Flex, Button, ChakraProvider } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import {useRouter} from  'next/router'


interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const router = useRouter();
  const [{ data, fetching }] = useMeQuery({
    //  can remove this after cookie  on creteurqlclient
    pause: isServer(),
  });
  let body = null;
  //lodaing data

  if (fetching) {
  }
  //user not loggin
  else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link color="white" mr={2}>
            Login
          </Link>
        </NextLink>
        <NextLink href="/register">
          <Link color="white" mr={2}>
            Register
          </Link>
        </NextLink>
      </>
    );
  } else {
    body = (
      <Flex>
             <NextLink href="/create-post">
          <Button>
          <Link mr={2}>createpost</Link>
          </Button>
        </NextLink>
        <Box>
          <Box mr={2}>{data.me.username}</Box>
          <Button
            variant="link"
            onClick={async () => {
              await logout();
              router.reload()
            }}
            isLoading={logoutFetching}
          >
            logout
          </Button>
        </Box>
      </Flex>
    );
  }

  return (
    <ChakraProvider>
      <Flex zIndex={1} position={"sticky"} top={0} bg="tan" p={4} align="center">
        <Flex flex={1} m='auto' maxW={800} align="center">
        <NextLink href="/">
          <Link>
            <Heading>Snoo</Heading>
          </Link>
        </NextLink>
        <Box ml={"auto"}>{body}</Box>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
};
