"use client"

import { useState, ReactElement } from "react"
import { useNavigate } from "react-router-dom"
import { RightArrow } from "./svgCollection"
import Modal from "./Modal"

export type StepProps<T> = {
    params: T
    navigate: (id: string, update?: Partial<T>) => void
    goBack: () => void
    modalSize?: { width: number; height: number } 
}

export type StepConfig<T> = {
    id: string
    title: string
    component: (props: StepProps<T>) => ReactElement
}

type StepperProps<T> = {
    steps: StepConfig<T>[]
    initialStep?: string
}

export function Stepper<T>({ steps, initialStep }: StepperProps<T>) {
    const [data, setData] = useState<T>({} as T)
    const [stack, setStack] = useState<string[]>([initialStep ?? steps[0].id])
    const router = useNavigate()

    const navigate = (id: string, update?: Partial<T>) => {
        if (!steps.some(s => s.id === id)) {
            console.warn(`Step "${id}" not found`)
            return
        }
        if (update) setData(prev => ({ ...prev, ...update }))
        setStack(prev => [...prev, id])
    }

    const goBack = () => {
        setStack(prev => {
            if (prev.length > 1) return prev.slice(0, -1)
            router(-1)
            return prev
        })
    }

    const currentStepId = stack[stack.length - 1]
    const current = steps.find(s => s.id === currentStepId)!
    const StepComponent = current.component

    return (
        <Modal>
            {({ width, height }) => (
                <div className="flex h-full flex-col">
                    <header className="flex h-13 items-center justify-between border-b border-white/15 px-4">
                        <div className="rotate-180 transition-opacity hover:cursor-pointer" onClick={goBack} aria-label="Назад">
                            <RightArrow />
                        </div>
                        <div className="text-[17px]/[18px] font-semibold tracking-[-0.07px]">{current.title}</div>
                        <div className="opacity-0">
                            <RightArrow />
                        </div>
                    </header>

                    <main className="flex-1">
                        <StepComponent params={data} navigate={navigate} goBack={goBack} modalSize={{ width, height }} />
                    </main>
                </div>
            )}
        </Modal>
    )
}
