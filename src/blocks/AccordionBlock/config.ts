import type { Block } from 'payload'

import {
    FixedToolbarFeature,
    HeadingFeature,
    InlineToolbarFeature,
    lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { blockFields } from '@/fields/blockFields'

export const AccordionBlock: Block = {
    slug: 'accordion',
    interfaceName: 'AccordionBlock',
    fields: [
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'Content',
                    fields: [
                        {
                            name: 'accordionItems',
                            type: 'array',
                            fields: [
                                {
                                    name: 'title',
                                    type: 'text',
                                    required: true,
                                },
                                {
                                    name: 'content',
                                    type: 'richText',
                                    required: true,
                                    editor: lexicalEditor({
                                        features: ({ rootFeatures }) => {
                                            return [
                                                ...rootFeatures,
                                                HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
                                                FixedToolbarFeature(),
                                                InlineToolbarFeature(),
                                            ]
                                        },
                                    }),
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
