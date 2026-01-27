import type { Block } from 'payload'

import {
    FixedToolbarFeature,
    InlineToolbarFeature,
    lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const CTACardBlock: Block = {
    slug: 'ctaCard',
    interfaceName: 'CTACardBlock',
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
        {
            name: 'ctaButton',
            type: 'group',
            label: 'CTA Button',
            fields: [
                {
                    name: 'label',
                    type: 'text',
                    required: true,
                    defaultValue: 'Learn More',
                },
                {
                    name: 'url',
                    type: 'text',
                    required: true,
                },
            ],
        },
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
            ],
        },
    ],
    labels: {
        plural: 'CTA Card Blocks',
        singular: 'CTA Card Block',
    },
}
