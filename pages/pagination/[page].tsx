import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import Link from 'next/link';

//WEEK 3 - TASK 1

const itemsNumberToTake = 10;

const first = <T,>(arr: T | T[]): T | undefined =>
  Array.isArray(arr) ? arr[0] : arr;

const getProducts = async (page: number) => {
  const res = await fetch(
    `https://naszsklep-api.vercel.app/api/products?take=${itemsNumberToTake}&offset=${
      page * 25
    }`
  );
  const data: StoreApiResponse[] = await res.json();
  return data;
};

const ProductsCSRPagePagination = () => {
  const router = useRouter();
  const page = Number.parseInt(first(router.query.page) || '1');
  const { data, isLoading, error } = useQuery(
    ['products', page],
    () => getProducts(page),
    { keepPreviousData: true }
  );

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data || error) {
    return <h1>Coś poszło nie tak</h1>;
  }

  const indicators = new Array(10).fill(0);
  return (
    <>
      <div>
        {data.map((product: StoreApiResponse) => (
          <div key={product.id}>{product.title}</div>
        ))}
      </div>
      <nav className="border-t border-gray-200 px-4 flex items-center justify-between sm:px-0">
        <div className="hidden md:-mt-px md:flex">
          {indicators.map((indicator, index) => (
            <Link href={`/pagination/${index + 1}`} key={index}>
              <a
                className={`border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium ${
                  page === index + 1 ? 'border-indigo-500 text-indigo-600 ' : ''
                }`}
              >
                {index + 1}
              </a>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
};

export default ProductsCSRPagePagination;

export interface StoreApiResponse {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Category;
  rating: Rating;
  image: string;
  longDescription: string;
}

export type Category =
  | 'Sports'
  | 'Music'
  | 'Automotive'
  | 'Tools'
  | 'Movies'
  | 'Industrial'
  | 'Books'
  | 'Grocery'
  | 'Electronics'
  | 'Outdoors'
  | 'Home'
  | 'Computers'
  | 'Clothing'
  | 'Baby'
  | 'Jewelery';

export interface Rating {
  rate: number;
  count: number;
}
