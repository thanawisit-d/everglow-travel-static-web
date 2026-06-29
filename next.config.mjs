/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
};

if (process.env.NODE_ENV === 'production') {
  nextConfig.output = 'export';
}

export default nextConfig;
