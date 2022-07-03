// InferGetStaticPropsType jest typem dostarczanym przez Nexta. Dzięki niemu, kod w naszej aplikacji będzie spójny, a my nie musimy w dwóch miejscach deklarować kształtu danych.
import { InferGetStaticPropsType } from 'next';

const ProductsPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  console.log(data);
  return <div>Siema</div>;
};

// dane pobieramy za pomocbą SSG
// kod wykonuje się na serwerze i nie użyjemy tutaj window czy document, które są dostępne tylko po stronie klienta/przeglądarki
// Funkcji, o których tutaj mówimy, czyli getStaticProps, getStaticPaths i getServerSideProps możemy używać tylko w plikach w /pages!

// getStaticProps pobiera dane raz, które generowane są po stronie serwera i gdybyśmy zmienili coś w api, to i tak pobierze nam stare dane, chyba, że zrobimy jeszcze raz builda aplikacji, rozwiązaniem tego są inne metody
export const getStaticProps = async () => {
  const res = await fetch(`https://fakestoreapi.com/products/`);
  //można użyć typu unknown zamiast any
  const data: StoreApiResponse[] = await res.json(); //dane chcemy w formacie json

  return {
    props: {
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
