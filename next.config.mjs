/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/nexus-website',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
