import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import RichText from '@/components/RichText'
import type { FAQItemsBlock as FAQItemsBlockProps } from '@/payload-types'

export const FAQItemsBlockComponent: React.FC<FAQItemsBlockProps> = (props) => {
    const {
        faqItems,
        triggerStyle = 'secondary',
        contentBackground = 'white',
    } = props

    if (!faqItems || faqItems.length === 0) return null

    // Theme color mappings for triggers
    const triggerColors = {
        default: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
        primary: 'bg-primary/90 text-white',
        secondary: 'bg-secondary/90 text-white',
        accent: 'bg-accent/90 text-white',
    }

    // Background color mappings for content
    const contentBackgrounds = {
        white: 'bg-white',
        muted: 'bg-muted',
        transparent: 'bg-transparent',
    }

    const triggerColor = triggerColors[triggerStyle as keyof typeof triggerColors] || triggerColors.secondary
    const contentBg = contentBackgrounds[contentBackground as keyof typeof contentBackgrounds] || contentBackgrounds.white

    return (
        <div className="w-full">
            <Accordion type="single" collapsible>
                {faqItems.map((item, index) => (
                    <AccordionItem className="mb-4" key={index} value={`item-${index}`}>
                        <AccordionTrigger
                            className={`text-lg sm:text-[20px] hover:no-underline ${triggerColor} px-5 cursor-pointer`}
                        >
                            {item.question}
                        </AccordionTrigger>
                        <AccordionContent className={`text-lg text-muted-foreground p-5 ${contentBg}`}>
                            <RichText data={item.answer} enableGutter={false} />
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    )
}

export { FAQItemsBlockComponent as FAQItemsBlock }
