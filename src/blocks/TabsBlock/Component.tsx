import React from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { cn } from '@/utilities/ui'
import { getBlockStyles } from '@/utilities/getBlockStyles'
import type { TabsBlock as TabsBlockProps } from '@/payload-types'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import RichText from '@/components/RichText'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { CircleCheck, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { getMediaUrl } from '@/utilities/getMediaUrl'

export const TabsBlock = async (props: TabsBlockProps & { settings?: any }) => {
  const { eyebrow, title, description, introContent, source, tabs: manualTabs, settings } = props
  const { className, style } = getBlockStyles(settings)

  let tabsToRender: any[] = []

  if (source === 'branches') {
    const payload = await getPayload({ config: configPromise })

    // 1. Fetch all Published Branches
    const { docs: branches } = await payload.find({
      collection: 'branches',
      depth: 2,
    })

    if (branches && branches.length > 0) {
      // 2. Fetch Services for EACH branch
      tabsToRender = await Promise.all(branches.map(async (branch) => {
        const { docs: services } = await payload.find({
          collection: 'services',
          where: {
            branch: {
              equals: branch.id
            }
          },
          limit: 6,
        })

        return {
          id: branch.id,
          label: branch.name,
          // Pre-calculate content for branches to render consistently
          isBranch: true,
          data: {
            ...branch,
            fetchedServices: services
          }
        }
      }))
    }
  } else {
    // Manual mode
    tabsToRender = manualTabs || []
  }

  if (!tabsToRender || tabsToRender.length === 0) return null

  return (
    <section className={className} style={style}>
      <div className="container space-y-8 lg:space-y-12 text-center">
        <div>
          {eyebrow && (
            <span className="py-1.5 px-3 rounded-3xl uppercase font-medium text-accent border border-gray-300 bg-primary/20 max-sm:text-sm">
              {eyebrow}
            </span>
          )}
          {title && <h2 className="mt-4">{title}</h2>}
          {description && <p className="mt-3 max-w-2xl mx-auto text-gray-600">{description}</p>}
          {introContent && <RichText data={introContent} enableGutter={false} className="mt-4 max-w-2xl mx-auto text-gray-600" />}
        </div>

        <Tabs defaultValue={tabsToRender[0].id || 'tab-0'} className="w-full max-w-[1240px] mx-auto">
          <TabsList className="w-full max-w-5xl mx-auto flex justify-center flex-wrap bg-primary/5 p-2 rounded-xl h-auto gap-2">
            {tabsToRender.map((tab, index) => (
              <TabsTrigger
                key={tab.id || index}
                value={tab.id || `tab-${index}`}
                className="px-5 py-2 h-12 rounded-none font-medium text-lg bg-primary/20 data-[state=active]:bg-accent data-[state=active]:text-white cursor-pointer border-0 not-last:border-r border-accent hover:bg-accent/10 transition-colors"
              >
                {tab.isBranch && <MapPin className="w-10 h-10 mr-2" />}
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {tabsToRender.map((tab: any, index: number) => (
            <TabsContent key={tab.id || index} value={tab.id || `tab-${index}`} className="pt-3 max-sm:mt-8">
              <div className="bg-accent/15 p-4 sm:p-10 rounded-lg text-left">
                {tab.isBranch ? (
                  <div className="grid lg:grid-cols-2 gap-7 sm:gap-10 lg:gap-20 items-center">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-accent font-medium">
                        <h3 className="!text-3xl sm:!text-4xl">{tab.label}</h3>
                      </div>
                      {tab.data.overview && <p className="text-gray-700">{tab.data.overview}</p>}

                      {/* Services List */}
                      {tab.data.fetchedServices && tab.data.fetchedServices.length > 0 && (
                        <ul className="text-gray-700 font-medium grid sm:grid-cols-2 gap-5 mt-5">
                          {tab.data.fetchedServices.map((s: any, i: number) => (
                            <li className="flex items-start gap-2" key={s.id || i}>
                              <CircleCheck className="fill-accent text-white shrink-0 mt-0.5" />
                              {s.title}
                            </li>
                          ))}
                        </ul>
                      )}

                      <div className="flex items-center gap-6 mt-5">
                        <Button className="bg-secondary" asChild>
                          <Link href={`tel:${tab.data.contact?.phone?.[0]?.number || ''}`}>Give Us a Call</Link>
                        </Button>

                        <Button className="bg-accent" asChild>
                          <Link href={`/${tab.data.slug || ''}`}>Know More</Link>
                        </Button>
                      </div>
                    </div>

                    {/* Branch Image */}
                    {tab.data.image && (
                      <Image
                        src={getMediaUrl(tab.data.image) || ''}
                        width={700}
                        height={600}
                        alt={tab.label}
                        className="object-cover h-80 sm:h-[400px] rounded-lg max-lg:order-first"
                      />
                    )}
                  </div>
                ) : (
                  // Manual Content
                  tab.content && <RenderBlocks blocks={tab.content} />
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
