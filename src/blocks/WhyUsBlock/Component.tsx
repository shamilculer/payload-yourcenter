import React from 'react'
import * as LucideIcons from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/utilities/ui'
import type { WhyUsBlock as WhyUsBlockProps } from '@/payload-types'

import { getBlockStyles } from '@/utilities/getBlockStyles'

// Helper to convert kebab-case to PascalCase (e.g., 'map-pin' -> 'MapPin')
const kebabToPascal = (str: string) => {
    return str
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('')
}

// Helper to render dynamic Lucide icon
const RenderIcon = ({ name, className }: { name: string; className?: string }) => {
    const pascalName = kebabToPascal(name)
    const Icon = (LucideIcons as any)[pascalName]
    if (!Icon) return <LucideIcons.HelpCircle className={className} />
    return <Icon className={className} />
}

export const WhyUsBlock: React.FC<WhyUsBlockProps> = (props) => {
    const { eyebrow, heading, description, image, features, settings } = props

    const { className, style } = getBlockStyles(settings)

    // Helper for images
    const getImageSrc = (image: any) => {
        if (!image) return null
        if (typeof image === 'object') {
            if (image.cloudinary?.secure_url) return image.cloudinary.secure_url
            if (image.cloudinary?.public_id) {
                const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dpycn77pf'
                return `https://res.cloudinary.com/${cloudName}/image/upload/${image.cloudinary.public_id}`
            }
            if (image.url) return image.url
        }
        return null
    }

    const heroImageSrc = getImageSrc(image)

    return (
        <section className={className} style={style}>
            <Image
                src="/pattern-3.png"
                width={300}
                height={40}
                alt="pattern"
                className="absolute bottom-0 left-0 opacity-15"
            />
            <div className="w-full flex items-center max-lg:flex-col gap-10 sm:gap-18 z-10 relative">
                <div className="w-full lg:w-1/2 px-4 sm:p-12 sm:pl-16 space-y-5">
                    <div>
                        {eyebrow && (
                            <span className="leading-0 py-1.5 px-3 rounded-3xl uppercase font-medium text-accent border border-gray-300 bg-primary/20">
                                {eyebrow}
                            </span>
                        )}
                        <h2 className="mt-4">{heading}</h2>
                    </div>

                    <p className="mb-10">{description}</p>

                    <ul className="space-y-2 grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-10">
                        {features?.map((feature: any, index: number) => {
                            const iconSrc = getImageSrc(feature.icon)

                            // Icon Color Logic
                            const iconColors = {
                                primary: 'text-primary',
                                secondary: 'text-secondary',
                                accent: 'text-accent',
                                white: 'text-white',
                                black: 'text-black',
                                custom: '',
                            }
                            const selectedColorClass = iconColors[feature.iconColor as keyof typeof iconColors] || 'text-primary'
                            const customColorStyle = feature.iconColor === 'custom' ? { color: feature.customIconColor } : {}

                            return (
                                <li key={index} className="flex flex-col items-start gap-3">
                                    <div
                                        className={cn(
                                            "p-3 min-h-12 bg-primary/35 shadow flex-center [border-radius:70%_30%_30%_70%_/_60%_40%_60%_40%] transition-colors",
                                            selectedColorClass
                                        )}
                                        style={customColorStyle}
                                    >
                                        {feature.iconType === 'lucide' ? (
                                            <RenderIcon name={feature.iconName || 'Box'} className="w-7 h-7" />
                                        ) : (
                                            iconSrc && (
                                                <Image
                                                    src={iconSrc}
                                                    width={28}
                                                    height={28}
                                                    alt={feature.title}
                                                    className="w-7 h-7"
                                                />
                                            )
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="!font-semibold uppercase">{feature.title}</h4>
                                        <p className="!text-sm mt-2 leading-6">{feature.description}</p>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>

                <div className="w-full lg:w-1/2">
                    {heroImageSrc && (
                        <Image
                            src={heroImageSrc}
                            width={700}
                            height={600}
                            alt={heading || 'Why Us'}
                            className="h-80 sm:h-[700px] w-full object-cover"
                        />
                    )}
                </div>
            </div>
        </section>
    )
}
