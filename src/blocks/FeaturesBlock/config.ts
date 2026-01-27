import type { Block } from 'payload'
import { link } from '@/fields/link'

export const FeaturesBlock: Block = {
    slug: 'features',
    interfaceName: 'FeaturesBlock',
    fields: [
        {
            type: 'row',
            fields: [
                {
                    name: 'columns',
                    type: 'select',
                    label: 'Number of Columns',
                    defaultValue: '4',
                    options: [
                        { label: '2 Columns', value: '2' },
                        { label: '3 Columns', value: '3' },
                        { label: '4 Columns', value: '4' },
                        { label: '6 Columns', value: '6' },
                    ],
                },
                {
                    name: 'gap',
                    type: 'select',
                    label: 'Gap Between Cards',
                    defaultValue: 'lg',
                    options: [
                        { label: 'Small', value: 'sm' },
                        { label: 'Medium', value: 'md' },
                        { label: 'Large', value: 'lg' },
                        { label: 'XL', value: 'xl' },
                    ],
                },
            ],
        },
        {
            name: 'features',
            type: 'array',
            label: 'Feature Items',
            required: true,
            minRows: 1,
            fields: [
                {
                    type: 'row',
                    fields: [
                        {
                            name: 'iconType',
                            type: 'select',
                            label: 'Icon Type',
                            defaultValue: 'upload',
                            options: [
                                { label: 'Upload Image', value: 'upload' },
                                { label: 'Lucide Icon', value: 'lucide' },
                            ],
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
                    label: 'Title',
                    required: true,
                },
                {
                    name: 'description',
                    type: 'textarea',
                    label: 'Description',
                    required: true,
                },
                {
                    type: 'row',
                    fields: [
                        {
                            name: 'backgroundColor',
                            type: 'select',
                            label: 'Background Color',
                            defaultValue: 'orange',
                            options: [
                                { label: 'Orange (#fff7ed)', value: 'orange' },
                                { label: 'Cyan (#ecfeff)', value: 'cyan' },
                                { label: 'Yellow (#fffbeb)', value: 'yellow' },
                                { label: 'Green (#ecfdf5)', value: 'green' },
                                { label: 'Purple (#faf5ff)', value: 'purple' },
                                { label: 'Pink (#fdf2f8)', value: 'pink' },
                                { label: 'Custom', value: 'custom' },
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
                            name: 'enableHoverEffect',
                            type: 'checkbox',
                            label: 'Enable Hover Effect',
                            defaultValue: true,
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
                                { label: 'Custom', value: 'custom' },
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
                        label: 'Link (Optional)',
                        admin: {
                            description: 'Optional link for this feature card',
                        },
                    },
                }),
            ],
        },
    ],
    labels: {
        plural: 'Features Blocks',
        singular: 'Features Block',
    },
}
