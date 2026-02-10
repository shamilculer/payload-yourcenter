import Image from "next/image"
import React from 'react'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import type { CTACardBlock as CTACardBlockProps } from '@/payload-types'
import { ArrowRightCircle } from "lucide-react"

import { cn } from '@/utilities/ui'
import { getBlockStyles } from '@/utilities/getBlockStyles'

export const CTACardBlockComponent: React.FC<CTACardBlockProps> = (props) => {
    const {
        image,
        heading,
        description,
        ctaButton,
        backgroundColor = 'secondary',
        borderRadius = '2xl',
        imageHeight = '192',
        settings,
    } = props

    const { className, style } = getBlockStyles(settings)


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

    // Parse image height - ensure it's a valid number
    const imgHeight = parseInt(imageHeight || '192') || 192

    return (
        <div className={cn("bg-[#f3f3f3] p-4 rounded-3xl h-full flex flex-col justify-between gap-6", className)} style={style}>
            {/* Image Section */}
            {image && typeof image === 'object' && (
                <div className="w-full h-1/2 relative flex-1">
                    {(() => {
                        // Use Cloudinary URL if available
                        if (image.cloudinary?.secure_url) {
                            return (
                                <Image
                                    src={image.cloudinary.secure_url}
                                    width={400}
                                    height={imgHeight}
                                    alt={image.alt || heading}
                                    className="min-h-full object-cover w-full rounded-2xl h-[280px] sm:h-[var(--img-height)]"
                                    style={{ '--img-height': `${imgHeight}px` } as React.CSSProperties}
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
                                    height={imgHeight}
                                    alt={image.alt || heading}
                                    className="w-full object-cover rounded-xl h-[280px] sm:h-[var(--img-height)]"
                                    style={{ '--img-height': `${imgHeight}px` } as React.CSSProperties}
                                />
                            );
                        }
                        // Final fallback to local URL
                        if ('url' in image && image.url) {
                            return (
                                <Image
                                    src={image.url}
                                    width={400}
                                    height={imgHeight}
                                    alt={image.alt || heading}
                                    className="w-full object-cover rounded-xl h-[280px] sm:h-[var(--img-height)]"
                                    style={{ '--img-height': `${imgHeight}px` } as React.CSSProperties}
                                />
                            );
                        }
                        return null;
                    })()}
                </div>
            )}

            {/* Content Section */}
            <div className="h-1/2 w-full bg-secondary/20 rounded-2xl p-7 flex flex-col items-start gap-5">
                {/* Heading */}
                <h4 className="text-2xl !font-medium">{heading}</h4>

                {/* Description */}
                {description && (
                    <RichText data={description} enableGutter={false} />
                )}

                {/* CTA Button */}
                {ctaButton && (
                    <CMSLink
                        {...ctaButton}
                        appearance="default"
                        className="flex items-center gap-2"
                    >
                        <ArrowRightCircle className="w-5 h-5" />
                    </CMSLink>
                )}
            </div>
        </div>
    )
}

export { CTACardBlockComponent as CTACardBlock }
