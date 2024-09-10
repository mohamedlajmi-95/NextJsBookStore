/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  env: {
    API_URL: "http://localhost:3001/api",
    SECRET: "secret",
  },
};

export default nextConfig;
