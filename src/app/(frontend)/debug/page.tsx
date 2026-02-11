import { getPayload } from 'payload'
import configPromise from '@payload-config'
import React from 'react'

export const dynamic = 'force-dynamic'

export default async function DebugPage() {
    const payload = await getPayload({ config: configPromise })

    const services = await payload.find({
        collection: 'services',
        limit: 100,
        draft: true, // Include drafts
        overrideAccess: true, // Use access control? No, let's verify what the page sees.
        // The page uses overrideAccess: true by default for local API unless specified. 
        // Wait, the page used `draft: draft` (true/false) and NO overrideAccess (so default true).
        // Let's imitate the page logic but print everything.
    })

    // Also query specifically for "radiography"
    const radiography = await payload.find({
        collection: 'services',
        draft: true,
        where: {
            slug: {
                equals: 'radiography'
            }
        }
    })

    return (
        <div style={{ padding: '40px', fontFamily: 'monospace' }}>
            <h1>Debug Services</h1>

            <h2>Query for slug "radiography"</h2>
            <pre>{JSON.stringify(radiography.docs, null, 2)}</pre>

            <h2>All Services ({services.totalDocs})</h2>
            <ul>
                {services.docs.map(doc => (
                    <li key={doc.id} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
                        <strong>Title:</strong> {doc.title}<br />
                        <strong>Slug:</strong> {doc.slug}<br />
                        <strong>ID:</strong> {doc.id}<br />
                        <strong>Status:</strong> {doc._status}<br />
                        <strong>Branch:</strong> {JSON.stringify(doc.branch)}
                    </li>
                ))}
            </ul>
        </div>
    )
}
