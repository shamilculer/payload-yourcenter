import { Block } from "payload"

export const ServicesBlock: Block = {
  slug: 'servicesSection',
  interfaceName: 'ServicesSectionBlock',
  labels: {
    singular: 'Services Grid',
    plural: 'Services Grid',
  },
  fields: [
    // 1. TOP SECTION HEADER
    {
      name: 'eyebrow', 
      label: 'Eyebrow Text (Small Label)',
      type: 'text',
      required: false,
      admin: {
        description: 'Optional small text that appears above the main heading (e.g., "COMPREHENSIVE CARE")',
      },
    },
    {
      name: 'heading',
      label: 'Main Heading',
      type: 'text',
      required: true,
    },

    // 3. SERVICE FETCHING CONTROLS
    {
      name: 'limit',
      label: 'Number of Services to Display',
      type: 'number',
      defaultValue: 3,
      required: true,
      min: 1,
      max: 9,
      admin: {
        description: 'The maximum number of services to show in the grid. Set this to 3, 6, or 9 for a balanced display.',
      },
    },
  ],
}