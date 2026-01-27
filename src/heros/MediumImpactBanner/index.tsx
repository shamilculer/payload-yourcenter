import React from 'react'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import type { Page } from '@/payload-types'

export const MediumImpactBanner: React.FC<Page['hero']> = ({
  links,
  media,
  heading,
  description,
  eyebrow,
}) => {
  return (
    <section className="section-spacing-b relative">
      <div className="w-full py-10 min-h-[550px] md:min-h-[650px] relative flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          {media && typeof media === 'object' && (
            <Media
              fill
              imgClassName="object-cover object-left"
              priority
              resource={media}
            />
          )}
        </div>

        {/* Gradient Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-30% from-accent/95 to-black/50 md:to-transparent z-0"></div>

        {/* Content */}
        <div className="container z-10 flex items-center">
          <div className="xl:w-2/3">
            <div className="text-white">
              {eyebrow && (
                <span className="leading-0 py-1.5 px-3 rounded-3xl uppercase font-medium text-white border border-gray-300 bg-primary/20">
                  {eyebrow}
                </span>
              )}
              {heading && (
                <h1 className="mt-4 !text-white max-sm:!text-[40px]">
                  {heading}
                </h1>
              )}
              {description && (
                <p className="text-white mt-4 sm:w-4/5">
                  {description}
                </p>
              )}
            </div>

            {Array.isArray(links) && links.length > 0 && (
              <div className="flex items-center gap-3 mt-6">
                {links.map(({ link }, i) => (
                  <CMSLink key={i} {...link} size="lg" />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
