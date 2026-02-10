"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Carousel } from "@/components/ui/carousel";
// Removed RichText import as it is no longer used for heading
import { CMSLink } from "@/components/Link";

export type Slide = {
  heading: string;
  subheading?: string;
  description?: string;
  image?: { url?: string; alt?: string } | null;
  cta_buttons?: Array<{
    link: {
      type?: 'reference' | 'custom' | null;
      newTab?: boolean | null;
      reference?: {
        value: string | any;
        relationTo: 'pages' | 'posts' | 'services';
      } | null;
      url?: string | null;
      label?: string | null;
      appearance?: 'default' | 'outline' | 'ghost' | 'link' | 'inline' | 'destructive' | 'secondary' | null;
    }
  }> | null;
};

type HeroProps =
  | { slides: Slide[] }
  | ({ slides?: undefined } & Slide);

export const Hero = (props: HeroProps) => {
  const slides: Slide[] = Array.isArray((props as any).slides)
    ? (props as { slides: Slide[] }).slides
    : [
      {
        heading: (props as Slide).heading,
        subheading: (props as Slide).subheading,
        description: (props as Slide).description,
        image: (props as Slide).image,
        cta_buttons: (props as Slide).cta_buttons,
      },
    ];

  if (!slides || slides.length === 0) return null;

  const getImageUrl = (image: any) => {
    if (!image) return null;
    if (typeof image === 'string') return image;
    if (image?.url) return image.url;
    return null;
  }

  // Helper to parse heading
  const renderHeading = (heading: string) => {
    if (!heading) return null;
    const parts = heading.split('\n');
    const firstLine = parts[0];
    const secondLine = parts.slice(1).join(' ');

    return (
      <>
        {firstLine}
        {secondLine && (
          <span className="!font-medium block">
            {secondLine}
          </span>
        )}
      </>
    )
  }

  return (
    <section>
      <div className="w-full">
        <Carousel
          slidesPerView={1}
          spaceBetween={0}
          loop={true}
          autoplay
          withPagination={true}
          withNavigation={false}
          effect="fade"
          className="overflow-hidden w-full hero-slider"
        >
          {slides.map((slide, index) => {
            const imageUrl = getImageUrl(slide.image);

            return (
              <div
                key={index}
                className="h-[calc(660px-60px)] sm:h-[calc(700px-60px)] lg:h-[calc(100vh-72px)] w-full relative"
              >
                {imageUrl && (
                  <Image
                    src={imageUrl}
                    alt={typeof slide.image === 'object' && slide.image?.alt ? slide.image.alt : `Hero slide ${index + 1}`}
                    width={1400}
                    height={700}
                    className="w-full h-full absolute top-0 left-0 object-cover"
                  />
                )}

                <div className="w-full h-full absolute top-0 left-0 bg-gradient-to-br from-accent to-accent/10" />

                <div className="container h-full flex items-center z-10 pt-14 lg:pt-20 relative">
                  <div className="space-y-6">
                    <div>
                      {slide.subheading && (
                        <span className="leading-0 py-1.5 px-3 rounded-3xl text-white bg-gray-200/50 max-sm:text-sm">
                          {slide.subheading}
                        </span>
                      )}

                      <h1 className="!text-white mt-4 text-4xl sm:text-5xl lg:text-7xl">
                        {renderHeading(slide.heading)}
                      </h1>
                    </div>

                    {slide.description && (
                      <p className="w-full max-sm:text-xs md:max-w-2xl text-white">
                        {slide.description}
                      </p>
                    )}

                    {Array.isArray(slide.cta_buttons) && slide.cta_buttons.length > 0 && (
                      <div className="mt-8 flex items-center gap-3 sm:gap-5">
                        {slide.cta_buttons.map((buttonData, btnIndex) => {
                          const link = buttonData.link;
                          if (!link) return null;

                          return (
                            <CMSLink
                              key={btnIndex}
                              {...link}
                              className={`sm:text-base ${btnIndex === 1 ? 'bg-accent hover:bg-accent/90 border-accent' : ''}`}
                              size="default"
                              appearance="default"
                            />
                          )
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </Carousel>
      </div>
    </section>
  );
}