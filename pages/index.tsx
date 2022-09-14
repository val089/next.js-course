import Image from 'next/image';
import { useQuery, gql } from '@apollo/client';
import { useCreateProductReviewMutation } from '../generated/graphql';
import { NewsletterForm } from '../components/NewsletterForm';

const getProductsQuery = gql`
  query getProductsList {
    products {
      id
      name
      price
      slug
    }
  }
`;

//usunęliśmy starą strukturę
const Home = () => {
  const [createReview, { data, loading, error }] =
    useCreateProductReviewMutation();

  //w getStaticProps nie możemy wykorzystać hooka
  // const { loading, error, data } = useQuery(getProductsQuery);

  if (loading) {
    return <p>loading</p>;
  }

  if (error) {
    return <p>{JSON.stringify(error)}</p>;
  }

  console.log(data);

  const addReview = async () => {
    const data = await createReview({
      variables: {
        review: {
          headline: 'test111',
          name: 'test111',
          email: 'test111@wp.pl',
          content: 'xxxxxxxxxxxxxxxxxxxxxx',
        },
      },
    });
  };

  return (
    <>
      <main className="flex-grow max-w-2xl mx-auto grid p-6 sm:grid-cols-2 gap-6">
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          <Image
            src="https://picsum.photos/id/237/500/700"
            alt="Landscape picture"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <p>
          Lorem Ipsum jest tekstem stosowanym jako przykładowy wypełniacz w
          przemyśle poligraficznym. Został po raz pierwszy użyty w XV w. przez
          nieznanego drukarza do wypełnienia tekstem próbnej książki. Pięć
          wieków później zaczął być używany przemyśle elektronicznym, pozostając
          praktycznie niezmienionym. Spopularyzował się w latach 60. XX w. wraz
          z publikacją arkuszy Letrasetu, zawierających fragmenty Lorem Ipsum, a
          ostatnio z zawierającym różne wersje Lorem Ipsum oprogramowaniem
          przeznaczonym do realizacji druków na komputerach osobistych, jak
          Aldus PageMaker
        </p>
        <NewsletterForm />
        <button onClick={addReview} type="button">
          Dodaj komentarz
        </button>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </main>
    </>
  );
};

export default Home;
