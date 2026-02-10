import type { Block } from 'payload'

import { blockFields } from '@/fields/blockFields'

export const TestimonialsBlock: Block = {
    slug: 'testimonials',
    interfaceName: 'TestimonialsBlock',
    fields: [
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'Content',
                    fields: [
                        {
                            name: 'title',
                            type: 'text',
                            label: 'Section Title',
                            defaultValue: 'What Our Patients Say About Us',
                        },
                        {
                            name: 'eyebrow',
                            type: 'text',
                            label: 'Eyebrow',
                            defaultValue: 'Testimonials',
                        },
                        {
                            name: 'testimonials',
                            type: 'array',
                            labels: {
                                singular: 'Testimonial',
                                plural: 'Testimonials',
                            },
                            fields: [
                                {
                                    name: 'title',
                                    type: 'text',
                                    label: 'Review Title',
                                },
                                {
                                    name: 'author',
                                    type: 'text',
                                    required: true,
                                    label: 'Author Name',
                                },
                                {
                                    name: 'content',
                                    type: 'textarea',
                                    required: true,
                                },
                                {
                                    name: 'location',
                                    type: 'text',
                                    label: 'Location / Role',
                                },
                                {
                                    name: 'image',
                                    type: 'upload',
                                    relationTo: 'media',
                                    required: false,
                                    label: 'Author Image (Optional)',
                                },
                                {
                                    name: 'rating',
                                    type: 'number',
                                    min: 1,
                                    max: 5,
                                    defaultValue: 5,
                                },
                            ],
                        },
                    ]
                },
                {
                    label: 'Settings',
                    fields: [
                        ...blockFields
                    ]
                }
            ]
        }
    ],
}
