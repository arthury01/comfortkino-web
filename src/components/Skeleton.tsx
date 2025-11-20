import clsx from "clsx"

type SkeletonProps = {
    lines?: number
    className?: string
    itemClassName?: string
}

export function Skeleton({ lines = 1, className, itemClassName }: SkeletonProps) {
    const isNoWrap = className?.includes("flex-nowrap")
    const hasRounded = itemClassName?.includes("rounded")

    const items = Array.from({ length: lines }, (_, i) => (
        <div key={i} className={clsx("animate-pulse bg-gray-700", itemClassName, !hasRounded && "rounded-lg")} />
    ))

    const content = <div className={clsx("flex gap-2", isNoWrap ? "w-max" : "flex-wrap", className)}>{items}</div>

    return isNoWrap ? <div className="w-full overflow-x-auto">{content}</div> : content
}
