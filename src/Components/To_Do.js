import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ADD_TO_DO, SET_TO_DO_VALUE, REMOVE_TO_DO_ITEM, INCREASE_EXPERIENCE } from "../Redux/actions";
// Icons
import { BsCheck } from 'react-icons/bs'

export default function To_Do() {

    const [inputValue, setInputValue] = useState('')

    const To_Do_List = useSelector(state => state.To_Do_List)
    const To_Do_Input_Value = useSelector(state => state.To_Do_Input_Value)
    const dispatch = useDispatch()




    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("skrpa")
        dispatch({ type: SET_TO_DO_VALUE, payload: inputValue })
        dispatch({ type: ADD_TO_DO, payload: inputValue })
        setInputValue('')
    }


    const doneTo_Do = (id) => {
        dispatch({ type: REMOVE_TO_DO_ITEM, payload: id })
        dispatch({ type: INCREASE_EXPERIENCE })
    }




    return (
        <div className="min-h-screen max-h-full  w-1/4 p-4 bg-white">
            <form onSubmit={handleSubmit} className="flex justify-center mb-4  items-center w-full h-12 border-2 rounded-md border-slate-400 bg-slate-400"
            >
                <input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="w-full h-full outline-none px-2 bg-gray-200"
                    placeholder="Add a To-Do" type="text" />

            </form>
            <div className="flex flex-col gap-6 min-h-screen p-2  w-full  ">
                {/* Text if To-Do list is empty */}
                {!To_Do_List.length &&
                    <div className="flex justify-center items-center w-full h-24 mt-8 ">

                        <h2 className="text-slate-400 text-center text-lg">Your To-Do list is empty.</h2>
                    </div>
                }
                {

                    To_Do_List.map((item) => {
                        return (<div className={`flex justify-between items-center hover:border-black border-2 border-slate-50  relative w-full h-16 shadow-md shadow-gray-500 rounded-md `}>
                            <div className="flex rounded-l-md justify-center items-center h-full w-10 bg-yellow-400">

                                <div
                                    onClick={() => doneTo_Do(item.id)} className="check-container text-2xl text-green-600 w-8 h-8 bg-slate-100  flex justify-center items-center">
                                    <button className="check"><BsCheck /> </button>

                                </div>


                            </div>
                            <div style={{ overflow: 'overflow-wrap' }} className="flex justify-start items-center px-0 h-full w-4/5 overflowwra ">
                                <h2>{item.name}</h2>

                            </div>

                            {/* <button className="absolute top-1 right-2 text-red-600" onClick={() => dispatch({ type: REMOVE_TO_DO_ITEM, payload: item.id })}>X</button> */}
                        </div>)
                    })
                }
            </div>
        </div>
    )
}
