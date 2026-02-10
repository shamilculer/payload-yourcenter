'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'
import Image from 'next/image'


import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import { Button } from '@/components/ui/button'

export type CardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title' | 'content' | 'publishedAt' | 'heroImage'>

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card } = useClickableCard<HTMLDivElement>({})
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, categories, meta, title, content, publishedAt, heroImage } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const href = `/${relationTo}/${slug}`

  // Excerpt generation logic
  let excerpt = description
  if (!excerpt && content && typeof content === 'object' && 'root' in content) {
    try {
      const extractText = (node: any): string => {
        if (!node) return ''
        if (node.type === 'text') return node.text
        if (node.children && Array.isArray(node.children)) {
          return node.children.map(extractText).join(' ')
        }
        return ''
      }
      const fullText = extractText(content.root)
      excerpt = fullText.slice(0, 150) + (fullText.length > 150 ? '...' : '')
    } catch (e) {
      console.warn('Failed to extract excerpt from content', e)
    }
  }

  // Format Date
  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    : ''

  // Get Category Name (First one)
  const categoryName = hasCategories && typeof categories[0] === 'object' ? categories[0].title : ''

  const displayImage = heroImage || metaImage

  return (
    <div className="bg-card rounded-xl overflow-hidden shadow-lg border border-border group h-full flex flex-col" ref={card.ref}>
      <div className="relative h-72 overflow-hidden">
        {displayImage && typeof displayImage !== 'string' ? (
          <Image
            src={displayImage.url || ''}
            alt={titleToUse || ''}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-72 bg-gray-200 flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
        {categoryName && (
          <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase">
            {categoryName}
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>{formattedDate}</span>
          </div>
        </div>

        <Link href={href} className="block mb-3">
          <h3 className="!text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors">
            {titleToUse}
          </h3>
        </Link>

        <p className="!text-sm line-clamp-4 mb-4 flex-grow leading-[1.8em]">
          {excerpt}
        </p>

        <Button asChild className="w-full mt-auto bg-secondary">
          <Link href={href}>Read More</Link>
        </Button>
      </div>
    </div>
  )
}

