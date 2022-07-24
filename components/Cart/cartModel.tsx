import { CartItem } from '../../context/CartContext';

export const getItemsFromStorage = () => {
  const itemsFromLocalStorage = localStorage.getItem('NEXT_SHOPPING_CART');

  if (!itemsFromLocalStorage) {
    return [];
  }

  JSON.parse(itemsFromLocalStorage);

  try {
    const items = JSON.parse(itemsFromLocalStorage);
    return items;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const setCartItemsInStorage = (cartItems: CartItem[]) => {
  localStorage.setItem('NEXT_SHOPPING_CART', JSON.stringify(cartItems));
};
