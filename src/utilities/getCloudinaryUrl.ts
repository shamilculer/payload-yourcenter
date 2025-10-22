import { Media } from '../payload-types'

export const getCloudinaryUrl = (media?: Media | null): string => {
  if (!media) return ''

  // First try to get the Cloudinary secure URL directly
  if (media?.cloudinary?.secure_url) {
    return media.cloudinary.secure_url
  }

  // If no direct Cloudinary URL, construct it from the public_id
  if (media?.cloudinary?.public_id) {
    // Use the public_id which should contain the correct filename
    // The public_id includes the folder path and filename
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dpycn77pf'
    return `https://res.cloudinary.com/${cloudName}/image/upload/${media.cloudinary.public_id}`
  }

  // Fallback to size-specific URLs (these should work with Cloudinary)
  return (
    media?.sizes?.large?.url ||
    media?.sizes?.medium?.url ||
    media?.sizes?.thumbnail?.url ||
    media?.url ||
    ''
  )
}
