import React from 'react'
import Image from 'next/image'
import { Star } from 'lucide-react'
import { Carousel, CarouselItem } from '@/components/ui/carousel'
import type { TestimonialsBlock as TestimonialsBlockProps } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'

import { getBlockStyles } from '@/utilities/getBlockStyles'

export const TestimonialsBlock: React.FC<TestimonialsBlockProps> = (props) => {
    const { title, eyebrow, testimonials, settings } = props

    const { className, style } = getBlockStyles(settings)

    if (!testimonials || testimonials.length === 0) return null

    return (
        <section className={className} style={style}>
            <div className="container space-y-10 md:space-y-14">
                {/* Section Heading */}
                {(title || eyebrow) && (
                    <div className="w-full flex flex-col items-center text-center">
                        {eyebrow && (
                            <span className="py-1.5 px-3 rounded-3xl uppercase font-medium text-accent border border-gray-300 bg-primary/20 max-sm:text-sm">
                                {eyebrow}
                            </span>
                        )}
                        {title && <h2 className="mt-4">{title}</h2>}
                    </div>
                )}

                {/* Carousel */}
                <div>
                    <Carousel
                        slidesPerView={1}
                        spaceBetween={20}
                        breakpoints={{
                            768: {
                                slidesPerView: 2,
                            },
                            1024: {
                                slidesPerView: 3,
                            }
                        }}
                        loop={true}
                        withPagination={false}
                        className="w-full"
                    >
                        {testimonials.map((item, index) => (
                            <CarouselItem key={item.id || index} className="h-auto">
                                <div className="p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6 min-h-[300px] bg-secondary/10 flex flex-col justify-between h-full relative">
                                    <div className="py-4">
                                        {item.title && (
                                            <span className="text-xl font-semibold italic block">
                                                “{item.title}”
                                            </span>
                                        )}
                                        <p className="mt-4 text-gray-600">{item.content}</p>
                                    </div>

                                    <div className="flex justify-between items-center gap-4 py-4 border-t border-gray-300 w-full mt-auto">
                                        <div className="flex items-center gap-3">
                                            <Image
                                                src={
                                                    item.image && typeof item.image === 'object'
                                                        ? getMediaUrl(item.image) || '/user-gray.png'
                                                        : '/user-gray.png'
                                                }
                                                width={55}
                                                height={55}
                                                alt={item.author}
                                                className="size-14 rounded-full object-cover border border-gray-300"
                                            />
                                            <div>
                                                <span className="font-semibold text-black max-sm:text-sm">
                                                    {item.author}
                                                </span>
                                                {item.location && (
                                                    <span className="text-xs sm:text-sm block">
                                                        {item.location}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center">
                                            {[...Array(item.rating || 5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className="w-5 h-5 text-yellow-500 fill-yellow-500"
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </Carousel>
                </div>
            </div>
        </section>
    )
}
