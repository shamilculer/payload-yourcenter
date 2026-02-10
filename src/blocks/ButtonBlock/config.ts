import type { Block } from 'payload'
import { link } from '@/fields/link'
import { blockFields } from '@/fields/blockFields'

export const ButtonBlock: Block = {
    slug: 'button',
    interfaceName: 'ButtonBlock',
    fields: [
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'Content',
                    fields: [
                        link({
                        }),
                    ],
                },
                {
                    label: 'Settings',
                    fields: [
                        ...blockFields,
                        {
                            name: 'alignment',
                            type: 'select',
                            defaultValue: 'start',
                            options: [
                                { label: 'Left', value: 'start' },
                                { label: 'Center', value: 'center' },
                                { label: 'Right', value: 'end' },
                            ]
                        }
                    ],
                },
            ],
        },
    ],
    labels: {
        plural: 'Buttons',
        singular: 'Button',
    },
}
