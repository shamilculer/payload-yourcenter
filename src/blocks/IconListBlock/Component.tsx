import React from 'react'
import * as LucideIcons from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import type { IconListBlock as IconListBlockProps } from '@/payload-types'
import { CMSLink } from '@/components/Link'

// Helper to render dynamic Lucide icon
const RenderIcon = ({ name, className }: { name: string; className?: string }) => {
    const Icon = (LucideIcons as any)[name]
    if (!Icon) return <LucideIcons.HelpCircle className={className} />
    return <Icon className={className} />
}

import { getBlockStyles } from '@/utilities/getBlockStyles'
import { cn } from '@/utilities/ui'

export const IconListBlock: React.FC<IconListBlockProps & { settings?: any }> = ({ iconListItems, settings }) => {
    if (!iconListItems) return null

    const { className, style } = getBlockStyles(settings)

    return (
        <div className={className} style={style}>
            <div className="w-full">
                <ul className="space-y-4">
                    {iconListItems.map((item, index) => {
                        // Helper for link wrapping
                        const hasLink = item.link && (item.link.type === 'custom' ? item.link.url : item.link.reference)

                        // Map color values to Tailwind classes
                        const colorMap: Record<string, string> = {
                            primary: 'text-primary',
                            secondary: 'text-secondary',
                            accent: 'text-accent',
                            destructive: 'text-destructive',
                            muted: 'text-muted-foreground',
                            message: 'text-message',
                            success: 'text-green-600',
                            warning: 'text-yellow-600',
                            white: 'text-white',
                            black: 'text-black',
                        }

                        const colorClass = colorMap[item.iconColor || 'primary'] || 'text-primary'

                        const content = (
                            <div className="flex items-center gap-3">
                                <div className={cn("flex-shrink-0", colorClass)}>
                                    {item.iconType === 'upload' && item.iconImage && typeof item.iconImage === 'object' && 'url' in item.iconImage ? (
                                        <Image
                                            src={item.iconImage.url || ''}
                                            alt={item.text}
                                            width={24}
                                            height={24}
                                            className="w-6 h-6 object-contain"
                                        />
                                    ) : (
                                        <RenderIcon name={item.iconName || 'Circle'} className="w-6 h-6" />
                                    )}
                                </div>
                                <span className="text-base">{item.text}</span>
                            </div>
                        )

                        return (
                            <li key={index}>
                                {hasLink ? (
                                    <CMSLink {...item.link} className="hover:underline">
                                        {content}
                                    </CMSLink>
                                ) : content}
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}
