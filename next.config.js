/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

const images = {
  domains:['images-na.ssl-images-amazon.com'],
  path: '',
  loader: 'imgix',
  unoptimized:true,
};

module.exports = { nextConfig, images };
