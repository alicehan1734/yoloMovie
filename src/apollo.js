import { ApolloClient, InMemoryCache } from "@apollo/client";


const client = new ApolloClient({
  uri: "https://movie-api-graph-ql-meyi4.ondigitalocean.app/",
  cache: new InMemoryCache(),
  resolvers: {
    Movie: {
      isLiked: () => false,
    },
    Mutation: {
      toggleLikeMovie: (_, { id, isLiked }, { cache }) => {
        const myMovie = {
          __typename: 'Movie',
          id: `${id}`,
          isLiked: `${isLiked}`,
        };
        cache.modify({
          id: cache.identify(myMovie),
          fields: {
            isLiked(cachedName) {
              return !isLiked;
            },
          },
        });
      }
    },
  },
});

export default client;