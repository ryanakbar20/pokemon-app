interface PropsLoading {
    size: number
}

export default function Loading(props: PropsLoading) {
    return (
        <div className="flex flex-col items-center content-center">
            <img className={`h-${props.size} animate-bounce`} src="https://www.pngrepo.com/png/276264/180/pokeball-pokemon.png" alt="images-loading" />
        </div>
    )
}
