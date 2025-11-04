import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === 'true';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  // GitHub Pages 배포 시에만 basePath 적용
  basePath: isGitHubPages ? '/kimmjen-portfolio' : '',
  assetPrefix: isGitHubPages ? '/kimmjen-portfolio' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
