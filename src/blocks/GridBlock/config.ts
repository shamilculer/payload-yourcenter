import type { Block, Field } from 'payload'

import { AccordionBlock } from '@/blocks/AccordionBlock/config'
import { CallToAction } from '@/blocks/CallToAction/config'
import { Content } from '@/blocks/Content/config'
import { CalloutForm } from '@/blocks/Form/config'
import { ImageBlock } from '@/blocks/ImageBlock/config'
import { IconListBlock } from '@/blocks/IconListBlock/config'
import { IconBoxBlock } from '@/blocks/IconBoxBlock/config'
import { HeadingBlock } from '@/blocks/HeadingBlock/config'
// Prevent circular dependency by NOT importing GridBlock here if possible, or handling recursively.
// Payload allows recursive blocks but careful with TypeScript.
// For now, let's include standard blocks.

import { FAQItemsBlock } from '@/blocks/FAQItemsBlock/config'
import { CTACardBlock } from '@/blocks/CTACardBlock/config'
import { StepsBlock } from '@/blocks/StepsBlock/config'
import { TitleBlock } from '@/blocks/TitleBlock/config'
import { MapBlock } from '@/blocks/MapBlock/config'
import { FormBlock } from '@/blocks/FormBlock/config'
import { LayoutBlock } from '@/blocks/LayoutBlock/config-simple'

const columnFields: Field[] = [
    {
        name: 'size',
        type: 'number',
        defaultValue: 12,
        min: 1,
        max: 12,
        label: 'Column Span (1-12)',
    },
    {
        name: 'blocks',
        type: 'blocks',
        blocks: [
            HeadingBlock,
            Content,
            AccordionBlock,
            IconListBlock,
            IconBoxBlock,
            CallToAction,
            ImageBlock,
            CalloutForm,
            FAQItemsBlock,
            CTACardBlock,
            StepsBlock,
            TitleBlock,
            MapBlock,
            FormBlock,
            LayoutBlock,
        ]
    }
]

import { blockFields } from '@/fields/blockFields'

export const GridBlock: Block = {
    slug: 'grid',
    interfaceName: 'GridBlock',
    fields: [
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'Content',
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
