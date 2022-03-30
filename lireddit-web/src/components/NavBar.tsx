import { Box, Link, Flex, Button } from "@chakra-ui/react";
import react from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{fetching: logoutFetching}, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({
    pause:isServer()
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
        <Box>
          <Box mr={2}>{data.me.username}</Box>
          <Button
            variant="link"
            onClick={() => {
              logout();
              
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
    <Flex zIndex={1} position={"sticky"} top={0}  bg="tan" p={4}>
      <Box ml={"auto"}>{body}</Box>
    </Flex>
  );
};
