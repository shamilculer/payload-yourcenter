import type { Block } from 'payload'
import { link } from '@/fields/link'

export const IconListBlock: Block = {
    slug: 'iconList',
    interfaceName: 'IconListBlock',
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
                    name: 'text',
                    type: 'text',
                    required: true,
                },
                link({
                    overrides: {
                        admin: {
                            description: 'Optional link for this item',
                        },
                    },
                }),
            ],
        },
    ],
}
