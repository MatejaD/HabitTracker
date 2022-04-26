import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SET_TO_DO_VALUE, COMPLETE_ITEM, INCREASE_EXPERIENCE, INCREASE_COINS, ADD_TO_LIST, REMOVE_FROM_LIST, OPEN_SETTINGS } from "../../Redux/actions";
// Icons
import { BsCheck, BsPen, BsFillTrashFill } from 'react-icons/bs'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai'


export default function Habits({ taskList, taskName, addItem, characterStat, placeHolder }) {

    const [inputValue, setInputValue] = useState('')
    const [showSettings, setShowSettings] = useState(false)
    const [skrpa, setSkrpa] = useState(false)

    // const experience = useSelector(state => state.characterStat.experience)
    const To_Do_List = useSelector(state => state.To_Do_List)
    const Habit_List = useSelector(state => state.Habit_List)
    const Daily_Task_List = useSelector(state => state.Daily_Task_List)
    // const state = useSelector(state => state)

    const dispatch = useDispatch()

    const options = [
        { icon: <BsPen />, name: 'Edit', type: '', },
        { icon: <AiOutlineArrowUp />, name: 'To Top', type: '', },
        { icon: <AiOutlineArrowDown />, name: 'To Bottom', type: '', },
        { icon: <BsFillTrashFill className="text-red-600" />, name: 'Delete', type: REMOVE_FROM_LIST, },

    ]


    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch({ type: SET_TO_DO_VALUE, payload: inputValue, secondPayload: taskList })
        dispatch({ type: ADD_TO_LIST, payload: inputValue, list: taskList, listName: taskName })
        setInputValue('')
    }


    const doneTo_Do = (id) => {

        dispatch({ type: COMPLETE_ITEM, payload: id, secondPayload: taskList })
        dispatch({ type: INCREASE_EXPERIENCE, payload: 3 })
        dispatch({ type: INCREASE_COINS, payload: 0.4 })

    }


    // taskList --- To_Do_List


    return (
        <div className="min-h-screen max-h-full w-full p-4 bg-white rounded-md">
            <form onSubmit={handleSubmit} className="flex justify-center mb-4  items-center w-full h-12 border-2 rounded-md border-slate-400 bg-slate-400"
            >
                <input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="w-full h-full outline-none px-2 bg-gray-200"
                    placeholder={placeHolder} type="text" />

            </form>
            <div className="flex flex-col gap-6 min-h-screen p-2  w-full   ">
                {/* Text if To-Do list is empty */}
                {!taskList.length &&
                    <div className="flex justify-center items-center w-full h-24 mt-8 ">

                        <h2 className="text-slate-400 text-center text-lg ">Your {taskName} list is empty.</h2>
                    </div>
                }
                {

                    taskList.map((item) => {
                        return (<div
                            onMouseEnter={() => setShowSettings(true)}
                            onMouseLeave={() => setShowSettings(false)}
                            key={item.id}
                            className={`flex justify-between items-center transition-all duration-150 ease-linear hover:border-gray-700 hover:border border-slate-50  relative w-96  min-h-16    shadow-md shadow-gray-500 rounded-md ${taskList === To_Do_List ? 'bg-yellow-400 ' : 'bg-gray-500'} `}>

                            {/* Settings Icon */}
                            {showSettings ?
                                <button
                                    onClick={() => dispatch({ type: OPEN_SETTINGS, payload: item.id, list: taskList })}
                                    className="absolute top-2 right-12 cursor-pointer"><HiOutlineDotsVertical /></button>
                                : ''}

                            {/* Only show if taskList is a To-Do */}
                            <div
                                onClick={() => doneTo_Do(item.id)} className={`check-container text-2xl rounded-sm text-green-600 w-8 h-8 mx-2 bg-slate-100  flex justify-center items-center ${taskList === To_Do_List ? '' : 'hidden'}`}>
                                <button className="check m-0 p-0"><BsCheck /> </button>
                            </div>




                            {/* ------ */}

                            {/* Show if taskList is Habit or Daily */}
                            <div className={`h-full w-12 rounded-l-md bg-gray-500   ${taskList !== To_Do_List ? '' : 'hidden'}`}>

                            </div>
                            <div className="text-field   flex  bg-white  justify-center whitespace-normal items-center px-4 min-h-full  w-9/12  ">
                                <h2 className="text-field flex  justify-start flex-grow  items-center w-48  my-10 ">{item.name}</h2>

                                {item.settings ?
                                    <div className="flex flex-col justify-start items-center rounded-md py-2 px-2 absolute w-36 h-32 border-2 bg-zinc-100 border-black right-14 top-6 z-20  ">

                                        {options.map((option) => {
                                            const { icon, name } = option
                                            return (

                                                <div
                                                    onClick={() => dispatch({ type: option.type, payload: item.id, list: taskList })}
                                                    className="flex cursor-pointer justify-between items-center w-full h-full">
                                                    <span className="text-xl">{icon}</span>
                                                    <h2>{name}</h2>
                                                </div>)
                                        })}
                                    </div>
                                    : ''}
                            </div>
                            {/* Show if taskList is Habit or Daily (Used because of CSS issues) */}

                            <div className={`flex rounded-r-md justify-center items-center h-full w-10 bg-white ${taskList === To_Do_List ? '' : 'hidden'}`}>

                            </div>

                            <div className={`h-full w-12 rounded-r-md bg-gray-500   ${taskList !== To_Do_List ? '' : 'hidden'}`}>

                            </div>

                            {/* <button className="absolute top-1 right-2 text-red-600" onClick={() => dispatch({ type: REMOVE_TO_DO_ITEM, payload: item.id })}>X</button> */}
                        </div>)
                    })
                }
            </div>
        </div>
    )
}
