import React from "react";
import Overlay from "./Overlay";
// Character
import character from '../Images/ch.png'
import shield1 from '../Images/shield.png'
import shield2 from '../Images/shield2.png'
import hat3 from '../Images/hat4.png'

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { CLOSE_CUSTOMIZE_CHARACTER } from "../Redux/actions";

export default function CustomizeCharacter() {


    const customizeCharacter = useSelector(state => state.customizeCharacter)
    const dispatch = useDispatch()
    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className={`flex flex-col justify-top items-center absolute t-5 left-auto w-11/12 h-5/6  z-50 bg-slate-100 border-2 border-black`}>
                <button className="absolute right-8 top-4 w-24 h-8 rounded-md bg-blue-500"
                    onClick={() => dispatch({ type: CLOSE_CUSTOMIZE_CHARACTER })}
                >Confirm</button>
                <div className="relative flex justify-center items-center w-36 h-1/3 ">
                    <img className="w-32" src={character} alt="" />
                    <img className="right-6 top-20 py-2 absolute w-14" src={shield2} alt="" />
                    <img className="absolute w-36 bottom-16 right-1 py-2 pr-1" src={hat3} alt="" />
                </div>
                <div className="flex flex-col justify-between items-center w-11/12 h-3/5 border-2 border-black">
                    <div className="flex justify-around items-center w-full h-1/3 border-2 border-black">
                        <p>shields</p>
                        <p>shields</p>
                        <p>shields</p>

                    </div>

                    <div className="flex justify-center items-center w-full h-2/3 border-2 border-black">
                        <img className="w-48" src={shield2} alt="" />
                        <img className="w-48 mt-2  items-center" src={hat3} alt="" />

                    </div>
                </div>
            </form>
            <div className="w-screen h-screen absolute bg-green-600 z-40">
                <Overlay />

            </div>
        </>
    )
}
