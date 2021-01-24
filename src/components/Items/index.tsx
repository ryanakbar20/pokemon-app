interface PropsItems {
    onClick: () => void,
    title: string,
}

export default function Items(props: PropsItems) {
    return (
          <div 
            className="text-center bg-white shadow rounded-lg py-2 mt-3 cursor-pointer group transition duration-500 ease-in-out hover:bg-red-400"
            onClick={props.onClick}
          >
            <p className="text-red-400 text-lg font-bold transition duration-500 ease-in-out group-hover:text-white">
              {props.title}
            </p>
          </div>
    )
}
