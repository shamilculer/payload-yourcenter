import { Media } from '../payload-types'

/**
 * Universal media URL resolver that always returns the correct URL
 * This replaces the old getMediaUrl and getCloudinaryUrl functions
 */
export const getMediaUrl = (media?: Media | string | null): string => {
  if (!media) return ''

  // If it's already a string URL, return it
  if (typeof media === 'string') {
    return media
  }

  // If it's a Media object, resolve the URL
  if (typeof media === 'object' && media !== null) {
    // Priority 1: Use Cloudinary secure_url if available
    if (media.cloudinary?.secure_url) {
      return media.cloudinary.secure_url
    }

    // Priority 2: Construct from Cloudinary public_id
    if (media.cloudinary?.public_id) {
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dpycn77pf'
      return `https://res.cloudinary.com/${cloudName}/image/upload/${media.cloudinary.public_id}`
    }

    // Priority 3: Use size-specific URLs (these should also be Cloudinary URLs)
    if (media.sizes?.large?.url) {
      return media.sizes.large.url
    }
    if (media.sizes?.medium?.url) {
      return media.sizes.medium.url
    }
    if (media.sizes?.small?.url) {
      return media.sizes.small.url
    }
    if (media.sizes?.thumbnail?.url) {
      return media.sizes.thumbnail.url
    }

    // Priority 4: Fallback to main URL (should be Cloudinary URL)
    if (media.url) {
      return media.url
    }
  }

  return ''
}

/**
 * Get media URL with size preference
 */
export const getMediaUrlWithSize = (
  media?: Media | string | null, 
  preferredSize: 'thumbnail' | 'small' | 'medium' | 'large' | 'xlarge' = 'medium'
): string => {
  if (!media) return ''

  // If it's already a string URL, return it
  if (typeof media === 'string') {
    return media
  }

  // If it's a Media object, resolve the URL with size preference
  if (typeof media === 'object' && media !== null) {
    // Priority 1: Use Cloudinary secure_url if available
    if (media.cloudinary?.secure_url) {
      return media.cloudinary.secure_url
    }

    // Priority 2: Use size-specific URL if available
    if (media.sizes?.[preferredSize]?.url) {
      return media.sizes[preferredSize].url
    }

    // Priority 3: Fallback to other sizes in order
    const sizeOrder = ['large', 'medium', 'small', 'thumbnail', 'xlarge']
    for (const size of sizeOrder) {
      const sizeData = media.sizes?.[size as keyof typeof media.sizes]
      if (sizeData?.url) {
        return sizeData.url
      }
    }

    // Priority 4: Construct from Cloudinary public_id
    if (media.cloudinary?.public_id) {
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dpycn77pf'
      return `https://res.cloudinary.com/${cloudName}/image/upload/${media.cloudinary.public_id}`
    }

    // Priority 5: Fallback to main URL
    if (media.url) {
      return media.url
    }
  }

  return ''
}

/**
 * Check if a URL is a Cloudinary URL
 */
export const isCloudinaryUrl = (url: string): boolean => {
  return url.includes('res.cloudinary.com')
}

/**
 * Check if a URL is a local Payload API URL
 */
export const isLocalApiUrl = (url: string): boolean => {
  return url.includes('/api/media/file/') || url.includes('/api/media/')
}