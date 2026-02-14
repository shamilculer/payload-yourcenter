import type { Block } from 'payload'

import { blockFields } from '@/fields/blockFields'

export const WhyUsBlock: Block = {
    slug: 'whyUs',
    interfaceName: 'WhyUsBlock',
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
                            label: 'Eyebrow Text',
                            defaultValue: 'What We Do',
                        },
                        {
                            name: 'heading',
                            type: 'text',
                            label: 'Heading',
                            required: true,
                            defaultValue: 'Redefining Quality and Affordable Healthcare',
                        },
                        {
                            name: 'description',
                            type: 'textarea',
                            label: 'Description',
                            required: true,
                            defaultValue:
                                'A center for the people, where life, health, happiness, and love guide everything we do. We walk by your side with care and counseling, delivering predictive and preventive healthcare through advanced technology, world-class networks, and a compassionate team of professionals.',
                        },
                        {
                            name: 'image',
                            type: 'upload',
                            relationTo: 'media',
                            label: 'Hero Image (Right Side)',
                            required: true,
                        },
                        {
                            name: 'features',
                            type: 'array',
                            label: 'Features',
                            minRows: 1,
                            fields: [
                                {
                                    name: 'iconType',
                                    type: 'select',
                                    defaultValue: 'upload',
                                    options: [
                                        {
                                            label: 'Upload Image',
                                            value: 'upload',
                                        },
                                        {
                                            label: 'Lucide Icon',
                                            value: 'lucide',
                                        },
                                    ],
                                },
                                {
                                    name: 'icon',
                                    type: 'upload',
                                    relationTo: 'media',
                                    label: 'Icon (Square format recommended)',
                                    admin: {
                                        condition: (_, siblingData) => siblingData.iconType === 'upload' || !siblingData.iconType,
                                    },
                                },
                                {
                                    name: 'iconName',
                                    type: 'text',
                                    label: 'Lucide Icon Name',
                                    admin: {
                                        description: 'Find icon names at https://lucide.dev/icons (e.g., "Shield", "Zap")',
                                        condition: (_, siblingData) => siblingData.iconType === 'lucide',
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
                                        { label: 'White', value: 'white' },
                                        { label: 'Black', value: 'black' },
                                        { label: 'Custom', value: 'custom' },
                                    ],
                                },
                                {
                                    name: 'customIconColor',
                                    type: 'text',
                                    label: 'Custom Icon Color (Hex)',
                                    admin: {
                                        placeholder: '#F59E0B',
                                        condition: (_, siblingData) => siblingData.iconColor === 'custom',
                                    },
                                },
                                {
                                    name: 'title',
                                    type: 'text',
                                    label: 'Feature Title',
                                    required: true,
                                },
                                {
                                    name: 'description',
                                    type: 'textarea',
                                    label: 'Feature Description',
                                    required: true,
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
        plural: 'Why Us Blocks',
        singular: 'Why Us Block',
    },
}
