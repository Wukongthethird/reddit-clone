import {
  ColorModeProvider, ThemeProvider
} from "@chakra-ui/react";
// import { createClient, Provider } from "urql";
import theme from "../theme";

// const client = createClient({
//   url: "http://localhost:4000/graphql",
//   fetchOptions: {
//     credentials: "include",
//   }
// });

function MyApp({ Component, pageProps }: any) {
  return (

      <ThemeProvider theme={theme}>
        <ColorModeProvider
          options={{
            useSystemColorMode: true,
          }}
        >
          <Component {...pageProps} />
        </ColorModeProvider>
      </ThemeProvider>
  );
}

export default MyApp;
