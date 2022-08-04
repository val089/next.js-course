import { InferGetStaticPropsType } from 'next';
import { serialize } from 'next-mdx-remote/serialize';
import { ProductDetails } from '../../components/Product';
import Link from 'next/link';
import { apolloClient } from '../../graphql/apolloClient';
import {
  GetProductDetailsBySlugDocument,
  GetProductDetailsBySlugQuery,
  GetProductDetailsBySlugQueryVariables,
  GetProductsSlugDocument,
  GetProductsSlugQuery,
} from '../../generated/graphql';

export type InferGetStaticPaths<T> = T extends () => Promise<{
  paths: Array<{ params: infer R }>;
}>
  ? { params?: R }
  : never;

const ProductId = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!data) {
    return <div>Coś poszło nie tak...</div>;
  }

  return (
    <div>
      <Link href="/">Wróć</Link>
      <h1>PRODUKTY</h1>
      <ProductDetails
        data={{
          id: data.slug,
          title: data.name,
          thumbnailUrl: data.images[0].url,
          thumbnailAlt: data.name,
          description: data.description,
          longDescription: data.longDescription,
          rating: 5,
        }}
      />
    </div>
  );
};

export default ProductId;

export const getStaticPaths = async () => {
  const { data } = await apolloClient.query<GetProductsSlugQuery>({
    query: GetProductsSlugDocument,
  });

  return {
    paths: data.products.map((product) => {
      return {
        params: {
          productId: product.slug,
        },
      };
    }),
    fallback: false,
  };
};

export const getStaticProps = async ({
  params,
}: InferGetStaticPaths<typeof getStaticPaths>) => {
  if (!params?.productId) {
    return {
      props: {},
      notFound: true,
    };
  }

  const { data } = await apolloClient.query<
    GetProductDetailsBySlugQuery,
    GetProductDetailsBySlugQueryVariables
  >({
    variables: { slug: params.productId },
    query: GetProductDetailsBySlugDocument,
  });

  if (!data.product) {
    return {
      props: {},
      notFound: true,
    };
  }

  return {
    props: {
      data: {
        ...data.product,
        longDescription: await serialize(data.product.description), //description też jest jako Markdown
      },
    },
  };
};
