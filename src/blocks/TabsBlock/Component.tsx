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
  const { tabs: manualTabs, settings } = props
  const { className, style } = getBlockStyles(settings)

  const tabsToRender = manualTabs || []

  if (!tabsToRender || tabsToRender.length === 0) return null

  return (
    <section className={className} style={style}>
      <div className="container text-center">

        <Tabs defaultValue={tabsToRender[0].id || 'tab-0'} className="w-full max-w-[1240px] mx-auto">
          <TabsList className="w-full max-w-5xl mx-auto flex justify-center flex-wrap bg-primary/5 p-2 rounded-xl">
            {tabsToRender.map((tab, index) => (
              <TabsTrigger
                key={tab.id || index}
                value={tab.id || `tab-${index}`}
                className="px-5 py-2 h-12 rounded-none font-medium text-lg bg-primary/20 data-[state=active]:bg-accent data-[state=active]:text-white cursor-pointer border-0 border-r border-accent last:border-r-0"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {tabsToRender.map((tab: any, index: number) => (
            <TabsContent key={tab.id || index} value={tab.id || `tab-${index}`} className="pt-3 max-sm:mt-24">
              <div className="bg-accent/15 p-4 sm:p-10 rounded-lg text-left">
                {tab.content && <RenderBlocks blocks={tab.content} />}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
