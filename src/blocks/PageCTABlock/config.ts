import type { Block } from 'payload'

export const PageCTABlock: Block = {
    slug: 'pageCta',
    interfaceName: 'PageCTABlock',
    fields: [
        {
            name: 'backgroundImage',
            type: 'upload',
            relationTo: 'media',
            label: 'Background Image',
            required: true,
        },
        {
            name: 'eyebrow',
            type: 'text',
            label: 'Eyebrow Text',
            defaultValue: 'Make A Visit',
        },
        {
            name: 'heading',
            type: 'text',
            label: 'Heading',
            required: true,
            defaultValue: 'Your health deserves accuracy and care.',
        },
        {
            name: 'description',
            type: 'textarea',
            label: 'Description',
            required: true,
            defaultValue: 'Visit our branches in Calicut, Tirur, or Vadakara, or book your appointment online today for an effortless diagnostic experience.',
        },
        {
            name: 'primaryButton',
            type: 'group',
            label: 'Primary Button (Phone Call)',
            fields: [
                {
                    name: 'label',
                    type: 'text',
                    required: true,
                    defaultValue: 'Give us a Call',
                },
                {
                    name: 'phoneNumber',
                    type: 'text',
                    required: true,
                    defaultValue: '+919061060000',
                    admin: {
                        description: 'Phone number in international format (e.g., +919061060000)',
                    },
                },
            ],
        },
        {
            name: 'secondaryButton',
            type: 'group',
            label: 'Secondary Button (Message)',
            fields: [
                {
                    name: 'label',
                    type: 'text',
                    required: true,
                    defaultValue: 'Leave Us A Message',
                },
                {
                    name: 'url',
                    type: 'text',
                    required: true,
                    defaultValue: 'https://wa.me/919061060000?text=Hello%20Your%20Center',
                    admin: {
                        description: 'WhatsApp URL or any other messaging link',
                    },
                },
            ],
        },
    ],
    labels: {
        plural: 'Page CTA Blocks',
        singular: 'Page CTA Block',
    },
}
