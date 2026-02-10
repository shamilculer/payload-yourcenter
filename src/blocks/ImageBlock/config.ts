import type { Block } from 'payload'

import { blockFields } from '@/fields/blockFields'
import { link } from '@/fields/link'

export const ImageBlock: Block = {
  slug: 'image',
  interfaceName: 'ImageBlock',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'media',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'width',
                  type: 'text',
                  label: 'Width',
                  defaultValue: '100%',
                  admin: { width: '50%' },
                },
                {
                  name: 'height',
                  type: 'text',
                  label: 'Height',
                  defaultValue: 'auto',
                  admin: { width: '50%' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'objectFit',
                  type: 'select',
                  label: 'Object Fit',
                  defaultValue: 'cover',
                  options: [
                    { label: 'Cover', value: 'cover' },
                    { label: 'Contain', value: 'contain' },
                    { label: 'Fill', value: 'fill' },
                  ],
                  admin: { width: '33%' },
                },
                {
                  name: 'hoverEffect',
                  type: 'select',
                  label: 'Hover Effect',
                  defaultValue: 'none',
                  options: [
                    { label: 'None', value: 'none' },
                    { label: 'Scale', value: 'scale' },
                    { label: 'Grayscale', value: 'grayscale' },
                    { label: 'Brighten', value: 'brighten' },
                  ],
                  admin: { width: '33%' },
                },
              ],
            },
            {
              name: 'caption',
              type: 'richText',
              label: 'Caption (Override)',
            },
            link({
              appearances: false,
              disableLabel: true,
              overrides: {
                name: 'link',
                label: 'Link (Optional)',
                admin: {
                  description: 'Make the image clickable by adding a link'
                }
              }
            })
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
}
