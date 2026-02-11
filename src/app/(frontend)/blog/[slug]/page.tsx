import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'
import { generateMeta } from '@/utilities/generateMeta'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { Post as PostType } from '@/payload-types'
import { Media } from '@/components/Media'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Calendar } from 'lucide-react'
import PageCTA from '@/components/PageCTA'

export async function generateStaticParams() {
    const payload = await getPayload({ config: configPromise })
    const posts = await payload.find({
        collection: 'posts',
        draft: false,
        limit: 1000,
        overrideAccess: false,
        pagination: false,
        select: {
            slug: true,
        },
    })

    return posts.docs.map(({ slug }) => {
        return { slug }
    })
}

type Args = {
    params: Promise<{
        slug?: string
    }>
}

export default async function Post({ params: paramsPromise }: Args) {
    const { isEnabled: draft } = await draftMode()
    const { slug = '' } = await paramsPromise
    const url = '/blog/' + slug
    const post = await queryPostBySlug({ slug })

    if (!post) {
        return <PayloadRedirects url={url} />
    }

    // Format date
    const formattedDate = post.publishedAt
        ? new Date(post.publishedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        })
        : ''

    return (
        <main>
            <PayloadRedirects disableNotFound url={url} />
            {draft && <LivePreviewListener />}

            <section className="py-5 max-w-[1100px] mx-auto">
                <div className="container max-w-4xl">
                    <Button
                        variant="ghost"
                        asChild
                        className="mb-5 sm:mb-8 pl-0 hover:bg-transparent hover:text-primary"
                    >
                        <Link href="/blog" className="flex items-center gap-2">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Blog
                        </Link>
                    </Button>

                    <article>
                        <h1 className="!text-3xl sm:!text-4xl md:!text-5xl lg:!text-5xl font-bold mb-5">
                            {post.title}
                        </h1>

                        <div className="relative h-[380px] md:h-[500px] w-full mb-8 rounded-2xl overflow-hidden">
                            {post.heroImage && typeof post.heroImage !== 'string' && (
                                <Media resource={post.heroImage} fill priority imgClassName="object-cover" />
                            )}
                        </div>

                        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-5 border-b border-border pb-8">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{formattedDate}</span>
                            </div>
                        </div>

                        <div className="prose prose-lg max-w-none [&_h2]:!text-2xl sm:[&_h2]:!text-3xl [&_h2]:!mt-8 [&_h2]:!mb-4 [&_h3]:!text-xl sm:[&_h3]:!text-2xl [&_h3]:!mt-6 [&_h3]:!mb-3 [&_h4]:!text-lg sm:[&_h4]:!text-xl [&_h4]:!mt-5 [&_h4]:!mb-2">
                            <RichText data={post.content} enableGutter={false} />
                        </div>
                    </article>
                </div>
            </section>

            <div className="mt-16">
                <PageCTA />
            </div>
        </main>
    )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
    const { slug = '' } = await paramsPromise
    const post = await queryPostBySlug({ slug })

    return generateMeta({ doc: post })
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
    const { isEnabled: draft } = await draftMode()

    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
        collection: 'posts',
        draft,
        limit: 1,
        overrideAccess: draft,
        pagination: false,
        where: {
            slug: {
                equals: slug,
            },
        },
    })

    return result.docs?.[0] || null
})
