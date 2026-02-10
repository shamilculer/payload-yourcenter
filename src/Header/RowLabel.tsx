'use client'
import { useRowLabel, useField } from '@payloadcms/ui'

export const RowLabel = () => {
    const { path, rowNumber } = useRowLabel()
    const { value: label } = useField<string>({ path: `${path}.label` })
    const { value: linkLabel } = useField<string>({ path: `${path}.link.label` })

    const finalLabel = label || linkLabel || `Item ${String(typeof rowNumber === 'number' ? rowNumber + 1 : '').padStart(2, '0')}`

    return <div>{finalLabel}</div>
}
