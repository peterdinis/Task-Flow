import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	reactStrictMode: true,
	experimental: {
		viewTransition: true,
		typedRoutes: true,
		typedEnv: true
	},
};

export default nextConfig;
