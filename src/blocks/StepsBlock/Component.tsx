import React from 'react'
import type { StepsBlock as StepsBlockProps } from '@/payload-types'

export const StepsBlock: React.FC<StepsBlockProps> = ({ steps }) => {
    if (!steps || steps.length === 0) return null

    return (
        <div className="w-full flex flex-col gap-10 justify-center pr-16 max-sm:pb-16 max-lg:pb-24 max-lg:px-5">
            {steps.map((step, index) => (
                <div
                    key={step.id || index}
                    className="flex sm:items-center gap-5 bg-secondary py-3 px-4 rounded-2xl relative process-step"
                >
                    <div className="size-12 rounded-full flex items-center justify-center bg-white min-w-[3rem]">
                        <span className="font-bold text-3xl text-accent tracking-tighter">
                            {step.stepNumber}
                        </span>
                    </div>
                    <div className="w-3/4">
                        <h4 className="text-lg md:text-[20px] !text-white font-semibold">
                            {step.title}
                        </h4>
                        {step.description && (
                            <p className="text-white mt-1">{step.description}</p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}
