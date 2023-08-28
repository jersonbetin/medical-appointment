import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
// import Cookie from 'js-cookie';

import '@/styles/globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { useApollo } from '@/hooks/apollo';
import Wrapper from '@/layout/Wrapper';
import { config } from '@fortawesome/fontawesome-svg-core';
// import { useEffect } from 'react';
// import { TOKEN } from '@/utils/constants';
config.autoAddCss = false;

export default function App({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps);

  // useEffect(() => {
  //   const user = Cookie.get(TOKEN);
  //   if (!user) {
  //     Cookie.set(
  //       TOKEN,
  //       'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJwb3N0dWxhbnRlQGdtYWlsLmNvbSIsImlhdCI6MTY5MjkxNDkxNTg3MywiZXhwIjoxNjkyOTE1NTIwNjczfQ.HOCRhAo0oO0tYt4DzmloOucvlIQinALvvg2C6xCTVys',
  //     );
  //   }
  // }, []);

  return (
    <ApolloProvider client={client}>
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
    </ApolloProvider>
  );
}
