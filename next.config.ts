import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	reactStrictMode: true,
	experimental: {
		viewTransition: true,
		typedEnv: true
	},
};

export default nextConfig;
