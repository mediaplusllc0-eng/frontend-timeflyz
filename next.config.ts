import { NextConfig } from "next";

const env = process.env.NODE_ENV || "dev";

const distDirs: Record<string, string> = {
  dev: "builds-output/dev/.next",
  uat: "builds-output/uat/.next",
  prod: "builds-output/prod/.next",
};

const nextConfig: NextConfig = {
  distDir: distDirs[env],
  images: {
    domains: [
      "time-flyz-local.s3.ap-southeast-2.amazonaws.com",
      "t3.ftcdn.net",
      "time-flyz-dev.s3.ap-southeast-2.amazonaws.com",
      "time-flyz-uat.s3.ap-southeast-2.amazonaws.com",
      "time-flyz.s3.ap-southeast-2.amazonaws.com",
    ], // 👈 Add this line
  },
};

export default nextConfig;
