import type { Block } from 'payload'

import { blockFields } from '@/fields/blockFields'

export const TitleBlock: Block = {
    slug: 'title',
    interfaceName: 'TitleBlock',
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
                            label: 'Eyebrow',
                        },
                        {
                            name: 'title',
                            type: 'text',
                            label: 'Title',
                            required: true,
                        },
                        {
                            name: 'description',
                            type: 'textarea',
                        },
                        {
                            name: 'align',
                            type: 'select',
                            defaultValue: 'center',
                            options: [
                                { label: 'Center', value: 'center' },
                                { label: 'Left', value: 'left' },
                                { label: 'Right', value: 'right' },
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
