import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import * as LucideIcons from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import type { Page, Post, Service, Branch } from '@/payload-types'

type CMSLinkType = {
  appearance?: 'inline' | 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | null
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts' | 'services' | 'branches'
    value: Page | Post | Service | Branch | string | number
  } | null
  size?: 'default' | 'sm' | 'lg' | 'icon' | null
  type?: 'custom' | 'reference' | 'none' | null
  url?: string | null
  showIcon?: boolean | null
  icon?: string | null
  iconPosition?: 'left' | 'right' | null
}

// Helper to convert kebab-case to PascalCase (e.g., 'map-pin' -> 'MapPin')
const kebabToPascal = (str: string) => {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')
}

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const {
    type,
    appearance = 'inline',
    children,
    className,
    label,
    newTab,
    reference,
    size: sizeFromProps,
    url,
    showIcon,
    icon,
    iconPosition = 'right',
  } = props

  const href =
    type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
      ? `${reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''}/${reference.value.slug
      }`
      : url

  if (!href || type === 'none') return null

  const size = appearance === 'link' ? 'default' : sizeFromProps
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  let IconComp = LucideIcons.MoveRight
  if (showIcon && icon) {
    const pascalName = kebabToPascal(icon)
    const DynamicIcon = (LucideIcons as any)[pascalName]
    if (DynamicIcon) {
      IconComp = DynamicIcon
    }
  }

  const iconElement = showIcon ? <IconComp className={cn("w-4 h-4", iconPosition === 'left' ? "mr-2" : "ml-2")} /> : null

  /* Ensure we don't break any styles set by richText */
  if (appearance === 'inline') {
    return (
      <Link className={cn(className, "inline-flex items-center gap-1")} href={href || url || ''} {...newTabProps}>
        {iconPosition === 'left' && iconElement}
        {label && label}
        {children && children}
        {iconPosition === 'right' && iconElement}
      </Link>
    )
  }

  return (
    <Button asChild className={className} size={size} variant={appearance}>
      <Link className={cn(className)} href={href || url || ''} {...newTabProps}>
        {iconPosition === 'left' && iconElement}
        {label && label}
        {children && children}
        {iconPosition === 'right' && iconElement}
      </Link>
    </Button>
  )
}
