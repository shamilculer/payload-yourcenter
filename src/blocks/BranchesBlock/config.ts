import type { Block } from 'payload'

export const BranchesBlock: Block = {
    slug: 'branches',
    interfaceName: 'BranchesBlock',
    fields: [
        {
            name: 'title',
            type: 'text',
            label: 'Title',
            defaultValue: 'Accessible Diagnostic Care Across Kerala',
        },
        {
            name: 'description',
            type: 'textarea',
            label: 'Description',
            defaultValue: 'We operate three fully equipped diagnostic centers across Kerala, each strategically located to provide accessible, high-quality healthcare for nearby communities.',
        },
        {
            name: 'eyebrow',
            type: 'text',
            label: 'Eyebrow',
            defaultValue: 'Our Locations & Services',
        },
    ],
}
