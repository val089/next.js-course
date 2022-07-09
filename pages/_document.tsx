import { Html, Head, Main, NextScript } from 'next/document';

//_document.tsx generowany jest tylko raz.

export default function Document() {
  return (
    <Html lang="pl">
      <Head />
      <body className="bg-gray-100 antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
