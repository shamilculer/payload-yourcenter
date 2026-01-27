import type { Block } from 'payload'

import {
    FixedToolbarFeature,
    HeadingFeature,
    InlineToolbarFeature,
    lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const FAQItemsBlock: Block = {
    slug: 'faqItems',
    interfaceName: 'FAQItemsBlock',
    fields: [
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
                    name: 'triggerStyle',
                    type: 'select',
                    label: 'Trigger Style',
                    defaultValue: 'secondary',
                    options: [
                        { label: 'Default', value: 'default' },
                        { label: 'Primary', value: 'primary' },
                        { label: 'Secondary', value: 'secondary' },
                        { label: 'Accent', value: 'accent' },
                    ],
                },
                {
                    name: 'contentBackground',
                    type: 'select',
                    label: 'Content Background',
                    defaultValue: 'white',
                    options: [
                        { label: 'White', value: 'white' },
                        { label: 'Muted', value: 'muted' },
                        { label: 'Transparent', value: 'transparent' },
                    ],
                },
            ],
        },
    ],
    labels: {
        plural: 'FAQ Items Blocks',
        singular: 'FAQ Items Block',
    },
}
