import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { NextSeo } from 'next-seo';

interface ProductDetails {
  id: number;
  title: string;
  thumbnailUrl: string;
  thumbnailAlt: string;
  description: string;
  rating: number;
  longDescription: string;
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

export const ProductListItem = ({ data }: ProductListItemProps) => (
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
  </>
);

export const ProductDetails = ({ data }: ProductDetailsProps) => (
  <>
    <div
      style={{ width: '100%', height: 200, position: 'relative' }}
      className="bg-white p-4"
    >
      <NextSeo
        title={data.title}
        description={data.description}
        canonical={`https://naszsklep.vercel.app/products/${data.id}`}
        //caconical - unikalny link do danej podstrony, informujemy googla o tym
        openGraph={{
          url: `https://naszsklep.vercel.app/products/${data.id}`,
          title: data.title,
          description: data.description,
          images: [
            {
              url: data.thumbnailUrl,
              alt: data.thumbnailAlt,
              type: 'image/jpeg',
            },
          ],
          site_name: 'Nasz Sklep',
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
        <ReactMarkdown>{data.longDescription}</ReactMarkdown>
      </article>
      <Rating rating={data.rating} />
    </div>
  </>
);
