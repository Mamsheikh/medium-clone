import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

import Layout from '../components/Layout';
import { ApolloProvider } from '@apollo/client';
import apolloClient from '../lib/apollo';
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <SessionProvider session={pageProps.session}>
        <Layout>
          <Toaster />
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </ApolloProvider>
  );
}

export default MyApp;
