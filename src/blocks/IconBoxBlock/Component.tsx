import React from 'react'
import * as LucideIcons from 'lucide-react'
import Image from 'next/image'

import type { IconBoxBlock as IconBoxBlockProps } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'

// Helper to render dynamic Lucide icon
const RenderIcon = ({ name, className }: { name: string; className?: string }) => {
    const Icon = (LucideIcons as any)[name]
    if (!Icon) return <LucideIcons.HelpCircle className={className} />
    return <Icon className={className} />
}

export const IconBoxBlock: React.FC<IconBoxBlockProps> = (props) => {
    const {
        iconType,
        iconName,
        iconImage,
        title,
        description,
        link,
        backgroundColor = 'card',
        customBackgroundColor,
        iconColor,
        enableHoverEffect = false,
        hoverBackgroundColor = 'primary',
        customHoverColor,
        alignment = 'center',
    } = props

    // Preset background color mappings
    const backgroundColors = {
        card: 'bg-card',
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

    // Determine background
    const bgColor =
        backgroundColor === 'custom'
            ? customBackgroundColor
            : backgroundColor === 'card'
                ? undefined
                : backgroundColors[backgroundColor as keyof typeof backgroundColors]

    const bgClass = backgroundColor === 'card' ? backgroundColors.card : ''

    // Determine hover class
    const hoverClass =
        enableHoverEffect && hoverBackgroundColor !== 'custom'
            ? hoverBackgroundColors[hoverBackgroundColor as keyof typeof hoverBackgroundColors]
            : ''

    const content = (
        <div
            className={cn(
                'p-6 rounded-xl border shadow-sm flex flex-col gap-4 transition-all w-full duration-500',
                alignment === 'left' ? 'items-start text-left' : 'items-center text-center',
                bgClass,
                enableHoverEffect && 'group',
                enableHoverEffect && hoverClass,
            )}
            style={{
                backgroundColor: bgColor || undefined,
                borderColor: backgroundColor !== 'card' ? 'transparent' : undefined,
            }}
        >
            {/* Icon Container */}
            <div
                className={cn(
                    'rounded-full flex justify-center items-center transition-colors',
                    backgroundColor === 'card' ? 'p-3 bg-primary/10 text-primary' : 'bg-white size-20',
                    enableHoverEffect && backgroundColor !== 'card' && 'bg-white',
                )}
                style={{
                    backgroundColor:
                        backgroundColor === 'card' && !enableHoverEffect && iconColor
                            ? `${iconColor}20`
                            : undefined,
                    color: backgroundColor === 'card' && iconColor ? iconColor : undefined,
                }}
            >
                {iconType === 'upload' && iconImage && typeof iconImage === 'object' ? (
                    (() => {
                        // Use Cloudinary URL if available
                        if (iconImage.cloudinary?.secure_url) {
                            return (
                                <Image
                                    src={iconImage.cloudinary.secure_url}
                                    alt={title}
                                    width={backgroundColor === 'card' ? 32 : 56}
                                    height={backgroundColor === 'card' ? 32 : 56}
                                    className={backgroundColor === 'card' ? 'w-8 h-8' : 'w-14'}
                                />
                            )
                        }
                        // Fallback to constructing from public_id
                        if (iconImage.cloudinary?.public_id) {
                            const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dpycn77pf'
                            return (
                                <Image
                                    src={`https://res.cloudinary.com/${cloudName}/image/upload/${iconImage.cloudinary.public_id}`}
                                    alt={title}
                                    width={backgroundColor === 'card' ? 32 : 56}
                                    height={backgroundColor === 'card' ? 32 : 56}
                                    className={backgroundColor === 'card' ? 'w-8 h-8' : 'w-14'}
                                />
                            )
                        }
                        // Final fallback to local URL
                        if ('url' in iconImage && iconImage.url) {
                            return (
                                <Image
                                    src={iconImage.url}
                                    alt={title}
                                    width={backgroundColor === 'card' ? 32 : 56}
                                    height={backgroundColor === 'card' ? 32 : 56}
                                    className={backgroundColor === 'card' ? 'w-8 h-8 object-contain' : 'w-14'}
                                />
                            )
                        }
                        return null
                    })()
                ) : (
                    <RenderIcon
                        name={iconName || 'Box'}
                        className={backgroundColor === 'card' ? 'w-8 h-8' : 'w-14 h-14'}
                    />
                )}
            </div>

            {/* Content */}
            <div>
                <h3
                    className={cn(
                        'text-xl font-semibold mb-2 transition-colors',
                        backgroundColor === 'card' ? '' : 'text-gray-900 capitalize',
                        enableHoverEffect && 'group-hover:!text-white',
                    )}
                >
                    {title}
                </h3>
                {description && (
                    <p
                        className={cn(
                            'transition-colors',
                            backgroundColor === 'card' ? 'text-muted-foreground' : 'text-sm font-normal text-gray-500 leading-5',
                            enableHoverEffect && 'group-hover:!text-white',
                        )}
                    >
                        {description}
                    </p>
                )}
            </div>

            {link && (link.type === 'custom' ? link.url : link.reference) && !enableHoverEffect && (
                <div className={cn('mt-2 text-primary font-medium transition-colors')}>Link &rarr;</div>
            )}
        </div>
    )

    if (link && (link.type === 'custom' ? link.url : link.reference)) {
        return (
            <CMSLink {...link} appearance="inline" label={null} className="no-underline w-full">
                {content}
            </CMSLink>
        )
    }

    return <div className="w-full">{content}</div>
}
