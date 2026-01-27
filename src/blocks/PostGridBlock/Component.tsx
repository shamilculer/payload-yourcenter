import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Button, buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/utilities/ui'
import type { PostGridBlock as PostGridBlockProps } from '@/payload-types'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
} from '@/components/ui/pagination'

export const PostGridBlock = async (
    props: PostGridBlockProps & {
        searchParams?: { [key: string]: string | string[] | undefined }
    },
) => {
    const { limit = 9, categories, columns = '3', searchParams } = props
    const pageParam = searchParams?.page
    const page = typeof pageParam === 'string' ? parseInt(pageParam) : 1

    const payload = await getPayload({ config: configPromise })

    const query: any = {
        collection: 'posts',
        depth: 1,
        limit,
        page,
        sort: '-publishedAt',
        where: {
            and: [
                {
                    _status: {
                        equals: 'published',
                    },
                },
            ],
        },
    }

    // Filter by categories if selected
    if (categories && categories.length > 0) {
        const categoryIds = categories.map((cat) => {
            if (typeof cat === 'object') return cat.id
            return cat
        })

        query.where.and.push({
            categories: {
                in: categoryIds,
            },
        })
    }

    const postsQuery = await payload.find(query)

    const { docs: posts, totalPages, hasNextPage, hasPrevPage } = postsQuery

    // Helper for images
    const getImageSrc = (image: any) => {
        if (!image) return null
        if (typeof image === 'object') {
            if (image.cloudinary?.secure_url) return image.cloudinary.secure_url
            if (image.cloudinary?.public_id) {
                const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dpycn77pf'
                return `https://res.cloudinary.com/${cloudName}/image/upload/${image.cloudinary.public_id}`
            }
            if (image.url) return image.url
        }
        return null
    }

    const formatDate = (dateString?: string) => {
        if (!dateString) return ''
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        })
    }

    // Grid column classes
    const gridClasses = {
        '2': 'sm:grid-cols-2',
        '3': 'sm:grid-cols-2 lg:grid-cols-3',
        '4': 'sm:grid-cols-2 lg:grid-cols-4',
    }

    return (
        <section className="section-spacing-b">
            <div className="container">
                <div className={cn("grid gap-12", gridClasses[columns as keyof typeof gridClasses] || gridClasses['3'])}>
                    {posts.map((post: any) => {
                        const heroImageSrc = getImageSrc(post.heroImage) || getImageSrc(post.meta?.image)
                        const category =
                            post.categories && post.categories.length > 0
                                ? typeof post.categories[0] === 'object'
                                    ? post.categories[0].title
                                    : 'Healthcare' // Fallback or fetch if ID
                                : 'Healthcare'

                        // Excerpt extraction (simplified, assuming meta description or content)
                        const excerpt = post.meta?.description || 'Read this article to learn more.'

                        return (
                            <div
                                key={post.id}
                                className="bg-white border border-gray-100 rounded-xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden flex flex-col transform hover:-translate-y-1"
                            >
                                {/* Blog Image */}
                                <Link href={`/blog/${post.slug}`} aria-label={`Read ${post.title}`}>
                                    {heroImageSrc ? (
                                        <Image
                                            src={heroImageSrc}
                                            alt={post.title}
                                            width={800}
                                            height={600}
                                            className="w-full h-52 object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-52 bg-gray-200 flex items-center justify-center text-gray-400">
                                            No Image
                                        </div>
                                    )}
                                </Link>

                                {/* Blog Content */}
                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex justify-between items-center text-sm mb-3">
                                        <span className="font-semibold px-3 py-1 rounded-full text-xs transition duration-300 bg-secondary/20 text-accent">
                                            {category}
                                        </span>
                                        <span className="text-gray-500">{formatDate(post.publishedAt)}</span>
                                    </div>

                                    <h3 className="!text-[22px] font-bold mb-3 text-gray-800 line-clamp-2">
                                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                                    </h3>

                                    <p className="text-gray-600 flex-grow text-base mb-4 line-clamp-3">{excerpt}</p>

                                    {/* Read More Link/Button */}
                                    <Link href={`/blog/${post.slug}`} className="mt-auto block">
                                        <Button className="w-full transition duration-300 shadow-md">
                                            Read Article
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-12">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <Link
                                        href={hasPrevPage ? `?page=${page - 1}` : '#'}
                                        className={cn(
                                            buttonVariants({ variant: 'ghost', size: 'default' }),
                                            'gap-1 pl-2.5',
                                            !hasPrevPage && 'pointer-events-none opacity-50'
                                        )}
                                        aria-disabled={!hasPrevPage}
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                        <span>Previous</span>
                                    </Link>
                                </PaginationItem>

                                {/* Simple numeric pages for now - can be expanded */}
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                                    <PaginationItem key={p}>
                                        <Link
                                            href={`?page=${p}`}
                                            className={cn(
                                                buttonVariants({ variant: p === page ? 'outline' : 'ghost', size: 'icon' })
                                            )}
                                            aria-current={p === page ? 'page' : undefined}
                                        >
                                            {p}
                                        </Link>
                                    </PaginationItem>
                                ))}

                                <PaginationItem>
                                    <Link
                                        href={hasNextPage ? `?page=${page + 1}` : '#'}
                                        className={cn(
                                            buttonVariants({ variant: 'ghost', size: 'default' }),
                                            'gap-1 pr-2.5',
                                            !hasNextPage && 'pointer-events-none opacity-50'
                                        )}
                                        aria-disabled={!hasNextPage}
                                    >
                                        <span>Next</span>
                                        <ChevronRight className="h-4 w-4" />
                                    </Link>
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                )}
            </div>
        </section>
    )
}
