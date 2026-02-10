import type { Block } from 'payload'
import { FAQItemsBlock } from '../FAQItemsBlock/config'
import { CTACardBlock } from '../CTACardBlock/config'
import { AccordionBlock } from '../AccordionBlock/config'
import { IconListBlock } from '../IconListBlock/config'
import { IconBoxBlock } from '../IconBoxBlock/config'
import { GridBlock } from '../GridBlock/config'
import { StepsBlock } from '../StepsBlock/config'
import { TitleBlock } from '../TitleBlock/config'
import { Content } from '../Content/config'
import { ImageBlock } from '../ImageBlock/config'
import { CallToAction } from '../CallToAction/config'
import { FormBlock } from '../FormBlock/config'
import { MapBlock } from '../MapBlock/config'

import { blockFields } from '@/fields/blockFields'

export const TwoColumnLayoutBlock: Block = {
    slug: 'twoColumnLayout',
    interfaceName: 'TwoColumnLayoutBlock',
    fields: [
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'Content',
                    fields: [
                        {
                            name: 'leftColumnBlocks',
                            type: 'blocks',
                            label: 'Left Column Content',
                            blocks: [
                                FAQItemsBlock,
                                CTACardBlock,
                                AccordionBlock,
                                IconListBlock,
                                IconBoxBlock,
                                GridBlock,
                                StepsBlock,
                                TitleBlock,
                                Content,
                                ImageBlock,
                                CallToAction,
                                FormBlock,
                                MapBlock,
                            ],
                            required: false,
                        },
                        {
                            name: 'rightColumnBlocks',
                            type: 'blocks',
                            label: 'Right Column Content',
                            blocks: [
                                FAQItemsBlock,
                                CTACardBlock,
                                AccordionBlock,
                                IconListBlock,
                                IconBoxBlock,
                                GridBlock,
                                StepsBlock,
                                TitleBlock,
                                Content,
                                ImageBlock,
                                CallToAction,
                                FormBlock,
                                MapBlock,
                            ],
                            required: false,
                        },
                        {
                            type: 'row',
                            fields: [
                                {
                                    name: 'columnRatio',
                                    type: 'select',
                                    label: 'Column Width Ratio',
                                    defaultValue: '2/3-1/3',
                                    options: [
                                        { label: '1/3 - 2/3', value: '1/3-2/3' },
                                        { label: '1/2 - 1/2', value: '1/2-1/2' },
                                        { label: '2/3 - 1/3', value: '2/3-1/3' },
                                    ],
                                },
                                {
                                    name: 'gap',
                                    type: 'select',
                                    label: 'Gap Between Columns',
                                    defaultValue: 'lg',
                                    options: [
                                        { label: 'Small', value: 'sm' },
                                        { label: 'Medium', value: 'md' },
                                        { label: 'Large', value: 'lg' },
                                        { label: 'XL', value: 'xl' },
                                    ],
                                },
                            ],
                        },
                        {
                            type: 'row',
                            fields: [
                                {
                                    name: 'verticalAlign',
                                    type: 'select',
                                    label: 'Vertical Alignment',
                                    defaultValue: 'top',
                                    options: [
                                        { label: 'Top', value: 'top' },
                                        { label: 'Center', value: 'center' },
                                        { label: 'Bottom', value: 'bottom' },
                                        { label: 'Stretch', value: 'stretch' },
                                    ],
                                },
                                {
                                    name: 'reverseOnMobile',
                                    type: 'checkbox',
                                    label: 'Reverse Column Order on Mobile',
                                    defaultValue: false,
                                },
                            ],
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
    labels: {
        plural: 'Two Column Layout Blocks',
        singular: 'Two Column Layout Block',
    },
}
