import React, { ReactElement, ReactNode } from "react";
import { Box, ChakraProvider } from "@chakra-ui/react";

export type WrapperVariant = "small"| "regular"


interface WrapperProps {
  variant?: WrapperVariant
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  variant = "regular",
}) => {
  //children in brackets
  return (
    <ChakraProvider>
    <Box
      mt={8}
      mx="auto"
      maxW={variant === "regular" ? "800px" : "400px"}
      w="100%"
    >
     {children}{" "}
    </Box>
    </ChakraProvider>
  );
};
