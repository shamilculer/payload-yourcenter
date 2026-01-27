import type { Block } from 'payload'
import { link } from '@/fields/link'

export const ProcessBlock: Block = {
    slug: 'process',
    interfaceName: 'ProcessBlock',
    fields: [
        // Banner Section Fields
        {
            name: 'bannerImage',
            type: 'upload',
            relationTo: 'media',
            label: 'Banner Background Image',
            required: true,
        },
        {
            name: 'bannerEyebrow',
            type: 'text',
            label: 'Banner Eyebrow Text',
            defaultValue: 'Bringing Families Better Health',
        },
        {
            name: 'bannerHeading',
            type: 'text',
            label: 'Banner Heading',
            required: true,
            defaultValue: 'Redefining Quality and Affordable Healthcare',
        },
        {
            name: 'bannerDescription',
            type: 'textarea',
            label: 'Banner Description',
            required: true,
            defaultValue: 'Backed by four decades of healthcare excellence from Dr Kutty\'s Health Care, we are dedicated to setting new benchmarks in diagnostic accuracy and patient service. Let us be your trusted partner in health. Request a Callback today.',
        },
        link({
            overrides: {
                name: 'bannerButton',
                label: 'Banner Button',
            },
        }),

        // Process Section Fields
        {
            type: 'row',
            fields: [
                {
                    name: 'processEyebrow',
                    type: 'text',
                    label: 'Process Eyebrow Text',
                    defaultValue: 'Our Process',
                },
                {
                    name: 'processHeading',
                    type: 'text',
                    label: 'Process Heading',
                    required: true,
                    defaultValue: 'How We Make Your Diagnostic Journey Simple',
                },
            ]
        },
        {
            name: 'processDescription',
            type: 'textarea',
            label: 'Process Description',
            required: true,
            defaultValue: 'At Your Center, every step is designed for your comfort and confidence — from quick appointment booking to expert analysis and fast digital reports. Experience healthcare that’s accurate, efficient, and centered around you.',
        },
        {
            name: 'processImage',
            type: 'upload',
            relationTo: 'media',
            label: 'Process Side Image',
            required: true,
        },
        {
            name: 'steps',
            type: 'array',
            label: 'Process Steps',
            required: true,
            minRows: 1,
            fields: [
                {
                    name: 'number',
                    type: 'text',
                    label: 'Step Number',
                    required: true,
                    defaultValue: '01',
                    admin: {
                        width: '20%',
                    }
                },
                {
                    name: 'title',
                    type: 'text',
                    label: 'Step Title',
                    required: true,
                    admin: {
                        width: '40%',
                    }
                },
                {
                    name: 'description',
                    type: 'textarea',
                    label: 'Step Description',
                    required: true,
                    admin: {
                        width: '40%',
                    }
                },
            ],
        },
    ],
    labels: {
        plural: 'Process Blocks',
        singular: 'Process Block',
    },
}
