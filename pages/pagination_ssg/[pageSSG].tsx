import { InferGetStaticPropsType } from 'next';
import { StoreApiResponse } from '../products';
import Link from 'next/link';

export type InferGetStaticPaths<T> = T extends () => Promise<{
  paths: Array<{ params: infer R }>;
}>
  ? { params?: R }
  : never;

const ProductsSSGPagePagination = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!data) {
    return <div>Coś poszło nie tak...</div>;
  }

  const indicators = new Array(10).fill(0);
  return (
    <div>
      <div>
        {data.map((product: StoreApiResponse) => (
          <div key={product.id}>{product.title}</div>
        ))}
      </div>
      <nav className="border-t border-gray-200 px-4 flex items-center justify-between sm:px-0">
        <div className="hidden md:-mt-px md:flex">
          {indicators.map((indicator, index) => (
            <Link href={`/pagination_ssg/${index + 1}`} key={index}>
              <a
                className={`border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium `}
              >
                {index + 1}
              </a>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default ProductsSSGPagePagination;

export const getStaticPaths = async () => {
  const res = await fetch(`https://naszsklep-api.vercel.app/api/products`);
  const data: StoreApiResponse[] = await res.json();
  return {
    paths: data.map((product, index) => {
      return {
        params: {
          pageSSG: (index + 25).toString(),
        },
      };
    }),
    fallback: false,
  };
};

export const getStaticProps = async ({
  params,
}: InferGetStaticPaths<typeof getStaticPaths>) => {
  if (!params?.pageSSG) {
    return {
      props: {},
      notFound: true,
    };
  }

  // let total;
  // for (let i = 0; i < 5000; i + 1000) {
  //   total = await fetch(
  //     `https://naszsklep-api.vercel.app/api/products?take=1000$offset=${i}`
  //   );
  // }

  // console.log(total);

  const res = await fetch(
    `https://naszsklep-api.vercel.app/api/products?take=25&offset=${params.pageSSG}`
  );
  const data: StoreApiResponse[] = await res.json();

  return {
    props: {
      data,
    },
  };
};
