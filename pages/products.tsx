import { InferGetStaticPropsType } from 'next';
import { ProductListItem } from '../components/Product';
import {
  GetProductsListDocument,
  GetProductsListQuery,
} from '../generated/graphql';
import { apolloClient } from '../graphql/apolloClient';

const ProductsPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {data.products.map((product) => (
        <li key={product.slug} className="shadow-xl border-2">
          <ProductListItem
            data={{
              id: product.slug,
              title: product.name,
              thumbnailUrl: product.images[0].url,
              thumbnailAlt: product.name,
            }}
          />
        </li>
      ))}
    </ul>
  );
};

export const getStaticProps = async () => {
  // typujemy dane za pomocą generyka GetProductsListResponse, ale nie jest nam to potrzebne ponieważ dane są już otypowane na serwerze, nie ma sensu tego powtarzać, ale to tym czasowo:P
  //pobieramy statycznie dane z GraphCMSa
  const { data } = await apolloClient.query<GetProductsListQuery>({
    query: GetProductsListDocument,
  });

  const inneData = {};

  return {
    props: {
      inneData,
      data,
    },
  };
};

export default ProductsPage;
