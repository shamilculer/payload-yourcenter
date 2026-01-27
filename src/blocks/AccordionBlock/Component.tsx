import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import RichText from '@/components/RichText'

import type { AccordionBlock as AccordionBlockProps } from '@/payload-types'

export const AccordionBlock: React.FC<AccordionBlockProps> = ({ accordionItems }) => {
    if (!accordionItems) return null

    return (
        <div className="w-full">
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
    )
}
