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

export const IconListBlock: React.FC<IconListBlockProps> = ({ iconListItems }) => {
    if (!iconListItems) return null

    return (
        <div className="w-full">
            <ul className="space-y-4">
                {iconListItems.map((item, index) => {
                    // Helper for link wrapping
                    const hasLink = item.link && (item.link.type === 'custom' ? item.link.url : item.link.reference)
                    const content = (
                        <div className="flex items-center gap-3">
                            <div className="flex-shrink-0 text-primary">
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
                            <span className="text-lg">{item.text}</span>
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
    )
}
