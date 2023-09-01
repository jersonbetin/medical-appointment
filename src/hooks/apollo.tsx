import { IncomingMessage } from 'http';
import cookie from 'cookie';
import {
  ApolloClient,
  // Context,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { GetServerSidePropsContext } from 'next';
import { setContext } from '@apollo/client/link/context';
import merge from 'deepmerge';
import { isEqual } from 'lodash';
import { useMemo } from 'react';

import { NEXT_PUBLIC_GRAPHQL_URI, TOKEN } from '@/utils/constants';

export interface PageProps {
  props?: Record<string, any>;
}

export const APOLLO_STATE_PROPERTY_NAME = '__APOLLO_STATE__';
// export const COOKIES_TOKEN_NAME = 'jwt';

const getToken = (req?: IncomingMessage) => {
  const parseCookie = cookie.parse(
    req ? req.headers.cookie ?? '' : document?.cookie,
  );

  return parseCookie[TOKEN];
};

let apolloClient: ApolloClient<NormalizedCacheObject>;

const createApolloClient = (ctx?: GetServerSidePropsContext | null) => {
  const httpLink = new HttpLink({
    uri: NEXT_PUBLIC_GRAPHQL_URI,
    credentials: 'same-origin',
  });

  const authLink = setContext((_, { headers }) => {
    const token = getToken(ctx?.req);

    return {
      headers: { ...headers, authorization: token ? `Bearer ${token}` : '' },
    };
  });

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};

export const initialApollo = (
  initialState = null,
  ctx: GetServerSidePropsContext | null = null,
) => {
  const client = apolloClient ?? createApolloClient(ctx);

  if (initialState) {
    const existingCache = client.extract();
    const data = merge(initialState, existingCache, {
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s)),
        ),
      ],
    });

    client.cache.restore(data);
  }

  if (typeof window === 'undefined') {
    return client;
  }

  if (!apolloClient) {
    apolloClient = client;
  }

  return client;
};

export const addApolloState = (
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: PageProps,
): PageProps => {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROPERTY_NAME] = client.cache.extract();
  }

  return pageProps;
};

export function useApollo(pageProps: PageProps) {
  const state = pageProps?.props?.[APOLLO_STATE_PROPERTY_NAME];
  const store = useMemo(() => initialApollo(), [state]);

  return store;
}
