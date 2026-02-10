import type { Block } from 'payload'

import { blockFields } from '@/fields/blockFields'

export const WhyUsBlock: Block = {
    slug: 'whyUs',
    interfaceName: 'WhyUsBlock',
    fields: [
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'Content',
                    fields: [
                        {
                            name: 'eyebrow',
                            type: 'text',
                            label: 'Eyebrow Text',
                            defaultValue: 'What We Do',
                        },
                        {
                            name: 'heading',
                            type: 'text',
                            label: 'Heading',
                            required: true,
                            defaultValue: 'Redefining Quality and Affordable Healthcare',
                        },
                        {
                            name: 'description',
                            type: 'textarea',
                            label: 'Description',
                            required: true,
                            defaultValue:
                                'A center for the people, where life, health, happiness, and love guide everything we do. We walk by your side with care and counseling, delivering predictive and preventive healthcare through advanced technology, world-class networks, and a compassionate team of professionals.',
                        },
                        {
                            name: 'image',
                            type: 'upload',
                            relationTo: 'media',
                            label: 'Hero Image (Right Side)',
                            required: true,
                        },
                        {
                            name: 'features',
                            type: 'array',
                            label: 'Features',
                            minRows: 1,
                            fields: [
                                {
                                    name: 'icon',
                                    type: 'upload',
                                    relationTo: 'media',
                                    label: 'Icon (Square format recommended)',
                                    required: true,
                                },
                                {
                                    name: 'title',
                                    type: 'text',
                                    label: 'Feature Title',
                                    required: true,
                                },
                                {
                                    name: 'description',
                                    type: 'textarea',
                                    label: 'Feature Description',
                                    required: true,
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
    labels: {
        plural: 'Why Us Blocks',
        singular: 'Why Us Block',
    },
}
