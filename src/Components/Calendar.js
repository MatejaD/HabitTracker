import React, { useState } from "react";
import { AiOutlineDoubleRight, AiOutlineDoubleLeft, AiOutlinePlusCircle } from 'react-icons/ai'
import moment from 'moment'







export default function Calendar() {

    const [months, setMonths] = useState(moment.months())
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(1)
    const [week, setWeek] = useState(moment.weekdays())

    let month = [...
        week, ...week, ...week, ...week, ...week
    ]

    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentMonth = months.slice(indexOfFirstPost, indexOfLastPost)

    let number = 0



    console.log(month)

    return (
        <article className='w-11/12 ml-12  items-center border-2 border-black min-h-screen h-screen  h-full p-4 '>
            <h2 >{currentMonth}</h2>
            <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
            <div className="w-full h-full min-h-screen grid grid-cols-7">
                {month.map((day) => {
                    return (
                        <div className=" w-48 h-48 border-2 border-black">
                            <h2>{day}</h2>
                        </div>
                    )
                })}

            </div>
        </article >
    )
}
