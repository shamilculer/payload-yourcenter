import Image from "next/image"
import Link from "next/link"
import React from 'react'

import { Button } from "@/components/ui/button"
import RichText from '@/components/RichText' 
import type { IntroBlock } from '@/payload-types' // Import generated type


export const IntroBlockComponent: React.FC<IntroBlock> = (props) => {
    // Destructure properties: CHANGED 'cta_buttons' to 'links'
    const { heading, subheading, description, image, links } = props

    return (
        <section className="section-spacing relative">
            <Image src="/pattern-2.png" width={300} height={40} alt="pattern" className="absolute top-0 left-0 opacity-25" />
            <div className="container flex items-center max-lg:flex-col gap-10 sm:gap-24 z-10 relative">
                <div className="w-full lg:w-1/2">
                    {/* Using the Payload-typed 'image' object */}
                    {typeof image === 'object' && image !== null && 'url' in image && image.url && (
                        <Image 
                            src={image.url}
                            width={800} 
                            height={600}
                            alt={image.alt || heading}
                            className="w-full h-80 md:h-[600px] object-cover rounded-2xl"
                        />
                    )}
                </div>
                <div className="w-full lg:w-1/2 space-y-5">
                    <div>
                        {subheading && (
                            <span className="leading-0 py-1.5 px-3 rounded-3xl uppercase font-medium text-accent border border-gray-300 bg-primary/20">{subheading}</span>
                        )}
                        <h2 className="mt-4">{heading}</h2>
                    </div>

                    {description && (
                        <RichText data={description} />
                    )}

                    {/* Logic CHANGED to use 'links' */}
                    {Array.isArray(links) && links.length > 0 && (
                        <div className="flex items-center gap-4 mt-5">
                            {links.map((btn, idx) => (
                                <Button key={idx} className={idx === 1 ? "bg-accent" : undefined} asChild>
                                    {btn.link && (
                                        <Link 
                                            href={btn.link.url || '#'} 
                                        >
                                            {btn.link.label}
                                        </Link>
                                    )}
                                </Button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export { IntroBlockComponent as IntroBlock }