import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { Card } from '@/components/Card'
import { cn } from '@/utilities/ui'
import type { PostGridBlock as PostGridBlockProps } from '@/payload-types'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
} from '@/components/ui/pagination'

import { getBlockStyles, getContainerStyles } from '@/utilities/getBlockStyles'

export const PostGridBlock = async (
    props: PostGridBlockProps & {
        searchParams?: { [key: string]: string | string[] | undefined }
        settings?: any
    },
) => {
    const { limit = 9, categories, columns = '3', searchParams, settings } = props
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

    const gridClasses = {
        '2': 'sm:grid-cols-2',
        '3': 'sm:grid-cols-2 lg:grid-cols-3',
        '4': 'sm:grid-cols-2 lg:grid-cols-4',
    }

    const { className, style } = getBlockStyles(settings)

    return (
        <section className={className} style={style}>
            <div className={getContainerStyles(settings)}>
                <div className={cn("grid gap-12", gridClasses[columns as keyof typeof gridClasses] || gridClasses['3'])}>
                    {posts.map((post: any) => {
                        return (
                            <div
                                key={post.id}
                                className="h-full"
                            >
                                <Card doc={post} relationTo="posts" showCategories />
                            </div>
                        )
                    })}
                </div>

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
