import type { Block } from 'payload'
import { blockFields } from '@/fields/blockFields'
import { link } from '@/fields/link'

export const HeadingBlock: Block = {
    slug: 'heading',
    interfaceName: 'HeadingBlock',
    fields: [
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'Content',
                    fields: [
                        {
                            name: 'text',
                            type: 'text',
                            label: 'Heading Text',
                            required: true,
                        },
                        {
                            type: 'row',
                            fields: [
                                {
                                    name: 'level',
                                    type: 'select',
                                    label: 'Heading Level',
                                    defaultValue: 'h2',
                                    options: [
                                        { label: 'H1', value: 'h1' },
                                        { label: 'H2', value: 'h2' },
                                        { label: 'H3', value: 'h3' },
                                        { label: 'H4', value: 'h4' },
                                        { label: 'H5', value: 'h5' },
                                        { label: 'H6', value: 'h6' },
                                    ],
                                    admin: {
                                        width: '50%',
                                    },
                                },
                                {
                                    name: 'color',
                                    type: 'text',
                                    label: 'Text Color',
                                    defaultValue: 'inherit',
                                    admin: {
                                        width: '50%',
                                        description: 'e.g., #000000, rgb(0,0,0), red, inherit',
                                    },
                                },
                            ],
                        },
                        {
                            name: 'align',
                            type: 'select',
                            label: 'Text Alignment',
                            defaultValue: 'left',
                            options: [
                                { label: 'Left', value: 'left' },
                                { label: 'Center', value: 'center' },
                                { label: 'Right', value: 'right' },
                            ],
                        },
                        link({
                            appearances: false,
                            disableLabel: true,
                            overrides: {
                                name: 'link',
                                label: 'Link (Optional)',
                                admin: {
                                    description: 'Make the heading clickable by adding a link',
                                },
                            },
                        }),
                    ],
                },
                {
                    label: 'Settings',
                    fields: [...blockFields],
                },
            ],
        },
    ],
    labels: {
        plural: 'Heading Blocks',
        singular: 'Heading Block',
    },
}
