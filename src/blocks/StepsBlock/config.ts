import type { Block } from 'payload'

export const StepsBlock: Block = {
    slug: 'steps',
    interfaceName: 'StepsBlock',
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
    ],
}
