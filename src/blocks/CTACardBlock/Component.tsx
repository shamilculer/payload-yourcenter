import Image from "next/image"
import Link from "next/link"
import React from 'react'

import { Button } from "@/components/ui/button"
import RichText from '@/components/RichText'
import type { CTACardBlock as CTACardBlockProps } from '@/payload-types'
import { ArrowRightCircle } from "lucide-react"

export const CTACardBlockComponent: React.FC<CTACardBlockProps> = (props) => {
    const {
        image,
        heading,
        description,
        ctaButton,
        backgroundColor = 'secondary',
        borderRadius = '2xl',
    } = props

    // Background color mappings
    const backgroundColors = {
        primary: 'bg-primary/20',
        secondary: 'bg-secondary/20',
        accent: 'bg-accent/20',
        muted: 'bg-muted',
        white: 'bg-white',
    }

    // Border radius mappings
    const borderRadiusClasses = {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        '2xl': 'rounded-2xl',
        '3xl': 'rounded-3xl',
    }

    const bgColor = backgroundColors[backgroundColor as keyof typeof backgroundColors] || backgroundColors.secondary
    const radiusClass = borderRadiusClasses[borderRadius as keyof typeof borderRadiusClasses] || borderRadiusClasses['2xl']

    return (
        <div className={`w-full ${bgColor} ${radiusClass} p-7 flex flex-col items-start gap-5`}>
            {/* Optional Image */}
            {image && typeof image === 'object' && (
                <div className="w-full relative">
                    {(() => {
                        // Use Cloudinary URL if available
                        if (image.cloudinary?.secure_url) {
                            return (
                                <Image
                                    src={image.cloudinary.secure_url}
                                    width={400}
                                    height={280}
                                    alt={image.alt || heading}
                                    className="w-full h-48 object-cover rounded-xl"
                                />
                            );
                        }
                        // Fallback to constructing from public_id
                        if (image.cloudinary?.public_id) {
                            const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dpycn77pf';
                            return (
                                <Image
                                    src={`https://res.cloudinary.com/${cloudName}/image/upload/${image.cloudinary.public_id}`}
                                    width={400}
                                    height={280}
                                    alt={image.alt || heading}
                                    className="w-full h-48 object-cover rounded-xl"
                                />
                            );
                        }
                        // Final fallback to local URL
                        if ('url' in image && image.url) {
                            return (
                                <Image
                                    src={image.url}
                                    width={400}
                                    height={280}
                                    alt={image.alt || heading}
                                    className="w-full h-48 object-cover rounded-xl"
                                />
                            );
                        }
                        return null;
                    })()}
                </div>
            )}

            {/* Heading */}
            <h4 className="text-2xl !font-medium">{heading}</h4>

            {/* Description */}
            {description && (
                <RichText data={description} enableGutter={false} />
            )}

            {/* CTA Button */}
            {ctaButton && (
                <Button asChild>
                    <Link href={ctaButton.url || '#'}>
                        <ArrowRightCircle /> {ctaButton.label}
                    </Link>
                </Button>
            )}
        </div>
    )
}

export { CTACardBlockComponent as CTACardBlock }
