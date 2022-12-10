import { useCartState } from '../context/CartContext';
import { TrashIcon } from '../assets/icons/TrashIcon';
import { loadStripe } from '@stripe/stripe-js';
import { Stripe } from 'stripe';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const CartPage = () => {
  const { items, removeItemFromCart } = useCartState();

  const pay = async () => {
    const stripe = await stripePromise;

    if (!stripe) {
      throw new Error('Something went wrong');
    }

    const res = await fetch('/api/checkout/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        // items.map((item) => ({
        //   price_data: {
        //     currency: 'PLN',
        //     unit_amount: item.price * 100,
        //     product_data: {
        //       name: item.title,
        //     },
        //   },
        //   quantity: item.quantity,
        // }))
        items.map((item) => ({
          slug: item.id,
          count: item.quantity,
        }))
      ),
    });

    const { session }: { session: Stripe.Response<Stripe.Checkout.Session> } =
      await res.json();

    await stripe.redirectToCheckout({ sessionId: session.id });
  };

  return (
    <div>
      <ul>
        {items.map((item) => (
          <li key={item.title}>
            {item.title} - {item.price} - {item.quantity}
            <button onClick={() => removeItemFromCart(item.id)}>
              <TrashIcon color="red" />
            </button>
          </li>
        ))}
      </ul>
      <button type="button" className="w-200 bg-indigo-300" onClick={pay}>
        ZŁÓŻ ZAMÓWIENIE
      </button>
    </div>
  );
};

export default CartPage;
