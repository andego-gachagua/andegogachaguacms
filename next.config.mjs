import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  images: {
    domains: [
      'localhost',
      'andegogachaguacms.vercel.app',
      'andegogachaguacms-production.up.railway.app',
      'andegogachagua.com',
    ],
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
