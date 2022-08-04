import { ApolloClient, InMemoryCache } from '@apollo/client';

// uri powinno być w zmiennych środowiskowych

export const apolloClient = new ApolloClient({
  uri: 'https://api-eu-central-1.hygraph.com/v2/cl698p3z4diqt01t50leheqya/master',
  cache: new InMemoryCache(),
});

// queries

// query getProduct{
//   products(where:{slug: "koszulka-z-krotkim-rekawem"}) {
//     id
//     slug
//     title
//     price
//     thumbnail {
//       url
//       height
//       width
//     }
//   }
// }
