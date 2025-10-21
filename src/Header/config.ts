import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Site logo displayed in the header',
      },
    },
    {
      name: 'favicon',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Favicon for the site (should be .ico, .png, or .svg)',
      },
    },
    {
      name: 'navItems',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'hasDropdown',
          type: 'checkbox',
          admin: {
            width: '50%',
            description: 'Enable dropdown menu for this nav item',
          },
        },
        {
          name: 'dropdownItems',
          type: 'array',
          admin: {
            condition: (_, siblingData) => siblingData?.hasDropdown === true,
            description: 'Add dropdown menu items',
          },
          fields: [
            link({
              appearances: false,
            }),
          ],
          maxRows: 10,
        },
        link({
          appearances: false,
          disableLabel: true,
        }),
      ],
      maxRows: 6,
    },
    {
      name: 'ctaButton',
      type: 'group',
      admin: {
        description: 'Call-to-action button in the header',
      },
      fields: [
        {
          name: 'showCta',
          type: 'checkbox',
          admin: {
            description: 'Show CTA button in header',
          },
        },
        {
          name: 'ctaText',
          type: 'text',
          admin: {
            condition: (_, siblingData) => siblingData?.showCta === true,
            description: 'Button text',
          },
        },
        link({
          appearances: false,
          disableLabel: true,
        }),
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
