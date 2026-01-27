"use client"

import * as React from "react"
import { cn } from "@/utilities/ui"

const TabsContext = React.createContext<{
    value: string
    onValueChange: (value: string) => void
} | null>(null)

export const Tabs = ({
    defaultValue,
    className,
    children,
}: {
    defaultValue: string
    className?: string
    children: React.ReactNode
}) => {
    const [value, setValue] = React.useState(defaultValue)

    return (
        <TabsContext.Provider value={{ value, onValueChange: setValue }}>
            <div className={cn("flex flex-col gap-2", className)}>{children}</div>
        </TabsContext.Provider>
    )
}

export const TabsList = ({ className, children }: { className?: string, children: React.ReactNode }) => (
    <div className={cn("inline-flex items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground", className)}>
        {children}
    </div>
)

export const TabsTrigger = ({ value, className, children }: { value: string, className?: string, children: React.ReactNode }) => {
    const context = React.useContext(TabsContext)
    const isActive = context?.value === value
    return (
        <button
            className={cn(
                "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                isActive ? "bg-background text-foreground shadow" : "hover:bg-background/50",
                className
            )}
            onClick={() => context?.onValueChange(value)}
            // Radix UI data attribute for styling hook compatibility
            data-state={isActive ? 'active' : 'inactive'}
        >
            {children}
        </button>
    )
}

export const TabsContent = ({ value, className, children }: { value: string, className?: string, children: React.ReactNode }) => {
    const context = React.useContext(TabsContext)
    if (context?.value !== value) return null
    return (
        <div className={cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className)}>
            {children}
        </div>
    )
}
