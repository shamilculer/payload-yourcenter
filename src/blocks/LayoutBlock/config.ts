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
import { MediaBlock } from '../MediaBlock/config'
import { CallToAction } from '../CallToAction/config'
import { FormBlock } from '../FormBlock/config'
import { MapBlock } from '../MapBlock/config'

const columnBlocks = [
    FAQItemsBlock,
    CTACardBlock,
    AccordionBlock,
    IconListBlock,
    IconBoxBlock,
    GridBlock,
    StepsBlock,
    TitleBlock,
    Content,
    MediaBlock,
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
                        {
                            name: 'width',
                            type: 'select',
                            label: 'Content Width',
                            defaultValue: 'boxed',
                            options: [
                                { label: 'Boxed', value: 'boxed' },
                                { label: 'Full Width', value: 'full' },
                            ],
                        },
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
                            name: 'paddingTop',
                            type: 'select',
                            label: 'Padding Top',
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
                            name: 'paddingBottom',
                            type: 'select',
                            label: 'Padding Bottom',
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
                            name: 'backgroundColor',
                            type: 'select',
                            label: 'Background Color',
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
                        },
                        {
                            name: 'reverseOnMobile',
                            type: 'checkbox',
                            label: 'Reverse Column Order on Mobile',
                            defaultValue: false,
                        },
                    ],
                },
            ],
        },
    ],
    labels: {
        plural: 'Layout Sections',
        singular: 'Layout Section',
    },
}
