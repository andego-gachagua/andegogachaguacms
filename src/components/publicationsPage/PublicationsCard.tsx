'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Calendar, ArrowRight } from 'lucide-react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function PublicationCard({ post }: { post: any }) {
  return (
    <div className="flex flex-col border border-gray-900 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full bg-white group">
      <div className="relative h-48 w-full overflow-hidden">
        {post.coverImage?.url ? (
          <Image
            src={post.coverImage.url}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gray-900 flex items-center justify-center">
            <span className="text-white text-lg font-medium">No Image</span>
          </div>
        )}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="flex flex-col flex-grow p-4 sm:p-6">
        <div className="flex-grow">
          <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
            <Badge
              variant="outline"
              className="bg-black text-white border-black font-medium px-3 py-1"
            >
              {post.author}
            </Badge>
            <div className="flex items-center text-xs text-gray-600">
              <Calendar size={14} className="mr-1 text-cb8547" />
              {new Date(post.publishedDate).toLocaleDateString()}
            </div>
          </div>

          <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-cb8547 transition-colors">
            <Link href={`/blog/${post.slug}`} className="block">
              {post.title}
            </Link>
          </h3>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-200">
          <Link
            href={`/blog/${post.slug}`}
            className="text-cb8547 font-medium text-sm flex items-center hover:text-black transition-colors"
          >
            Read more{' '}
            <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  )
}
