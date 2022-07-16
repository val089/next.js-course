import Head from 'next/head';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => (
  <div className="flex flex-col bg-teal-100 min-h-screen">
    <Head>
      <title>Test sklepu</title>
      <meta name="description" content="Jakiś opis sklepu"></meta>
    </Head>
    <Header />
    <div className="flex-grow">{children}</div>
    <Footer />
  </div>
);
