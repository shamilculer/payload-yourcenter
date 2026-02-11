import type { Metadata } from 'next/types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React, { cache } from 'react'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import type { Page } from '@/payload-types'
import { draftMode } from 'next/headers'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function BlogPage() {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  // Fetch the "blog" page from Pages collection
  const blogPage = await queryPageBySlug({ slug: 'blog' })

  return (
    <div>
      {/* Render hero if blog page exists */}
      {blogPage?.hero && <RenderHero {...(blogPage.hero as Page['hero'])} />}

      {/* Render blocks - including PostGridBlock if added */}
      {blogPage?.layout && <RenderBlocks blocks={blogPage.layout} />}
    </div>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const blogPage = await queryPageBySlug({ slug: 'blog' })

  if (blogPage) {
    return generateMeta({ doc: blogPage })
  }

  return {
    title: `Blog`,
  }
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
