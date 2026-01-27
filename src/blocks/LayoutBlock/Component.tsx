import React from 'react'
import type { LayoutBlock as LayoutBlockProps } from '@/payload-types'
import { RenderBlocks } from '../RenderBlocks'
import { cn } from '@/utilities/ui'

export const LayoutBlock = (props: LayoutBlockProps) => {
    const {
        structure = '1',
        column1,
        column2,
        column3,
        column4,
        width = 'boxed',
        gap = 'medium',
        paddingTop = 'medium',
        paddingBottom = 'medium',
        backgroundColor = 'transparent',
        reverseOnMobile = false,
    } = props

    // Padding Mappings
    const paddingMap = {
        none: 'py-0',
        small: 'py-4 sm:py-8',
        medium: 'py-8 sm:py-16',
        large: 'py-12 sm:py-24',
        xl: 'py-20 sm:py-32',
    }

    // Gap Mappings (Horizontal)
    const gapMap = {
        none: 'gap-0',
        small: 'gap-4',
        medium: 'gap-6 sm:gap-10',
        large: 'gap-8 sm:gap-20',
        xl: 'gap-10 sm:gap-32',
    }

    // Background Color Mappings
    const bgMap = {
        transparent: 'bg-transparent',
        white: 'bg-white',
        'light-gray': 'bg-gray-50',
        primary: 'bg-primary text-white',
        secondary: 'bg-secondary text-white',
        accent: 'bg-accent text-white',
        dark: 'bg-gray-900 text-white',
    }

    // Column Width Class Logic
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
                // Default to 1 column if unknown
                return [{ content: column1, width: 'w-full' }]
        }
    }

    const columns = getColumns()
    const activePaddingTop = paddingMap[paddingTop as keyof typeof paddingMap] || paddingMap.medium
    const activePaddingBottom = paddingMap[paddingBottom as keyof typeof paddingMap] || paddingMap.medium

    // Combine padding classes manually
    // Using explicit classes ensures Tailwind builds them. 
    // We can just rely on the mapped values and apply separately or concatenated.
    // Actually, let's just use `style` for padding if we wanted exact control, 
    // but classes are better. 
    // The mapping keys "paddingTop" and "paddingBottom" usually map to `pt-` and `pb-`.
    // My mapping above uses `py-` which sets both. Let's fix that map quickly or split logic.

    // Revised mapping for specific sides
    const ptMap = {
        none: 'pt-0',
        small: 'pt-8 sm:pt-12',
        medium: 'pt-12 sm:pt-20',
        large: 'pt-20 sm:pt-32',
        xl: 'pt-32 sm:pt-48',
    }
    const pbMap = {
        none: 'pb-0',
        small: 'pb-8 sm:pb-12',
        medium: 'pb-12 sm:pb-20',
        large: 'pb-20 sm:pb-32',
        xl: 'pb-32 sm:pb-48',
    }

    const ptClass = ptMap[paddingTop as keyof typeof ptMap] || ptMap.medium
    const pbClass = pbMap[paddingBottom as keyof typeof pbMap] || pbMap.medium

    const activeGap = gapMap[gap as keyof typeof gapMap] || gapMap.medium
    const activeBg = bgMap[backgroundColor as keyof typeof bgMap] || bgMap.transparent

    const containerClass = width === 'boxed' ? 'container' : 'w-full px-5'

    return (
        <section className={cn(ptClass, pbClass, activeBg)}>
            <div className={cn(
                containerClass,
                'flex flex-col lg:flex-row flex-wrap',
                activeGap,
                reverseOnMobile ? 'max-lg:flex-col-reverse' : ''
            )}>
                {columns.map((col, index) => {
                    // Only render if there are blocks, or keep empty if needed for spacing?
                    // Usually we render even empty columns to maintain layout structure.
                    return (
                        <div key={index} className={cn("w-full", col.width)}>
                            {col.content && <RenderBlocks blocks={col.content} />}
                        </div>
                    )
                })}
            </div>
        </section>
    )
}
