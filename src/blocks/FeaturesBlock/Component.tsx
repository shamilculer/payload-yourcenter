import React from 'react'
import * as LucideIcons from 'lucide-react'
import Image from 'next/image'
import { CMSLink } from '@/components/Link'
import type { FeaturesBlock as FeaturesBlockProps } from '@/payload-types'
import { cn } from '@/utilities/ui'

// Helper to render dynamic Lucide icon
const RenderIcon = ({ name, className }: { name: string; className?: string }) => {
    const Icon = (LucideIcons as any)[name]
    if (!Icon) return <LucideIcons.HelpCircle className={className} />
    return <Icon className={className} />
}

import { getBlockStyles } from '@/utilities/getBlockStyles'

export const FeaturesBlockComponent: React.FC<FeaturesBlockProps> = (props) => {
    const { features, columns = '4', gap = 'lg', settings } = props

    const { className, style } = getBlockStyles(settings)

    if (!features || features.length === 0) return null

    // Grid column mappings
    const gridColumns = {
        '2': 'sm:grid-cols-2',
        '3': 'sm:grid-cols-2 lg:grid-cols-3',
        '4': 'sm:grid-cols-2 lg:grid-cols-4',
        '6': 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6',
    }

    // Gap mappings
    const gapClasses = {
        sm: 'gap-4',
        md: 'gap-5',
        lg: 'gap-x-5 gap-y-8 lg:gap-y-0 lg:gap-x-8',
        xl: 'gap-x-6 gap-y-10 lg:gap-y-0 lg:gap-x-10',
    }

    // Background color mappings
    const backgroundColors = {
        orange: '#fff7ed',
        cyan: '#ecfeff',
        yellow: '#fffbeb',
        green: '#ecfdf5',
        purple: '#faf5ff',
        pink: '#fdf2f8',
    }

    // Hover background color mappings
    const hoverBackgroundColors = {
        primary: 'hover:bg-primary',
        secondary: 'hover:bg-secondary',
        accent: 'hover:bg-accent',
    }

    const gridClass = gridColumns[columns as keyof typeof gridColumns] || gridColumns['4']
    const gapClass = gapClasses[gap as keyof typeof gapClasses] || gapClasses.lg

    return (
        <section className={className} style={style}>
            <div className="container">
                <div className={cn('grid grid-cols-1', gridClass, gapClass, 'max-sm:px-3')}>
                    {features.map((feature, index) => {
                        const {
                            iconType,
                            iconImage,
                            iconName,
                            title,
                            description,
                            backgroundColor = 'orange',
                            customBackgroundColor,
                            enableHoverEffect = true,
                            hoverBackgroundColor = 'primary',
                            customHoverColor,
                            link,
                        } = feature

                        // Determine background color
                        const bgColor =
                            backgroundColor === 'custom'
                                ? customBackgroundColor
                                : backgroundColors[backgroundColor as keyof typeof backgroundColors]

                        // Determine hover class
                        const hoverClass =
                            enableHoverEffect && hoverBackgroundColor !== 'custom'
                                ? hoverBackgroundColors[hoverBackgroundColor as keyof typeof hoverBackgroundColors]
                                : ''

                        const content = (
                            <div
                                className={cn(
                                    'group relative w-full rounded-2xl p-4 transition-all duration-500 max-md:mx-auto',
                                    enableHoverEffect && hoverClass,
                                )}
                                style={{
                                    backgroundColor: bgColor || "transparent",
                                    ...(enableHoverEffect &&
                                        hoverBackgroundColor === 'custom' &&
                                        customHoverColor && {
                                        ['--hover-bg' as any]: customHoverColor,
                                    }),
                                }}
                            >
                                {/* Icon */}
                                <div className="bg-white rounded-full flex justify-center items-center mb-5 size-20">
                                    {iconType === 'upload' && iconImage && typeof iconImage === 'object' ? (
                                        (() => {
                                            // Use Cloudinary URL if available
                                            if (iconImage.cloudinary?.secure_url) {
                                                return (
                                                    <Image
                                                        src={iconImage.cloudinary.secure_url}
                                                        height={56}
                                                        width={56}
                                                        alt={title}
                                                        className="w-14"
                                                    />
                                                )
                                            }
                                            // Fallback to constructing from public_id
                                            if (iconImage.cloudinary?.public_id) {
                                                const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dpycn77pf'
                                                return (
                                                    <Image
                                                        src={`https://res.cloudinary.com/${cloudName}/image/upload/${iconImage.cloudinary.public_id}`}
                                                        height={56}
                                                        width={56}
                                                        alt={title}
                                                        className="w-14"
                                                    />
                                                )
                                            }
                                            // Final fallback to local URL
                                            if ('url' in iconImage && iconImage.url) {
                                                return (
                                                    <Image
                                                        src={iconImage.url}
                                                        height={56}
                                                        width={56}
                                                        alt={title}
                                                        className="w-14"
                                                    />
                                                )
                                            }
                                            return null
                                        })()
                                    ) : (
                                        <RenderIcon name={iconName || 'Box'} className="w-14 h-14" />
                                    )}
                                </div>

                                {/* Title */}
                                <h4
                                    className={cn(
                                        'text-xl font-semibold text-gray-900 mb-3 capitalize transition-all duration-500',
                                        enableHoverEffect && 'group-hover:!text-white',
                                    )}
                                >
                                    {title}
                                </h4>

                                {/* Description */}
                                <p
                                    className={cn(
                                        'text-sm font-normal text-gray-500 transition-all duration-500 leading-5',
                                        enableHoverEffect && 'group-hover:!text-white',
                                    )}
                                >
                                    {description}
                                </p>
                            </div>
                        )

                        // Wrap in link if provided
                        if (link && (link.type === 'custom' ? link.url : link.reference)) {
                            return (
                                <CMSLink
                                    key={index}
                                    {...link}
                                    appearance="inline"
                                    label={null}
                                    className="no-underline w-full"
                                >
                                    {content}
                                </CMSLink>
                            )
                        }

                        return <div key={index}>{content}</div>
                    })}
                </div>
            </div>
        </section>
    )
}

export { FeaturesBlockComponent as FeaturesBlock }
