import type { Block } from 'payload'
import { link } from '@/fields/link'
import { blockFields } from '@/fields/blockFields'

export const IconBoxBlock: Block = {
    slug: 'iconBox',
    interfaceName: 'IconBoxBlock',
    fields: [
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'Content',
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
                            name: 'iconImage',
                            type: 'upload',
                            relationTo: 'media',
                            label: 'Icon Image',
                            admin: {
                                condition: (_, siblingData) => siblingData.iconType === 'upload',
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
                            name: 'title',
                            type: 'text',
                            required: true,
                        },
                        {
                            name: 'description',
                            type: 'textarea',
                        },
                        {
                            type: 'row',
                            fields: [
                                {
                                    name: 'padding',
                                    type: 'select',
                                    label: 'Padding',
                                    defaultValue: 'medium',
                                    options: [
                                        { label: 'Small (p-4)', value: 'small' },
                                        { label: 'Medium (p-6)', value: 'medium' },
                                        { label: 'Large (p-8)', value: 'large' },
                                    ],
                                },
                                {
                                    name: 'gap',
                                    type: 'select',
                                    label: 'Gap Between Elements',
                                    defaultValue: 'medium',
                                    options: [
                                        { label: 'Small (gap-3)', value: 'small' },
                                        { label: 'Medium (gap-4)', value: 'medium' },
                                        { label: 'Large (gap-6)', value: 'large' },
                                        { label: 'XL (gap-9)', value: 'xl' },
                                    ],
                                },
                            ],
                        },
                        {
                            type: 'row',
                            fields: [
                                {
                                    name: 'cardBorderRadius',
                                    type: 'select',
                                    label: 'Card Border Radius',
                                    defaultValue: 'xl',
                                    options: [
                                        { label: 'None', value: 'none' },
                                        { label: 'Small (rounded-sm)', value: 'sm' },
                                        { label: 'Medium (rounded-md)', value: 'md' },
                                        { label: 'Large (rounded-lg)', value: 'lg' },
                                        { label: 'XL (rounded-xl)', value: 'xl' },
                                        { label: '2XL (rounded-2xl)', value: '2xl' },
                                    ],
                                },
                                {
                                    name: 'shadow',
                                    type: 'select',
                                    label: 'Shadow',
                                    defaultValue: 'sm',
                                    options: [
                                        { label: 'None', value: 'none' },
                                        { label: 'Small (shadow-sm)', value: 'sm' },
                                        { label: 'Medium (shadow-md)', value: 'md' },
                                        { label: 'Large (shadow-lg)', value: 'lg' },
                                    ],
                                },
                            ],
                        },
                        {
                            type: 'row',
                            fields: [
                                {
                                    name: 'iconShape',
                                    type: 'select',
                                    label: 'Icon Shape',
                                    defaultValue: 'circle',
                                    options: [
                                        { label: 'Circle (rounded-full)', value: 'circle' },
                                        { label: 'Rounded Square (rounded-xl)', value: 'square' },
                                        { label: 'Organic Shape', value: 'organic' },
                                    ],
                                },
                                {
                                    name: 'iconSize',
                                    type: 'select',
                                    label: 'Icon Size',
                                    defaultValue: 'medium',
                                    options: [
                                        { label: 'Small (w-8 h-8)', value: 'small' },
                                        { label: 'Medium (w-12 h-12)', value: 'medium' },
                                        { label: 'Large (w-14 h-14)', value: 'large' },
                                    ],
                                },
                            ],
                        },
                        {
                            type: 'row',
                            fields: [
                                {
                                    name: 'backgroundColor',
                                    type: 'select',
                                    label: 'Background Color',
                                    defaultValue: 'white',
                                    options: [
                                        { label: 'White', value: 'white' },
                                        { label: 'Card (Default)', value: 'card' },
                                        { label: 'Orange Pastel (#fff7ed)', value: 'orange' },
                                        { label: 'Cyan Pastel (#ecfeff)', value: 'cyan' },
                                        { label: 'Yellow Pastel (#fffbeb)', value: 'yellow' },
                                        { label: 'Green Pastel (#ecfdf5)', value: 'green' },
                                        { label: 'Purple Pastel (#faf5ff)', value: 'purple' },
                                        { label: 'Pink Pastel (#fdf2f8)', value: 'pink' },
                                        { label: 'Custom Hex', value: 'custom' },
                                    ],
                                },
                                {
                                    name: 'customBackgroundColor',
                                    type: 'text',
                                    label: 'Custom Background Color',
                                    admin: {
                                        placeholder: '#ffffff',
                                        condition: (_, siblingData) => siblingData.backgroundColor === 'custom',
                                    },
                                },
                            ],
                        },
                        {
                            type: 'row',
                            fields: [
                                {
                                    name: 'iconColor',
                                    type: 'text',
                                    label: 'Icon Color (Optional)',
                                    admin: {
                                        placeholder: '#000000',
                                        description: 'Leave empty for white (or default)',
                                    },
                                },
                                {
                                    name: 'iconBackgroundColor',
                                    type: 'text',
                                    label: 'Icon Background Color (Optional)',
                                    admin: {
                                        placeholder: '#C4C93B',
                                        description: 'Leave empty for primary color',
                                    },
                                },
                                {
                                    name: 'alignment',
                                    type: 'select',
                                    label: 'Content Alignment',
                                    defaultValue: 'left',
                                    options: [
                                        { label: 'Left', value: 'left' },
                                        { label: 'Center', value: 'center' },
                                    ],
                                },
                            ],
                        },
                        {
                            type: 'row',
                            fields: [
                                {
                                    name: 'enableHoverEffect',
                                    type: 'checkbox',
                                    label: 'Enable Hover Effect',
                                    defaultValue: false,
                                    admin: {
                                        description: 'Changes background to hover color and text to white on hover',
                                    },
                                },
                                {
                                    name: 'hoverBackgroundColor',
                                    type: 'select',
                                    label: 'Hover Background Color',
                                    defaultValue: 'primary',
                                    options: [
                                        { label: 'Primary', value: 'primary' },
                                        { label: 'Secondary', value: 'secondary' },
                                        { label: 'Accent', value: 'accent' },
                                        { label: 'Custom Hex', value: 'custom' },
                                    ],
                                    admin: {
                                        condition: (_, siblingData) => siblingData.enableHoverEffect === true,
                                    },
                                },
                                {
                                    name: 'customHoverColor',
                                    type: 'text',
                                    label: 'Custom Hover Color',
                                    admin: {
                                        placeholder: '#000000',
                                        condition: (_, siblingData) =>
                                            siblingData.enableHoverEffect === true && siblingData.hoverBackgroundColor === 'custom',
                                    },
                                },
                            ],
                        },
                        link({
                            overrides: {
                                admin: {
                                    description: 'Optional link',
                                },
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
}
