import type { Block, ArrayField } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

// Assuming 'linkGroup' utility is available at this path
// NOTE: This utility already returns an ArrayField named 'links'
import { linkGroup } from '../../fields/linkGroup'

import { blockFields } from '@/fields/blockFields'

export const IntroBlock: Block = {
  slug: 'intro',
  interfaceName: 'IntroBlock',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'heading',
              type: 'text',
              required: true,
            },
            {
              name: 'subheading',
              type: 'text',
            },
            {
              name: 'description',
              type: 'richText',
              required: true,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                  ]
                },
              }),
              label: 'Description Content',
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              ...(linkGroup({
                appearances: ['default', 'outline'],
                overrides: {
                  label: 'CTA Buttons', // Custom label for Admin UI
                  maxRows: 2,           // Max number of buttons
                },
              }) as ArrayField),
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
    plural: 'Intro Blocks',
    singular: 'Intro Block',
  },
}