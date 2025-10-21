import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'

// NOTE: Update the imported type to your generated Service type
import type { Service } from '@/payload-types'

// Define the base path for service pages
const SERVICE_PATH_PREFIX = '/services' 
const SERVICE_TAG = 'services-sitemap'

export const revalidateService: CollectionAfterChangeHook<Service> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    // 1. Revalidate the new path if the document is published
    if (doc._status === 'published') {
      // Services pages do not have special path logic for 'home'
      const path = `${SERVICE_PATH_PREFIX}/${doc.slug}`

      payload.logger.info(`Revalidating service page at path: ${path}`)

      revalidatePath(path)
      revalidateTag(SERVICE_TAG)
    }

    // 2. If the page was previously published, revalidate the old path
    // This handles slug changes
    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      const oldPath = `${SERVICE_PATH_PREFIX}/${previousDoc.slug}`

      payload.logger.info(`Revalidating old service page at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag(SERVICE_TAG)
    }
  }
  return doc
}

export const revalidateServiceDelete: CollectionAfterDeleteHook<Service> = ({ doc, req: { context, payload } }) => {
  if (!context.disableRevalidate) {
    if (doc.slug) {
        const path = `${SERVICE_PATH_PREFIX}/${doc.slug}`

        payload.logger.info(`Revalidating deleted service page at path: ${path}`)
        
        revalidatePath(path)
        revalidateTag(SERVICE_TAG)
    }
  }

  return doc
}