import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import { LivePreviewListener } from '@/components/LivePreviewListener'

import type { RenderHeroProps } from '@/heros/RenderHero'

// Import branch page component
import BranchPageContent from './BranchPageContent'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })

  // Get all pages
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  // Get all branches
  const branches = await payload.find({
    collection: 'branches',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const pageParams = pages.docs
    ?.filter((doc) => {
      return doc.slug !== 'home'
    })
    .map(({ slug }) => {
      return { slug }
    })

  const branchParams = branches.docs?.map(({ slug }) => {
    return { slug }
  })

  return [...(pageParams || []), ...(branchParams || [])]
}

type Args = {
  params: Promise<{
    slug?: string
  }>
  searchParams: Promise<{
    [key: string]: string | string[] | undefined
  }>
}

export default async function Page({ params: paramsPromise, searchParams: searchParamsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = 'home' } = await paramsPromise
  const searchParams = await searchParamsPromise
  const url = '/' + slug

  // Check if this is a branch first
  const branch = await queryBranchBySlug({ slug })

  if (branch) {
    // Render branch page
    return <BranchPageContent slug={slug} />
  }

  // Otherwise, render regular page
  const page: RequiredDataFromCollectionSlug<'pages'> | null = await queryPageBySlug({
    slug,
  })

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const { hero, layout } = page

  return (
    <div>
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <RenderHero {...(hero as RenderHeroProps)} />
      <RenderBlocks blocks={layout} searchParams={searchParams} />
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = 'home' } = await paramsPromise

  // Check if this is a branch first
  const branch = await queryBranchBySlug({ slug })

  if (branch) {
    return {
      title: branch.meta?.title || branch.heading || branch.name,
      description: branch.meta?.description || branch.overview,
      openGraph: {
        title: branch.meta?.title || branch.heading || branch.name,
        description: branch.meta?.description || branch.overview,
        images: branch.meta?.image
          ? [
            {
              url:
                typeof branch.meta.image === 'object' && 'url' in branch.meta.image
                  ? branch.meta.image.url || ''
                  : '',
            },
          ]
          : [],
      },
    }
  }

  // Otherwise, generate metadata for regular page
  const page = await queryPageBySlug({
    slug,
  })

  return generateMeta({ doc: page })
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

const queryBranchBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'branches',
    draft,
    limit: 1,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
