import React from 'react'
import type { TwoColumnLayoutBlock as TwoColumnLayoutBlockProps } from '@/payload-types'
import { RenderBlocks } from '../RenderBlocks'

export const TwoColumnLayoutBlockComponent: React.FC<TwoColumnLayoutBlockProps> = (props) => {
    const {
        leftColumnBlocks,
        rightColumnBlocks,
        columnRatio = '2/3-1/3',
        gap = 'lg',
        verticalAlign = 'top',
        reverseOnMobile = false,
    } = props

    // Column width mappings
    const columnWidths = {
        '1/3-2/3': { left: 'lg:w-1/3', right: 'lg:w-2/3' },
        '1/2-1/2': { left: 'lg:w-1/2', right: 'lg:w-1/2' },
        '2/3-1/3': { left: 'lg:w-2/3', right: 'lg:w-1/3' },
    }

    // Gap mappings
    const gapClasses = {
        sm: 'gap-4',
        md: 'gap-7',
        lg: 'gap-10 sm:gap-24',
        xl: 'gap-14 sm:gap-28',
    }

    // Vertical alignment mappings
    const alignClasses = {
        top: 'items-start',
        center: 'items-center',
        bottom: 'items-end',
        stretch: 'items-stretch',
    }

    const widths = columnWidths[columnRatio as keyof typeof columnWidths] || columnWidths['2/3-1/3']
    const gapClass = gapClasses[gap as keyof typeof gapClasses] || gapClasses.lg
    const alignClass = alignClasses[verticalAlign as keyof typeof alignClasses] || alignClasses.top
    const reverseClass = reverseOnMobile ? 'flex-col-reverse' : 'flex-col'

    return (
        <div className={`container flex ${reverseClass} lg:flex-row ${gapClass} ${alignClass}`}>
            {/* Left Column */}
            <div className={`w-full ${widths.left}`}>
                {leftColumnBlocks && leftColumnBlocks.length > 0 && (
                    <RenderBlocks blocks={leftColumnBlocks} />
                )}
            </div>

            {/* Right Column */}
            <div className={`w-full ${widths.right}`}>
                {rightColumnBlocks && rightColumnBlocks.length > 0 && (
                    <RenderBlocks blocks={rightColumnBlocks} />
                )}
            </div>
        </div>
    )
}

export { TwoColumnLayoutBlockComponent as TwoColumnLayoutBlock }
