import { useQuery } from 'react-query';
import { ProductListItem } from '../components/Product';

const getProducts = async () => {
  const res = await fetch(`https://fakestoreapi.com/products/`);
  const data: StoreApiResponse[] = await res.json();

  return data;
};

const ProductsCSRPage = () => {
  //data ma już przypisany typ StoreApiResponse[] poprzez inferęcje typu, ma także typ undefined gdy dane nie przyszły jeszcze z serwera
  const { data, isLoading, error } = useQuery('products', getProducts);

  if (isLoading) {
    return <h1>Loading...</h1>; // spinner, sceleton
  }

  if (!data || error) {
    return <h1>Coś poszło nie tak</h1>;
  }

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {data.map((product) => (
        <li key={product.id} className="shadow-xl border-2">
          <ProductListItem
            data={{
              id: product.id,
              title: product.title,
              thumbnailUrl: product.image,
              thumbnailAlt: product.title,
            }}
          />
        </li>
      ))}
    </ul>
  );
};

export default ProductsCSRPage;

export interface StoreApiResponse {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Category;
  image: string;
  rating: Rating;
}

export type Category =
  | 'electronics'
  | 'jewelery'
  | "men's clothing"
  | "women's clothing";

export interface Rating {
  rate: number;
  count: number;
}
