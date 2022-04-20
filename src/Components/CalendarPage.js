import React, { useEffect, useState } from "react";
import { AiOutlineDoubleRight, AiOutlineDoubleLeft, AiOutlinePlusCircle } from 'react-icons/ai'
import Calendar from 'react-calendar'





export default function CalendarPage() {



    const [clickedDate, setClickedDate] = useState('')

    const [month, setMonth] = useState()
    const [year, setYear] = useState()

    return (
        <article className='w-11/12 ml-12 justify-center flex relative   items-center  min-h-screen h-screen    p-4 '>


            <Calendar className={`w-1/2  h-20  grid   absolute top-0  `}
                tileClassName={`bg-slate-200 border-2 border-black h-12 w-full `}
                minDetail='decade'
                view="month"
                prev2Label=''
                next2Label=''
                prevLabel={<span className="text-blue-700">
                    <AiOutlineDoubleLeft />
                </span>}
                nextLabel={<span className="text-blue-700">
                    <AiOutlineDoubleRight />
                </span>}
                locale="en"
                onClickDay={(value) => {
                    // setClickedDate(value)
                    setClickedDate((value.getDate()))
                    setMonth(value.getMonth() + 1)
                    setYear(value.getFullYear())
                    //

                }}
            />

            <h2>{clickedDate ? `${clickedDate}/${month}/${year}` : ''}</h2>

        </article >

    )
}





