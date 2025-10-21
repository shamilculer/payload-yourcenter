import type { Block } from 'payload'
import { lexicalEditor, FixedToolbarFeature, InlineToolbarFeature } from '@payloadcms/richtext-lexical'

export const CalloutForm: Block = {
    slug: 'calloutForm',
    interfaceName: 'CalloutFormBlock',
    labels: {
        singular: 'Callout with Form/CTA',
        plural: 'Callout with Forms/CTAs',
    },
    fields: [
        // === LEFT SIDE / MAIN CALLOUT CONTENT ===
        {
            name: 'contentGroup',
            label: 'Callout Content (Left)',
            type: 'group',
            fields: [
                {
                    name: 'backgroundImage',
                    label: 'Background Image',
                    type: 'upload',
                    relationTo: 'media', // IMPORTANT: Use your media collection slug
                    required: true,
                    admin: {
                        description: 'The large image used behind the content (e.g., the MRI image).'
                    }
                },
                {
                    name: 'eyebrow',
                    label: 'Eyebrow Text (Small Heading)',
                    type: 'text',
                },
                {
                    name: 'heading',
                    label: 'Main Heading',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'description',
                    label: 'Description',
                    type: 'richText',
                    editor: lexicalEditor({
                        features: ({ rootFeatures }) => [
                            ...rootFeatures,
                            FixedToolbarFeature(),
                            InlineToolbarFeature(),
                        ],
                    }),
                },
                // The 'callButton' group has been removed as requested.
            ],
        },

        // === RIGHT SIDE / FORM CONFIGURATION ===
        {
            name: 'formGroup',
            label: 'Form Configuration (Right)',
            type: 'group',
            fields: [
                {
                    name: 'formHeading',
                    label: 'Form Sidebar Heading',
                    type: 'text',
                    required: true,
                    defaultValue: 'Need help scheduling an appointment?',
                    admin: {
                        description: 'The heading displayed directly above the form fields.',
                    },
                },
                {
                    name: 'formSubheading',
                    label: 'Form Subheading/Intro',
                    type: 'richText',
                    editor: lexicalEditor({
                        features: ({ rootFeatures }) => [
                            ...rootFeatures,
                            FixedToolbarFeature(),
                            InlineToolbarFeature(),
                        ],
                    }),
                    admin: {
                        description: 'A short description or instruction for the user above the form.',
                    },
                },
                {
                    name: 'form',
                    type: 'relationship',
                    relationTo: 'forms',
                    required: true,
                    admin: {
                        description: 'The form to display in the sidebar.',
                    },
                },
            ],
        },
    ],
}
