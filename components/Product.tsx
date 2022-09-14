import Image from 'next/image';
import { NextSeo } from 'next-seo';
import { MarkdownResult } from '../types';
import ReactMarkdown from 'react-markdown';
import { NextMarkdown } from './NextMarkdown';
import Link from 'next/link';
import { useCartState } from '../context/CartContext';
import { ProductReviewContainer } from './ProductReview/ProductReviewContainer';

//ReactMarkdown pobieramy po stronie klienta narazie, zmienimy to na pobieranie po stronie serwera, ponieważ paczka waży około 45kb

interface ProductDetails {
  id: string;
  slug: string;
  title: string;
  thumbnailUrl: string;
  thumbnailAlt: string;
  description: string;
  rating: number;
  longDescription: MarkdownResult;
}

type ProductListItem = Pick<
  ProductDetails,
  'id' | 'title' | 'thumbnailAlt' | 'thumbnailUrl'
>; // dzięki funkcji Pick wyciągamy pola i przypisujemy do tego typu

interface ProductListItemProps {
  data: ProductListItem;
}

interface RatingProps {
  rating: number;
}

interface ProductDetailsProps {
  data: ProductDetails;
}

const Rating = ({ rating }: RatingProps) => {
  return <div className="text-blue-500 font-bold">{rating}</div>;
};

export const ProductListItem = ({ data }: ProductListItemProps) => {
  const { addItemToCart } = useCartState();
  return (
    <>
      <div
        // style={{ width: '100%', height: 200, position: 'relative' }}
        className="bg-white p-4"
      >
        <Image
          src={data.thumbnailUrl}
          alt={data.thumbnailAlt}
          layout="responsive"
          width={16}
          height={9}
          objectFit="contain"
        />
      </div>
      <Link href={`/products/${data.id}`}>
        <a>
          <h2 className="p-4 text-2xl font-bold">{data.title}</h2>
        </a>
      </Link>
      {/* dodajemy component żeby użyć Linku, aby przejściu nie przeładowywać strony */}
      <ReactMarkdown
        components={{
          // nadpisujemy tag a swoim własnym komponentem, który zwracany jest z funkcji
          a: ({ href, ...props }) => {
            //atrybut href jest opcjonalny więc musimy go obsłużyć, bo może być undefined
            if (!href) {
              return <a {...props}></a>;
            }
            return (
              <Link href={href}>
                <a {...props}></a>
              </Link>
            );
          },
        }}
      >
        {`[link do produktu numer ${data.id}](/products/${data.id})`}
      </ReactMarkdown>

      <ReactMarkdown
        components={{
          a: ({ href, ...props }) => {
            if (!href) {
              return <a {...props}></a>;
            }
            if (
              process.env.NEXT_PUBLIC_DOMAIN &&
              !href.includes(process.env.NEXT_PUBLIC_DOMAIN) &&
              !href.startsWith('/')
            ) {
              return <a href={href} {...props} rel="noopener noreferrer"></a>;
            }
            return (
              <Link href={href}>
                <a {...props}></a>
              </Link>
            );
          },
        }}
      >
        {`[wp.pl](https://www.wp.pl/)`}
      </ReactMarkdown>

      {/* 
       onClick={addItemToCart} 
       onClick={addItemToCart()} - ta funckja wykona się od razu po wyrenderowaniu
       onClick={() => addItemToCart()} - wykona sie po kliku
      */}
      <button
        onClick={() =>
          addItemToCart({
            id: data.id,
            price: 10,
            title: data.title,
            quantity: 0,
          })
        }
      >
        DODAJ DO KOSZYKA
      </button>
    </>
  );
};

export const ProductDetails = ({ data }: ProductDetailsProps) => (
  <>
    <div
      style={{ width: '100%', height: 200, position: 'relative' }}
      className="bg-white p-4"
    >
      <NextSeo
        // title={data.title}
        // description={data.description}
        canonical={`https://naszsklep.vercel.app/products/${data.id}`}
        //caconical - unikalny link do danej podstrony, informujemy googla o tym
        openGraph={{
          url: `https://naszsklep.vercel.app/products/${data.id}`,
          // title: data.title,
          // description: data.description,
          images: [
            {
              url: data.thumbnailUrl,
              alt: data.thumbnailAlt,
              type: 'image/jpeg',
            },
          ],
          // site_name: 'Nasz Sklep',
        }}
      />
      <Image
        src={data.thumbnailUrl}
        alt={data.thumbnailAlt}
        layout="responsive"
        width={16}
        height={9}
        objectFit="contain"
      />
      <h2 className="p-4 text-2xl font-bold">{data.title}</h2>
      <p>{data.description}</p>
      <article className="prose lg:prose-xl">
        {/* <ReactMarkdown>{data.longDescription}</ReactMarkdown> */}
        {/* <MDXRemote {...data.longDescription} /> */}
        <NextMarkdown description={data.longDescription} />
      </article>
      <Rating rating={data.rating} />
      <ProductReviewContainer productSlug={data.slug} />
    </div>
  </>
);
