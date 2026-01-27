'use client'

import React from 'react'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { Page } from '@/payload-types'

type PageTitleProps = Page['hero'] & { title?: string }

export const LowImpactHero: React.FC<PageTitleProps> = ({ media, title }) => {
  const pathname = usePathname()
  const segments = pathname?.split('/').filter(Boolean) || []

  // Helper to extract text from richText to use as clear title if needed, 
  // but existing RichText component is fine for H1 if styled correctly.
  // Static site extracts title and formats it. 
  // Here we expect the user to enter the H1 in the rich text field.
  // But for the breadcrumb we need a text title.

  // Basic Breadcrumb Title
  const currentTitle = title || (segments.length > 0 ? segments[segments.length - 1].replace(/-/g, ' ') : 'Page')

  return (
    <section className="w-full min-h-60 sm:min-h-[24rem] relative flex items-center justify-center">
      <div className="absolute inset-0">
        {media && typeof media === 'object' && (
          <Media
            fill
            imgClassName="object-cover"
            priority
            resource={media}
          />
        )}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-accent to-transparent"></div>
      </div>

      <div className="w-full z-10 flex flex-col items-center gap-2 px-4">
        <h1 className="max-w-4xl text-center text-[45px] text-white font-bold capitalize">
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
