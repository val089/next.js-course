import { ActiveLink } from './ActiveLink';

export const Header = () => {
  return (
    <header className="max-w-2xl mx-auto w-full">
      <nav className="bg-gray-700 text-white px-4 py-2">
        <ActiveLink href="/">Home</ActiveLink>
        <ActiveLink href="/about">About</ActiveLink>
      </nav>
    </header>
  );
};
