/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // TODO: Update to be more specific
    remotePatterns: [
      {
          protocol: 'https',
          hostname: '**',
        },
        {
          protocol: 'http',
          hostname: '**',
        },
  
  ],
  },
};

export default nextConfig;
