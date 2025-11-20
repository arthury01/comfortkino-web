import { Skeleton } from "../../components/Skeleton"

export default function HomeLoader() {
    const LoaderItem = () => (
        <div className="flex flex-col gap-4 md:flex-row">
            <Skeleton
                className="relative aspect-650/348 w-full overflow-hidden rounded-2xl md:aspect-473/677 md:max-h-[250px] md:max-w-[170px]"
                itemClassName="absolute inset-0 w-full h-full"
            />
            <div className="flex w-full flex-col gap-4">
                <div className="flex justify-between">
                    <div className="flex w-full flex-1/2 flex-col gap-2">
                        <Skeleton itemClassName="h-[28px] w-3/4" />
                        <Skeleton itemClassName="w-1/2 h-[16px]" />
                    </div>
                    <Skeleton lines={2} className="gap-[5px]" itemClassName="rounded-full h-10 w-10" />
                </div>
                <Skeleton lines={3} itemClassName="h-[20px] min-w-[130px]" />
                <Skeleton lines={6} className="w-full flex-row flex-nowrap" itemClassName="min-w-[68px] h-[28px]" />
            </div>
        </div>
    )

    return (
        <div className="flex flex-col gap-10 px-4 pt-4">
            <LoaderItem />
            <LoaderItem />
            <LoaderItem />
        </div>
    )
}
