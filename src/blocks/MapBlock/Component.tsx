import React from 'react'
import type { MapBlock as MapBlockProps } from '@/payload-types'

export const MapBlock = ({ mapUrl, height = '450px' }: MapBlockProps) => {
    return (
        <section className="w-full">
            <iframe
                title="Map"
                src={mapUrl}
                width="100%"
                height={height}
                style={{ border: 0, width: '100%', height }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
            />
        </section>
    )
}
