import * as React from 'react'

export const Width: React.FC<{
  children: React.ReactNode
  className?: string
  width?: number | string
}> = ({ children, className, width }) => {
  return (
    <div className={className + " w-full mb-4 px-2"} style={{ maxWidth: width ? `${width}%` : undefined }}>
      {children}
    </div>
  )
}
