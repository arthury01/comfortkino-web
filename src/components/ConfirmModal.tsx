import { forwardRef, useImperativeHandle, useState } from "react"

type ConfirmOptions = {
    title: string
    description?: string
    confirmText?: string
    cancelText?: string
    onConfirm: () => void
}

export type ConfirmModalHandle = {
    open: (options: ConfirmOptions) => void
    close: () => void
}

const ConfirmModal = forwardRef<ConfirmModalHandle>((props, ref) => {
    const [isOpen, setIsOpen] = useState(false)
    const [options, setOptions] = useState<ConfirmOptions | null>(null)

    useImperativeHandle(ref, () => ({
        open(opts: ConfirmOptions) {
            setOptions(opts)
            setIsOpen(true)
        },
        close() {
            setIsOpen(false)
        }
    }))

    if (!isOpen || !options) return null

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[1px]"
            onClick={() => setIsOpen(false)}>
            <div
                className="flex w-[90%] max-w-sm flex-col items-start gap-4 rounded-2xl bg-background p-5 text-center shadow-xl"
                onClick={e => e.stopPropagation()}>
                <div className="text-left font-medium">{options.title}</div>
                {options.description && <div className="text-left font-normal">{options.description}</div>}
                <div className="flex w-full justify-end gap-2">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="border-text/15 hover:bg-text/5 rounded-4xl border px-5 py-1.5 text-sm hover:cursor-pointer">
                        {options.cancelText || "Отмена"}
                    </button>
                    <button
                        onClick={() => {
                            options.onConfirm()
                            setIsOpen(false)
                        }}
                        className="bg-error rounded-4xl px-5 py-1.5 text-sm text-white hover:cursor-pointer hover:bg-[#b71717]">
                        {options.confirmText || "Подтвердить"}
                    </button>
                </div>
            </div>
        </div>
    )
})

export default ConfirmModal
