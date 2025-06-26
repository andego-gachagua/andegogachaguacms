import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  images: {
    domains: [
      'localhost',
      'www.andegogachaguacms-production.up.railway.app',
      'andegogachaguacms-production.up.railway.app',
    ],
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
