
import type { GlobalConfig } from 'payload'

const Footer: GlobalConfig = {
    slug: 'footer',
    access: {
        // Allow public read access
        read: () => true,
    },
    fields: [
        // ----------------------------------------------------------------
        // 1. FIXED FIRST COLUMN (Logo, Description, Social)
        // ----------------------------------------------------------------
        {
            name: 'socialAndLogo',
            label: 'Brand/Social Column (Fixed)',
            type: 'group',
            fields: [
                {
                    name: 'logo',
                    label: 'Logo',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                },
                {
                    name: 'description',
                    label: 'Short Description',
                    type: 'textarea',
                    maxLength: 200,
                },
                {
                    name: 'socialLinks',
                    label: 'Social Media Links',
                    type: 'array',
                    minRows: 1,
                    fields: [
                        {
                            name: 'platform',
                            label: 'Platform (e.g., Facebook, Instagram)',
                            type: 'text',
                            required: true,
                        },
                        {
                            name: 'url',
                            label: 'URL',
                            type: 'text',
                            required: true,
                        },
                        // You might also add an icon field (e.g., select field with icon names)
                    ]
                }
            ],
        },

        // ----------------------------------------------------------------
        // 2. DYNAMIC NAVIGATION COLUMNS
        // ----------------------------------------------------------------
        {
            name: 'columns',
            label: 'Navigation Columns',
            type: 'blocks',
            minRows: 1,
            labels: {
                singular: 'Navigation Column',
                plural: 'Navigation Columns',
            },
            blocks: [
                {
                    slug: 'navBlock',
                    labels: {
                        singular: 'Nav Column',
                        plural: 'Nav Columns',
                    },
                    fields: [
                        {
                            name: 'title',
                            label: 'Column Title',
                            type: 'text',
                            required: true,
                        },
                        {
                            name: 'columnWidth',
                            label: 'Column Width',
                            type: 'select',
                            defaultValue: '1/6',
                            options: [
                                { label: '1/6 (Narrow)', value: '1/6' },
                                { label: '1/4 (Small)', value: '1/4' },
                                { label: '1/3 (Medium)', value: '1/3' },
                                { label: '2/6 (Wide)', value: '2/6' },
                            ],
                            admin: {
                                description: 'Set the width of this column on large screens',
                            },
                        },
                        {
                            name: 'navItems',
                            label: 'Navigation Items',
                            type: 'array',
                            minRows: 1,
                            fields: [
                                // Reusing the pattern of your Header's link structure (or standardizing it)
                                {
                                    name: 'link',
                                    label: 'Link',
                                    type: 'group',
                                    fields: [
                                        {
                                            name: 'label',
                                            label: 'Label',
                                            type: 'text',
                                            required: true,
                                        },
                                        {
                                            name: 'type',
                                            type: 'radio',
                                            options: [
                                                { label: 'Custom URL', value: 'custom' },
                                                { label: 'Internal Page', value: 'reference' },
                                            ],
                                            defaultValue: 'custom',
                                            required: true,
                                            admin: { layout: 'horizontal' },
                                        },
                                        {
                                            name: 'url',
                                            label: 'Custom URL',
                                            type: 'text',
                                            admin: {
                                                condition: (_, siblingData) => siblingData.type === 'custom',
                                            },
                                        },
                                        {
                                            name: 'reference',
                                            label: 'Page Reference',
                                            type: 'relationship',
                                            relationTo: ['pages', 'services', 'posts', 'branches'],
                                            maxDepth: 0,
                                            admin: {
                                                condition: (_, siblingData) => siblingData.type === 'reference',
                                            },
                                        },
                                        {
                                            name: 'newTab',
                                            label: 'Open in New Tab',
                                            type: 'checkbox',
                                        },
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
};

export default Footer;