import React from 'react'

import { cn } from '@/utilities/ui'
import { RenderBlocks } from '@/blocks/RenderBlocks'

import type { GridBlock as GridBlockProps } from '@/payload-types'

export const GridBlock: React.FC<GridBlockProps> = (props) => {
    const { columns } = props

    const colsSpanClasses = {
        full: '12',
        half: '6',
        oneThird: '4',
        twoThirds: '8',
    }

    return (
        <div className="container my-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-8">
                {columns &&
                    columns.length > 0 &&
                    columns.map((col, index) => {
                        const { size, blocks } = col

                        return (
                            <div
                                className={cn(`col-span-12 lg:col-span-${colsSpanClasses[size as keyof typeof colsSpanClasses]}`)}
                                key={index}
                            >
                                {blocks && <RenderBlocks blocks={blocks} />}
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}
