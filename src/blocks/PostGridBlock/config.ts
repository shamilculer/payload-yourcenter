import type { Block } from 'payload'
import { blockFields } from '@/fields/blockFields'

export const PostGridBlock: Block = {
    slug: 'postGrid',
    interfaceName: 'PostGridBlock',
    fields: [
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'Content',
                    fields: [
                        {
                            name: 'categories',
                            type: 'array',
                            label: 'Categories to Show',
                            fields: [
                                {
                                    name: 'title',
                                    type: 'text',
                                },
                            ],
                        },
                        {
                            name: 'limit',
                            type: 'number',
                            label: 'Posts Per Page',
                            defaultValue: 9,
                            required: true,
                            min: 1,
                            max: 100,
                        },
                        {
                            name: 'columns',
                            type: 'select',
                            label: 'Columns (Desktop)',
                            defaultValue: '3',
                            options: [
                                {
                                    label: 'Two Columns',
                                    value: '2',
                                },
                                {
                                    label: 'Three Columns',
                                    value: '3',
                                },
                                {
                                    label: 'Four Columns',
                                    value: '4',
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
        plural: 'Post Grid Blocks',
        singular: 'Post Grid Block',
    },
}
