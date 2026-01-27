import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { IntroBlock as IntroBlockComponent } from './IntroBlock/Component'
import ServicesBlock from './ServicesBlock/Component'
import CalloutFormBlock from './Form/Component'

import { AccordionBlock } from '@/blocks/AccordionBlock/Component'
import { IconListBlock } from '@/blocks/IconListBlock/Component'
import { IconBoxBlock } from '@/blocks/IconBoxBlock/Component'
import { GridBlock } from '@/blocks/GridBlock/Component'

import { StepsBlock } from './StepsBlock/Component'
import { TestimonialsBlock } from './TestimonialsBlock/Component'
import { BranchesBlock } from './BranchesBlock/Component'
import { TitleBlock } from './TitleBlock/Component'
import { FAQBlock } from './FAQBlock/Component'
import { FAQItemsBlock } from './FAQItemsBlock/Component'
import { CTACardBlock } from './CTACardBlock/Component'
import { TwoColumnLayoutBlock } from './TwoColumnLayoutBlock/Component'
import { PageCTABlock } from './PageCTABlock/Component'
import { FeaturesBlock } from './FeaturesBlock/Component'
import { ProcessBlock } from './ProcessBlock/Component'
import { WhyUsBlock } from './WhyUsBlock/Component'
import { PostGridBlock } from './PostGridBlock/Component'
import { FormBlock } from './FormBlock/Component'
import { MapBlock } from './MapBlock/Component'
import { LayoutBlock } from './LayoutBlock/Component'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  mediaBlock: MediaBlock,
  intro: IntroBlockComponent,
  servicesSection: ServicesBlock,
  calloutForm: CalloutFormBlock,
  accordion: AccordionBlock,
  iconList: IconListBlock,
  iconBox: IconBoxBlock,
  grid: GridBlock,
  steps: StepsBlock,
  testimonials: TestimonialsBlock,
  branches: BranchesBlock,
  title: TitleBlock,
  faq: FAQBlock,
  faqItems: FAQItemsBlock,
  ctaCard: CTACardBlock,
  twoColumnLayout: TwoColumnLayoutBlock,
  pageCta: PageCTABlock,
  features: FeaturesBlock,
  process: ProcessBlock,
  whyUs: WhyUsBlock,
  postGrid: PostGridBlock,
  formBlock: FormBlock,
  mapBlock: MapBlock,
  layoutBlock: LayoutBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
  searchParams?: { [key: string]: string | string[] | undefined }
}> = (props) => {
  const { blocks, searchParams } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          // This must be done inside the map, but it's okay for now.
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType] // No longer throws error

            if (Block) {
              return (
                <div key={index}>
                  <Block {...(block as any)} searchParams={searchParams} />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}