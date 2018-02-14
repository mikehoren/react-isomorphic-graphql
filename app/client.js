import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'node-fetch'
import { environment } from './lib'

// on the server each request needs it's own instance
// on the client we create only one
function getClient() {

  const cache = new InMemoryCache()

  const client = new ApolloClient({
    link: new HttpLink({
      uri: 'http://localhost:3000/api',
      fetch,
    }),
    ssrMode: true,
    cache: !environment.isServer() ? cache.restore(window.appData) : cache
  });

  return client

}

export { getClient }