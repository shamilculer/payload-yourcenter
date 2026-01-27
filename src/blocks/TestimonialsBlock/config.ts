import type { Block } from 'payload'

export const TestimonialsBlock: Block = {
    slug: 'testimonials',
    interfaceName: 'TestimonialsBlock',
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
                    name: 'content',
                    type: 'textarea',
                    required: true,
                },
                {
                    name: 'author',
                    type: 'text',
                    required: true,
                    label: 'Author Name',
                },
                {
                    name: 'title',
                    type: 'text',
                    label: 'Review Title',
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
    ],
}
