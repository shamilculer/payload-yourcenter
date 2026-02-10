import type { Block } from 'payload'
import { link } from '@/fields/link'

import { blockFields } from '@/fields/blockFields'

export const IconListBlock: Block = {
    slug: 'iconList',
    interfaceName: 'IconListBlock',
    fields: [
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'Content',
                    fields: [
                        {
                            name: 'iconListItems',
                            type: 'array',
                            fields: [
                                {
                                    name: 'iconType',
                                    type: 'select',
                                    defaultValue: 'lucide',
                                    options: [
                                        {
                                            label: 'Lucide Icon',
                                            value: 'lucide',
                                        },
                                        {
                                            label: 'Custom Upload',
                                            value: 'upload',
                                        },
                                    ],
                                },
                                {
                                    name: 'iconName',
                                    type: 'text',
                                    label: 'Lucide Icon Name',
                                    admin: {
                                        description: 'Find icon names at https://lucide.dev/icons (e.g., "ArrowRight", "CheckCircle")',
                                        condition: (_, siblingData) => siblingData.iconType === 'lucide',
                                    },
                                },
                                {
                                    name: 'iconImage',
                                    type: 'upload',
                                    relationTo: 'media',
                                    admin: {
                                        condition: (_, siblingData) => siblingData.iconType === 'upload',
                                    },
                                },
                                {
                                    name: 'iconColor',
                                    type: 'select',
                                    defaultValue: 'primary',
                                    options: [
                                        { label: 'Primary', value: 'primary' },
                                        { label: 'Secondary', value: 'secondary' },
                                        { label: 'Accent', value: 'accent' },
                                        { label: 'Destructive', value: 'destructive' },
                                        { label: 'Muted', value: 'muted' },
                                        { label: 'Message', value: 'message' },
                                        { label: 'Success', value: 'success' },
                                        { label: 'Warning', value: 'warning' },
                                        { label: 'White', value: 'white' },
                                        { label: 'Black', value: 'black' },
                                    ],
                                },
                                {
                                    name: 'text',
                                    type: 'text',
                                    required: true,
                                },
                                link({
                                    appearances: false,
                                    disableLabel: true,
                                    overrides: {
                                        admin: {
                                            description: 'Optional link for this item',
                                        },
                                    },
                                }),
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
