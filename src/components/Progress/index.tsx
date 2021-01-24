interface PropsProgress {
    width: number
}

export default function Progress(props: PropsProgress) {
    return (
        <div className="relative pt-1">
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-yellow-100">
                <div style={{ width: `${props.width}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-yellow-400"></div>
            </div>
        </div>
    )
}
