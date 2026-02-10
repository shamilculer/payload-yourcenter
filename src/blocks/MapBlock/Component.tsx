import React from 'react'
import type { MapBlock as MapBlockProps } from '@/payload-types'

import { getBlockStyles, getContainerStyles } from '@/utilities/getBlockStyles'
import { cn } from '@/utilities/ui'

export const MapBlock = ({ mapUrl, height = '450px', settings }: MapBlockProps & { settings?: any }) => {
    const { className, style } = getBlockStyles(settings)

    return (
        <section className={className} style={style}>
            <div className={cn(getContainerStyles(settings), settings?.width === 'full' && 'px-0')}>
                <iframe
                    title="Map"
                    src={mapUrl || ''}
                    width="100%"
                    height={height || '450px'}
                    style={{ border: 0, width: '100%', height: height || '450px' }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </div>
        </section>
    )
}
