import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { DefaultSeo } from 'next-seo';
import SEO from '../next-seo.config';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <div>
      {/* <p className="text-5xl font-bold text-center text-red-500 ">Hello!</p> */}
      <DefaultSeo {...SEO} />
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </div>
  );
}

export default MyApp;

/*
_app.tsx to jedyne miejsce, gdzie możemy importować globalne style
*/
