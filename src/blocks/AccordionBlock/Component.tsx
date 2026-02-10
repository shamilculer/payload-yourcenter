import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import RichText from '@/components/RichText'

import type { AccordionBlock as AccordionBlockProps } from '@/payload-types'

import { getBlockStyles, getContainerStyles } from '@/utilities/getBlockStyles'
import { cn } from '@/utilities/ui'

export const AccordionBlock: React.FC<AccordionBlockProps & { settings?: any }> = ({ accordionItems, settings }) => {
    if (!accordionItems) return null

    const { className, style } = getBlockStyles(settings)

    return (
        <div className={className} style={style}>
            <div className={cn(getContainerStyles(settings), "w-full")}>
                <Accordion type="single" collapsible className="w-full">
                    {accordionItems.map((item, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="text-lg font-medium">
                                {item.title}
                            </AccordionTrigger>
                            <AccordionContent>
                                <RichText data={item.content} enableGutter={false} />
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    )
}
