import React from 'react'
import type { TitleBlock as TitleBlockProps } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { getBlockStyles } from '@/utilities/getBlockStyles'

export const TitleBlock: React.FC<TitleBlockProps> = (props) => {
    const { eyebrow, title, description, align, settings } = props

    const { className: blockClass, style } = getBlockStyles(settings)

    return (
        <div
            className={cn(
                "w-full flex flex-col gap-4",
                align === 'center' && "items-center text-center",
                align === 'right' && "items-end text-right",
                blockClass
            )}
            style={style}
        >
            {eyebrow && (
                <span className="py-1.5 px-3 rounded-3xl uppercase font-medium text-accent border border-gray-300 bg-primary/20 max-sm:text-sm w-fit">
                    {eyebrow}
                </span>
            )}
            {title && <h2 className="text-3xl font-bold max-w-[900px] capitalize">{title}</h2>}
            {description && <p className="text-gray-600 max-w-2xl">{description}</p>}
        </div>
    )
}
