import { ReviewContentFragment } from '../../generated/graphql';

interface ProductReviewListItemProps {
  review: ReviewContentFragment;
}

export const ProductReviewListItem = ({
  review,
}: ProductReviewListItemProps) => {
  const isOptimistic = review.id.startsWith('-');
  return (
    <li
      className={`border mt-4 bg-white p-2 max-w-md mx-auto shadow-md rounded-md ${
        isOptimistic ? 'opacity-50' : null
      }`}
    >
      <h3 className="font-bold">{review.headline}</h3>
      <p className="my-2 italic">{review.content}</p>
      <div>{review.rating}</div>
      <footer>{review.name}</footer>
    </li>
  );
};
