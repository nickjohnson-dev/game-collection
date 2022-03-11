import { UserProvider } from '@auth0/nextjs-auth0';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const theme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: 'gray.100',
        overflowX: 'hidden',
        overflowY: 'auto',
        scrollbarGutter: 'stable',
      },
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
