import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import PageTitle from '@/components/PageTitle'
import ServiceMenu from '@/components/ServiceMenu'
import PageCTA from '@/components/PageCTA'
import Image from 'next/image'
import { CircleCheckBig, Mail, PhoneCall } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import type { Branch, Service } from '@/payload-types'

type Args = {
    params: Promise<{
        slug: string // This is the branch slug
        service: string // This is the service slug
    }>
}

// Fetch branch data by slug
const queryBranchBySlug = cache(async ({ slug }: { slug: string }) => {
    const { isEnabled: draft } = await draftMode()

    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
        collection: 'branches',
        draft,
        limit: 1,
        overrideAccess: draft,
        where: {
            slug: {
                equals: slug,
            },
        },
    })

    return result.docs?.[0] || null
})

// Fetch service by slug and branch
const queryServiceBySlugAndBranch = cache(
    async ({ slug, branchId }: { slug: string; branchId: string | number }) => {
        const { isEnabled: draft } = await draftMode()

        const payload = await getPayload({ config: configPromise })

        const result = await payload.find({
            collection: 'services',
            draft,
            limit: 1,
            overrideAccess: draft,
            where: {
                and: [
                    {
                        slug: {
                            equals: slug,
                        },
                    },
                    {
                        branch: {
                            equals: branchId,
                        },
                    },
                ],
            },
        })

        return result.docs?.[0] || null
    },
)

// Generate static params for all branch services
export async function generateStaticParams() {
    const payload = await getPayload({ config: configPromise })

    // Get all branches
    const branches = await payload.find({
        collection: 'branches',
        draft: false,
        limit: 1000,
    })

    const params: { slug: string; service: string }[] = []

    // For each branch, get its services
    for (const branch of branches.docs) {
        const services = await payload.find({
            collection: 'services',
            draft: false,
            limit: 1000,
            where: {
                branch: {
                    equals: branch.id,
                },
            },
        })

        // Add each service to params
        services.docs.forEach((serviceDoc) => {
            if (typeof branch.slug === 'string' && typeof serviceDoc.slug === 'string') {
                params.push({
                    slug: branch.slug,
                    service: serviceDoc.slug,
                })
            }
        })
    }

    return params
}

// Generate metadata
export async function generateMetadata({ params }: Args): Promise<Metadata> {
    const { slug: branchSlug, service: serviceSlug } = await params
    const branch = await queryBranchBySlug({ slug: branchSlug })

    if (!branch) {
        return {
            title: 'Branch Not Found',
            description: 'The requested diagnostic center branch could not be found.',
        }
    }

    const service = await queryServiceBySlugAndBranch({ slug: serviceSlug, branchId: branch.id })

    if (!service) {
        return {
            title: 'Service Not Found',
            description: 'The requested service could not be found at this branch.',
        }
    }

    return {
        title: service.meta?.title || `${service.title} - ${branch.name}`,
        description: service.meta?.description || '',
        openGraph: {
            title: service.meta?.title || `${service.title} - ${branch.name}`,
            description: service.meta?.description || '',
            images: service.meta?.image
                ? [
                    {
                        url:
                            typeof service.meta.image === 'object' && 'url' in service.meta.image
                                ? service.meta.image.url || ''
                                : '',
                    },
                ]
                : [],
        },
    }
}

export default async function BranchServicePage({ params }: Args) {
    const { slug: branchSlug, service: serviceSlug } = await params
    const { isEnabled: draft } = await draftMode()

    const url = `/${branchSlug}/services/${serviceSlug}`
    const segments = [branchSlug, serviceSlug]

    const branch = await queryBranchBySlug({ slug: branchSlug })

    if (!branch) {
        return <div>Branch Not Found</div>
    }

    const service = await queryServiceBySlugAndBranch({ slug: serviceSlug, branchId: branch.id })

    if (!service) {
        return <div>Service Not Found at this Branch</div>
    }

    // Get image URLs
    const featuredImageUrl =
        typeof service.overview?.featuredImage === 'object' &&
            service.overview.featuredImage &&
            'url' in service.overview.featuredImage
            ? service.overview.featuredImage.url
            : '/radiography.webp'

    const serviceImageUrl =
        typeof service.serviceContent?.image === 'object' &&
            service.serviceContent.image &&
            'url' in service.serviceContent.image
            ? service.serviceContent.image.url
            : featuredImageUrl

    // Extract contact details from branch
    const mainPhone =
        branch.contact?.phone && branch.contact.phone.length > 0
            ? branch.contact.phone[0]?.number || '+919061060000'
            : '+919061060000'

    const email = branch.contact?.email || 'mail@yourcenter.in'

    return (
        <main>
            <PayloadRedirects disableNotFound url={url} />
            {draft && <LivePreviewListener />}

            {/* Page Title / Hero */}
            <PageTitle
                image={featuredImageUrl || '/radiography.webp'}
                title={service.title}
                segments={segments}
            />

            {/* Main Content Section */}
            <section className="section-spacing">
                <div className="container flex max-lg:flex-col gap-20">
                    {/* Left Column - Main Content (2/3 width) */}
                    <div className="w-full lg:w-2/3 space-y-4 sm:space-y-6">
                        {/* Service Image */}
                        {serviceImageUrl && (
                            <Image
                                src={serviceImageUrl}
                                alt={service.title}
                                width={800}
                                height={420}
                                className="w-full h-[370px] sm:h-[420px] object-cover rounded-3xl"
                            />
                        )}

                        {/* Service Heading */}
                        <h2 className="max-sm:!text-3xl max-sm:!leading-9">
                            {service.serviceContent?.heading || service.title}
                        </h2>

                        {/* Long Description */}
                        <p>{service.serviceContent?.longDescription}</p>

                        {/* Why Choose Us Section */}
                        {service.whyChooseUs && (
                            <div className="space-y-4">
                                <h3 className="!text-3xl max-sm:!text-2xl">
                                    {service.whyChooseUs.heading || 'Why Choose Us?'}
                                </h3>
                                <p>{service.whyChooseUs.intro}</p>

                                <ul className="grid sm:grid-cols-2 gap-x-10 gap-y-10 mt-8">
                                    {service.whyChooseUs.benefits?.map((item, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            {/* Icon Container */}
                                            <div className="p-3 bg-primary/35 shadow flex-center [border-radius:70%_30%_30%_70%_/_60%_40%_60%_40%]">
                                                <CircleCheckBig className="w-5 h-5" fill="#C4C93B" stroke="#735D2B" />
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
                        {service.whyChooseUs?.endingParagraph && (
                            <p className="mt-8">{service.whyChooseUs.endingParagraph}</p>
                        )}

                        {/* Contact Button */}
                        <Button asChild>
                            <Link href="/contact">Contact Us Today</Link>
                        </Button>
                    </div>

                    {/* Right Column - Sidebar (1/3 width) */}
                    <div className="w-full lg:w-1/3 space-y-8">
                        {/* Service Menu */}
                        <ServiceMenu branch={branchSlug} />

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
                                    <span className="text-3xl font-semibold text-white">{mainPhone}</span>
                                    <span className="flex items-center gap-3 font-medium text-white mt-4">
                                        <div className="bg-primary rounded-2xl p-1">
                                            <Mail className="stroke-white" />
                                        </div>
                                        {email}
                                    </span>

                                    <Button asChild className="mt-6 w-full">
                                        <Link href={`tel:${mainPhone.replace(/\s/g, '')}`}>Contact Us</Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Page CTA */}
            <PageCTA />
        </main>
    )
}
