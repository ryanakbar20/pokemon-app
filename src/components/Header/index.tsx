interface PropsHeader {
    label: string,
    imageUrl: string
}

export default function Header(props: PropsHeader) {
    return (
        <div className="bg-red-500 px-5 py-3 rounded-t-md flex flex-row space-x-3">
            <img className="h-7" src={props.imageUrl} alt="images-header" />
            <p className="text-yellow-300 text-xl text-bold font-bold">
                {props.label}
            </p>
        </div>
    )
}
