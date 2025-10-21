import { getPayload } from 'payload'
import config from '@/payload.config'
import './globals.css'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import type { RenderHeroProps } from '@/heros/RenderHero'

export default async function HomePage() {
  const payload = await getPayload({ config })

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
      <RenderHero {...(hero as RenderHeroProps)} />
      <RenderBlocks blocks={layout} />
    </div>
  )
}