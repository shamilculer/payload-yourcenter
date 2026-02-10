import type { Block } from 'payload'
import { blockFields } from '@/fields/blockFields'
import {
    FixedToolbarFeature,
    HeadingFeature,
    InlineToolbarFeature,
    lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const FormBlock: Block = {
    slug: 'formBlock',
    interfaceName: 'FormBlock',
    fields: [
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'Content',
                    fields: [
                        {
                            name: 'heading',
                            label: 'Form Heading',
                            type: 'text',
                            required: false,
                        },
                        {
                            name: 'introContent',
                            label: 'Intro Content',
                            type: 'richText',
                            editor: lexicalEditor({
                                features: ({ rootFeatures }) => [
                                    ...rootFeatures,
                                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                                    FixedToolbarFeature(),
                                    InlineToolbarFeature(),
                                ],
                            }),
                        },
                        {
                            name: 'form',
                            type: 'relationship',
                            relationTo: 'forms',
                            required: true,
                            admin: {
                                description: 'Select the form directly to display.',
                            },
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
        plural: 'Form Blocks',
        singular: 'Form Block',
    },
}
