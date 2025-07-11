import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://rate-repository-api.fly.dev/graphql',
  cache: new InMemoryCache(),
});

export default client;
