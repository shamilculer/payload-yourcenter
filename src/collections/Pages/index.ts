import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { Archive } from '../../blocks/ArchiveBlock/config'
import { CallToAction } from '../../blocks/CallToAction/config'
import { Content } from '../../blocks/Content/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { hero } from '@/heros/config'
import { IntroBlock } from '@/blocks/IntroBlock/config'
import { ServicesBlock } from '@/blocks/ServicesBlock/config'
import { CalloutForm } from '@/blocks/Form/config'
import { AccordionBlock } from '@/blocks/AccordionBlock/config'
import { IconListBlock } from '@/blocks/IconListBlock/config'
import { IconBoxBlock } from '@/blocks/IconBoxBlock/config'
import { GridBlock } from '@/blocks/GridBlock/config'
import { StepsBlock } from '@/blocks/StepsBlock/config'
import { TestimonialsBlock } from '@/blocks/TestimonialsBlock/config'
import { BranchesBlock } from '@/blocks/BranchesBlock/config'
import { TitleBlock } from '@/blocks/TitleBlock/config'
import { FAQBlock } from '@/blocks/FAQBlock/config'
import { FAQItemsBlock } from '@/blocks/FAQItemsBlock/config'
import { CTACardBlock } from '@/blocks/CTACardBlock/config'
import { TwoColumnLayoutBlock } from '@/blocks/TwoColumnLayoutBlock/config'
import { PageCTABlock } from '@/blocks/PageCTABlock/config'
import { FeaturesBlock } from '@/blocks/FeaturesBlock/config'
import { ProcessBlock } from '@/blocks/ProcessBlock/config'
import { WhyUsBlock } from '@/blocks/WhyUsBlock/config'
import { PostGridBlock } from '@/blocks/PostGridBlock/config'
import { FormBlock } from '@/blocks/FormBlock/config'
import { MapBlock } from '@/blocks/MapBlock/config'
import { LayoutBlock } from '@/blocks/LayoutBlock/config'
import { slugField } from 'payload'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  // This config controls what's populated by default when a page is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'pages'>
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'pages',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'pages',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [hero],
          label: 'Hero',
        },
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [
                IntroBlock,
                ServicesBlock,
                CalloutForm,
                CallToAction,
                Content,
                MediaBlock,
                Archive,
                AccordionBlock,
                IconListBlock,
                IconBoxBlock,
                GridBlock,
                StepsBlock,
                TestimonialsBlock,
                BranchesBlock,
                TitleBlock,
                FAQBlock,
                FAQItemsBlock,
                CTACardBlock,
                TwoColumnLayoutBlock,
                PageCTABlock,
                FeaturesBlock,
                ProcessBlock,
                WhyUsBlock,
                PostGridBlock,
                FormBlock,
                MapBlock,
                LayoutBlock,
              ],
              required: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
          label: 'Content',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
