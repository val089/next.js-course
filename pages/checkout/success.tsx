import { useRouter } from 'next/router';

const CheckoutSuccessPage = () => {
  const router = useRouter();

  console.log(router.query.session_id);

  return <h1>SUCCESS!</h1>;
};

export default CheckoutSuccessPage; //Page'e muszą być defaultowo exportowane
