import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { getBlockStyles, getContainerStyles } from '@/utilities/getBlockStyles'
import { cn } from '@/utilities/ui'
import { CMSLink } from '@/components/Link'

export const CallToActionBlock: React.FC<CTABlockProps & { settings?: any }> = ({ links, richText, settings }) => {
  const { className, style } = getBlockStyles(settings)
  return (
    <div className={className} style={style}>
      <div className={getContainerStyles(settings)}>
        <div className="bg-card rounded border-border border p-4 flex flex-col gap-8 md:flex-row md:justify-between md:items-center">
          <div className="max-w-[48rem] flex items-center">
            {richText && <RichText className="mb-0" data={richText} enableGutter={false} />}
          </div>
          <div className="flex flex-col gap-8">
            {(links || []).map(({ link }, i) => {
              return <CMSLink key={i} size="lg" {...link} />
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
