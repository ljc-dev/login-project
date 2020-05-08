import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { ApolloLink } from 'apollo-link'
import { onError } from 'apollo-link-error'
import { setContext } from 'apollo-link-context'
import { TokenRefreshLink } from 'apollo-link-token-refresh'
import fetch from 'isomorphic-unfetch'
import { getAccessToken, setAccessToken } from './lib/accessTokenFcts'
import jwtDecode from 'jwt-decode';

export default function createApolloClient(initialState, ctx, serverAccessToken = null) {
  // The `ctx` (NextPageContext) will only be present on the server.
  // use it to extract auth headers (ctx.req) or similar.

  const httpLink = new HttpLink({
    uri: 'http://localhost:4000/graphql', // Server URL (must be absolute)
    credentials: 'include', // Additional fetch() options like `credentials` or `headers`
    fetch,
  })

  const refreshLink = new TokenRefreshLink({
    accessTokenField: "accessToken",
    isTokenValidOrUndefined: () => {
      const token = getAccessToken()
      if (!token) return true
      try {
        const { exp } = jwtDecode(token)
        return !(Date.now() >= exp * 1000)
      } catch {
        return false
      }
    },
    fetchAccessToken: () => fetch("http://localhost:4000/refresh-token", {
      method: "POST",
      credentials: "include"
    }),
    handleFetch: accessToken => setAccessToken(accessToken),
    handleError: (err) => console.log("error token refresh", err.message)
  })

  const authLink = setContext((req, { headers }) => {
    const token = typeof window === "undefined" ? serverAccessToken : getAccessToken()
    return {
      headers: {
        ...headers,
        authorization: token ? `bearer ${token}` : ""
      }
    }
  })

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    console.log("err", graphQLErrors, networkError)
  })

  return new ApolloClient({
    ssrMode: Boolean(ctx),
    link: ApolloLink.from([refreshLink, authLink, errorLink, httpLink]),
    cache: new InMemoryCache().restore(initialState),
  })
}