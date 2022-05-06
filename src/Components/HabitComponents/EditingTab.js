import React, { useState, } from "react";
import Calendar from "react-calendar/dist/umd/Calendar";
import { useDispatch } from "react-redux";
import { EDIT, REMOVE_FROM_LIST, RESET_EDIT, SET_EDIT_TASK, SUBMIT_EDIT, UPDATE_DATE } from "../../Redux/actions";
import { BsFillCaretLeftFill, BsFillCaretRightFill, BsCalendarCheck, BsFillTrashFill } from 'react-icons/bs'


export default function EditingTab({ taskList }) {


    const dispatch = useDispatch()



    // console.log(taskList)

    // calnedar

    const [openCalendar, setOpenCalendar] = useState(false)

    const [clickedDate, setClickedDate] = useState('')

    const [getMonth, setGetMonth] = useState()
    const [getYear, setGetYear] = useState()



    let monthsName = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ]

    const handleEdit = (id, name) => (e) => {
        e.preventDefault()
        dispatch({ type: SUBMIT_EDIT, list: taskList, payload: id })
        dispatch({ type: SET_EDIT_TASK, list: taskList, payload: id })
        // dispatch({ type: 'UPDATE_DATE', list: taskList, payload: id, day: clickedDate, month: getMonth, year: getYear })
    }

    return (
        <>

            {taskList.map((item, index) => {
                if (item.isEditing) {



                    let day = new Date().getDay()
                    let month = new Date().getMonth()
                    let year = new Date().getFullYear()

                    // console.log(day, month, year)
                    // console.log(item)


                    return (
                        <div key={index} className='flex  justify-center items-center gap-4 py-7 fixed bg-opacity-50 top-0 right-0 z-50 w-screen h-screen bg-black '>
                            <form onSubmit={handleEdit(item.id)} className='flex p-4 relative flex-col justify-start gap-5 items-center w-1/3 h-full border-2 border-black bg-slate-200'>

                                {/* FORM BUTTONS */}
                                <div className='w-full h-16 flex  justify-end items-start gap-2'>
                                    <button
                                        type='button'
                                        onClick={() => {
                                            dispatch({ type: RESET_EDIT, list: taskList, payload: item.id })
                                        }}
                                        className='w-24 h-10 rounded-md bg-red-500 font-body  text-slate-100'>Close</button>

                                    <button
                                        className='w-24 h-10 rounded-md bg-blue-600 font-body  text-slate-100'>Submit</button>

                                </div>
                                {/* -------------------------------- */}

                                {/* NAME INPUT */}
                                <div className='flex flex-col w-full h-20 gap-1  justify-center items-start'>
                                    <h2 className="font-body">Name</h2>
                                    <input
                                        autoFocus={true}
                                        value={item.editName}
                                        onChange={(e) =>
                                            dispatch({ type: EDIT, payload: e.target.value, list: taskList })
                                        } className='h-10 w-full rounded-md outline-none px-2' type="text" />
                                </div>
                                {/* -------------------------------- */}

                                {/* DATE INPUT */}
                                <div className='flex flex-col justify-center items-start w-full h-20 gap-1   '>
                                    <h2 className="font-body">Start Date</h2>
                                    <div className="flex items-center justify-start gap-2 h-10 bg-white w-full rounded-md ">
                                        <span className="flex justify-center items-center text-black h-full w-12 rounded-tl-md rounded-bl-md bg-gray-400">
                                            <BsCalendarCheck />
                                        </span>
                                        <p
                                            onClick={() => setOpenCalendar(!openCalendar)}
                                            className='flex justify-start px-2  items-center w-full h-2/3 bg-white'>
                                            {item.day}/{monthsName[item.month]}/{item.year}
                                        </p>
                                    </div>
                                </div>
                                {/* -------------------------------- */}

                                {/* CALENDAR */}
                                {openCalendar ?
                                    <Calendar className={`calendar w-full z-20  h-20 mt-2  grid `}
                                        tileClassName={`bg-slate-200 border-2 border-black h-12 w-full `}
                                        minDetail='decade'
                                        view="month"
                                        prev2Label=''
                                        next2Label=''
                                        prevLabel={
                                            <BsFillCaretLeftFill />
                                        }
                                        nextLabel={
                                            <BsFillCaretRightFill />
                                        }
                                        locale="en"
                                        onClickDay={(value) => {
                                            // setClickedDate(value)
                                            setClickedDate(() => (value.getDate()))
                                            setGetMonth(value.getMonth())
                                            setGetYear(value.getFullYear())

                                            dispatch({
                                                type: UPDATE_DATE,
                                                list: taskList,
                                                payload: item.id,
                                                day: value.getDate(),
                                                month: value.getMonth(),
                                                year: value.getFullYear()
                                            })

                                            setOpenCalendar(false)
                                            //
                                        }}
                                    />

                                    : ""}
                                {/* -------------------------------- */}
                                <div
                                    onClick={() => dispatch({ type: REMOVE_FROM_LIST, payload: item.id, list: taskList })
                                    }
                                    className="flex justify-center  items-center gap-2 w-1/3 h-10 text-red-500 font-body cursor-pointer ">
                                    <p>Delete this task</p>
                                    <span className="text-lg h-full flex justify-center items-center  hover:mb-1.5 duration-200 ease-linear">
                                        <BsFillTrashFill />

                                    </span>
                                </div>
                            </form>
                        </div>)
                }
            })}
        </>

    )
}
