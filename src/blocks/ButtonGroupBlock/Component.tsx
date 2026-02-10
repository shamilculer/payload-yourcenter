import React from 'react'
import { ButtonGroupBlock as ButtonGroupBlockProps } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { getBlockStyles } from '@/utilities/getBlockStyles'
import { cn } from '@/utilities/ui'

export const ButtonGroupBlock: React.FC<ButtonGroupBlockProps & { settings?: any }> = (props) => {
    const { links, settings, layout, alignment, gap } = props
    const { className, style } = getBlockStyles(settings)

    if (!links || links.length === 0) return null

    const layoutClass = layout === 'column' ? 'flex-col' : 'flex-row flex-wrap'

    const alignmentClass = {
        start: 'justify-start items-start',
        center: 'justify-center items-center',
        end: 'justify-end items-end',
        between: 'justify-between items-center',
    }[alignment || 'start']

    const gapClass = {
        small: 'gap-2',
        medium: 'gap-4',
        large: 'gap-6',
    }[gap || 'medium']

    return (
        <div className={cn(className, "flex w-full", layoutClass, alignmentClass, gapClass)} style={style}>
            {links.map((link, i) => (
                <CMSLink key={i} {...link.link} />
            ))}
        </div>
    )
}
