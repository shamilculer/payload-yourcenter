import { getPayload } from 'payload'
import config from '@/payload.config'
import './globals.css'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import type { Page } from '@/payload-types'

type Args = {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined
  }>
}

export default async function HomePage(props: Args) {
  const { searchParams: searchParamsPromise } = props
  const payload = await getPayload({ config })
  const searchParams = await searchParamsPromise

  // Fetch the page with populated relations for layouts (depth gives media URLs)
  const { docs: [page] } = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: 'home' }
    },
    depth: 2,
  })

  if (!page) {
    return (
      <p>No pages found. Create some pages in your Payload admin panel!</p>
    )
  }

  const { hero, layout } = page

  return (
    <div>
      <RenderHero {...(hero as Page['hero'])} />
      <RenderBlocks blocks={layout} searchParams={searchParams} />
    </div>
  )
}