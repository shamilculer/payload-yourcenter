import React from 'react'
import type { TitleBlock as TitleBlockProps } from '@/payload-types'
import { cn } from '@/utilities/ui'

export const TitleBlock: React.FC<TitleBlockProps> = ({ eyebrow, title, description, align }) => {
    return (
        <div className={cn("w-full flex flex-col gap-4 mb-8",
            align === 'center' && "items-center text-center",
            align === 'right' && "items-end text-right"
        )}>
            {eyebrow && (
                <span className="py-1.5 px-3 rounded-3xl uppercase font-medium text-accent border border-gray-300 bg-primary/20 max-sm:text-sm w-fit">
                    {eyebrow}
                </span>
            )}
            {title && <h2 className="text-3xl font-bold">{title}</h2>}
            {description && <p className="text-gray-600 max-w-2xl">{description}</p>}
        </div>
    )
}
