import type { Block } from 'payload'
import { linkGroup } from '@/fields/linkGroup'
import { blockFields } from '@/fields/blockFields'

export const ButtonGroupBlock: Block = {
    slug: 'buttonGroup',
    interfaceName: 'ButtonGroupBlock',
    fields: [
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'Content',
                    fields: [
                        linkGroup({
                        }),
                    ],
                },
                {
                    label: 'Settings',
                    fields: [
                        ...blockFields,
                        {
                            type: 'row',
                            fields: [
                                {
                                    name: 'layout',
                                    type: 'select',
                                    defaultValue: 'row',
                                    options: [
                                        { label: 'Horizontal (Row)', value: 'row' },
                                        { label: 'Vertical (Column)', value: 'column' },
                                    ],
                                },
                                {
                                    name: 'alignment',
                                    type: 'select',
                                    defaultValue: 'start',
                                    options: [
                                        { label: 'Start', value: 'start' },
                                        { label: 'Center', value: 'center' },
                                        { label: 'End', value: 'end' },
                                        { label: 'Space Between', value: 'between' },
                                    ],
                                },
                                {
                                    name: 'gap',
                                    type: 'select',
                                    defaultValue: 'medium',
                                    options: [
                                        { label: 'Small', value: 'small' },
                                        { label: 'Medium', value: 'medium' },
                                        { label: 'Large', value: 'large' },
                                    ]
                                }
                            ]
                        }
                    ],
                },
            ],
        },
    ],
    labels: {
        plural: 'Button Groups',
        singular: 'Button Group',
    },
}
