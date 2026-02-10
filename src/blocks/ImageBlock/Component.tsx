import type { StaticImageData } from 'next/image'
import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'
import type { ImageBlock as ImageBlockProps } from '@/payload-types'
import { Media } from '../../components/Media'
import { getBlockStyles, getContainerStyles } from '@/utilities/getBlockStyles'
import { CMSLink } from '@/components/Link'

type Props = ImageBlockProps & {
  breakout?: boolean
  captionClassName?: string
  className?: string
  enableGutter?: boolean
  imgClassName?: string
  staticImage?: StaticImageData
  disableInnerContainer?: boolean
}

export const ImageBlock: React.FC<Props & { settings?: any }> = (props) => {
  const {
    captionClassName,
    className,
    imgClassName,
    media,
    staticImage,
    disableInnerContainer,
    width,
    height,

    objectFit,
    hoverEffect,
    caption: captionOverride,
    settings,
    link,
  } = props

  let caption
  if (captionOverride) {
    caption = captionOverride
  } else if (media && typeof media === 'object') {
    caption = media.caption
  }

  const { className: blockClass, style } = getBlockStyles(settings)

  // Object Fit Map
  const objectFitMap: Record<string, string> = {
    cover: 'object-cover',
    contain: 'object-contain',
    fill: 'object-fill',
  }

  // Hover Effect Map
  const hoverMap: Record<string, string> = {
    none: '',
    scale: 'transition-transform duration-500 hover:scale-105',
    grayscale: 'transition-all duration-500 hover:grayscale',
    brighten: 'transition-all duration-500 hover:brightness-110',
  }

  const fitClass = objectFitMap[objectFit || 'cover'] || 'object-cover'
  const hoverClass = hoverMap[hoverEffect || 'none'] || ''

  const hasLink = link && (
    (link.type === 'custom' && link.url) ||
    (link.type === 'reference' && link.reference?.value)
  )

  const content = (
    <div className={getContainerStyles(settings)}>
      <div
        className={cn("relative overflow-hidden")}
        style={{
          width: width || '100%',
          height: height || 'auto',
        }}
      >
        {(media || staticImage) && (
          <Media
            imgClassName={cn(fitClass, hoverClass, "w-full h-full", imgClassName)}
            resource={media}
            src={staticImage}
          />
        )}
      </div>

      {caption && (
        <div
          className={cn(
            'mt-6',
            captionClassName,
          )}
        >
          <RichText data={caption} enableGutter={false} />
        </div>
      )}
    </div>
  )

  return (
    <div
      className={cn(
        blockClass,
        className,
      )}
      style={style}
    >
      {hasLink ? (
        <CMSLink {...link} className="block no-underline">
          {content}
        </CMSLink>
      ) : (
        content
      )}
    </div>
  )
}
