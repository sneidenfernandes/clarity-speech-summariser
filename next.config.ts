import type { NextConfig } from "next";
import type { Configuration } from "webpack";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  experimental:{
    serverActions:{
      bodySizeLimit: '2mb',
    }
  },
  webpack(config: Configuration) {
    config.module?.rules?.push({
      test: /\.raw\.css$/,
      type: "asset/source", // this treats the file as a raw string
    });

    return config;
  },
};

export default nextConfig;




