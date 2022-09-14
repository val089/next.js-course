import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import * as yup from 'yup';

export const errorMessage = 'Uzupełnij pole';

const useAddToNewsLetterMutation = () =>
  useMutation('add-to-newsletter', async ({ email }: { email: string }) => {
    await fetch('http://localhost:3000/api/hello', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
  });

const checkoutFormScheme = yup
  .object({
    email: yup.string().email().required(errorMessage),
  })
  .required();

type CheckoutFormData = yup.InferType<typeof checkoutFormScheme>;

export const NewsletterForm = () => {
  const { register, handleSubmit } = useForm<CheckoutFormData>({
    resolver: yupResolver(checkoutFormScheme),
  });

  const { mutate } = useAddToNewsLetterMutation();

  const onSubmit = handleSubmit((data) => mutate(data));
  // const onSubmit = handleSubmit(mutate); - moglibyśmy zapisać tak, ale mutate przyjmuje więcej niż jedną funkcję

  return (
    <form onSubmit={onSubmit}>
      <input
        aria-label="Email address"
        type="email"
        required
        {...register('email', { required: 'required' })}
        placeholder="Enter your email"
      />

      <div>
        <button type="submit">Try it & Subscribe</button>
      </div>
    </form>
  );
};
