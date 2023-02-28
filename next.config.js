/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["loop-nft-marketplace.infura-ipfs.io", "infura-ipfs.io"],
  }, //图像来自这些目录(因为我们使用外部文件域名来获取图像),输入我们自己的子域
};

module.exports = nextConfig;
