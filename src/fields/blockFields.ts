import type { Field } from 'payload'

export const blockFields: Field[] = [
    {
        name: 'settings',
        type: 'group',
        admin: {
            // Hide the group label in the admin UI to make it look like top-level fields within the tab
            hideGutter: true,
            style: {
                margin: 0,
                padding: 0,
            }
        },
        fields: [
            {
                type: 'row',
                fields: [
                    {
                        name: 'theme',
                        type: 'select',
                        label: 'Theme (Background)',
                        defaultValue: 'transparent',
                        options: [
                            { label: 'Transparent', value: 'transparent' },
                            { label: 'White', value: 'white' },
                            { label: 'Light Gray', value: 'light-gray' },
                            { label: 'Primary', value: 'primary' },
                            { label: 'Secondary', value: 'secondary' },
                            { label: 'Accent', value: 'accent' },
                            { label: 'Dark', value: 'dark' },
                        ],
                        admin: {
                            width: '50%',
                        },
                    },
                    {
                        name: 'width',
                        type: 'select',
                        label: 'Content Width',
                        defaultValue: 'boxed',
                        options: [
                            { label: 'Boxed (Container)', value: 'boxed' },
                            { label: 'Full Width', value: 'full' },
                        ],
                        admin: {
                            width: '50%',
                        },
                    },
                ]
            },
            {
                type: 'collapsible',
                label: 'Spacing & Animation',
                admin: {
                    initCollapsed: true,
                },
                fields: [
                    {
                        type: 'row',
                        fields: [
                            { name: 'paddingTop', type: 'text', label: 'Padding Top', defaultValue: '0px', admin: { width: '25%' } },
                            { name: 'paddingRight', type: 'text', label: 'Padding Right', defaultValue: '0px', admin: { width: '25%' } },
                            { name: 'paddingBottom', type: 'text', label: 'Padding Bottom', defaultValue: '0px', admin: { width: '25%' } },
                            { name: 'paddingLeft', type: 'text', label: 'Padding Left', defaultValue: '0px', admin: { width: '25%' } },
                        ]
                    },
                    {
                        type: 'row',
                        fields: [
                            { name: 'marginTop', type: 'text', label: 'Margin Top', defaultValue: '0px', admin: { width: '25%' } },
                            { name: 'marginRight', type: 'text', label: 'Margin Right', defaultValue: '0px', admin: { width: '25%' } },
                            { name: 'marginBottom', type: 'text', label: 'Margin Bottom', defaultValue: '0px', admin: { width: '25%' } },
                            { name: 'marginLeft', type: 'text', label: 'Margin Left', defaultValue: '0px', admin: { width: '25%' } },
                        ]
                    },
                    {
                        name: 'animation',
                        type: 'select',
                        label: 'Animation',
                        defaultValue: 'none',
                        options: [
                            { label: 'None', value: 'none' },
                            { label: 'Fade In', value: 'fade-in' },
                            { label: 'Fade In Up', value: 'fade-in-up' },
                            { label: 'Fade In Down', value: 'fade-in-down' },
                            { label: 'Fade In Left', value: 'fade-in-left' },
                            { label: 'Fade In Right', value: 'fade-in-right' },
                            { label: 'Zoom In', value: 'zoom-in' },
                            { label: 'Zoom Out', value: 'zoom-out' },
                        ],
                    },
                    {
                        type: 'row',
                        fields: [
                            {
                                name: 'animationDelay',
                                type: 'number',
                                label: 'Animation Delay (ms)',
                                defaultValue: 0,
                                admin: { width: '50%' },
                            },
                            {
                                name: 'animationDuration',
                                type: 'number',
                                label: 'Animation Duration (ms)',
                                defaultValue: 0,
                                admin: { description: 'Leave 0 for default', width: '50%' },
                            }
                        ]
                    }
                ]
            },
            {
                type: 'collapsible',
                label: 'Border',
                admin: {
                    initCollapsed: true,
                },
                fields: [
                    {
                        type: 'collapsible',
                        label: 'Width',
                        admin: {
                            initCollapsed: false,
                            style: { marginBottom: '20px' }
                        },
                        fields: [
                            {
                                type: 'row',
                                fields: [
                                    {
                                        name: 'borderTopWidth',
                                        type: 'text',
                                        label: 'Top',
                                        defaultValue: '0px',
                                        admin: { width: '25%' },
                                    },
                                    {
                                        name: 'borderRightWidth',
                                        type: 'text',
                                        label: 'Right',
                                        defaultValue: '0px',
                                        admin: { width: '25%' },
                                    },
                                    {
                                        name: 'borderBottomWidth',
                                        type: 'text',
                                        label: 'Bottom',
                                        defaultValue: '0px',
                                        admin: { width: '25%' },
                                    },
                                    {
                                        name: 'borderLeftWidth',
                                        type: 'text',
                                        label: 'Left',
                                        defaultValue: '0px',
                                        admin: { width: '25%' },
                                    },
                                ]
                            },
                        ]
                    },
                    {
                        type: 'row',
                        fields: [
                            {
                                name: 'borderStyle',
                                type: 'select',
                                label: 'Style',
                                defaultValue: 'solid',
                                options: [
                                    { label: 'None', value: 'none' },
                                    { label: 'Solid', value: 'solid' },
                                    { label: 'Dashed', value: 'dashed' },
                                    { label: 'Dotted', value: 'dotted' },
                                    { label: 'Double', value: 'double' },
                                ],
                                admin: {
                                    width: '33%',
                                },
                            },
                            {
                                name: 'borderColor',
                                type: 'select',
                                label: 'Color',
                                defaultValue: 'transparent',
                                options: [
                                    { label: 'Transparent', value: 'transparent' },
                                    { label: 'Primary', value: 'primary' },
                                    { label: 'Secondary', value: 'secondary' },
                                    { label: 'Accent', value: 'accent' },
                                    { label: 'Dark', value: 'dark' },
                                    { label: 'White', value: 'white' },
                                    { label: 'Light Gray', value: 'light-gray' },
                                    { label: 'Custom', value: 'custom' },
                                ],
                                admin: {
                                    width: '33%',
                                },
                            },
                            {
                                name: 'borderCustomColor',
                                type: 'text',
                                label: 'Custom Color',
                                admin: {
                                    width: '33%',
                                    condition: (_, siblingData) => siblingData.borderColor === 'custom',
                                    placeholder: '#000000 or rgb(0,0,0)',
                                },
                            },
                        ]
                    },
                    {
                        type: 'collapsible',
                        label: 'Radius',
                        admin: {
                            initCollapsed: false,
                        },
                        fields: [
                            {
                                type: 'row',
                                fields: [
                                    {
                                        name: 'borderTopLeftRadius',
                                        type: 'text',
                                        label: 'Top Left',
                                        defaultValue: '0px',
                                        admin: { width: '25%' },
                                    },
                                    {
                                        name: 'borderTopRightRadius',
                                        type: 'text',
                                        label: 'Top Right',
                                        defaultValue: '0px',
                                        admin: { width: '25%' },
                                    },
                                    {
                                        name: 'borderBottomRightRadius',
                                        type: 'text',
                                        label: 'Bottom Right',
                                        defaultValue: '0px',
                                        admin: { width: '25%' },
                                    },
                                    {
                                        name: 'borderBottomLeftRadius',
                                        type: 'text',
                                        label: 'Bottom Left',
                                        defaultValue: '0px',
                                        admin: { width: '25%' },
                                    },
                                ]
                            },
                        ]
                    },
                ]
            }
        ]
    }
]
