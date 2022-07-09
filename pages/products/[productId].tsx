import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
// import { useRouter } from 'next/router';
import { StoreApiResponse } from '../products';
import { ProductDetails } from '../../components/Product';
import Link from 'next/link';

// typ pomocniczy
export type InferGetStaticPaths<T> = T extends () => Promise<{
  paths: Array<{ params: infer R }>;
}>
  ? { params?: R }
  : never;

const ProductId = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  //const router = useRouter(); // router używany jest po stronie klienta
  //   return <div>{router.query.productId}</div>;

  if (!data) {
    return <div>Coś poszło nie tak...</div>;
  }

  return (
    <div>
      <Link href="/">Wróć</Link>
      <ProductDetails
        data={{
          id: data.id,
          title: data.title,
          thumbnailUrl: data.image,
          thumbnailAlt: data.title,
          description: data.description,
          rating: data.rating.rate,
        }}
      />
    </div>
  );
};

export default ProductId;

// żeby dynamicznie były przekazywane dane do tej strony musieliśmy dać nazwę pliku w []

export const getStaticPaths = async () => {
  // ograniczamy liczbę ścieżek za pomocą tej metody, żeby serwer nie generował ich nieskończenie wiele

  const res = await fetch(`https://fakestoreapi.com/products/`);
  const data: StoreApiResponse[] = await res.json();
  return {
    paths: data.map((product) => {
      return {
        params: {
          productId: product.id.toString(), //generujemy dostępne id dla ścieżek
        },
      };
    }),
    fallback: false,
  };
};

// aby statycznie pobrać id korzystamy z getStaticProps i dajemy typ GetStaticPropsContext
export const getStaticProps = async ({
  params,
}: InferGetStaticPaths<typeof getStaticPaths>) => {
  if (!params?.productId) {
    return {
      props: {},
      notFound: true, // oświadczamy, że taka strona nie została znaleziona
    };
  }

  //params może być undefined, więc sprawdzamy czy istnieje
  const res = await fetch(
    `https://fakestoreapi.com/products/${params.productId}`
  );
  const data: StoreApiResponse | null = await res.json(); //faker może zwrócić też null

  const inneData = {};

  return {
    props: {
      inneData,
      data,
    },
  };
};
