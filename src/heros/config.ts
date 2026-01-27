import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'pageTitle',
      label: 'Type',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Main Hero', value: 'mainHero' },
        { label: 'Medium Impact Banner', value: 'mediumImpact' },
        { label: 'Page Title', value: 'pageTitle' },
      ],
      required: true,
    },

    // --- For mainHero (slides) ---
    {
      name: 'slides',
      label: 'Slides',
      type: 'array',
      minRows: 1,
      admin: {
        condition: (_, { type } = {}) => type === 'mainHero',
      },
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
          type: 'text',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'cta_buttons',
          label: 'CTA Buttons (Max 2)',
          type: 'array',
          maxRows: 2,
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'url',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },

    // --- For mediumImpact ---
    {
      name: 'eyebrow',
      type: 'text',
      admin: {
        condition: (_, { type } = {}) => type === 'mediumImpact',
      },
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      admin: {
        condition: (_, { type } = {}) => type === 'mediumImpact',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        condition: (_, { type } = {}) => type === 'mediumImpact',
      },
    },
    // --- Rich Text (Legacy/Unused for now) ---
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
      label: false,
      admin: {
        condition: (_, { type } = {}) => false, // Hidden for now
      },
    },
    // --- For pageTitle ---
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        condition: (_, { type } = {}) => type === 'pageTitle',
      },
    },
    linkGroup({
      overrides: {
        maxRows: 2,
        admin: {
          condition: (_, { type } = {}) =>
            ['mediumImpact'].includes(type),
        },
      },
    }),
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        condition: (_, { type } = {}) =>
          ['mediumImpact', 'pageTitle'].includes(type),
      },
    },
  ],
  label: false,
}
