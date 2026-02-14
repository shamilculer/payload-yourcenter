import React from 'react'
import type { LayoutBlock as LayoutBlockProps } from '@/payload-types'
import { RenderBlocks } from '../RenderBlocks'
import { cn } from '@/utilities/ui'
import { getBlockStyles, getContainerStyles } from '@/utilities/getBlockStyles'

export const LayoutBlock = (props: LayoutBlockProps) => {
    const {
        structure = '1',
        column1,
        column2,
        column3,
        column4,
        gap = 'medium',
        reverseOnMobile = false,
        alignItems = 'start',
        justifyContent = 'start',
        height = 'default',
        settings,
    } = props

    const { className, style } = getBlockStyles(settings)
    const containerClass = getContainerStyles(settings)

    // Gap Mappings (Horizontal)
    const gapMap = {
        none: 'gap-0',
        small: 'gap-4',
        medium: 'gap-6 sm:gap-10',
        large: 'gap-8 sm:gap-20',
        xl: 'gap-10 sm:gap-32',
    }

    // Align Items Map
    const alignItemsMap = {
        start: 'items-start',
        center: 'items-center',
        end: 'items-end',
        stretch: 'items-stretch',
        baseline: 'items-baseline',
    }

    // Justify Content Map
    const justifyContentMap = {
        start: 'justify-start',
        center: 'justify-center',
        end: 'justify-end',
        between: 'justify-between',
        around: 'justify-around',
        evenly: 'justify-evenly',
    }

    // Column Structure
    const getColumns = () => {
        switch (structure) {
            case '1':
                return [
                    { content: column1, width: 'w-full' }
                ]
            case '1/1':
                return [
                    { content: column1, width: 'lg:w-1/2' },
                    { content: column2, width: 'lg:w-1/2' }
                ]
            case '1/2':
                return [
                    { content: column1, width: 'lg:w-1/3' },
                    { content: column2, width: 'lg:w-2/3' }
                ]
            case '2/1':
                return [
                    { content: column1, width: 'lg:w-2/3' },
                    { content: column2, width: 'lg:w-1/3' }
                ]
            case '1/1/1':
                return [
                    { content: column1, width: 'lg:w-1/3' },
                    { content: column2, width: 'lg:w-1/3' },
                    { content: column3, width: 'lg:w-1/3' }
                ]
            case '1/1/1/1':
                return [
                    { content: column1, width: 'lg:w-1/4' },
                    { content: column2, width: 'lg:w-1/4' },
                    { content: column3, width: 'lg:w-1/4' },
                    { content: column4, width: 'lg:w-1/4' }
                ]
            default:
                return [{ content: column1, width: 'w-full' }]
        }
    }

    const columns = getColumns()
    const activeGap = gapMap[gap as keyof typeof gapMap] || gapMap.medium
    const activeAlignItems = alignItemsMap[alignItems as keyof typeof alignItemsMap] || 'items-start'
    const activeJustifyContent = justifyContentMap[justifyContent as keyof typeof justifyContentMap] || 'justify-start'

    // Grid column classes based on structure
    const getGridClass = () => {
        switch (structure) {
            case '1':
                return 'grid-cols-1'
            case '1/1':
                return 'grid-cols-1 md:grid-cols-2'
            case '1/2':
                return 'grid-cols-1 md:grid-cols-3'
            case '2/1':
                return 'grid-cols-1 md:grid-cols-3'
            case '1/1/1':
                return 'grid-cols-1 md:grid-cols-3'
            case '1/1/1/1':
                return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
            default:
                return 'grid-cols-1'
        }
    }

    // Grid column span classes
    const getColumnSpan = (index: number) => {
        switch (structure) {
            case '1/2':
                return index === 0 ? 'md:col-span-1' : 'md:col-span-2'
            case '2/1':
                return index === 0 ? 'md:col-span-2' : 'md:col-span-1'
            default:
                return ''
        }
    }

    return (
        <section
            className={cn(className, height === 'full' && "h-full flex flex-col")}
            style={style}
        >
            <div className={cn(
                containerClass,
                'grid',
                getGridClass(),
                activeGap,
                activeAlignItems,
                activeJustifyContent,
                reverseOnMobile ? 'max-md:flex max-md:flex-col-reverse' : '',
                height === 'full' && "h-full flex-1"
            )}>
                {columns.map((col, index) => {
                    return (
                        <div key={index} className={cn(getColumnSpan(index), "w-full h-full")}>
                            {col.content && <RenderBlocks blocks={col.content} />}
                        </div>
                    )
                })}
            </div>
        </section>
    )
}
