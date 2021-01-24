import {useState, useEffect} from 'react';
import axios from 'axios';
import {Loading as LoadingIcon, Progress} from '../index'

interface PropsDetail {
    url: string
}

export default function Detail(props: PropsDetail) {
    const [Detail, setDetail] = useState<any>({});
    const [Picture, setPicture] = useState('');
    const [Loading, setLoading] = useState(true);

    useEffect(() => {
        function fetchData() {
            axios({
              method: 'GET',
              url: props.url,
            })
            .then(res => {
                setDetail(res.data);
                setPicture(res.data.sprites.front_default);
                setLoading(false);
            })
            .catch(error => console.log(error.message))
          }
        fetchData();
    }, [props.url])

    return (
            <>
                {
                    !Loading ? (
                        <>
                            <div className="bg-red-500 content-center items-center flex flex-col space-y-3 pb-5">
                                <div className="bg-green-100 rounded-full w-28">
                                    <img className="w-full" src={Picture} alt="character"/>
                                </div>
                                <div className="rounded-full bg-yellow-300 py-0.5 px-3">
                                    <p className="text-xs font-md font-mono">
                                        #0{Detail.id}
                                    </p>
                                </div>
                                <p className="text-3xl font-semibold font-mono tracking-widest">
                                    {Detail.name.charAt(0).toUpperCase() + Detail.name.slice(1)}
                                </p>
                                <p className="text-xs font-semibold font-mono tracking-widest">
                                    Type : {Detail.types[0].type.name.charAt(0).toUpperCase() + Detail.types[0].type.name.slice(1)}
                                </p>
                                <div className={`${Loading && 'animate-pulse'} bg-white rounded-full py-2 px-6 flex flex-row space-x-6`}>
                                    <button 
                                    className="bg-green-100 rounded-full w-14 focus:bg-green-200 focus:outline-none"
                                    onClick={() => setPicture(Detail.sprites.front_default)}
                                    >
                                        <img className="w-full" src={Detail.sprites.front_default} alt="character"/>
                                    </button>
                                    <button 
                                    className="bg-green-100 rounded-full w-14 focus:bg-green-200 focus:outline-none"
                                    onClick={() => setPicture(Detail.sprites.back_default)}
                                    >
                                        <img className="w-full" src={Detail.sprites.back_default} alt="character"/>
                                    </button>
                                    <button 
                                    className="bg-green-100 rounded-full w-14 focus:bg-green-200 focus:outline-none"
                                    onClick={() => setPicture(Detail.sprites.front_shiny)}
                                    >
                                        <img className="w-full" src={Detail.sprites.front_shiny} alt="character"/>
                                    </button>
                                    <button 
                                    className="bg-green-100 rounded-full w-14 focus:bg-green-200 focus:outline-none"
                                    onClick={() => setPicture(Detail.sprites.back_shiny)}
                                    >
                                        <img className="w-full" src={Detail.sprites.back_shiny} alt="character"/>
                                    </button>
                                </div>
                            </div>
                            <div className="overflow-y-auto">
                                <div className="p-5 flex flex-row space-x-10 content-center items-center">
                                    <p className="text-md font-mono font-bold text-red-500">
                                        Base Hp <span className="text-gray-600 text-sm">{Detail.base_experience}</span>
                                    </p>
                                    <p className="text-md font-mono font-bold text-red-500">
                                        Weight <span className="text-gray-600 text-sm">{Detail.weight}</span>
                                    </p>
                                    <p className="text-md font-mono font-bold text-red-500">
                                        Height <span className="text-gray-600 text-sm">{Detail.height}</span>
                                    </p>
                                </div>
                                <div className="px-5 space-y-2 mb-5">
                                    <h5 className="text-md font-bold font-mono text-red-500">
                                        Stats
                                    </h5>
                                    <div>
                                        {
                                            Detail.stats.map((item: any, index: any) => {
                                                return (
                                                    <p key={index} className="text-sm font-bold font-mono text-gray-600">
                                                        {item.stat.name.charAt(0).toUpperCase() + item.stat.name.slice(1)} 
                                                        <span><Progress width={item.base_stat} /></span> 
                                                    </p>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                <div className="flex flex-row space-x-28">
                                    <div className="px-5 space-y-2">
                                        <h5 className="text-md font-bold font-mono text-red-500">
                                            Moves
                                        </h5>
                                        <div>
                                            {
                                                Detail.moves.map((item: any, index: number) => {
                                                    return (
                                                        <p key={index} className="texl-sm font-mono text-gray-600">
                                                            {item.move.name} 
                                                        </p>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                    <div className="px-5 space-y-2">
                                        <h5 className="text-md font-bold font-mono text-red-500">
                                            Abilities
                                        </h5>
                                        <div>
                                            {
                                                Detail.abilities.map((item: any, index: number) => {
                                                    return (
                                                        <p key={index} className="texl-sm font-mono text-gray-600">
                                                            {item.ability.name} 
                                                        </p>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="py-28 bg-red-500">
                            <LoadingIcon size={20} />
                        </div>
                    )
                }
            </>
    )
}
