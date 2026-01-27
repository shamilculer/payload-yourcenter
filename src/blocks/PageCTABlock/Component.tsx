import { PhoneCall, Send } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import React from 'react'

import { Button } from "@/components/ui/button"
import type { PageCTABlock as PageCTABlockProps } from '@/payload-types'

export const PageCTABlockComponent: React.FC<PageCTABlockProps> = (props) => {
    const {
        backgroundImage,
        eyebrow,
        heading,
        description,
        primaryButton,
        secondaryButton,
    } = props

    return (
        <section className="w-full py-10 min-h-[420px] relative flex-center">
            {/* Background Image */}
            {(() => {
                if (typeof backgroundImage === 'object' && backgroundImage !== null) {
                    // Use Cloudinary URL if available
                    if (backgroundImage.cloudinary?.secure_url) {
                        return (
                            <Image
                                height={300}
                                width={1400}
                                alt={backgroundImage.alt || 'CTA Background'}
                                src={backgroundImage.cloudinary.secure_url}
                                className="w-full h-full object-cover absolute top-0 left-0"
                            />
                        );
                    }
                    // Fallback to constructing from public_id
                    if (backgroundImage.cloudinary?.public_id) {
                        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dpycn77pf';
                        return (
                            <Image
                                height={300}
                                width={1400}
                                alt={backgroundImage.alt || 'CTA Background'}
                                src={`https://res.cloudinary.com/${cloudName}/image/upload/${backgroundImage.cloudinary.public_id}`}
                                className="w-full h-full object-cover absolute top-0 left-0"
                            />
                        );
                    }
                    // Final fallback to local URL
                    if ('url' in backgroundImage && backgroundImage.url) {
                        return (
                            <Image
                                height={300}
                                width={1400}
                                alt={backgroundImage.alt || 'CTA Background'}
                                src={backgroundImage.url}
                                className="w-full h-full object-cover absolute top-0 left-0"
                            />
                        );
                    }
                }
                return null;
            })()}

            {/* Gradient Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-50% from-accent to-black/50 md:to-transparent"></div>

            {/* Content */}
            <div className="container z-10 flex items-center">
                <div className="sm:w-1/2">
                    <div>
                        {eyebrow && (
                            <span className="leading-0 py-1.5 px-3 rounded-3xl uppercase font-medium text-white border border-gray-300 bg-primary/20">
                                {eyebrow}
                            </span>
                        )}
                        <h2 className="mt-4 !text-white">{heading}</h2>
                        <p className="text-white mt-4 sm:w-4/5">{description}</p>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex items-center gap-3 mt-6">
                        {primaryButton && (
                            <Button asChild>
                                <Link href={`tel:${primaryButton.phoneNumber}`}>
                                    <PhoneCall />
                                    {primaryButton.label}
                                </Link>
                            </Button>
                        )}

                        {secondaryButton && (
                            <Button asChild>
                                <Link href={secondaryButton.url || '#'}>
                                    <Send />
                                    {secondaryButton.label}
                                </Link>
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export { PageCTABlockComponent as PageCTABlock }
