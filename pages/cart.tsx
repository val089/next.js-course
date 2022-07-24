import { useCartState } from '../context/CartContext';
import { TrashIcon } from '../assets/icons/TrashIcon';

const CartPage = () => {
  const { items, removeItemFromCart } = useCartState();

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
    </div>
  );
};

export default CartPage;
