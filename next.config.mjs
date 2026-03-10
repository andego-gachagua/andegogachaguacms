import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  // images: {
  //   domains: ['localhost', 'www.www.andegogachagua.com', 'www.andegogachagua.com'],
  // },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'www.andegogachagua.com',
      },
    ],
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
