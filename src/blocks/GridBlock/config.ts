import type { Block, Field } from 'payload'

import { AccordionBlock } from '@/blocks/AccordionBlock/config'
import { CallToAction } from '@/blocks/CallToAction/config'
import { Content } from '@/blocks/Content/config'
import { CalloutForm } from '@/blocks/Form/config'
import { MediaBlock } from '@/blocks/MediaBlock/config'
import { IconListBlock } from '@/blocks/IconListBlock/config'
import { IconBoxBlock } from '@/blocks/IconBoxBlock/config'
// Prevent circular dependency by NOT importing GridBlock here if possible, or handling recursively.
// Payload allows recursive blocks but careful with TypeScript.
// For now, let's include standard blocks.

const columnFields: Field[] = [
    {
        name: 'size',
        type: 'select',
        defaultValue: 'oneThird',
        options: [
            {
                label: 'One Third',
                value: 'oneThird',
            },
            {
                label: 'Half',
                value: 'half',
            },
            {
                label: 'Two Thirds',
                value: 'twoThirds',
            },
            {
                label: 'Full',
                value: 'full',
            },
        ],
    },
    {
        name: 'blocks',
        type: 'blocks',
        blocks: [
            Content,
            AccordionBlock,
            IconListBlock,
            IconBoxBlock,
            CallToAction,
            MediaBlock,
            CalloutForm
        ]
    }
]

export const GridBlock: Block = {
    slug: 'grid',
    interfaceName: 'GridBlock',
    fields: [
        {
            name: 'columns',
            type: 'array',
            minRows: 1,
            maxRows: 12,
            labels: {
                singular: 'Column',
                plural: 'Columns',
            },
            fields: columnFields,
        },
    ],
}
