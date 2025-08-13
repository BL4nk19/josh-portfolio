/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    rules: {
      '@next/next/no-img-element': 'off'
    }
  }
};

export default nextConfig;
