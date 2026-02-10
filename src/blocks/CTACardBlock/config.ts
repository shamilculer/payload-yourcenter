import type { Block } from 'payload'
import { link } from '@/fields/link'

import {
    FixedToolbarFeature,
    InlineToolbarFeature,
    lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { blockFields } from '@/fields/blockFields'

export const CTACardBlock: Block = {
    slug: 'ctaCard',
    interfaceName: 'CTACardBlock',
    fields: [
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'Content',
                    fields: [
                        {
                            name: 'image',
                            type: 'upload',
                            relationTo: 'media',
                            label: 'Card Image (Optional)',
                        },
                        {
                            name: 'heading',
                            type: 'text',
                            label: 'Card Heading',
                            required: true,
                        },
                        {
                            name: 'description',
                            type: 'richText',
                            label: 'Card Description',
                            required: true,
                            editor: lexicalEditor({
                                features: ({ rootFeatures }) => {
                                    return [
                                        ...rootFeatures,
                                        FixedToolbarFeature(),
                                        InlineToolbarFeature(),
                                    ]
                                },
                            }),
                        },
                        link({
                            overrides: {
                                name: 'ctaButton',
                                label: 'CTA Button',
                            },
                        }),
                        {
                            type: 'row',
                            fields: [
                                {
                                    name: 'backgroundColor',
                                    type: 'select',
                                    label: 'Background Color',
                                    defaultValue: 'secondary',
                                    options: [
                                        { label: 'Primary', value: 'primary' },
                                        { label: 'Secondary', value: 'secondary' },
                                        { label: 'Accent', value: 'accent' },
                                        { label: 'Muted', value: 'muted' },
                                        { label: 'White', value: 'white' },
                                    ],
                                },
                                {
                                    name: 'borderRadius',
                                    type: 'select',
                                    label: 'Border Radius',
                                    defaultValue: '2xl',
                                    options: [
                                        { label: 'None', value: 'none' },
                                        { label: 'Small', value: 'sm' },
                                        { label: 'Medium', value: 'md' },
                                        { label: 'Large', value: 'lg' },
                                        { label: 'XL', value: 'xl' },
                                        { label: '2XL', value: '2xl' },
                                        { label: '3XL', value: '3xl' },
                                    ],
                                },
                                {
                                    name: 'imageHeight',
                                    type: 'text',
                                    label: 'Image Height (in pixels)',
                                    defaultValue: '192',
                                    admin: {
                                        description: 'Enter image height in pixels (e.g., 192, 300, 450). Default is 192px (h-48).',
                                    },
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
        plural: 'CTA Card Blocks',
        singular: 'CTA Card Block',
    },
}
