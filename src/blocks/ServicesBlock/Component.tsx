import type { ServicesSectionBlock as ServicesSectionBlockData, Media, Branch } from '@/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

import Image from "next/image"
import Link from "next/link"
import { Button } from '@/components/ui/button'
import { CircleArrowOutUpRight } from "lucide-react"
import { getBlockStyles, getContainerStyles } from '@/utilities/getBlockStyles'
import { cn } from '@/utilities/ui'

// --- TYPE DEFINITIONS ---
interface OptimizedMedia extends Media {
    sizes?: {
        medium?: {
            url?: string;
        }
    }
}

interface ServiceType {
    id: string;
    title: string;
    slug: string;
    overview: {
        featuredImage: OptimizedMedia;
        linkLabel: string;
        overviewDescription: any;
    };
    publishedAt?: string;
}

export const ServicesBlock: React.FC<
    ServicesSectionBlockData & {
        id?: string;
        settings?: any;
    }
> = async (props) => {
    const { eyebrow, heading, limit: limitFromProps, id, headingAlignment = 'left', filterByBranch, selectedBranch, settings } = props

    const limit = limitFromProps || 3

    let services: ServiceType[] = []

    try {
        const payload = await getPayload({ config: configPromise })

        const whereQuery: any = {
            _status: { equals: 'published' }
        }

        if (filterByBranch && selectedBranch) {
            const branchId = typeof selectedBranch === 'object' ? selectedBranch.id : selectedBranch
            whereQuery.branch = { equals: branchId }
        }

        const fetchedServices = await payload.find({
            collection: 'services',
            depth: 1,
            limit,
            sort: 'createdAt',
            where: whereQuery
        })

        services = fetchedServices.docs as ServiceType[]
    } catch (error) {
        console.error('Error fetching services for ServicesSectionBlock:', error)
    }

    if (!services || services.length === 0) {
        return null; // Or return placeholder if in admin/edit mode?
    }

    const cleanDescription = (data: any): string => {
        if (
            data &&
            data.root &&
            Array.isArray(data.root.children) &&
            data.root.children.length > 0 &&
            Array.isArray(data.root.children[0].children) &&
            data.root.children[0].children.length > 0 &&
            typeof data.root.children[0].children[0].text === 'string'
        ) {
            return data.root.children[0].children[0].text.replace(/<[^>]*>?/gm, '');
        }
        return "Click to learn more about this service.";
    }

    const isCenterAligned = headingAlignment === 'center'

    const { className, style } = getBlockStyles(settings)

    return (
        <section className={className} style={style} id={`block-${id}`}>
            <div className={cn(getContainerStyles(settings), "space-y-7 sm:space-y-12")}>

                {/* Section Header */}
                <div className={cn("w-full flex items-end gap-20", isCenterAligned && "justify-center")}>
                    <div className={cn("w-full lg:w-2/3", isCenterAligned && "flex flex-col items-center text-center")}>
                        {eyebrow && (
                            <span className={cn(
                                "py-1.5 px-3 rounded-3xl uppercase font-medium text-accent border border-gray-300 bg-primary/20 max-sm:text-sm",
                                !isCenterAligned && "leading-none"
                            )}>
                                {eyebrow}
                            </span>
                        )}
                        <h2 className="mt-4">{heading}</h2>
                    </div>
                </div>

                {/* Services Grid */}
                <div className={cn(
                    "w-full gap-y-14 gap-x-12 max-sm:px-3",
                    services.length < 3
                        ? 'flex flex-wrap justify-center' // Flex for centering few items
                        : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                )}>
                    {services.map((service) => {
                        const featuredMedia = service.overview?.featuredImage;
                        const imageUrl = (() => {
                            if (typeof featuredMedia === 'object' && featuredMedia) {
                                if (featuredMedia.cloudinary?.secure_url) return featuredMedia.cloudinary.secure_url;
                                if (featuredMedia.cloudinary?.public_id) {
                                    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dpycn77pf';
                                    return `https://res.cloudinary.com/${cloudName}/image/upload/${featuredMedia.cloudinary.public_id}`;
                                }
                                return featuredMedia?.sizes?.medium?.url || featuredMedia?.url;
                            }
                            return '';
                        })();
                        const imageAlt = featuredMedia?.alt || service.title;
                        const serviceUrl = `/services/${service.slug}`;
                        const descriptionText = cleanDescription(service.overview?.overviewDescription);
                        const linkLabel = service.overview?.linkLabel || 'Read More';

                        return (
                            <article
                                key={service.id}
                                className={cn(
                                    "group bg-accent min-h-96 rounded-[2rem] max-sm:py-5 max-sm:px-4 sm:p-5 space-y-5 sm:space-y-3 transition-all delay-200 shadow-xl w-full",
                                    services.length < 3 && "max-w-96"
                                )}
                            >
                                {/* Image Wrapper */}
                                <div className="w-full h-68 relative">
                                    {imageUrl ? (
                                        <Image
                                            src={imageUrl}
                                            fill
                                            className="object-cover rounded-3xl"
                                            alt={imageAlt}
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-500 rounded-3xl flex items-center justify-center text-white">
                                            No Image
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="mt-6 space-y-3 px-1">
                                    <h3 className="!text-white text-xl font-semibold">{service.title}</h3>
                                    <p className="text-gray-200 line-clamp-3">{descriptionText}</p>

                                    <Button asChild className="bg-primary hover:bg-secondary transition-colors duration-300">
                                        <Link href={serviceUrl} className="flex items-center gap-2">
                                            {linkLabel} <CircleArrowOutUpRight className="w-4 h-4" />
                                        </Link>
                                    </Button>
                                </div>
                            </article>
                        );
                    })}
                </div>

            </div>
        </section>
    )
}

export default ServicesBlock
