import { Block } from 'payload'
import { blockFields } from '@/fields/blockFields'
import { link } from '@/fields/link'

import { Content } from '../Content/config'
import { ImageBlock } from '../ImageBlock/config'
import { FeaturesBlock } from '../FeaturesBlock/config'
import { MapBlock } from '../MapBlock/config'
import { IconListBlock } from '../IconListBlock/config'
import { HeadingBlock } from '../HeadingBlock/config'
import { CallToAction } from '../CallToAction/config'
import { AccordionBlock } from '../AccordionBlock/config'
import { CTACardBlock } from '../CTACardBlock/config'
import { LayoutBlock } from '../LayoutBlock/config'
import { FormBlock } from '../FormBlock/config'
import { GridBlock } from '../GridBlock/config'
import { IconBoxBlock } from '../IconBoxBlock/config'
import { StepsBlock } from '../StepsBlock/config'
import { TestimonialsBlock } from '../TestimonialsBlock/config'
import { PostGridBlock } from '../PostGridBlock/config'
import { IntroBlock } from '../IntroBlock/config'
import { ServicesBlock } from '../ServicesBlock/config'
import { ButtonBlock } from '../ButtonBlock/config'
import { ButtonGroupBlock } from '../ButtonGroupBlock/config'

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
                            name: 'tabs',
                            type: 'array',
                            label: 'Tabs',
                            minRows: 1,
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
                                        Content,
                                        LayoutBlock,
                                        ImageBlock,
                                        FeaturesBlock,
                                        MapBlock,
                                        IconListBlock,
                                        HeadingBlock,
                                        CallToAction,
                                        AccordionBlock,
                                        CTACardBlock,
                                        FormBlock,
                                        GridBlock,
                                        IconBoxBlock,
                                        StepsBlock,
                                        TestimonialsBlock,
                                        PostGridBlock,
                                        IntroBlock,
                                        ServicesBlock,
                                        ButtonBlock,
                                        ButtonGroupBlock,
                                    ],
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
