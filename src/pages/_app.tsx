import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { config } from '@fortawesome/fontawesome-svg-core';

import '@/styles/globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { useApollo } from '@/hooks/apollo';
import Wrapper from '@/layout/Wrapper';
config.autoAddCss = false;

export default function App({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps);

  return (
    <ApolloProvider client={client}>
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
    </ApolloProvider>
  );
}
