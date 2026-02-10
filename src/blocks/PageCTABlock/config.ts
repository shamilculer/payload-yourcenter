import type { Block } from 'payload'
import { link } from '@/fields/link'

import { blockFields } from '@/fields/blockFields'

export const PageCTABlock: Block = {
    slug: 'pageCta',
    interfaceName: 'PageCTABlock',
    fields: [
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'Content',
                    fields: [
                        {
                            name: 'backgroundImage',
                            type: 'upload',
                            relationTo: 'media',
                            label: 'Background Image',
                            required: true,
                        },
                        {
                            name: 'eyebrow',
                            type: 'text',
                            label: 'Eyebrow Text',
                            defaultValue: 'Make A Visit',
                        },
                        {
                            name: 'heading',
                            type: 'text',
                            label: 'Heading',
                            required: true,
                            defaultValue: 'Your health deserves accuracy and care.',
                        },
                        {
                            name: 'description',
                            type: 'textarea',
                            label: 'Description',
                            required: true,
                            defaultValue: 'Visit our branches in Calicut, Tirur, or Vadakara, or book your appointment online today for an effortless diagnostic experience.',
                        },
                        link({
                            overrides: {
                                name: 'ctaButton1',
                                label: 'CTA Button 1',
                            },
                        }),
                        link({
                            overrides: {
                                name: 'ctaButton2',
                                label: 'CTA Button 2',
                            },
                        }),
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
        plural: 'Page CTA Blocks',
        singular: 'Page CTA Block',
    },
}
