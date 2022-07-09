// InferGetStaticPropsType jest typem dostarczanym przez Nexta. Dzięki niemu, kod w naszej aplikacji będzie spójny, a my nie musimy w dwóch miejscach deklarować kształtu danych.
import { InferGetStaticPropsType } from 'next';
import { ProductListItem } from '../components/Product';

const ProductsPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
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

// dane pobieramy za pomocbą SSG
// kod wykonuje się na serwerze i nie użyjemy tutaj window czy document, które są dostępne tylko po stronie klienta/przeglądarki
// Funkcji, o których tutaj mówimy, czyli getStaticProps, getStaticPaths i getServerSideProps możemy używać tylko w plikach w /pages!

// getStaticProps pobiera dane raz, które generowane są po stronie serwera i gdybyśmy zmienili coś w api, to i tak pobierze nam stare dane, chyba, że zrobimy jeszcze raz builda aplikacji, rozwiązaniem tego są inne metody

// Gdy np. API zostanie zmienione to zmienione dane nie pojawią się na stronie dopóki nie zrobimy builda aplikacj
export const getStaticProps = async () => {
  const res = await fetch(`https://fakestoreapi.com/products/`);
  //można użyć typu unknown zamiast any
  const data: StoreApiResponse[] = await res.json(); //dane chcemy w formacie json

  const inneData = {};

  return {
    props: {
      inneData,
      data,
    },
  };
};

export default ProductsPage;

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

/*
W trybie deweloperskim getStaticProps jest wywoływany przy każdym odświeżeniu strony. W trybie produkcyjnym, getStaticProps będzie wywołane tylko raz w czasie budowania.
 */

/*
Zakładka Elements wyświetla nam kod (DOM), który został wyrenderowany przez klienta – czyli najpierw zwrócony z serwera, a potem zmodyfikowany przez JavaScript.
Natomiast otwarcie "View Page Source" powoduje wyświetlenie kodu w takiej postaci, w jakiej dostarczył go nam serwer – bez zmian w JS.
 */

// Rename Symbol - gdy klikniemy prawym przyciskiem myszki, dzięki tej funkcji zmienimy nazwę we wszystkich plikach gdzie wysętpuje
