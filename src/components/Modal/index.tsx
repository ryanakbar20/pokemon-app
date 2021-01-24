import {useState, useEffect} from 'react';

interface ButtonProps {
    visible: boolean,
    children: any,
    onClose: () => void
}

export default function Modal(props: ButtonProps) {
    const [Visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(props.visible);
    }, [props.visible]);

    return (
        <>
            {
                Visible 
                ? (
                    <>
                        <div className="max-w-md md:max-w-xl rounded-xl shadow-xl flex flex-col fixed z-50 inset-0 bg-white overflow-x-hidden overflow-y-auto m-auto h-4/5">
                            <div className="bg-red-500 flex flex-col">
                                <div className="text-right py-2 pr-2">
                                    <button 
                                        className="text-white text-xl font-extrabold hover:bg-white hover:text-red-400 rounded-full w-7 focus:outline-none"
                                        onClick={props.onClose}
                                    >
                                        X
                                    </button>
                                </div>
                            </div>
                                {props.children}
                        </div>
                    </>
                )
                : null
            }
        </>
    )
}
