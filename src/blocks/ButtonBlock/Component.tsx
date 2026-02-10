import React from 'react'
import { ButtonBlock as ButtonBlockProps } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { getBlockStyles } from '@/utilities/getBlockStyles'
import { cn } from '@/utilities/ui'

export const ButtonBlock: React.FC<ButtonBlockProps & { settings?: any }> = (props) => {
    const { link, settings, alignment } = props
    const { className, style } = getBlockStyles(settings)

    if (!link) return null

    const alignmentClass = {
        start: 'text-left justify-start',
        center: 'text-center justify-center',
        end: 'text-right justify-end',
    }[alignment || 'start']

    return (
        <div className={cn(className, "flex w-full", alignmentClass)} style={style}>
            <CMSLink {...link} />
        </div>
    )
}
