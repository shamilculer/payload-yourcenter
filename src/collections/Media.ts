import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  hooks: {
    afterRead: [
      ({ doc }) => {
        // Ensure all URLs are Cloudinary URLs
        if (doc.cloudinary?.secure_url) {
          // Override the main URL with Cloudinary URL
          doc.url = doc.cloudinary.secure_url
          
          // Override size URLs with Cloudinary URLs if they exist
          if (doc.sizes) {
            Object.keys(doc.sizes).forEach(sizeKey => {
              const size = doc.sizes[sizeKey]
              if (size && doc.cloudinary?.public_id) {
                const cloudName = process.env.CLOUDINARY_CLOUD_NAME || 'dpycn77pf'
                // Construct Cloudinary URL for this size
                size.url = `https://res.cloudinary.com/${cloudName}/image/upload/w_${size.width || 'auto'},h_${size.height || 'auto'},c_fit/${doc.cloudinary.public_id}`
              }
            })
          }
        }
        return doc
      }
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      //required: true,
    },
    {
      name: 'caption',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
    },
  ],
  upload: {    
    // Disable local storage as we'll use cloud storage
    disableLocalStorage: true,
    
    // Restricting file types
    mimeTypes: ['image/*'],
    
    // Define the image sizes. The payload-cloudinary plugin will use these
    // names to create corresponding Cloudinary-friendly transformations (e.g., using a named transform).
    // The values (width, height, crop) help the plugin inform Cloudinary on how to resize.
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
      },
      {
        name: 'square',
        width: 500,
        height: 500,
        crop: 'center', // Added crop for square
      },
      {
        name: 'small',
        width: 600,
      },
      {
        name: 'medium',
        width: 900,
      },
      {
        name: 'large',
        width: 1400,
      },
      {
        name: 'xlarge',
        width: 1920,
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        crop: 'center',
      },
    ],
  },
}