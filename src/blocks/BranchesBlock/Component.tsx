import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CircleCheck, MapPin } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { BranchesBlock as BranchesBlockProps } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'

export const BranchesBlock = async (props: BranchesBlockProps) => {
    const { title, description, eyebrow } = props
    const payload = await getPayload({ config: configPromise })

    // 1. Fetch all Published Branches
    const { docs: branches } = await payload.find({
        collection: 'branches',
        depth: 2, // Ensure we get media objects
        // sort: 'order', // If you have order field
    })

    if (!branches || branches.length === 0) return null

    // 2. Fetch Services for EACH branch (parallel)
    const branchesWithServices = await Promise.all(branches.map(async (branch) => {
        // Query services that are related to this branch
        // Assuming 'relatedBranches' field in 'services' collection exists and is a relationship
        const { docs: services } = await payload.find({
            collection: 'services',
            where: {
                branch: {
                    equals: branch.id
                }
            },
            limit: 6, // Limit to 6 services to display like static site
        })
        return {
            ...branch,
            fetchedServices: services
        }
    }))

    return (
        <section className="section-spacing-b">
            <div className="container space-y-8 lg:space-y-12 text-center">
                <div>
                    {(eyebrow) && (
                        <span className="py-1.5 px-3 rounded-3xl uppercase font-medium text-accent border border-gray-300 bg-primary/20 max-sm:text-sm">
                            {eyebrow}
                        </span>
                    )}
                    {title && <h2 className="mt-4">{title}</h2>}
                    {description && <p className="mt-3 max-w-2xl mx-auto text-gray-600">{description}</p>}
                </div>

                <Tabs defaultValue={branchesWithServices[0]?.id} className="w-full max-w-[1240px] mx-auto">
                    <TabsList className="w-full max-w-5xl mx-auto flex justify-center flex-wrap bg-primary/5 p-2 rounded-xl h-auto">
                        {branchesWithServices.map((branch) => (
                            <TabsTrigger
                                key={branch.id}
                                value={branch.id}
                                className="px-5 py-2 h-12 rounded-none font-medium text-lg bg-primary/20 data-[state=active]:bg-accent data-[state=active]:text-white cursor-pointer border-0 not-last:border-r border-accent hover:bg-accent/10"
                            >
                                <MapPin className="w-10 h-10 mr-2" /> {branch.name}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {branchesWithServices.map((branch) => (
                        <TabsContent key={branch.id} value={branch.id} className="pt-3 max-sm:mt-24">
                            <div className="grid lg:grid-cols-2 gap-7 sm:gap-10 lg:gap-20 items-center bg-accent/15 p-4 sm:p-10 rounded-lg text-left">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-accent font-medium">
                                        <h3 className="!text-3xl sm:!text-4xl">{branch.name}</h3>
                                    </div>
                                    {branch.overview && <p className="text-gray-700">{branch.overview}</p>}

                                    {/* Services List */}
                                    {branch.fetchedServices && branch.fetchedServices.length > 0 && (
                                        <ul className="text-gray-700 font-medium grid sm:grid-cols-2 gap-5 mt-5">
                                            {branch.fetchedServices.map((s, i) => (
                                                <li className="flex items-start gap-2" key={s.id || i}>
                                                    <CircleCheck className="fill-accent text-white shrink-0 mt-0.5" />
                                                    {s.title}
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                    <div className="flex items-center gap-6 mt-5">
                                        <Button className="bg-secondary" asChild>
                                            {/* Assuming phone is available in contact info */}
                                            <Link href={`tel:${branch.contact?.phone?.[0]?.number || ''}`}>Give Us a Call</Link>
                                        </Button>

                                        <Button className="bg-accent" asChild>
                                            <Link href={`/${branch.slug || ''}`}>Know More</Link>
                                        </Button>
                                    </div>
                                </div>

                                {/* Branch Image */}
                                {branch.image && typeof branch.image === 'object' && (
                                    <Image
                                        src={getMediaUrl(branch.image) || ''}
                                        width={700}
                                        height={600}
                                        alt={branch.name}
                                        className="object-cover h-80 sm:h-[400px] rounded-lg max-lg:order-first"
                                    />
                                )}
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </section>
    )
}
