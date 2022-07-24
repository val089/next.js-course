import { ActiveLink } from './ActiveLink';
import { CartIcon } from '../assets/icons/CartIcon';
import Link from 'next/link';
import { useCartState } from '../context/CartContext';

export const Header = () => {
  const { items } = useCartState();

  return (
    <header className="max-w-2xl mx-auto w-full flex justify-between items-center">
      <nav className="bg-gray-700 text-white px-4 py-2">
        <ActiveLink href="/">Home</ActiveLink>
        <ActiveLink href="/about">About</ActiveLink>
        <ActiveLink href="/products">Products</ActiveLink>
      </nav>
      <Link href="/cart">
        <a>
          <span>{items.length}</span>
          <CartIcon />
        </a>
      </Link>
    </header>
  );
};
