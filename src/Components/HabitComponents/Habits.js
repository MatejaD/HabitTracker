import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SET_TO_DO_VALUE, COMPLETE_ITEM, INCREASE_EXPERIENCE, INCREASE_COINS, ADD_TO_LIST, REMOVE_FROM_LIST, OPEN_SETTINGS, INCREASE_COUNTER, SHOW_NOTIFICATION, DECREASE_COUNTER, DECREASE_HEALTH, CHECK_OUT_DAILY_TASK, DECREASE_EXPERIENCE, DECREASE_COINS, TO_BOTTOM, CLOSE_SETTINGS, SHOW_SETTINGS_ICON, SET_EDIT_TASK, EDIT_NAME } from "../../Redux/actions";
// Icons
import { BsCheck, BsPen, BsFillTrashFill, BsSkipForwardBtn } from 'react-icons/bs'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai'
import { FaPlus, FaMinus } from 'react-icons/fa'
import Overlay from "../Overlay";


export default function Habits({ taskList, taskName, addItem, characterStat, placeHolder }) {

    const [inputValue, setInputValue] = useState('')
    const [editValue, setEditValue] = useState('')
    const [showSettings, setShowSettings] = useState(false)
    // NEEDS FIXING ====>
    const isCheckedOut = useSelector(state => state.Daily_Task_List.isCheckedOut)

    // Daily Task 
    // const experience = useSelector(state => state.characterStat.experience)
    const To_Do_List = useSelector(state => state.To_Do_List)
    const Habit_List = useSelector(state => state.Habit_List)
    const Daily_Task_List = useSelector(state => state.Daily_Task_List)
    // const state = useSelector(state => state)



    const dispatch = useDispatch()

    const options = [
        { icon: <BsPen />, name: 'Edit', type: SET_EDIT_TASK, },
        { icon: <AiOutlineArrowUp />, name: 'To Top', type: '', },
        { icon: <AiOutlineArrowDown />, name: 'To Bottom', type: TO_BOTTOM, },
        { icon: <BsFillTrashFill className="text-red-600" />, name: 'Delete', type: REMOVE_FROM_LIST, },

    ]


    const handleSubmit = (e) => {
        e.preventDefault()
        if (inputValue) {
            dispatch({ type: SET_TO_DO_VALUE, payload: inputValue, secondPayload: taskList })
            dispatch({ type: ADD_TO_LIST, payload: inputValue, list: taskList, listName: taskName })
        }
        setInputValue('')
    }

    const handleEdit = (id) => (e) => {
        e.preventDefault()
        if (editValue) {
            dispatch({ type: SET_TO_DO_VALUE, payload: editValue, secondPayload: taskList })
            dispatch({ type: EDIT_NAME, payload: id, name: editValue, list: taskList })
            dispatch({ type: SET_EDIT_TASK, list: taskList, payload: id })
        }
        else {
            dispatch({ type: SET_EDIT_TASK, list: taskList, payload: id })
        }
        setEditValue('')
    }


    const doneTo_Do = (id) => {

        dispatch({ type: COMPLETE_ITEM, payload: id, secondPayload: taskList })
        dispatch({ type: INCREASE_EXPERIENCE, payload: 3 })
        dispatch({ type: INCREASE_COINS, payload: 0.4 })
        dispatch({ type: SHOW_NOTIFICATION })
    }

    const checkOutDailyTask = (id, isCheckedOut) => {
        dispatch({ type: CHECK_OUT_DAILY_TASK, payload: id })
        if (!isCheckedOut) {
            dispatch({ type: INCREASE_EXPERIENCE, payload: 5 })
            dispatch({ type: INCREASE_COINS, payload: 2 })
        }
        else {
            dispatch({ type: DECREASE_EXPERIENCE, payload: 5 })
            dispatch({ type: DECREASE_COINS, payload: 2 })
        }
    }

    const increaseHabitAmount = (id) => {
        dispatch({ type: INCREASE_COUNTER, payload: id })
        dispatch({ type: INCREASE_COINS, payload: (parseFloat(Math.random() * 1) + 0.3) })
        dispatch({ type: INCREASE_EXPERIENCE, payload: 3 })
    }

    const decreaseHabitAmount = (id) => {
        dispatch({ type: DECREASE_COUNTER, payload: id })
        dispatch({ type: DECREASE_HEALTH, payload: (Math.floor(Math.random() * 3) + 1) })

    }



    // taskList --- To_Do_List

    // taskList.sort((a, b) => {
    //     return b.id - a.id
    // })


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

                    taskList.map((item, index) => {

                        return (
                            <>

                                {/* {item.isEditing ? <div className="absolute top-0 z-40 w-2/5  h-96 bg-black"></div> : ''} */}
                                <div
                                    onMouseEnter={() =>
                                        dispatch({ type: SHOW_SETTINGS_ICON, payload: item.id, list: taskList })
                                    }
                                    onMouseLeave={() => {
                                        dispatch({ type: CLOSE_SETTINGS, payload: item.id, list: taskList })
                                    }}
                                    // ADD A KEY
                                    className={`flex justify-between items-center transition-all duration-150 ease-linear hover:border-gray-700 hover:border border-slate-50  relative w-96  min-h-16    shadow-md shadow-gray-500 rounded-md ${taskList === To_Do_List ? 'bg-yellow-400' : taskList === Daily_Task_List ? item.isCheckedOut ? "bg-gray-500 opacity-90" : 'bg-blue-700' : ((item.increaseCounter + item.decreaseCounter) === 0) ? 'bg-gray-500' : item.increaseCounter > Math.abs(item.decreaseCounter) ? 'bg-green-600' : 'bg-red-600'}`}>



                                    {/* Settings Icon */}

                                    {item.showSettingsIcon ?
                                        <button
                                            onClick={() => dispatch({ type: OPEN_SETTINGS, payload: item.id, list: taskList })}
                                            className="absolute top-2 right-12 z-20 text-lg cursor-pointer"><HiOutlineDotsVertical /></button>
                                        : ''}

                                    {/* Only show if taskList is a To-Do */}
                                    <div
                                        onClick={() => doneTo_Do(item.id)} className={`check-container text-2xl rounded-sm text-green-600 w-8 h-8 mx-2 bg-slate-100  flex justify-center items-center ${taskList === To_Do_List ? '' : 'hidden'}`}>
                                        <button className="check m-0 p-0"><BsCheck /> </button>
                                    </div>





                                    {/* ------ */}
                                    <div className={`flex absolute right-1 top-8 justify-center items-center text-lg text-white  w-10 h-10 rounded-full ${taskList === Habit_List ? '' : 'hidden'}`}>
                                        <button
                                            onClick={() => decreaseHabitAmount(item.id)}
                                            className={`flex justify-center items-center text-lg text-white w-10 h-10 rounded-full bg-black bg-opacity-30  hover:bg-opacity-60 ${taskList === Habit_List ? '' : 'hidden'}`} >
                                            <FaMinus />
                                        </button>
                                    </div>

                                    {/* If tasklist is Habit or Daily show this => */}
                                    <div className={`h-full w-12 rounded-l-md flex justify-center items-center   ${taskList !== To_Do_List ? '' : 'hidden'} `}>

                                        {/* CHECK OUT DAILY TASK */}

                                        <button
                                            onClick={() => checkOutDailyTask(item.id, item.isCheckedOut)}
                                            className={`check-container text-2xl rounded-sm w-8 h-8 mx-2   flex justify-center items-center ${taskList === Daily_Task_List ? '' : 'hidden'} ${item.isCheckedOut ? 'text-gray-500 bg-slate-100 opacity-70' : 'bg-slate-100 opacity-100'}`}>
                                            {item.isCheckedOut ? <BsCheck /> : ''}
                                        </button>
                                        {/* ----------------------------------------------- */}

                                        {/* Increase Counter btn in Habit-Tracking List */}

                                        <button
                                            onClick={() => increaseHabitAmount(item.id)}
                                            className={`flex justify-center items-center text-lg text-white w-10 h-10 rounded-full bg-black bg-opacity-30  hover:bg-opacity-60 ${taskList === Habit_List ? '' : 'hidden'}`} >
                                            <FaPlus />
                                        </button>

                                        {/* ----------------------------------------------- */}

                                    </div>
                                    <div className="relative text-field   flex  bg-white  justify-center whitespace-normal items-center px-4 min-h-full  w-9/12  ">
                                        <h2 className={`text-field flex  justify-start flex-grow  items-center w-48  my-10 ${taskList === Daily_Task_List ? item.isCheckedOut ? 'text-gray-400' : '' : ''} `}>
                                            {item.isEditing ?
                                                <form onSubmit={handleEdit(item.id)} className="w-full h-full flex justify-start items-center">
                                                    <input
                                                        className="w-full h-full border-2 border-black"
                                                        type='text'
                                                        autoFocus
                                                        // onFocus='true'
                                                        value={editValue}
                                                        onChange={(e) => setEditValue(e.target.value)}
                                                    />
                                                </form>
                                                : item.name}
                                        </h2>
                                        <div className={`absolute flex items-center justify-end gap-3 text-xs text-gray-500 w-28 px-1 bottom-1 right-3 ${taskList === To_Do_List ? 'hidden' : ''}`}>
                                            <p className="text-xl text-gray-500"><BsSkipForwardBtn /></p>
                                            <span className={` ${taskList === Daily_Task_List ? '' : 'hidden'}`}>{item.DailyCounter}</span>
                                            <div className={`text-sm ${taskList === Habit_List ? '' : 'hidden'} `}>
                                                <span>{item.increaseCounter}+</span>
                                                <span>/</span>
                                                <span>{item.decreaseCounter}</span>
                                            </div>
                                        </div>
                                        {item.settings ?
                                            <div className="flex flex-col justify-start items-center rounded-md py-2 px-2 absolute w-36 h-32 border-2 bg-zinc-100 border-black right-2.5 top-5 z-20  ">

                                                {options.map((option) => {
                                                    const { icon, name } = option
                                                    return (

                                                        <div
                                                            key={name}

                                                            onClick={() => {
                                                                dispatch({ type: option.type, payload: item.id, list: taskList })
                                                                setEditValue('')


                                                            }}
                                                            className="flex cursor-pointer hover:bg-gray-300 duration-150 rounded-sm justify-between z-20 items-center w-full h-full">
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

                                    <div className={` min-h-full h-24    w-12 rounded-r-md  ${taskList !== To_Do_List ? '' : 'hidden'} `}>

                                    </div>


                                    {/* <button className="absolute top-1 right-2 text-red-600" onClick={() => dispatch({ type: REMOVE_TO_DO_ITEM, payload: item.id })}>X</button> */}

                                </div>

                            </>
                        )
                    })
                }
            </div>
        </div>
    )
}
