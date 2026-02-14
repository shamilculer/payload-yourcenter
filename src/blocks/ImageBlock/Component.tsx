import type { StaticImageData } from 'next/image'
import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'
import type { ImageBlock as ImageBlockProps } from '@/payload-types'
import { Media } from '../../components/Media'
import { getBlockStyles } from '@/utilities/getBlockStyles'
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

// Helper to ensure valid CSS units
const formatDimension = (value?: string | number | null) => {
  if (!value) return undefined
  const valStr = String(value)
  // If it's just numbers, assuming px
  if (/^\d+$/.test(valStr)) return `${valStr}px`
  return valStr
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
    mobileHeight,
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

  const hasLink = !!(link && 'type' in link && (
    (link.type === 'custom' && 'url' in link && link.url) ||
    (link.type === 'reference' && link.reference?.value)
  ))

  return (
    <div
      className={cn(
        blockClass,
        className,
        "w-full overflow-hidden"
      )}
      style={style}
    >
      {hasLink && link ? (
        <CMSLink {...(link as any)} className="block no-underline">
          <div className="w-full">
            <div
              className={cn(
                "relative overflow-hidden",
                mobileHeight && "h-[var(--mobile-height)] md:h-[var(--desktop-height)]"
              )}
              style={{
                width: formatDimension(width) || '100%',
                ...(!mobileHeight ? { height: formatDimension(height) || 'auto' } : {}),
                ...(mobileHeight ? {
                  '--mobile-height': formatDimension(mobileHeight),
                  '--desktop-height': formatDimension(height) || 'auto',
                } as React.CSSProperties : {}),
              }}
            >
              {(media || staticImage) && (
                <Media
                  fill
                  imgClassName={cn(fitClass, hoverClass, imgClassName)}
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
        </CMSLink>
      ) : (
        <div className="w-full">
          <div
            className={cn(
              "relative overflow-hidden",
              mobileHeight && "h-[var(--mobile-height)] md:h-[var(--desktop-height)]"
            )}
            style={{
              width: formatDimension(width) || '100%',
              ...(!mobileHeight ? { height: formatDimension(height) || 'auto' } : {}),
              ...(mobileHeight ? {
                '--mobile-height': formatDimension(mobileHeight),
                '--desktop-height': formatDimension(height) || 'auto',
              } as React.CSSProperties : {}),
            }}
          >
            {(media || staticImage) && (
              <Media
                fill
                imgClassName={cn(fitClass, hoverClass, imgClassName)}
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
      }
    </div >
  )
}
