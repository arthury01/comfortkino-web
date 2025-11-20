export default function DateString({ date }: { date: string[] }) {
    return (
        <div className="flex gap-2 md:justify-center overflow-scroll px-4">
            <div>Календарь</div>
            {date.slice(0, 6).map((item, index) => (
                <div key={index} className="flex whitespace-nowrap">{item.slice(5).split("-").join(".")}</div>
            ))}
            <div>Фильмы</div>
        </div>
    )
}
