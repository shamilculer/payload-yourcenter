import type { Block } from 'payload'
import { FAQItemsBlock } from '../FAQItemsBlock/config'
import { CTACardBlock } from '../CTACardBlock/config'
import { AccordionBlock } from '../AccordionBlock/config'
import { IconListBlock } from '../IconListBlock/config'
import { IconBoxBlock } from '../IconBoxBlock/config'
// import { GridBlock } from '../GridBlock/config' // Excluded to prevent circular dependency
import { StepsBlock } from '../StepsBlock/config'
import { TitleBlock } from '../TitleBlock/config'
import { Content } from '../Content/config'
import { ImageBlock } from '../ImageBlock/config'
import { CallToAction } from '../CallToAction/config'
import { FormBlock } from '../FormBlock/config'
import { MapBlock } from '../MapBlock/config'
import { HeadingBlock } from '../HeadingBlock/config'
import { blockFields } from '@/fields/blockFields'

const columnBlocks: Block[] = [
    FAQItemsBlock,
    CTACardBlock,
    AccordionBlock,
    IconListBlock,
    IconBoxBlock,
    // GridBlock, // Excluded
    HeadingBlock,
    StepsBlock,
    TitleBlock,
    Content,
    ImageBlock,
    CallToAction,
    FormBlock,
    MapBlock,
]

export const LayoutBlock: Block = {
    slug: 'layoutBlock',
    interfaceName: 'LayoutBlock',
    fields: [
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'Layout',
                    fields: [
                        {
                            name: 'structure',
                            type: 'select',
                            label: 'Column Structure',
                            defaultValue: '1',
                            options: [
                                { label: 'One Column (100%)', value: '1' },
                                { label: 'Two Columns (50% - 50%)', value: '1/1' },
                                { label: 'Two Columns (33% - 66%)', value: '1/2' },
                                { label: 'Two Columns (66% - 33%)', value: '2/1' },
                                { label: 'Three Columns (33% - 33% - 33%)', value: '1/1/1' },
                                { label: 'Four Columns (25% - 25% - 25% - 25%)', value: '1/1/1/1' },
                            ],
                        },
                        {
                            name: 'column1',
                            type: 'blocks',
                            label: 'Column 1 Content',
                            blocks: columnBlocks,
                            admin: {
                                condition: (_, siblingData) =>
                                    ['1', '1/1', '1/2', '2/1', '1/1/1', '1/1/1/1'].includes(siblingData.structure),
                            },
                        },
                        {
                            name: 'column2',
                            type: 'blocks',
                            label: 'Column 2 Content',
                            blocks: columnBlocks,
                            admin: {
                                condition: (_, siblingData) =>
                                    ['1/1', '1/2', '2/1', '1/1/1', '1/1/1/1'].includes(siblingData.structure),
                            },
                        },
                        {
                            name: 'column3',
                            type: 'blocks',
                            label: 'Column 3 Content',
                            blocks: columnBlocks,
                            admin: {
                                condition: (_, siblingData) => ['1/1/1', '1/1/1/1'].includes(siblingData.structure),
                            },
                        },
                        {
                            name: 'column4',
                            type: 'blocks',
                            label: 'Column 4 Content',
                            blocks: columnBlocks,
                            admin: {
                                condition: (_, siblingData) => ['1/1/1/1'].includes(siblingData.structure),
                            },
                        },
                    ],
                },
                {
                    label: 'Settings',
                    fields: [
                        ...blockFields,
                        {
                            name: 'gap',
                            type: 'select',
                            label: 'Column Gap',
                            defaultValue: 'medium',
                            options: [
                                { label: 'None', value: 'none' },
                                { label: 'Small', value: 'small' },
                                { label: 'Medium', value: 'medium' },
                                { label: 'Large', value: 'large' },
                                { label: 'Extra Large', value: 'xl' },
                            ],
                        },
                        {
                            name: 'reverseOnMobile',
                            type: 'checkbox',
                            label: 'Reverse Column Order on Mobile',
                            defaultValue: false,
                        },
                        {
                            name: 'alignItems',
                            type: 'select',
                            label: 'Align Items (Vertical)',
                            defaultValue: 'start',
                            options: [
                                { label: 'Start (Top)', value: 'start' },
                                { label: 'Center', value: 'center' },
                                { label: 'End (Bottom)', value: 'end' },
                                { label: 'Stretch', value: 'stretch' },
                                { label: 'Baseline', value: 'baseline' },
                            ],
                        },
                        {
                            name: 'height',
                            type: 'select',
                            label: 'Height',
                            defaultValue: 'default',
                            options: [
                                { label: 'Default', value: 'default' },
                                { label: 'Full Height (100%)', value: 'full' },
                            ],
                        },
                        {
                            name: 'justifyContent',
                            type: 'select',
                            label: 'Justify Content (Horizontal)',
                            defaultValue: 'start',
                            options: [
                                { label: 'Start (Left)', value: 'start' },
                                { label: 'Center', value: 'center' },
                                { label: 'End (Right)', value: 'end' },
                                { label: 'Space Between', value: 'between' },
                                { label: 'Space Around', value: 'around' },
                                { label: 'Space Evenly', value: 'evenly' },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
    labels: {
        plural: 'Containers',
        singular: 'Container',
    },
}
