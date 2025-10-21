"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Carousel } from "@/components/ui/carousel";

export type Slide = {
  heading: string;
  subheading?: string;
  description?: string;
  image?: { url?: string; alt?: string } | null;
  cta_buttons?: Array<{ label: string; url: string }> | null;
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
          {slides.map((slide, index) => (
            <div
              key={index}
              className="h-[calc(660px-60px)] sm:h-[calc(700px-60px)] lg:h-[calc(100vh-72px)] w-full relative"
            >
              {slide.image?.url && (
                <Image
                  src={slide.image.url}
                  alt={slide.image.alt || `Hero slide ${index + 1}`}
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
                    <h1 className="!text-white mt-4 !font-semibold md:w-[800px]">
                      {slide.heading}
                    </h1>
                  </div>

                  {slide.description && (
                    <p className="w-full max-sm:text-xs md:max-w-2xl text-white">
                      {slide.description}
                    </p>
                  )}

                  {Array.isArray(slide.cta_buttons) && slide.cta_buttons.length > 0 && (
                    <div className="mt-8 flex items-center gap-3 sm:gap-5">
                      {slide.cta_buttons.map((btn, btnIndex) => (
                        <Button
                          key={btnIndex}
                          asChild
                          className={`sm:text-base ${btnIndex === 1 ? 'bg-accent' : ''}`}
                        >
                          <Link href={btn.url || "#"}>{btn.label}</Link>
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
}