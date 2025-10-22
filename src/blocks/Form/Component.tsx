"use client"

import Image from "next/image"
import { PhoneCall } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getMediaUrl } from "@/utilities/getMediaUrl"
import { Media } from "@/payload-types"

type CalloutFormBlockProps = {
  contentGroup: {
    backgroundImage?: Media | string | null
    eyebrow?: string | null
    heading?: string | null
    description?: any
  }
  formGroup: {
    formHeading?: string | null
    formSubheading?: any
    form?: any // Payload relationship: form document or ID
  }
}

export const CalloutFormBlock = ({ contentGroup, formGroup }: CalloutFormBlockProps) => {
  const backgroundUrl = (() => {
    const media = contentGroup?.backgroundImage;
    if (media) {
      // Use the universal media URL utility
      return getMediaUrl(media) || "/placeholder.jpg";
    }
    return "/placeholder.jpg";
  })()

  return (
    <section className="section-spacing-b">
      <div className="container">
        <div className="relative w-full min-h-[600px] rounded-2xl sm:rounded-3xl overflow-hidden flex items-center lg:pt-16 lg:pl-16 sm:pt-6 sm:pl-6 pt-14 pl-4">
          {/* Background Image */}
          <Image
            src={backgroundUrl}
            alt={typeof contentGroup?.backgroundImage === 'object' && contentGroup?.backgroundImage?.alt ? contentGroup.backgroundImage.alt : "Background"}
            fill
            className="object-cover"
          />

          {/* Gradient Overlay */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black/60 to-transparent"></div>

          <div className="relative w-full flex max-lg:flex-col gap-9 sm:gap-20 z-10">
            {/* LEFT SIDE - Content */}
            <div className="w-full sm:w-2/3 lg:w-1/2 space-y-3 sm:space-y-5 max-sm:pr-3">
              {contentGroup?.eyebrow && (
                <span className="leading-0 py-1.5 px-3 rounded-3xl uppercase font-medium text-white border border-gray-300 bg-accent/20 max-sm:text-sm">
                  {contentGroup.eyebrow}
                </span>
              )}

              {contentGroup?.heading && (
                <h2 className="!text-white mt-4">{contentGroup.heading}</h2>
              )}

              {contentGroup?.description && (
                <div className="text-white prose max-w-none">
                  {/* Render rich text content */}
                  <div dangerouslySetInnerHTML={{ __html: contentGroup.description }} />
                </div>
              )}

              <Button className="mt-5 sm:mt-10">
                <PhoneCall /> Connect With Us
              </Button>
            </div>

            {/* RIGHT SIDE - Form */}
            <div className="w-full lg:w-1/2 flex justify-end items-end sm:min-h-[600px]">
              <div className="w-full sm:w-3/4 lg:w-full sm:min-h-[400px] bg-[#736330] rounded-t-3xl rounded-r-none border-15 border-r-0 border-b-0 border-white p-4 sm:p-10 flex flex-col gap-6">
                {formGroup?.formHeading && (
                  <span className="sm:text-2xl text-white font-medium">
                    {formGroup.formHeading}
                  </span>
                )}

                {formGroup?.formSubheading && (
                  <div
                    className="text-white text-sm sm:text-base"
                    dangerouslySetInnerHTML={{ __html: formGroup.formSubheading }}
                  />
                )}

                {/* Dynamic Form Rendering */}
                {formGroup?.form ? (
                  //   <RenderForm form={formGroup.form} />
                  <p>Form</p>
                ) : (
                  <p className="text-white/80 text-sm italic">No form selected.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CalloutFormBlock
