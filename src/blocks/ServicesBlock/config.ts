import type { Block } from 'payload'
import { blockFields } from '@/fields/blockFields'

export const ServicesBlock: Block = {
    slug: 'servicesSection',
    interfaceName: 'ServicesSectionBlock',
    labels: {
        singular: 'Services Grid',
        plural: 'Services Grid',
    },
    fields: [
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'Content',
                    fields: [
                        {
                            name: 'eyebrow',
                            label: 'Eyebrow Text (Small Label)',
                            type: 'text',
                            required: false,
                            admin: {
                                description: 'Optional small text that appears above the main heading (e.g., "COMPREHENSIVE CARE")',
                            },
                        },
                        {
                            name: 'heading',
                            label: 'Main Heading',
                            type: 'text',
                            required: true,
                        },
                        {
                            name: 'headingAlignment',
                            label: 'Heading Alignment',
                            type: 'select',
                            defaultValue: 'left',
                            options: [
                                { label: 'Left', value: 'left' },
                                { label: 'Center', value: 'center' },
                            ],
                        },
                        {
                            name: 'limit',
                            label: 'Number of Services to Display',
                            type: 'number',
                            defaultValue: 3,
                            required: true,
                            min: 1,
                            max: 9, // Increased max for better utility
                            admin: {
                                description: 'The maximum number of services to show in the grid.',
                            },
                        },
                        {
                            name: 'filterByBranch',
                            label: 'Filter by Branch',
                            type: 'checkbox',
                            defaultValue: false,
                        },
                        {
                            name: 'selectedBranch',
                            label: 'Select Branch',
                            type: 'relationship',
                            relationTo: 'branches',
                            required: true,
                            admin: {
                                condition: (_, siblingData) => siblingData.filterByBranch === true,
                            },
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