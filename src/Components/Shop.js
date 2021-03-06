import React, { useEffect, useState } from "react";
// Images
import shield2 from '../Images/shield2.png'
import warriorHelmet from '../Images/helmetUpdate2.png'
import greenHelmet from '../Images/greenHelmet2.png'
// Icons
import { GiBattleGear } from 'react-icons/gi'
import { useDispatch, useSelector } from "react-redux";
import { OPTION_VALUE, SORT_ITEMS } from "../Redux/actions";

export default function Shop() {

    const gear = useSelector(state => state.gear)
    const optionValue = useSelector(state => state.optionValue)

    const dispatch = useDispatch()

    const [posts, setPosts] = useState(gear)
    const [showMore, setShowMore] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(10)
    const [inputValue, setInputValue] = useState(0)


    const options = [
        {
            name: 'A-Z', id: 1
        },
        { name: 'Price', id: 2 },
    ]

    useEffect(() => {
        if (inputValue) {
            dispatch({ type: SORT_ITEMS, list: gear, payload: inputValue })
        }
    }, [inputValue])



    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPost = gear.slice(indexOfFirstPost, indexOfLastPost)

    return (
        <div className="w-11/12 h-4/5 flex flex-col justify-start items-end rounded-md min-h-screen ml-0 md:ml-16 mt-10 border-2 border-black">
            <div className="w-full flex flex-col justify-around items-center rounded-t-md h-60 bg-amber-700">
                <h1 className="flex justify-center items-center font-semibold text-2xl w-48 h-10 text-slate-100 text-opacity-90 bg-yellow-600 text-center rounded-md border-2 border-yellow-300">
                    Featured Items!
                </h1>
                <div className="flex justify-between items-center h-2/3 w-2/5">

                    <div className="flex flex-col justify-between items-center rounded-md border-slate-50 border bg-opacity-40 bg-yellow-400 w-24 h-24 ">
                        <img className="w-3/4" src={warriorHelmet} alt="" />
                        <div className="flex justify-center items-center w-full h-1/5 bg-white">
                            <span className="text-sm">70 Coins</span>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between items-center rounded-md border-slate-50 border bg-opacity-40 bg-yellow-400 w-24 h-24 ">
                        <img className="w-3/4" src={shield2} alt="" />
                        <div className="flex justify-center items-center w-full h-1/5 bg-white">
                            <span className="text-sm">30 Coins</span>
                        </div>
                    </div>

                    <div className="flex flex-col justify-between items-center rounded-md border-slate-50 border bg-opacity-40 bg-yellow-400 w-24 h-24 ">
                        <img className="w-3/4" src={greenHelmet} alt="" />
                        <div className="flex justify-center items-center w-full h-1/5 bg-white">
                            <span className="text-sm">45 Coins</span>
                        </div>
                    </div>
                </div>

            </div>
            <div className={`flex flex-col items-center justify-around pb-2 ease-in  w-full bg-slate-50 ${showMore ? 'h-96' : 'h-64'}`}>

                <div className={`relative flex flex-wrap  items-center gap-4 justify-start pl-10 py-10 w-full ${showMore ? "h-64" : 'h-48'}`}>
                    <span
                        className="absolute flex w-28 justify-center gap-2 items-center top-1 left-1  text-xl">
                        Gear
                        <span className="text-3xl">
                            <GiBattleGear />
                        </span>
                    </span>


                    {/* <form className="absolute top-2 left-36 w-24" >
                        <select value={inputValue} onChange={(e) => setInputValue(e.target.value)}
                            className="w-full ">
                            <option hidden> skrpa</option>
                            {options.map((option) => {
                                return (

                                    <option key={option.id} value={option.id}>{option.name}</option>
                                )
                            })}
                        </select>
                    </form> */}

                    {currentPost.map((item) => {
                        return (
                            <div className="flex flex-col items-center mb-3 mt-2 justify-between w-24 h-24 bg-black rounded-md bg-opacity-80">
                                {/* <h3>{item.name}</h3> */}
                                <img src={shield2} alt="" />
                                <div className="flex justify-center items-center w-full h-6 bg-gray-500 rounded-b-md">
                                    <h4> {item.price} $</h4>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <button
                    onClick={() => {
                        setShowMore(!showMore)
                        { showMore ? setPostsPerPage(11) : setPostsPerPage(15) }
                    }}
                    className="w-1/3 h-10 border-2 border-black text-2xl rounded-md">
                    {showMore ? 'Show Less' : 'Show More'}
                </button>

            </div>
            <div className="w-full h-64 bg-slate-50"></div>
        </div>
    )
}
