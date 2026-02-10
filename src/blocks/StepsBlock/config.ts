import type { Block } from 'payload'

import { blockFields } from '@/fields/blockFields'

export const StepsBlock: Block = {
    slug: 'steps',
    interfaceName: 'StepsBlock',
    fields: [
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'Content',
                    fields: [
                        {
                            name: 'steps',
                            type: 'array',
                            labels: {
                                singular: 'Step',
                                plural: 'Steps',
                            },
                            fields: [
                                {
                                    name: 'stepNumber',
                                    type: 'text',
                                    label: 'Step Number',
                                    required: true,
                                    admin: {
                                        placeholder: '01',
                                    },
                                },
                                {
                                    name: 'title',
                                    type: 'text',
                                    required: true,
                                },
                                {
                                    name: 'description',
                                    type: 'textarea',
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
