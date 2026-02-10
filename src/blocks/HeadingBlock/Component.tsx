import React, { ElementType } from 'react'
import type { HeadingBlock as HeadingBlockProps } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { getBlockStyles } from '@/utilities/getBlockStyles'
import { CMSLink } from '@/components/Link'

export const HeadingBlock: React.FC<HeadingBlockProps> = ({
    text,
    level = 'h2',
    color = 'inherit',
    align = 'left',
    link,
    settings
}) => {
    const { className: blockClass, style } = getBlockStyles(settings)

    const alignmentClasses: Record<string, string> = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
    }

    const alignClass = alignmentClasses[align || 'left'] || 'text-left'

    // Ensure we have a valid tag
    const Tag = (level || 'h2') as ElementType

    const headingStyle = {
        color: color || 'inherit',
        marginBottom: 0 // Reset default margins if any
    }

    const hasLink = !!(link && 'type' in link && (
        (link.type === 'custom' && 'url' in link && link.url) ||
        (link.type === 'reference' && link.reference?.value)
    ))

    const content = (
        <Tag
            className={cn(alignClass, hasLink && 'hover:underline cursor-pointer transition-opacity hover:opacity-80')}
            style={headingStyle}
        >
            {text}
        </Tag>
    )

    return (
        <div className={cn("w-full", blockClass)} style={style}>
            {hasLink && link ? (
                <CMSLink {...(link as any)} className="block no-underline">
                    {content}
                </CMSLink>
            ) : (
                content
            )}
        </div>
    )
}
