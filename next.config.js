/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true, //Wymuszamy, aby każdy URL w aplikacji kończył się znakiem / (tj. trailing slash) // https://nextjs.org/docs/api-reference/next.config.js/trailing-slash
};

module.exports = nextConfig;
