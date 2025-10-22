'use client'

import React from 'react'
import NextImage from 'next/image'
import { Media } from '@/payload-types'
import { getMediaUrl, getMediaUrlWithSize } from '@/utilities/getMediaUrl'

interface UniversalMediaProps {
    media?: Media | string | null
    alt?: string
    width?: number
    height?: number
    fill?: boolean
    className?: string
    priority?: boolean
    loading?: 'lazy' | 'eager'
    size?: 'thumbnail' | 'small' | 'medium' | 'large' | 'xlarge'
    quality?: number
    placeholder?: 'blur' | 'empty'
    blurDataURL?: string
}

/**
 * Universal Media Component that automatically handles all media URLs
 * This component ensures that all media is served from Cloudinary
 */
export const UniversalMedia: React.FC<UniversalMediaProps> = ({
    media,
    alt,
    width,
    height,
    fill = false,
    className,
    priority = false,
    loading,
    size = 'medium',
    quality = 100,
    placeholder = 'blur',
    blurDataURL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAABchJREFUWEdtlwtTG0kMhHtGM7N+AAdcDsjj///EBLzenbtuadbLJaZUTlHB+tRqSfe...',
}) => {
    // Get the appropriate URL based on size preference
    const imageUrl = size ? getMediaUrlWithSize(media, size) : getMediaUrl(media)

    // Get alt text from media object or use provided alt
    const imageAlt = (() => {
        if (alt) return alt
        if (typeof media === 'object' && media?.alt) return media.alt
        return ''
    })()

    // Get dimensions from media object if not provided
    const imageWidth = width || (typeof media === 'object' && media ? media.width || undefined : undefined)
    const imageHeight = height || (typeof media === 'object' && media ? media.height || undefined : undefined)

    if (!imageUrl) {
        return null
    }

    return (
        <NextImage
            src={imageUrl}
            alt={imageAlt}
            width={fill ? undefined : imageWidth}
            height={fill ? undefined : imageHeight}
            fill={fill}
            className={className}
            priority={priority}
            loading={loading || (priority ? 'eager' : 'lazy')}
            quality={quality}
            placeholder={placeholder}
            blurDataURL={blurDataURL}
        />
    )
}

export default UniversalMedia
