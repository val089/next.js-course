import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface ActiveLinkProps {
  children: ReactNode;
  href: string;
}
export const ActiveLink = ({ children, href }: ActiveLinkProps) => {
  const router = useRouter();

  return (
    <Link href={href} passHref>
      <a className={router.pathname === href ? 'selected' : ''}>{children}</a>
    </Link>
  );
};

/*
Just a reminder to those who are reading this, that if you insert <a/> wrapped inside a custom component inside <Link/> that you should include passHref if the <a/> wraps anything other than a string, otherwise your site may take a hit on SEO.
*/
