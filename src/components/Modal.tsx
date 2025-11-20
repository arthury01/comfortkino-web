import { useLayoutEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

type ModalProps = {
    children: (size: { width: number; height: number }) => React.ReactNode
}

export default function Modal({ children }: ModalProps) {
    const navigate = useNavigate()
    const containerRef = useRef<HTMLDivElement>(null)
    const [size, setSize] = useState({ width: 0, height: 0 })

    useLayoutEffect(() => {
        if (!containerRef.current) return

        const updateSize = () => {
            const rect = containerRef.current!.getBoundingClientRect()
            setSize({ width: rect.width, height: rect.height })
        }

        updateSize()

        const observer = new ResizeObserver(() => updateSize())
        observer.observe(containerRef.current)

        return () => observer.disconnect()
    }, [])

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            navigate(-1)
        }
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#182C52]/50 backdrop-blur-[10px]"
            onClick={handleBackdropClick}>
            <div
                ref={containerRef}
                className={
                    "bg-text/15 relative h-full w-full overflow-auto rounded-none shadow-[0px_4px_4px_rgba(24,19,59,0.9)] md:h-auto md:max-h-screen md:max-w-screen-sm md:rounded-lg md:bg-none lg:max-w-3xl xl:max-w-5xl"
                }>
                {children(size)}
            </div>
        </div>
    )
}
