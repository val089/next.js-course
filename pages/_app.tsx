import '../styles/globals.css';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      {/* <p className="text-5xl font-bold text-center text-red-500 ">Hello!</p> */}
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;

/*
_app.tsx to jedyne miejsce, gdzie możemy importować globalne style
*/
