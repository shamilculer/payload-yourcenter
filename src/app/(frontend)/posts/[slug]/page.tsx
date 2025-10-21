import React, { cache } from 'react'
import type { Metadata } from 'next'
import { draftMode } from 'next/headers'

// --- MOCK PAYLOAD IMPORTS & UTILITIES (Update paths as needed) ---
import configPromise from '@payload-config'
import { getPayload } from 'payload' // Using the standard 'payload' package import
import type { Service, Media } from '@/payload-types'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import RichText from '@/components/RichText'
import { generateMeta } from '@/utilities/generateMeta' // From Post example
import { LivePreviewListener } from '@/components/LivePreviewListener' // From Post example
import { PayloadRedirects } from '@/components/PayloadRedirects' // From Post example
// --- END MOCK IMPORTS ---

// Helper to safely get the image URL
const getImageUrl = (media: Media | string | undefined | null): string | undefined => {
  if (typeof media === 'object' && media !== null && 'url' in media) {
    return `${process.env.NEXT_PUBLIC_SERVER_URL}${media.url}`
  }
  return undefined
}

// ------------------------------------
// QUERY FUNCTION (CACHED)
// ------------------------------------

// Use the standard Next.js 'cache' utility for efficient data fetching
const queryServiceBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  // Use the configPromise pattern from your Post example
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'services',
    draft, // Honour draft mode for live preview
    limit: 1,
    // CRITICAL: Increase depth to populate the 'featuredImage' field
    depth: 2,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})

// ------------------------------------
// 1. GENERATE STATIC PARAMS (SSG)
// ------------------------------------
export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })

  const services = await payload.find({
    collection: 'services',
    draft: false,
    limit: 1000,
    pagination: false,
    select: {
      slug: true,
    },
  })

  return services.docs.map((service) => ({
    slug: service.slug,
  }))
}

// ------------------------------------
// 2. GENERATE METADATA (SEO)
// ------------------------------------
type Args = {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug = '' } = await params
  const service = await queryServiceBySlug({ slug })

  // Use the shared generateMeta utility from your Post example
  return generateMeta({ doc: service })
}


// ------------------------------------
// 3. PAGE HEADER COMPONENT (Inline for simplicity)
// ------------------------------------
const ServiceHeader: React.FC<{ service: Service }> = ({ service }) => {
  const { overview, title } = service
  const featuredImage = overview?.featuredImage as Media | undefined
  const imageUrl = getImageUrl(featuredImage)

  return (
    <header className="bg-white shadow-lg mb-16 pt-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-10 items-center py-10">

          {/* Image (50% width on desktop) */}
          {imageUrl && (
            <div className="w-full lg:w-1/2 rounded-xl overflow-hidden shadow-2xl">
              <img
                src={imageUrl}
                alt={featuredImage?.alt || `Featured image for ${title}`}
                className="w-full h-80 object-cover"
              />
            </div>
          )}

          {/* Content (50% width on desktop) */}
          <div className="w-full lg:w-1/2">
            <h1 className="text-sm font-semibold uppercase tracking-widest text-indigo-600 mb-2">Service Details</h1>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
              {title}
            </h2>
            <div className="text-lg text-gray-700 space-y-4">
              {/* Render the rich text overview description */}
              {overview?.overviewDescription && (
                <RichText data={overview.overviewDescription} />
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

// ------------------------------------
// 4. SERVICE PAGE COMPONENT
// ------------------------------------
export default async function ServicePage({ params }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await params
  const url = '/services/' + slug

  const service = await queryServiceBySlug({ slug })

  if (!service) return <PayloadRedirects url={url} />

  const { layout } = service

  // --- Render the Page Content ---
  return (
    <article className="min-h-screen pt-24 pb-12 bg-gray-50">

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {/* Draft Mode Listener for Live Preview */}
      {draft && <LivePreviewListener />}

      {/* Service Header / Hero Section (using Overview data) */}
      <ServiceHeader service={service} />

      {/* Main Content Layout */}
      <div className="container mx-auto px-4">
        {/* Render the flexible content blocks */}
        {layout && layout.length > 0 && (
          <RenderBlocks blocks={layout} />
        )}
      </div>
    </article>
  )
}
