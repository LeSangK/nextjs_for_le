import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'http://0.0.0.0:8000/graphql', // Replace with your API endpoint
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
