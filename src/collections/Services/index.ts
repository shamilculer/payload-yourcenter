import type { CollectionConfig } from 'payload'
import type { Field } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { Archive } from '../../blocks/ArchiveBlock/config'
import { CallToAction } from '../../blocks/CallToAction/config'
import { Content } from '../../blocks/Content/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { IntroBlock } from '@/blocks/IntroBlock/config'
import { slugField } from 'payload'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateService, revalidateServiceDelete } from './hooks/revalidateServices'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { lexicalEditor } from '@payloadcms/richtext-lexical'; // Needed for the overview description

export const Services: CollectionConfig<'services'> = {
  slug: 'services',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  // Type safe if the collection slug generic is passed
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    // NOTE: Update collection to 'services' for preview path generation
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'services',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'services',
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
        // 1. OVERVIEW TAB (New Tab)
        {
          fields: [
            {
              name: 'overview',
              type: 'group',
              label: 'Overview Details',
              fields: [
                {
                  name: 'featuredImage',
                  label: 'Featured Image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'linkLabel',
                  label: 'Card Link Label',
                  type: 'text',
                  defaultValue: 'Read More',
                },
                {
                  name: 'overviewDescription',
                  label: 'Overview Description',
                  type: 'richText',
                  editor: lexicalEditor(),
                  required: true,
                },
              ] as Field[], // Explicit cast to Field[]
            },
          ],
          label: 'Overview',
        },
        // 2. CONTENT TAB (Same as Pages)
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              // NOTE: If you used 'hero' in Pages, you might want to add 'hero' block here,
              // but since you are replacing the Hero field/tab, we keep the blocks array from Pages.
              blocks: [IntroBlock, CallToAction, Content, MediaBlock, Archive],
              required: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
          label: 'Content',
        },
        // 3. SEO TAB (Same as Pages)
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
              hasGenerateFn: true,
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
    afterChange: [revalidateService], 
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateServiceDelete],
},
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}