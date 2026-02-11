import React, { cache } from 'react'
import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import { CircleCheckBig, Mail, PhoneCall } from 'lucide-react'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Service, Media } from '@/payload-types'
import { generateMeta } from '@/utilities/generateMeta'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import PageTitle from '@/components/PageTitle'
import ServiceMenu from '@/components/ServiceMenu'
import PageCTA from '@/components/PageCTA'
import { Button } from '@/components/ui/button'
import { CMSLink } from '@/components/Link'

// Helper to safely get the image URL
const getImageUrl = (media: Media | string | undefined | null): string | undefined => {
  if (typeof media === 'object' && media !== null) {
    // Use Cloudinary URL if available
    if (media.cloudinary?.secure_url) {
      return media.cloudinary.secure_url
    }
    // Fallback to constructing from public_id
    if (media.cloudinary?.public_id) {
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dpycn77pf'
      return `https://res.cloudinary.com/${cloudName}/image/upload/${media.cloudinary.public_id}`
    }
    // Final fallback to local URL
    if ('url' in media && media.url) {
      return `${process.env.NEXT_PUBLIC_SERVER_URL}${media.url}`
    }
  }
  return undefined
}

// Query function (cached)
const queryServiceBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'services',
    draft,
    limit: 1,
    depth: 2,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})

// Generate static params
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

  return services.docs
    .filter((service) => service.slug)
    .map((service) => ({
      slug: service.slug,
    }))
}

// Generate metadata
type Args = {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug = '' } = await params
  const service = await queryServiceBySlug({ slug })

  return generateMeta({ doc: service })
}

// Service page component
export default async function ServicePage({ params }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await params
  const url = '/services/' + slug

  const service = await queryServiceBySlug({ slug })

  if (!service) return <PayloadRedirects url={url} />

  const { title, serviceContent, whyChooseUs, overview } = service
  const segments = ['services', slug]

  // Get image URLs
  const featuredImageUrl = getImageUrl(
    serviceContent?.image as Media | undefined
  )
  const featuredImageAlt =
    typeof serviceContent?.image === 'object'
      ? serviceContent.image?.alt
      : title

  return (
    <main>
      <PayloadRedirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}

      {/* Page Title / Hero */}
      <PageTitle
        image={
          (typeof overview?.featuredImage === 'object' && overview?.featuredImage?.url) ||
          '/radiography.webp'
        }
        title={title}
        segments={segments}
      />

      {/* Main Content Section */}
      <section className="section-spacing">
        <div className="container flex max-lg:flex-col gap-20">
          {/* Left Column - Main Content (2/3 width) */}
          <div className="w-full lg:w-2/3 space-y-4 sm:space-y-6">
            {/* Service Image */}
            {featuredImageUrl && (
              <Image
                src={featuredImageUrl}
                alt={featuredImageAlt || 'Service Image'}
                width={800}
                height={420}
                className="w-full h-[370px] sm:h-[420px] object-cover rounded-3xl"
              />
            )}

            {/* Service Heading */}
            <h2 className="max-sm:!text-3xl max-sm:!leading-9">
              {serviceContent?.heading || title}
            </h2>

            {/* Long Description */}
            <p>{serviceContent?.longDescription}</p>

            {/* Why Choose Us Section */}
            {whyChooseUs && (
              <div className="space-y-4">
                <h3 className="!text-3xl max-sm:!text-2xl">
                  {whyChooseUs.heading}
                </h3>
                <p>{whyChooseUs.intro}</p>

                {/* Benefits List */}
                <ul className="grid sm:grid-cols-2 gap-x-10 gap-y-10 mt-8">
                  {whyChooseUs.benefits?.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      {/* Icon Container */}
                      <div className="p-3 bg-primary/35 shadow flex-center [border-radius:70%_30%_30%_70%_/_60%_40%_60%_40%]">
                        <CircleCheckBig
                          className="w-5 h-5"
                          fill="#C4C93B"
                          stroke="#735D2B"
                        />
                      </div>

                      {/* Content */}
                      <div>
                        <p className="!text-lg font-medium">{item.benefit}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Ending Paragraph */}
            <p className="mt-8">{whyChooseUs?.endingParagraph}</p>

            {/* Actions / Contact Button */}
            {serviceContent?.actions && serviceContent.actions.length > 0 ? (
              <div className="flex flex-wrap gap-4 mt-8">
                {serviceContent.actions.map((action, index) => (
                  <CMSLink key={index} {...action.link} />
                ))}
              </div>
            ) : (
              <Button asChild className="mt-8">
                <Link href="/contact">Contact Us Today</Link>
              </Button>
            )}
          </div>

          {/* Right Column - Sidebar (1/3 width) */}
          <div className="w-full lg:w-1/3 space-y-8">
            {/* Service Menu */}
            <ServiceMenu />

            {/* Contact Card */}
            <div className="border border-primary min-h-80 rounded-lg p-6 space-y-4 relative overflow-hidden">
              <Image
                alt="Contact Us"
                height={290}
                width={290}
                src="/hero-banner-6.webp"
                className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
              />

              <Image
                alt="Pattern"
                height={90}
                width={90}
                src="/pattern-1.png"
                className="absolute -top-5 -right-5 w-40 opacity-40 object-cover rounded-lg z-10"
              />

              <div className="absolute top-0 left-0 h-full w-full bg-accent/80 rounded-lg"></div>

              <div className="space-y-8 z-20 relative">
                <div className="size-24 flex-center border-2 rounded-full border-primary border-dashed">
                  <div className="size-20 flex-center bg-primary rounded-full">
                    <PhoneCall className="w-10 h-10 text-white" />
                  </div>
                </div>

                <div className="ml-2">
                  <h4 className="!text-white text-xl mb-6">Call Us Anytime</h4>
                  <span className="text-3xl font-semibold text-white">
                    +91 90610 60000
                  </span>
                  <span className="flex items-center gap-3 font-medium text-white mt-4">
                    <div className="bg-primary rounded-2xl p-1">
                      <Mail className="stroke-white" />
                    </div>
                    mail@yourcenter.in
                  </span>

                  <Button asChild className="mt-6 w-full">
                    <Link href="tel:+919061060000">Contact Us</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Page CTA */}
      <PageCTA image={overview?.featuredImage} />
    </main>
  )
}
