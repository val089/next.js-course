import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from 'react';
import {
  getItemsFromStorage,
  setCartItemsInStorage,
} from '../components/Cart/cartModel';

//dodając readonly blokujemy mutowanie danych, możemy dodać tą regułę do eslinta i będzie to z automatu dodawane
//możemy ewentualnie wykorzystać biblioteki immutableJS, immer

export interface CartItem {
  readonly id: string;
  readonly price: number;
  readonly title: string;
  readonly quantity: number;
}

interface CartState {
  readonly items: readonly CartItem[];
  readonly addItemToCart: (item: CartItem) => void;
  readonly removeItemFromCart: (id: CartItem['id']) => void;
}

// const cartContext = createContext<CartState | null>(null);

export const CartStateContext = createContext<CartState | null>(null);

interface ContextProviderProps {
  children: ReactNode;
}

export const CartStateContextProvider = ({
  children,
}: ContextProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    //pobieramy itemy z localStorage po stronie przeglądarki
    setCartItems(getItemsFromStorage());
  }, []);

  useEffect(() => {
    setCartItemsInStorage(cartItems);
  }, [cartItems]);

  const addItemToCart = (item: CartItem) => {
    setCartItems((cartItems) => {
      const existingItem = cartItems.find((el) => el.id === item.id);
      if (!existingItem) {
        return [...cartItems, item];
      }
      return cartItems.map((el) => {
        if (el.id === item.id) {
          return { ...el, quantity: el.quantity + 1 };
        }
        return el;
      });
    });
  };

  const removeItemFromCart = (id: CartItem['id']) => {
    setCartItems((cartItems) => {
      const existingItem = cartItems.find((el) => el.id === id);
      if (existingItem && existingItem.quantity <= 1) {
        return cartItems.filter((el) => el.id !== id);
      }
      return cartItems.map((el) => {
        if (el.id === id) {
          return { ...el, quantity: el.quantity - 1 };
        }
        return el;
      });
      //  cartItems.filter((el) => el.id !== id);
    });
  };

  return (
    <CartStateContext.Provider
      value={{
        items: cartItems,
        addItemToCart,
        removeItemFromCart,
      }}
    >
      {children}
    </CartStateContext.Provider>
  );
};

export const useCartState = () => {
  const cartState = useContext(CartStateContext);
  if (!cartState) {
    throw new Error('You forgot CartStateContextProvider');
  }

  return cartState;
};
