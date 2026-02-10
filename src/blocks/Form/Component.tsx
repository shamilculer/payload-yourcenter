"use client"

import Image from "next/image"
import { PhoneCall } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getMediaUrl } from "@/utilities/getMediaUrl"
import { Media } from "@/payload-types"
import React, { useEffect, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { fields as FieldComponents } from './fields'
import RichText from '@/components/RichText'

import { getBlockStyles } from '@/utilities/getBlockStyles'

type CalloutFormBlockProps = {
  contentGroup: {
    backgroundImage?: Media | string | null
    eyebrow?: string | null
    heading?: string | null
    description?: any
  }
  formGroup: {
    formHeading?: string | null
    form?: any // Payload relationship: form document or ID
  }
  settings?: any // Manually add settings type or import generic block props if possible. Actually Payload usually passes partial types. Let's assume settings is passed.
}

export const CalloutFormBlock = ({ contentGroup, formGroup, settings }: CalloutFormBlockProps) => {
  const { className, style } = getBlockStyles(settings)

  const backgroundUrl = (() => {
    const media = contentGroup?.backgroundImage;
    if (media) {
      // Use the universal media URL utility
      return getMediaUrl(media) || "/placeholder.jpg";
    }
    return "/placeholder.jpg";
  })()

  return (
    <section className={className} style={style}>
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
                <div className="text-white text-left max-w-none [&_p]:text-white [&_p]:text-left">
                  {typeof contentGroup.description === 'string' ? (
                    <div dangerouslySetInnerHTML={{ __html: contentGroup.description }} />
                  ) : (
                    <RichText data={contentGroup.description} enableGutter={false} enableProse={false} />
                  )}
                </div>
              )}

              <Button asChild className="mt-5 sm:mt-10">
                <a href="tel:+919061060000"><PhoneCall /> Connect With Us</a>
              </Button>
            </div>

            {/* RIGHT SIDE - Form */}
            <div className="w-full lg:w-1/2 flex justify-end items-end sm:min-h-[600px]">
              <div className="w-full sm:w-3/4 lg:w-full sm:min-h-[400px] bg-accent rounded-t-3xl rounded-r-none border-[15px] border-r-0 border-b-0 border-white p-4 sm:p-10 flex flex-col gap-6">
                {formGroup?.formHeading && (
                  <span className="sm:text-2xl text-white font-medium">
                    {formGroup.formHeading}
                  </span>
                )}



                {/* Dynamic Form Rendering */}
                {formGroup?.form ? (
                  <DynamicFormRenderer form={formGroup.form} />
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

function DynamicFormRenderer({ form }: { form: any }) {
  const [formDoc, setFormDoc] = useState<any>(typeof form === 'string' ? null : form)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const methods = useForm()

  useEffect(() => {
    let mounted = true
    async function fetchForm(id: string) {
      try {
        setLoading(true)
        const res = await fetch(`/api/forms/${id}`)
        if (!res.ok) throw new Error('Unable to load form')
        const data = await res.json()
        if (mounted) setFormDoc(data)
      } catch (err) {
        console.error(err)
        setError('Failed to load form')
      } finally {
        setLoading(false)
      }
    }

    if (typeof form === 'string') {
      fetchForm(form)
    }

    return () => {
      mounted = false
    }
  }, [form])

  const onSubmit = async (values: Record<string, unknown>) => {
    setError(null)
    if (!formDoc && typeof form === 'string') return
    const usedForm = formDoc || form

    // Build submission data array expected by payload
    const submissionData = Object.keys(values).map((key) => ({ field: key, value: String((values as any)[key] ?? '') }))

    try {
      setLoading(true)
      const res = await fetch('/api/form-submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ form: usedForm.id || usedForm, submissionData }),
      })

      if (!res.ok) {
        const body = await res.text()
        throw new Error(body || 'Submission failed')
      }

      setSubmitted(true)
      // If plugin configured redirect on confirmation
      if (usedForm.confirmationType === 'redirect' && usedForm.redirect?.url) {
        window.location.href = usedForm.redirect.url
        return
      }
    } catch (err: any) {
      console.error(err)
      setError(err?.message || 'Submission failed')
    } finally {
      setLoading(false)
    }
  }

  if (loading && !submitted) return <p className="text-white">Loading form…</p>
  if (error) return <p className="text-red-500">{error}</p>
  const usedForm = formDoc || form
  if (!usedForm) return <p className="text-white/80 text-sm italic">Form data unavailable.</p>

  if (submitted) {
    if (usedForm.confirmationType === 'message' && usedForm.confirmationMessage) {
      return (
        <div className="text-white">
          <RichText data={usedForm.confirmationMessage} />
        </div>
      )
    }
    return <p className="text-white">Thanks — your message has been sent.</p>
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full">
        <div className="flex flex-wrap -mx-2">
          {Array.isArray(usedForm.fields) && usedForm.fields.map((field: any, idx: number) => {
            // message blocks are not inputs
            if (field.blockType === 'message') {
              return <FieldComponents.message key={field.id ?? idx} message={field.message} />
            }

            const Component = (FieldComponents as any)[field.blockType]
            if (!Component) return null

            return (
              <Component
                key={field.id ?? field.name ?? idx}
                {...field}
                errors={methods.formState.errors}
                register={methods.register}
              />
            )
          })}

          <Button type="submit" className="w-full mt-2 sm:mt-4 bg-primary">
            {usedForm.submitButtonLabel || 'Send Message'}
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}
