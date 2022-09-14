import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import {
  GetReviewsForProductSlugDocument,
  GetReviewsForProductSlugQuery,
  useCreateProductReviewMutation,
} from '../../generated/graphql';
import { errorMessage } from '../NewsletterForm';

const reviewFormScheme = yup
  .object({
    content: yup.string().required(errorMessage),
    headline: yup.string().required(errorMessage),
    name: yup.string().required(errorMessage),
    rating: yup.number().min(1).max(5).required(errorMessage),
    email: yup.string().email().required(errorMessage),
  })
  .required();

type ReviewFormData = yup.InferType<typeof reviewFormScheme>;

interface ProductReviewFormProps {
  productSlug: string;
}

export const ProductReviewForm = ({ productSlug }: ProductReviewFormProps) => {
  const { register, handleSubmit } = useForm<ReviewFormData>({
    resolver: yupResolver(reviewFormScheme),
  });

  const [createReview, { data, loading, error }] =
    useCreateProductReviewMutation({
      // refetchQueries: [
      //   {
      //     query: GetReviewsForProductSlugDocument,
      //     variables: {
      //       slug: productSlug,
      //     },
      //   },
      // ],
      // poniżej stosuje update optymistyczny update opinii, najpierw je cache'ujemy i pokazujemy userowi, a następnie wysyłamy. Jak coś pójdzie nie tak wysyłamy powiadomienie. Jest to metoda appollo, która pozwala nam zacacheować i odczytać wartości
      update(cache, result) {
        //result.errors
        // obsłuż gdy dostaniesz błąd z zerwera, trzeba wtedy ostylować opinię i np dać możliwość wysłania jeszcze raz requesta użytkownikowi
        //result zwraca dane z serwera, ale jest to przykładowe zastosowanie jeśli chodzi o Optymistyczny zapis danych. W takim sklepie wystarczy jedna REFETCHING, poniżej jest przedstawiona bardzo zaawansowana technika
        const originalReviewsQuery =
          cache.readQuery<GetReviewsForProductSlugQuery>({
            query: GetReviewsForProductSlugDocument,
            variables: { slug: productSlug },
          });
        if (
          !originalReviewsQuery?.product?.reviews ||
          !originalReviewsQuery ||
          !result?.data?.review
        ) {
          return;
        }

        //robimy kopię zamiast mutować
        const newReviewsQuery = {
          ...originalReviewsQuery,
          product: {
            ...originalReviewsQuery.product,
            reviews: [
              ...originalReviewsQuery.product.reviews,
              result.data.review,
            ],
          },
        };

        console.log(newReviewsQuery); //dzięki temu zauważymy, że nasz produkt się podmienia, w sensie id z minusem zostaje nadpisane, w sumie wszystkie dane z serwera nadpisują cache

        cache.writeQuery({
          query: GetReviewsForProductSlugDocument,
          variables: { slug: productSlug },
          data: newReviewsQuery,
        });
      },
    });

  // musimy pobrać dane jeszcze raz gdy dodamy opinię do produktu
  const onSubmit = handleSubmit((data) => {
    createReview({
      variables: {
        review: {
          ...data,
          product: {
            connect: {
              slug: productSlug,
            },
          },
        },
      },
      optimisticResponse: {
        __typename: 'Mutation',
        review: {
          __typename: 'Review',
          id: (-Math.random()).toString(32), //id dla tymczasowego cache'u. Jeśli wrócą dane z serwera to te tymczasowe zostaną nadpisane
          ...data,
        },
      },
    });
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col max-w-md mx-auto">
      <label>
        Content
        <input
          type="text"
          required
          {...register('content', { required: 'required' })}
        />
      </label>
      <label>
        Headline
        <input
          type="text"
          required
          {...register('headline', { required: 'required' })}
        />
      </label>
      <label>
        Name
        <input
          type="text"
          required
          {...register('name', { required: 'required' })}
        />
      </label>
      <label>
        E-mail
        <input
          aria-label="Email address"
          type="email"
          required
          {...register('email', { required: 'required' })}
        />
      </label>
      <label>
        Rating
        <input
          type="number"
          required
          {...register('rating', { required: 'required' })}
        />
      </label>
      <div>
        <button type="submit">Dodaj komentarz</button>
      </div>
    </form>
  );
};
