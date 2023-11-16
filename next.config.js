/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    loader: "cloudinary",
    path: "https://api.cloudinary.com/v1_1/dlio3oanz/image/upload",
    domains: [
      "res.cloudinary.com",
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
    ],
  },
};

module.exports = nextConfig;
