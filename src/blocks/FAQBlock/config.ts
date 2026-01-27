import type { Block } from 'payload'

import {
    FixedToolbarFeature,
    HeadingFeature,
    InlineToolbarFeature,
    lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '../../fields/linkGroup'

export const FAQBlock: Block = {
    slug: 'faq',
    interfaceName: 'FAQBlock',
    fields: [
        {
            name: 'eyebrow',
            type: 'text',
            label: 'Eyebrow Text',
            defaultValue: 'Common Questions',
        },
        {
            name: 'heading',
            type: 'text',
            label: 'Section Heading',
            required: true,
            defaultValue: 'Frequently Asked Questions About Our Services',
        },
        {
            name: 'faqItems',
            type: 'array',
            label: 'FAQ Items',
            required: true,
            minRows: 1,
            fields: [
                {
                    name: 'question',
                    type: 'text',
                    required: true,
                    label: 'Question',
                },
                {
                    name: 'answer',
                    type: 'richText',
                    required: true,
                    label: 'Answer',
                    editor: lexicalEditor({
                        features: ({ rootFeatures }) => {
                            return [
                                ...rootFeatures,
                                HeadingFeature({ enabledHeadingSizes: ['h3', 'h4'] }),
                                FixedToolbarFeature(),
                                InlineToolbarFeature(),
                            ]
                        },
                    }),
                },
            ],
        },
        {
            type: 'row',
            fields: [
                {
                    name: 'sidebarImage',
                    type: 'upload',
                    relationTo: 'media',
                    label: 'Sidebar Image',
                    required: true,
                },
                {
                    name: 'showPattern',
                    type: 'checkbox',
                    label: 'Show Background Pattern',
                    defaultValue: true,
                },
            ],
        },
        {
            name: 'ctaHeading',
            type: 'text',
            label: 'CTA Card Heading',
            required: true,
            defaultValue: 'Have More Any Questions?',
        },
        {
            name: 'ctaDescription',
            type: 'richText',
            label: 'CTA Card Description',
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
                    defaultValue: 'Get Free Consultation',
                },
                {
                    name: 'url',
                    type: 'text',
                    required: true,
                    defaultValue: 'tel:+919061060000',
                },
            ],
        },
        {
            type: 'row',
            fields: [
                {
                    name: 'theme',
                    type: 'select',
                    label: 'Color Theme',
                    defaultValue: 'secondary',
                    options: [
                        { label: 'Primary', value: 'primary' },
                        { label: 'Secondary', value: 'secondary' },
                        { label: 'Accent', value: 'accent' },
                    ],
                },
                {
                    name: 'ctaBackground',
                    type: 'select',
                    label: 'CTA Card Background',
                    defaultValue: 'secondary',
                    options: [
                        { label: 'Primary', value: 'primary' },
                        { label: 'Secondary', value: 'secondary' },
                        { label: 'Accent', value: 'accent' },
                        { label: 'Muted', value: 'muted' },
                    ],
                },
            ],
        },
    ],
    labels: {
        plural: 'FAQ Blocks',
        singular: 'FAQ Block',
    },
}
