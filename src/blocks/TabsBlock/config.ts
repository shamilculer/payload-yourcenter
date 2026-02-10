import { Block } from 'payload'
import { blockFields } from '@/fields/blockFields'
import { link } from '@/fields/link'

export const TabsBlock: Block = {
    slug: 'tabs',
    interfaceName: 'TabsBlock',
    fields: [
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'Content',
                    fields: [
                        {
                            name: 'eyebrow',
                            type: 'text',
                            label: 'Eyebrow',
                        },
                        {
                            name: 'title',
                            type: 'text',
                            label: 'Title',
                        },
                        {
                            name: 'description',
                            type: 'textarea',
                            label: 'Description',
                        },
                        {
                            name: 'introContent',
                            type: 'richText',
                            label: 'Intro Content (Rich Text)',
                        },
                        {
                            name: 'source',
                            type: 'select',
                            defaultValue: 'manual',
                            options: [
                                {
                                    label: 'Manual',
                                    value: 'manual',
                                },
                                {
                                    label: 'Branches (Auto-fetch)',
                                    value: 'branches',
                                },
                            ],
                        },
                        {
                            name: 'tabs',
                            type: 'array',
                            minRows: 1,
                            admin: {
                                condition: (_, siblingData) => siblingData.source === 'manual',
                            },
                            fields: [
                                {
                                    name: 'label',
                                    type: 'text',
                                    required: true,
                                },
                                {
                                    name: 'content',
                                    type: 'blocks',
                                    blocks: [
                                        // Import blocks directly to avoid circular deps if possible, or use a subset
                                        // For now, allowing all blocks might be recursive if not careful. 
                                        // Let's use a string reference if Payload supports it, or valid blocks.
                                        // To include "custom content", we usually allow other blocks.
                                        // Given the prompt "add tab items and add custom content", I will allow standard content blocks.
                                        // Note: Importing 'Content' block or others might cause circular dep if they import TabsBlock.
                                        // I'll rely on a manual list of safe blocks or a separate file if needed.
                                        // For this iteration, I'll list the blocks likely needed for the "Branch" like content:
                                        // Heading, Content, Map, Image, Features, IconList, Button/CTA
                                    ],
                                    // actually, let's use a collection of content blocks. 
                                    // If I can't import them, I can use a restricted set or dynamic import?
                                    // Payload block definitions are static.
                                    // Let's defer component creation until I see what `blockFields` is (it's for settings).
                                    // I will leave 'blocks' empty for a moment and update it after I verify safe imports.
                                },
                            ],
                        },
                    ],
                },
                {
                    label: 'Settings',
                    fields: [...blockFields],
                },
            ],
        },
    ],
}
