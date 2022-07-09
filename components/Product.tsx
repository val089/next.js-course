import Image from 'next/image';
import Link from 'next/link';

interface ProductDetails {
  id: number;
  title: string;
  thumbnailUrl: string;
  thumbnailAlt: string;
  description: string;
  rating: number;
}

type ProductListItem = Pick<
  ProductDetails,
  'id' | 'title' | 'thumbnailAlt' | 'thumbnailUrl'
>; // dzięki funkcji Pick wyciągamy pole title i przypisujemy do typu

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
      <Rating rating={data.rating} />
    </div>
  </>
);
