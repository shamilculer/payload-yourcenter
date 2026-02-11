import type { CollectionConfig } from 'payload'
import type { Field } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import formatSlug from '../../utilities/formatSlug'
import { link } from '../../fields/link'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateBranch, revalidateBranchDelete } from './hooks/revalidateBranches'
import {
    MetaDescriptionField,
    MetaImageField,
    MetaTitleField,
    OverviewField,
    PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Branches: CollectionConfig<'branches'> = {
    slug: 'branches',
    access: {
        create: authenticated,
        delete: authenticated,
        read: authenticatedOrPublished,
        update: authenticated,
    },
    defaultPopulate: {
        name: true,
        slug: true,
    },
    admin: {
        defaultColumns: ['name', 'slug', 'updatedAt'],
        livePreview: {
            url: ({ data, req }) =>
                generatePreviewPath({
                    slug: data?.slug,
                    collection: 'branches',
                    req,
                }),
        },
        preview: (data, { req }) =>
            generatePreviewPath({
                slug: data?.slug as string,
                collection: 'branches',
                req,
            }),
        useAsTitle: 'name',
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
            admin: {
                description: 'Branch name (e.g., "Yourcenter Calicut")',
            },
        },
        {
            type: 'tabs',
            tabs: [
                // 1. BASIC INFORMATION TAB
                {
                    fields: [
                        {
                            name: 'image',
                            label: 'Hero Background Image',
                            type: 'upload',
                            relationTo: 'media',
                            required: true,
                            admin: {
                                description: 'Background image for the hero section',
                            },
                        },
                        {
                            name: 'heading',
                            label: 'Hero Heading',
                            type: 'text',
                            required: true,
                            admin: {
                                description: 'Main heading displayed in hero section',
                            },
                        },
                        {
                            name: 'overview',
                            label: 'Hero Overview',
                            type: 'textarea',
                            required: true,
                            admin: {
                                description: 'Brief overview text in hero section',
                            },
                        },
                        {
                            name: 'heroLinks',
                            type: 'array',
                            label: 'Hero Buttons',
                            fields: [
                                link({
                                    appearances: ['default', 'outline', 'secondary'],
                                }),
                            ],
                            admin: {
                                description: 'Add buttons to the hero section',
                            },
                        },
                    ],
                    label: 'Basic Information',
                },
                // 2. INTRO SECTION TAB
                {
                    fields: [
                        {
                            name: 'intro',
                            type: 'group',
                            label: 'Intro Section',
                            fields: [
                                {
                                    name: 'image',
                                    label: 'Intro Image',
                                    type: 'upload',
                                    relationTo: 'media',
                                    required: true,
                                },
                                {
                                    name: 'subheading',
                                    label: 'Subheading',
                                    type: 'text',
                                    required: true,
                                    admin: {
                                        description: 'Small label above the heading',
                                    },
                                },
                                {
                                    name: 'heading',
                                    label: 'Heading',
                                    type: 'text',
                                    required: true,
                                },
                                {
                                    name: 'description',
                                    label: 'Description',
                                    type: 'textarea',
                                    required: true,
                                    admin: {
                                        description: 'HTML content is supported',
                                    },
                                },
                                {
                                    name: 'links',
                                    type: 'array',
                                    label: 'Intro Buttons',
                                    fields: [
                                        link({
                                            appearances: ['default', 'outline', 'secondary'],
                                        }),
                                    ],
                                },
                            ] as Field[],
                        },
                    ],
                    label: 'Intro Section',
                },
                // 3. SERVICES TAB
                {
                    fields: [
                        {
                            name: 'serviceEyebrow',
                            label: 'Eyebrow Text',
                            type: 'text',
                            defaultValue: 'Advanced Diagnostics',
                            admin: {
                                description: 'Small text above the heading',
                            },
                        },
                        {
                            name: 'serviceHeading',
                            label: 'Services Section Heading',
                            type: 'text',
                            required: true,
                            defaultValue: 'Our Specialized Diagnostic Services',
                            admin: {
                                description: 'Heading for the services section. Note: Services are automatically filtered based on their branch association. To add services to this branch, edit the service and select this branch in the "Branch Association" field.',
                            },
                        },
                    ],
                    label: 'Services',
                },
                // 4. WHY CHOOSE US TAB
                {
                    fields: [
                        {
                            name: 'whyChooseUs',
                            type: 'group',
                            label: 'Why Choose Us Section',
                            fields: [
                                {
                                    name: 'image',
                                    label: 'Section Image',
                                    type: 'upload',
                                    relationTo: 'media',
                                    required: true,
                                },
                                {
                                    name: 'subheading',
                                    label: 'Subheading',
                                    type: 'text',
                                    required: true,
                                },
                                {
                                    name: 'heading',
                                    label: 'Heading',
                                    type: 'text',
                                    required: true,
                                },
                                {
                                    name: 'intro',
                                    label: 'Introduction',
                                    type: 'textarea',
                                    required: true,
                                },
                                {
                                    name: 'features',
                                    label: 'Features',
                                    type: 'array',
                                    required: true,
                                    minRows: 2,
                                    maxRows: 6,
                                    fields: [
                                        {
                                            name: 'title',
                                            type: 'text',
                                            required: true,
                                        },
                                        {
                                            name: 'text',
                                            type: 'textarea',
                                            required: true,
                                        },
                                    ],
                                },
                            ] as Field[],
                        },
                    ],
                    label: 'Why Choose Us',
                },
                // 5. CONTACT INFORMATION TAB
                {
                    fields: [
                        {
                            name: 'contact',
                            type: 'group',
                            label: 'Contact Information',
                            fields: [
                                {
                                    name: 'phone',
                                    label: 'Phone Numbers',
                                    type: 'array',
                                    required: true,
                                    minRows: 1,
                                    fields: [
                                        {
                                            name: 'number',
                                            type: 'text',
                                            required: true,
                                        },
                                    ],
                                },
                                {
                                    name: 'address',
                                    label: 'Address',
                                    type: 'textarea',
                                    required: true,
                                },
                                {
                                    name: 'email',
                                    label: 'Email',
                                    type: 'email',
                                    required: true,
                                },
                                {
                                    name: 'mapLink',
                                    label: 'Google Maps Link',
                                    type: 'text',
                                    required: true,
                                    admin: {
                                        description: 'Full Google Maps URL',
                                    },
                                },
                            ] as Field[],
                        },
                    ],
                    label: 'Contact Information',
                },
                // 6. CTA SECTION TAB
                {
                    fields: [
                        {
                            name: 'ctaContent',
                            type: 'group',
                            label: 'CTA Section',
                            fields: [
                                {
                                    name: 'subheading',
                                    label: 'Subheading',
                                    type: 'text',
                                    required: true,
                                    defaultValue: 'MAKE A VISIT',
                                },
                                {
                                    name: 'heading',
                                    label: 'Heading',
                                    type: 'text',
                                    required: true,
                                    defaultValue: 'Your health deserves accuracy and care.',
                                },
                                {
                                    name: 'description',
                                    label: 'Description',
                                    type: 'textarea',
                                    required: true,
                                },
                                {
                                    name: 'image',
                                    label: 'CTA Background Image',
                                    type: 'upload',
                                    relationTo: 'media',
                                },
                                {
                                    name: 'links',
                                    type: 'array',
                                    label: 'CTA Buttons',
                                    fields: [
                                        link({
                                            appearances: ['default', 'outline', 'secondary'],
                                        }),
                                    ],
                                },
                            ] as Field[],
                        },
                    ],
                    label: 'CTA Section',
                },
                // 7. SEO TAB
                {
                    name: 'meta',
                    label: 'SEO',
                    fields: [
                        OverviewField({
                            titlePath: 'meta.title',
                            descriptionPath: 'meta.description',
                            imagePath: 'meta.image',
                        }),
                        MetaTitleField({
                            hasGenerateFn: true,
                        }),
                        MetaImageField({
                            relationTo: 'media',
                        }),
                        MetaDescriptionField({}),
                        PreviewField({
                            hasGenerateFn: true,
                            titlePath: 'meta.title',
                            descriptionPath: 'meta.description',
                        }),
                    ],
                },
            ],
        },
        {
            name: 'publishedAt',
            type: 'date',
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'slug',
            label: 'Slug',
            type: 'text',
            index: true,
            admin: {
                position: 'sidebar',
            },
            hooks: {
                beforeValidate: [formatSlug('name')],
            },
        },
    ],
    hooks: {
        afterChange: [revalidateBranch],
        beforeChange: [populatePublishedAt],
        afterDelete: [revalidateBranchDelete],
    },
    versions: {
        drafts: {
            autosave: {
                interval: 100,
            },
            schedulePublish: true,
        },
        maxPerDoc: 50,
    },
}
