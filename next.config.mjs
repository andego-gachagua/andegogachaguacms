import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  images: {
    domains: ['localhost', 'www.www.andegogachagua.com', 'www.andegogachagua.com'],
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
