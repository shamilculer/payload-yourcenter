'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { Page } from '@/payload-types'

type PageTitleProps = Page['hero'] & { title?: string }

export const LowImpactHero: React.FC<PageTitleProps> = ({ media, title }) => {
  const pathname = usePathname()
  const segments = pathname?.split('/').filter(Boolean) || []

  // Basic Breadcrumb Title
  const currentTitle = title || (segments.length > 0 ? segments[segments.length - 1].replace(/-/g, ' ') : 'Page')

  // Get image URL from media
  const getImageSrc = () => {
    if (!media || typeof media !== 'object') return '/hero-banner-5.webp'

    if (media.cloudinary?.secure_url) return media.cloudinary.secure_url
    if (media.cloudinary?.public_id) {
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dpycn77pf'
      return `https://res.cloudinary.com/${cloudName}/image/upload/${media.cloudinary.public_id}`
    }
    if ('url' in media && media.url) return media.url

    return '/hero-banner-5.webp'
  }

  return (
    <section className="w-full min-h-60 sm:min-h-[24rem] relative flex items-center justify-center">
      <Image
        height={380}
        width={1400}
        alt={`${currentTitle} banner`}
        src={getImageSrc()}
        className="w-full h-full object-cover absolute top-0 left-0"
      />

      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-accent to-transparent"></div>

      <div className="w-full z-10 flex flex-col items-center gap-2 px-4">
        <h1 className="max-sm:!text-[45px] w-full max-w-4xl !text-white text-center capitalize">
          {currentTitle}
        </h1>

        <nav className="font-medium text-gray-200 text-sm sm:text-base">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="hover:text-primary max-sm:text-xs">
                Home
              </Link>
            </li>
            {segments.map((seg, index) => {
              const href = '/' + segments.slice(0, index + 1).join('/')
              const isLast = index === segments.length - 1
              const formattedSeg = seg.replace(/-/g, ' ')

              return (
                <li key={index} className="flex items-center gap-2 max-sm:text-xs">
                  <span>&gt;</span>
                  {isLast ? (
                    <span className="text-primary capitalize">{formattedSeg}</span>
                  ) : (
                    <Link
                      href={href}
                      className="hover:text-primary capitalize max-sm:text-xs"
                    >
                      {formattedSeg}
                    </Link>
                  )}
                </li>
              )
            })}
          </ol>
        </nav>
      </div>
    </section>
  )
}
