"use client"

import React, { useEffect, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import RichText from '@/components/RichText'
import { fields as FieldComponents } from '../Form/fields'
import { FormBlock as FormBlockProps } from '@/payload-types'

import { getBlockStyles, getContainerStyles } from '@/utilities/getBlockStyles'

export const FormBlock = ({ heading, introContent, form, settings }: FormBlockProps & { settings?: any }) => {
    const { className, style } = getBlockStyles(settings)

    return (
        <div className={className} style={style}>
            <div className={getContainerStyles(settings)}>
                <div className='bg-accent/10 p-6 sm:p-10 rounded-lg shadow-sm border border-accent/20'>
                    {heading && (
                        <h3 className="text-xl font-semibold mb-4 text-primary">{heading}</h3>
                    )}
                    {introContent && (
                        <div className="mb-6">
                            <RichText data={introContent} enableGutter={false} />
                        </div>
                    )}

                    {form ? (
                        <DynamicFormRenderer form={form} />
                    ) : (
                        <p className="text-gray-500 italic">No form selected.</p>
                    )}
                </div>
            </div>
        </div>
    )
}

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

    if (loading && !submitted) return <p className="text-gray-500">Loading form…</p>
    if (error) return <p className="text-red-500">{error}</p>
    const usedForm = formDoc || form
    if (!usedForm) return <p className="text-gray-500 italic">Form data unavailable.</p>

    if (submitted) {
        if (usedForm.confirmationType === 'message' && usedForm.confirmationMessage) {
            return (
                <div className="text-green-600 bg-white p-4 rounded shadow-sm border border-green-100">
                    <RichText data={usedForm.confirmationMessage} />
                </div>
            )
        }
        return <p className="text-green-600 bg-white p-4 rounded shadow-sm border border-green-100">Thanks — your message has been sent.</p>
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full space-y-4">
                {Array.isArray(usedForm.fields) && usedForm.fields.map((field: any, idx: number) => {
                    // message blocks are not inputs
                    if (field.blockType === 'message') {
                        return <FieldComponents.message key={field.id ?? idx} message={field.message} />
                    }

                    const Component = (FieldComponents as any)[field.blockType]
                    if (!Component) return null

                    // Override input styling to match ContactForm design
                    // We can't easily override props passed to internal components without wrapper, 
                    // but we can rely on global styles or ensure FieldComponents use standard UI components.
                    // Assuming FieldComponents use shadcn UI components which have classes applied.

                    return (
                        <div key={field.id ?? field.name ?? idx}>
                            <Component
                                {...field}
                                errors={methods.formState.errors}
                                register={methods.register}
                            />
                        </div>
                    )
                })}

                <Button type="submit" className="w-full bg-primary" disabled={loading}>
                    {loading ? 'Sending...' : usedForm.submitButtonLabel || 'Send Message'}
                </Button>
            </form>
        </FormProvider>
    )
}
