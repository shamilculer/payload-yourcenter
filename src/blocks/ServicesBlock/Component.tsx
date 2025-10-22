import type { ServicesSectionBlock as ServicesSectionBlockData, Media } from '@/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

import Image from "next/image"
import Link from "next/link"
import { Button } from '@/components/ui/button'
import { CircleArrowOutUpRight } from "lucide-react"

// --- TYPE DEFINITIONS ---

// Define a type for Media that explicitly includes the sizes object for optimization
interface OptimizedMedia extends Media {
    sizes?: {
        medium?: {
            url?: string;
        }
    }
}

// Define the shape of a service document required for the card
interface ServiceType {
    id: string;
    title: string;
    slug: string;
    overview: {
        featuredImage: OptimizedMedia; // Use the optimized media type
        linkLabel: string;
        overviewDescription: any; // RichText data (Lexical JSON)
    };
    publishedAt?: string;
}

// Define the component signature as an Async Server Component
export const ServicesBlock: React.FC<
    ServicesSectionBlockData & {
        id?: string;
    }
> = async (props) => {
    // REMOVED ctaLabel from destructuring
    const { eyebrow, heading, limit: limitFromProps, id } = props

    // Determine the limit, defaulting to 3
    const limit = limitFromProps || 3

    let services: ServiceType[] = []

    try {
        const payload = await getPayload({ config: configPromise })

        // The fetch is performed unconditionally
        const fetchedServices = await payload.find({
            collection: 'services',
            // We need depth 1 to populate overview.featuredImage and overview.linkLabel
            depth: 1,
            limit,
            // Sort by 'createdAt' in ascending order (first added shows first)
            sort: 'createdAt',
            where: {
                _status: { equals: 'published' }
            }
        })

        // Cast the docs to our ServiceType array
        services = fetchedServices.docs as ServiceType[]
    } catch (error) {
        console.error('Error fetching services for ServicesSectionBlock:', error)
    }

    if (!services || services.length === 0) {
        return null;
    }

    // Helper to safely extract and clean the description from RichText data for the card summary
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
        // Attempt to extract plain text from Lexical JSON structure
        return "Click to learn more about this service.";
    }

    return (
        <section className="section-spacing-b" id={`block-${id}`}>
            <div className="container space-y-7 sm:space-y-12">

                {/* Dynamic Header Area */}
                <div className="w-full flex items-end gap-20">
                    <div className="w-full lg:w-2/3">
                        {eyebrow && (
                            <span className="leading-0 py-1.5 px-3 rounded-3xl uppercase font-medium text-accent border border-gray-300 bg-primary/20 max-sm:text-sm">
                                {eyebrow}
                            </span>
                        )}
                        <h2 className="mt-4">{heading}</h2>
                    </div>
                </div>

                {/* Dynamic Services Grid */}
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-14 gap-x-12 max-sm:px-3">
                    {services.map((service) => {
                        const featuredMedia = service.overview?.featuredImage;
                        // Use medium size for performance, fall back to main URL
                        const imageUrl = (() => {
                            if (typeof featuredMedia === 'object' && featuredMedia) {
                                // Use Cloudinary URL if available
                                if (featuredMedia.cloudinary?.secure_url) {
                                    return featuredMedia.cloudinary.secure_url;
                                }
                                // Fallback to constructing from public_id
                                if (featuredMedia.cloudinary?.public_id) {
                                    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dpycn77pf';
                                    return `https://res.cloudinary.com/${cloudName}/image/upload/${featuredMedia.cloudinary.public_id}`;
                                }
                                // Fallback to size-specific URLs
                                return featuredMedia?.sizes?.medium?.url || featuredMedia?.url;
                            }
                            return '';
                        })();
                        const imageAlt = featuredMedia?.alt || service.title;

                        const serviceUrl = `/services/${service.slug}`;
                        const descriptionText = cleanDescription(service.overview?.overviewDescription);
                        // Get the link label from the service overview, defaulting if needed
                        const linkLabel = service.overview?.linkLabel || 'Read More';

                        return (
                            <article
                                key={service.id}
                                className="group bg-accent min-h-96 rounded-4xl max-sm:py-5 max-sm:px-4 sm:p-5 space-y-5 sm:space-y-3 transition-all delay-200"
                            >
                                {/* Image Wrapper */}
                                <Link href={serviceUrl} className="block w-full h-68 relative overflow-hidden rounded-3xl">
                                    {imageUrl ? (
                                        <Image
                                            src={imageUrl}
                                            fill
                                            className="object-cover rounded-3xl"
                                            alt={imageAlt}
                                        />
                                    ) : (
                                        // Fallback if image data is missing
                                        <div className="w-full h-68 bg-gray-500 rounded-3xl flex items-center justify-center text-white">
                                            Image Not Available
                                        </div>
                                    )}
                                </Link>

                                {/* Content */}
                                <div className="mt-6 space-y-3 px-3">
                                    <h3 className="!text-white text-xl font-semibold">{service.title}</h3>
                                    <p className="text-gray-200 line-clamp-3">{descriptionText}</p>

                                    {/* Button - Now uses the service's linkLabel */}
                                    <Link href={serviceUrl}>
                                        <Button className="bg-primary hover:bg-accent hover:shadow-lg transition-all">
                                            {linkLabel} <CircleArrowOutUpRight className="ml-2 w-4 h-4" />
                                        </Button>
                                    </Link>
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
