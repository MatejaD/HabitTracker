import React, { useState } from "react";
import Calendar from "react-calendar/dist/umd/Calendar";
import { useDispatch } from "react-redux";
import { SET_EDIT_TASK } from "../../Redux/actions";
import { BsFillCaretLeftFill, BsFillCaretRightFill } from 'react-icons/bs'


export default function EditingTab({ taskList }) {


    const dispatch = useDispatch()

    const handleEdit = (id, name) => (e) => {
        e.preventDefault()
        dispatch({ type: 'SUBMIT_EDIT', list: taskList, payload: id })
        dispatch({ type: SET_EDIT_TASK, list: taskList, payload: id })
    }

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

                                <div className='w-full h-16 flex  justify-end items-start gap-2'>
                                    <button
                                        type='button'
                                        onClick={() => {
                                            dispatch({ type: 'RESET_EDIT', list: taskList, payload: item.id })
                                        }}
                                        className='w-24 h-10 rounded-md bg-red-500 font-semibold text-slate-100'>Close</button>

                                    <button
                                        className='w-24 h-10 rounded-md bg-blue-600 font-semibold text-slate-100'>Submit</button>

                                </div>
                                <div className='flex flex-col w-full h-16 justify-center items-start'>
                                    <h2>Name</h2>
                                    <input value={item.editName} onChange={(e) =>
                                        dispatch({ type: 'EDIT', payload: e.target.value, list: taskList })
                                    } className='h-10 w-full rounded-md outline-none px-2' type="text" />

                                </div>

                                <div className='flex flex-col justify-center items-start w-full h-16   '>
                                    <h2>Start Date</h2>
                                    <p
                                        onClick={() => setOpenCalendar(!openCalendar)}
                                        className='flex justify-start px-2  items-center w-full h-2/3 bg-white'>
                                        {clickedDate ? `${clickedDate}/${monthsName[getMonth - 1]}/${getYear}` : `${day}/${monthsName[month - 1]}/${year}`}
                                    </p>
                                </div>

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
                                            setClickedDate((value.getDate()))
                                            setGetMonth(value.getMonth() + 1)
                                            setGetYear(value.getFullYear())
                                            setOpenCalendar(false)
                                            //
                                        }}
                                    />

                                    : ""}
                            </form>
                        </div>)
                }
            })}
        </>

    )
}
