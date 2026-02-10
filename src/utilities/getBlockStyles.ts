import { cn } from './ui'

// Utility to generate block styles and classes
// Now returns { className, style } instead of just className

type BlockSettings = {
    theme?: string | null
    width?: string | null
    paddingTop?: string | null
    paddingRight?: string | null
    paddingBottom?: string | null
    paddingLeft?: string | null
    marginTop?: string | null
    marginRight?: string | null
    marginBottom?: string | null
    marginLeft?: string | null
    animation?: string | null
    animationDelay?: number | null
    animationDuration?: number | null
    borderTopWidth?: string | null
    borderRightWidth?: string | null
    borderBottomWidth?: string | null
    borderLeftWidth?: string | null
    borderStyle?: string | null
    borderColor?: string | null
    borderTopLeftRadius?: string | null
    borderTopRightRadius?: string | null
    borderBottomRightRadius?: string | null
    borderBottomLeftRadius?: string | null
    borderCustomColor?: string | null
}

export const getBlockStyles = (settings?: BlockSettings) => {
    const {
        theme = 'transparent',
        paddingTop,
        paddingRight,
        paddingBottom,
        paddingLeft,
        marginTop,
        marginRight,
        marginBottom,
        marginLeft,
        animation = 'none',
        animationDelay,
        animationDuration,
        borderTopWidth,
        borderRightWidth,
        borderBottomWidth,
        borderLeftWidth,
        borderStyle,
        borderColor,
        borderCustomColor,
        borderTopLeftRadius,
        borderTopRightRadius,
        borderBottomRightRadius,
        borderBottomLeftRadius,
    } = settings || {}

    // Background Map
    const bgMap: Record<string, string> = {
        transparent: 'bg-transparent',
        white: 'bg-white',
        'light-gray': 'bg-gray-50',
        primary: 'bg-primary text-white',
        secondary: 'bg-secondary text-white',
        accent: 'bg-accent text-white',
        dark: 'bg-gray-900 text-white',
    }

    // Border Color Map
    const borderColorMap: Record<string, string> = {
        transparent: 'border-transparent',
        primary: 'border-primary',
        secondary: 'border-secondary',
        accent: 'border-accent',
        dark: 'border-gray-900',
        white: 'border-white',
        'light-gray': 'border-gray-300',
        custom: '', // Handled via inline style
    }

    // Animation Map
    const animationMap: Record<string, string> = {
        none: '',
        'fade-in': 'animate-in fade-in duration-700',
        'fade-in-up': 'animate-in fade-in slide-in-from-bottom-8 duration-700',
        'fade-in-down': 'animate-in fade-in slide-in-from-top-8 duration-700',
        'fade-in-left': 'animate-in fade-in slide-in-from-right-8 duration-700',
        'fade-in-right': 'animate-in fade-in slide-in-from-left-8 duration-700',
        'zoom-in': 'animate-in fade-in zoom-in duration-700',
        'zoom-out': 'animate-in fade-in zoom-out duration-700',
    }

    const animationClass = animationMap[animation || ""] || ''
    const bgClass = bgMap[theme || ""] || bgMap.transparent
    const borderColorClass = borderColorMap[borderColor || ""] || ''

    const className = cn(bgClass, animationClass, borderColorClass)

    const style = {
        paddingTop: paddingTop || undefined,
        paddingRight: paddingRight || undefined,
        paddingBottom: paddingBottom || undefined,
        paddingLeft: paddingLeft || undefined,
        marginTop: marginTop || undefined,
        marginRight: marginRight || undefined,
        marginBottom: marginBottom || undefined,
        marginLeft: marginLeft || undefined,
        animationDelay: animationDelay ? `${animationDelay}ms` : undefined,
        animationDuration: animationDuration ? `${animationDuration}ms` : undefined,
        borderTopWidth: borderTopWidth || undefined,
        borderRightWidth: borderRightWidth || undefined,
        borderBottomWidth: borderBottomWidth || undefined,
        borderLeftWidth: borderLeftWidth || undefined,
        borderStyle: borderStyle || undefined,
        borderColor: borderColor === 'custom' ? borderCustomColor || undefined : undefined,
        borderTopLeftRadius: borderTopLeftRadius || undefined,
        borderTopRightRadius: borderTopRightRadius || undefined,
        borderBottomRightRadius: borderBottomRightRadius || undefined,
        borderBottomLeftRadius: borderBottomLeftRadius || undefined,
    }

    return { className, style }
}

export const getContainerStyles = (settings?: BlockSettings) => {
    const { width = 'boxed' } = settings || {}
    return width === 'boxed' ? 'container' : 'w-full'
}
