import React from 'react'

import { cn } from '@/utilities/ui'
import { RenderBlocks } from '@/blocks/RenderBlocks'

import type { GridBlock as GridBlockProps } from '@/payload-types'

import { getBlockStyles, getContainerStyles } from '@/utilities/getBlockStyles'

export const GridBlock: React.FC<GridBlockProps & { settings?: any }> = (props) => {
    const { columns, settings } = props

    const colsSpanClasses: Record<number, string> = {
        1: 'col-span-12 lg:col-span-1',
        2: 'col-span-12 lg:col-span-2',
        3: 'col-span-12 lg:col-span-3',
        4: 'col-span-12 lg:col-span-4',
        5: 'col-span-12 lg:col-span-5',
        6: 'col-span-12 lg:col-span-6',
        7: 'col-span-12 lg:col-span-7',
        8: 'col-span-12 lg:col-span-8',
        9: 'col-span-12 lg:col-span-9',
        10: 'col-span-12 lg:col-span-10',
        11: 'col-span-12 lg:col-span-11',
        12: 'col-span-12 lg:col-span-12',
    }

    const { className, style } = getBlockStyles(settings)

    return (
        <div className={className} style={style}>
            <div className={cn(getContainerStyles(settings), "grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-8")}>
                {columns &&
                    columns.length > 0 &&
                    columns.map((col, index) => {
                        const { size, blocks } = col
                        const colSize = (typeof size === 'number' ? size : 12) as number

                        return (
                            <div
                                className={cn(colsSpanClasses[colSize], "flex flex-col")}
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
