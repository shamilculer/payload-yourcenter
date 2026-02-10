import React from 'react'
import Image from 'next/image'
import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'
import type { ProcessBlock as ProcessBlockProps } from '@/payload-types'

import { getBlockStyles } from '@/utilities/getBlockStyles'

export const ProcessBlockComponent: React.FC<ProcessBlockProps> = (props) => {
    const {
        bannerImage,
        bannerEyebrow,
        bannerHeading,
        bannerDescription,
        bannerButton,
        processEyebrow,
        processHeading,
        processDescription,
        processImage,
        steps,
        settings,
    } = props

    const { className, style } = getBlockStyles(settings)

    // Helper for images
    const getImageSrc = (image: any) => {
        if (!image) return null
        if (typeof image === 'object') {
            if (image.cloudinary?.secure_url) return image.cloudinary.secure_url
            if (image.cloudinary?.public_id) {
                const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dpycn77pf';
                return `https://res.cloudinary.com/${cloudName}/image/upload/${image.cloudinary.public_id}`
            }
            if (image.url) return image.url
        }
        return null
    }

    const bannerBgSrc = getImageSrc(bannerImage)
    const processImgSrc = getImageSrc(processImage)


    return (
        <section className={className} style={style}>
            {/* Banner Section */}
            <div
                className="w-full bg-cover bg-center bg-fixed relative"
                style={{ backgroundImage: bannerBgSrc ? `url(${bannerBgSrc})` : undefined }}
            >
                <div className="w-full bg-gradient-to-t from-accent max-sm:from-35% to-[rgba(0,0,0,0.3)]">
                    <div className="container z-10 pt-20 pb-20 sm:pt-48 sm:pb-32">
                        <div className="w-full flex max-lg:flex-col gap-5 sm:gap-14 lg:gap-24">
                            <div className="w-full lg:w-1/2">
                                {bannerEyebrow && (
                                    <span className="leading-0 py-1.5 px-3 rounded-3xl uppercase font-medium text-white border border-gray-300 bg-primary/20 max-sm:text-sm">
                                        {bannerEyebrow}
                                    </span>
                                )}
                                <h2 className="mt-4 !text-white">{bannerHeading}</h2>
                            </div>

                            <div className="w-full lg:w-1/2 space-y-5">
                                <p className="text-white">{bannerDescription}</p>
                                {bannerButton && (
                                    <div className="flex">
                                        <CMSLink
                                            {...bannerButton}
                                            appearance="default"
                                            className="bg-secondary text-white hover:bg-secondary/90"
                                            label={bannerButton.label || 'Book an Appointment'}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="container">
                        <div className="w-full h-[1px] bg-white"></div>
                    </div>
                </div>

                {/* Process Section */}
                <div className="w-full flex flex-col justify-center bg-accent">
                    <div className="container pt-16 sm:pt-24">
                        <div className="flex justify-center items-center mx-auto flex-col gap-x-0 gap-y-3 sm:gap-y-6 lg:gap-y-0">
                            {processEyebrow && (
                                <span className="py-1.5 px-3 rounded-3xl uppercase font-medium text-white border border-gray-300 bg-secondary/20">
                                    {processEyebrow}
                                </span>
                            )}
                            <h2 className="text-center mt-3 sm:mb-5 !text-white">
                                {processHeading}
                            </h2>

                            <p className="lg:w-4xl text-center text-white">
                                {processDescription}
                            </p>
                        </div>
                    </div>

                    <div className="w-full lg:w-[94%] flex items-center max-lg:flex-col gap-10">
                        {/* Process Image */}
                        <div className="w-full lg:w-1/2 flex justify-center max-lg:border-b border-white">
                            {processImgSrc && (
                                <Image
                                    src={processImgSrc}
                                    width={700}
                                    height={700}
                                    alt="Process Image"
                                    className="w-96 sm:w-[540px]"
                                />
                            )}
                        </div>

                        {/* Steps */}
                        <div className="w-full lg:w-1/2 h-full flex flex-col gap-10 justify-center pr-16 max-sm:pb-16 max-lg:pb-24 max-lg:px-5">
                            {steps?.map((step, index) => (
                                <div key={index} className="flex sm:items-center gap-5 bg-secondary py-3 px-4 rounded-2xl relative process-step">
                                    <div className="size-12 rounded-full flex-center bg-white">
                                        <span className="font-bold text-3xl text-accent tracking-tighter">{step.number}</span>
                                    </div>
                                    <div className="w-3/4">
                                        <h4 className="text-lg md:text-[20px] !text-white">{step.title}</h4>
                                        <p className="text-white">{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}

export { ProcessBlockComponent as ProcessBlock }
