/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['media.rawg.io'], 
    },
    env: {
        API_KEY_RAWG: process.env.API_KEY_RAWG,
      },
  };
  
  export default nextConfig;