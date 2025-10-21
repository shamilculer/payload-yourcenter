import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET(request: NextRequest) {
  try {
    const payload = await getPayload({ config })
    
    // Test media collection access
    const media = await payload.find({
      collection: 'media',
      limit: 5,
    })
    
    return NextResponse.json({
      success: true,
      count: media.docs.length,
      media: media.docs.map(doc => ({
        id: doc.id,
        filename: doc.filename,
        url: doc.url,
        alt: doc.alt,
      }))
    })
  } catch (error) {
    console.error('Media test error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 })
  }
}
