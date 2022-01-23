import { Auth0Provider } from '@auth0/auth0-react';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Auth0Provider
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || ''}
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN || ''}
      redirectUri={process.env.NEXT_PUBLIC_BASE_URL || ''}
    >
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </Auth0Provider>
  );
}

export default MyApp;
