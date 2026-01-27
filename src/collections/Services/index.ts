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
    defaultColumns: ['title', 'branch', 'slug', 'updatedAt'],
    // NOTE: Update collection to 'services' for preview path generation
    livePreview: {
      url: ({ data, req }) => {
        // If service has a branch, use branch-specific URL
        if (data?.branch && typeof data.branch === 'object' && 'slug' in data.branch && data.branch.slug) {
          return generatePreviewPath({
            slug: `${data.branch.slug}/services/${data.slug}`,
            collection: 'services',
            req,
          })
        }
        // Otherwise use global service URL
        return generatePreviewPath({
          slug: `services/${data?.slug}`,
          collection: 'services',
          req,
        })
      },
    },
    preview: (data, { req }) => {
      // If service has a branch, use branch-specific URL
      if (data?.branch && typeof data.branch === 'object' && 'slug' in data.branch && data.branch.slug) {
        return generatePreviewPath({
          slug: `${data.branch.slug}/services/${data.slug}`,
          collection: 'services',
          req,
        })
      }
      // Otherwise use global service URL
      return generatePreviewPath({
        slug: `services/${data?.slug as string}`,
        collection: 'services',
        req,
      })
    },
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'branch',
      label: 'Branch Association',
      type: 'relationship',
      relationTo: 'branches',
      required: false,
      admin: {
        position: 'sidebar',
        description: 'Leave empty for global services (homepage). Select a branch to make this service branch-specific.',
      },
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
        // 2. SERVICE CONTENT TAB
        {
          fields: [
            {
              name: 'serviceContent',
              type: 'group',
              label: 'Service Content',
              fields: [
                {
                  name: 'image',
                  label: 'Service Image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                  admin: {
                    description: 'Main image displayed on the service page',
                  },
                },
                {
                  name: 'heading',
                  label: 'Service Heading',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'Main heading for the service page (e.g., "Advanced MRI Scanning for Unparalleled Diagnostic Clarity")',
                  },
                },
                {
                  name: 'longDescription',
                  label: 'Detailed Description',
                  type: 'textarea',
                  required: true,
                  admin: {
                    description: 'Comprehensive description of the service',
                  },
                },
              ] as Field[],
            },
          ],
          label: 'Service Content',
        },
        // 3. WHY CHOOSE US TAB
        {
          fields: [
            {
              name: 'whyChooseUs',
              type: 'group',
              label: 'Why Choose Us Section',
              fields: [
                {
                  name: 'heading',
                  label: 'Section Heading',
                  type: 'text',
                  required: true,
                  defaultValue: 'Why Choose Your Center?',
                  admin: {
                    description: 'Heading for the "Why Choose Us" section',
                  },
                },
                {
                  name: 'intro',
                  label: 'Introduction Paragraph',
                  type: 'textarea',
                  required: true,
                  admin: {
                    description: 'Brief introduction before the benefits list',
                  },
                },
                {
                  name: 'benefits',
                  label: 'Benefits List',
                  type: 'array',
                  required: true,
                  minRows: 3,
                  maxRows: 10,
                  fields: [
                    {
                      name: 'benefit',
                      type: 'text',
                      required: true,
                    },
                  ],
                  admin: {
                    description: 'List of key benefits or reasons to choose this service',
                  },
                },
                {
                  name: 'endingParagraph',
                  label: 'Ending Paragraph',
                  type: 'textarea',
                  required: true,
                  admin: {
                    description: 'Concluding paragraph after the benefits list',
                  },
                },
              ] as Field[],
            },
          ],
          label: 'Why Choose Us',
        },
        // 4. CONTENT BLOCKS TAB (Optional additional content)
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [IntroBlock, CallToAction, Content, MediaBlock, Archive],
              required: false,
              admin: {
                initCollapsed: true,
                description: 'Optional: Add additional content blocks if needed',
              },
            },
          ],
          label: 'Additional Content',
        },
        // 5. SEO TAB
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