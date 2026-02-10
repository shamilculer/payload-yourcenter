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

import { getBlockStyles, getContainerStyles } from '@/utilities/getBlockStyles'

export const IconBoxBlock: React.FC<IconBoxBlockProps & { settings?: any }> = (props) => {
    const {
        iconType,
        iconName,
        iconImage,
        title,
        description,
        link,
        padding = 'medium',
        gap = 'medium',
        cardBorderRadius = 'xl',
        shadow = 'sm',
        iconShape = 'circle',
        iconSize = 'medium',
        backgroundColor = 'white',
        customBackgroundColor,
        iconColor,
        iconBackgroundColor,
        enableHoverEffect = false,
        hoverBackgroundColor = 'primary',
        customHoverColor,
        alignment = 'left',
        settings,
    } = props

    // Padding mappings
    const paddingClasses = {
        small: 'p-4',
        medium: 'p-6',
        large: 'p-8',
    }

    // Gap mappings
    const gapClasses = {
        small: 'gap-3',
        medium: 'gap-4',
        large: 'gap-6',
        xl: 'gap-9',
    }

    // Border radius mappings
    const borderRadiusClasses = {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        '2xl': 'rounded-2xl',
    }

    // Shadow mappings
    const shadowClasses = {
        none: '',
        sm: 'shadow-sm',
        md: 'shadow-md',
        lg: 'shadow-lg',
    }

    // Icon shape mappings
    const iconShapeClasses = {
        circle: 'rounded-full',
        square: 'rounded-xl',
        organic: '[border-radius:70%_30%_30%_70%_/_60%_40%_60%_40%]',
    }

    // Icon size mappings
    const iconSizeClasses = {
        small: 'w-8 h-8',
        medium: 'w-12 h-12',
        large: 'w-14 h-14',
    }

    // Background color mappings
    const backgroundColors = {
        white: '#ffffff',
        card: 'bg-card',
        orange: '#fff7ed',
        cyan: '#ecfeff',
        yellow: '#fffbeb',
        green: '#ecfdf5',
        purple: '#faf5ff',
        pink: '#fdf2f8',
    }

    const hoverBackgroundColors = {
        primary: 'hover:bg-primary',
        secondary: 'hover:bg-secondary',
        accent: 'hover:bg-accent',
    }

    const bgColor =
        backgroundColor === 'custom'
            ? customBackgroundColor
            : backgroundColor === 'card'
                ? undefined
                : backgroundColors[backgroundColor as keyof typeof backgroundColors]

    const bgClass = backgroundColor === 'card' ? backgroundColors.card : ''

    const hoverClass =
        enableHoverEffect && hoverBackgroundColor !== 'custom'
            ? hoverBackgroundColors[hoverBackgroundColor as keyof typeof hoverBackgroundColors]
            : ''

    const content = (
        <div
            className={cn(
                'flex flex-col transition-all w-full duration-500 h-full',
                paddingClasses[padding as keyof typeof paddingClasses],
                gapClasses[gap as keyof typeof gapClasses],
                borderRadiusClasses[cardBorderRadius as keyof typeof borderRadiusClasses],
                shadowClasses[shadow as keyof typeof shadowClasses],
                alignment === 'left' ? 'items-start text-left' : 'items-center text-center',
                bgClass,
                backgroundColor !== 'card' && 'border',
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
                    'p-4 flex justify-center items-center transition-colors text-white',
                    iconShapeClasses[iconShape as keyof typeof iconShapeClasses],
                )}
                style={{
                    backgroundColor: iconBackgroundColor || 'var(--primary)',
                    color: iconColor || '#ffffff',
                }}
            >
                {iconType === 'upload' && iconImage && typeof iconImage === 'object' ? (
                    (() => {
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
                        className={iconSizeClasses[iconSize as keyof typeof iconSizeClasses]}
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

    const { className, style } = getBlockStyles(settings)

    return (
        <div className={className} style={style}>
            <div className={cn(getContainerStyles(settings), "h-full")}>
                {link && (link.type === 'custom' ? link.url : link.reference) ? (
                    <CMSLink {...link} appearance="inline" label={null} className="no-underline w-full h-full block">
                        {content}
                    </CMSLink>
                ) : (
                    content
                )}
            </div>
        </div>
    )
}
