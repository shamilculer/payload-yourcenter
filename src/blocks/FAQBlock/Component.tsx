import Image from "next/image"
import Link from "next/link"
import React from 'react'

import { Button } from "@/components/ui/button"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import RichText from '@/components/RichText'
import type { FAQBlock as FAQBlockProps } from '@/payload-types'
import { ArrowRightCircle } from "lucide-react"

export const FAQBlockComponent: React.FC<FAQBlockProps> = (props) => {
    const {
        eyebrow,
        heading,
        faqItems,
        sidebarImage,
        ctaHeading,
        ctaDescription,
        ctaButton,
        showPattern = true,
        theme = 'secondary',
        ctaBackground = 'secondary',
    } = props

    // Theme color mappings
    const themeColors = {
        primary: 'bg-primary/90',
        secondary: 'bg-secondary/90',
        accent: 'bg-accent/90',
    }

    const ctaBackgroundColors = {
        primary: 'bg-primary/20',
        secondary: 'bg-secondary/20',
        accent: 'bg-accent/20',
        muted: 'bg-muted',
    }

    const triggerColor = themeColors[theme as keyof typeof themeColors] || themeColors.secondary
    const ctaBgColor = ctaBackgroundColors[ctaBackground as keyof typeof ctaBackgroundColors] || ctaBackgroundColors.secondary

    return (
        <section className="section-spacing-b relative">
            {showPattern && (
                <Image
                    src="/pattern-3.png"
                    width={300}
                    height={40}
                    alt="pattern"
                    className="absolute bottom-0 left-0 opacity-25"
                />
            )}
            <div className="container flex items-center max-lg:flex-col gap-7 sm:gap-28 z-10 relative">
                {/* Left Column - FAQ Accordion */}
                <div className="w-full lg:w-2/3">
                    <div className="mb-10">
                        {eyebrow && (
                            <span className="py-1.5 px-3 rounded-3xl uppercase font-medium border border-gray-300 bg-secondary/20 mb-5 max-sm:text-sm">
                                {eyebrow}
                            </span>
                        )}
                        <h2 className="mt-4">{heading}</h2>
                    </div>

                    {/* FAQ Accordion */}
                    {faqItems && faqItems.length > 0 && (
                        <div>
                            <Accordion type="single" collapsible>
                                {faqItems.map((item, index) => (
                                    <AccordionItem className="mb-4" key={index} value={`item-${index}`}>
                                        <AccordionTrigger
                                            className={`text-lg text-white sm:text-[20px] hover:no-underline ${triggerColor} px-5 cursor-pointer`}
                                        >
                                            {item.question}
                                        </AccordionTrigger>
                                        <AccordionContent className="text-lg text-muted-foreground p-5 bg-white">
                                            <RichText data={item.answer} enableGutter={false} />
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    )}
                </div>

                {/* Right Column - Sidebar */}
                <div className="w-full lg:w-1/3">
                    <div className="bg-[#f3f3f3] p-4 rounded-3xl h-full flex flex-col justify-between gap-6">
                        {/* Sidebar Image */}
                        <div className="w-full h-1/2 relative flex-1">
                            {(() => {
                                if (typeof sidebarImage === 'object' && sidebarImage !== null) {
                                    // Use Cloudinary URL if available
                                    if (sidebarImage.cloudinary?.secure_url) {
                                        return (
                                            <Image
                                                src={sidebarImage.cloudinary.secure_url}
                                                width={400}
                                                height={280}
                                                alt={sidebarImage.alt || 'FAQ'}
                                                className="min-h-full h-72 lg:h-[450px] object-cover w-full rounded-2xl"
                                            />
                                        );
                                    }
                                    // Fallback to constructing from public_id
                                    if (sidebarImage.cloudinary?.public_id) {
                                        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dpycn77pf';
                                        return (
                                            <Image
                                                src={`https://res.cloudinary.com/${cloudName}/image/upload/${sidebarImage.cloudinary.public_id}`}
                                                width={400}
                                                height={280}
                                                alt={sidebarImage.alt || 'FAQ'}
                                                className="min-h-full h-72 lg:h-[450px] object-cover w-full rounded-2xl"
                                            />
                                        );
                                    }
                                    // Final fallback to local URL
                                    if ('url' in sidebarImage && sidebarImage.url) {
                                        return (
                                            <Image
                                                src={sidebarImage.url}
                                                width={400}
                                                height={280}
                                                alt={sidebarImage.alt || 'FAQ'}
                                                className="min-h-full h-72 lg:h-[450px] object-cover w-full rounded-2xl"
                                            />
                                        );
                                    }
                                }
                                return null;
                            })()}
                        </div>

                        {/* CTA Card */}
                        <div className={`h-1/2 w-full ${ctaBgColor} rounded-2xl p-7 flex flex-col items-start gap-5`}>
                            <h4 className="text-2xl !font-medium">{ctaHeading}</h4>
                            {ctaDescription && (
                                <RichText data={ctaDescription} enableGutter={false} />
                            )}
                            {ctaButton && (
                                <Button asChild>
                                    <Link href={ctaButton.url || '#'}>
                                        <ArrowRightCircle /> {ctaButton.label}
                                    </Link>
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export { FAQBlockComponent as FAQBlock }
