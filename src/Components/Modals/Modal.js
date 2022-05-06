import React, { useEffect, useState } from "react";
import Overlay from "../Overlay";
// Redux
import { useSelector, useDispatch } from 'react-redux'
import { CLOSE_MODAL, OPEN_MODAL, CHANGE_NAME, OPEN_CUSTOMIZE_CHARACTER } from "../../Redux/actions";
import Login from "../../Auth/Login";

const Modal = () => {


    // Redux
    const modal = useSelector(state => state.modal)
    const [name, setName] = useState(useSelector(state => state.name))
    const state = useSelector(state => state)
    const dispatch = useDispatch()

    const [nameValue, setNameValue] = useState('')
    const [errorMsg, setErrorMsg] = useState(false)
    const [isSubmiting, setIsSubmiting] = useState(false)

    const handleSubmit = (e) => {
        setIsSubmiting(true)
        e.preventDefault()
        if (!nameValue) {
            setErrorMsg(true)
            dispatch({ type: OPEN_MODAL })
        }
        else {
            dispatch({ type: OPEN_CUSTOMIZE_CHARACTER })
            dispatch({ type: CLOSE_MODAL })
            dispatch({ type: CHANGE_NAME, payload: nameValue })

        }
        console.log('submited')
    }

    useEffect(() => {
        let timeout = setInterval(() => {
            setErrorMsg(false)
        }, 2000);
        return () => clearTimeout(timeout)
    }, [nameValue])

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className={`flex flex-col justify-around items-center fixed top-5 left-auto w-2/3 h-2/3  z-50 bg-slate-100 border-2 border-black ${errorMsg ? ' border-red-800 ' : ''} `}>
                <div className="flex flex-col gap-4 text-center">
                    <h1 className="w-72 text-xl ">Welcome to Husterious,mysterious traveler! State your name.</h1>
                    <p className="w-64 text-gray-600 text-sm">Name can be changed later in the settings menu.</p>

                </div>
                <div className="flex flex-col justify-center items-center gap-1">
                    <div className="h-10">
                        {errorMsg ?
                            <p className="text-lg text-red-600">Name is empty</p>
                            : ''}

                    </div>
                    {/* <input
                        value={nameValue}
                        onChange={(e) => setNameValue(e.target.value)}
                        type="text"
                        className={`bg-purple-800 w-48 h-10 rounded-md outline-none p-4 text-white text-lg ${errorMsg ? 'border-red-700 border-2' : ''} `} /> */}
                    <Login />
                </div>
            </form>
            <div className="fixed w-screen h-screen bg-blue-600 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40">

            </div>
            {/* <Overlay /> */}

        </>

    )
}




export default (Modal)