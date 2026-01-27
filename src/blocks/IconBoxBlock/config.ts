import type { Block } from 'payload'
import { link } from '@/fields/link'

export const IconBoxBlock: Block = {
    slug: 'iconBox',
    interfaceName: 'IconBoxBlock',
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
                    name: 'backgroundColor',
                    type: 'select',
                    label: 'Background Color',
                    defaultValue: 'card',
                    options: [
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
                        description: 'Leave empty for default primary color',
                    },
                },
                {
                    name: 'alignment',
                    type: 'select',
                    label: 'Content Alignment',
                    defaultValue: 'center',
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
    ],
}
