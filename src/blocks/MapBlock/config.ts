import type { Block } from 'payload'
import { blockFields } from '@/fields/blockFields'



export const MapBlock: Block = {
    slug: 'mapBlock',
    interfaceName: 'MapBlock',
    fields: [
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'Content',
                    fields: [
                        {
                            name: 'mapUrl',
                            type: 'text',
                            label: 'Google Maps Embed URL',
                            required: true,
                            defaultValue: 'https://www.google.com/maps/embed?pb=...',
                            admin: {
                                description: 'Paste the "src" URL from the Google Maps Embed code here.'
                            }
                        },
                        {
                            name: 'height',
                            type: 'text',
                            label: 'Map Height',
                            defaultValue: '450px',
                        }
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
        plural: 'Map Blocks',
        singular: 'Map Block',
    },
}
