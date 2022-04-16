import React from "react";
import character from '../Images/ch.png'

// Icons
import { AiFillHeart, AiFillStar } from 'react-icons/ai'
import { IoFastFoodOutline } from 'react-icons/io5'
import { FaDrumstickBite } from 'react-icons/fa'

// Redux
import { useSelector } from 'react-redux'

export default function CharacterStats() {


    const name = useSelector(state => state.name)


    return (
        <div className="flex items-center justify-center gap-4 w-5/6 h-2/5 border-4 bg-gray-300 border-gray-500">

            <div className="flex flex-col text-center justify-center text-xl overflow-hidden">
                <h2 className=" w-full h-8 mb-0 px-2">{name}</h2>
                <img className="w-44
            " src={character} alt="" />
            </div>
            <div className="flex  justify-around items-top flex-col w-1/2  border-gray-500  h-3/5">

                {/* CHARACTER HEALTH */}
                <div className="flex items-center justify-around w-full h-10 px-2 ">
                    <span className="text-3xl text-red-600"><AiFillHeart /></span>
                    <div className="flex justify-center  items-center w-5/6 h-1/2">

                        {/* HEALTH BAR */}
                        <div className="w-5/6 h-full rounded-md border-2 bg-red-600 border-black">

                        </div>

                    </div>
                    {/* PERCENTAGE */}
                    <span className="w-12 text-center">50/50</span>
                </div>

                <div className="flex items-center justify-around w-full h-10 px-2 ">
                    <span className="text-3xl text-red-600"><IoFastFoodOutline /></span>
                    <div className="flex justify-center  items-center w-5/6 h-1/2">
                        <div className="w-5/6 h-full rounded-md border-2 bg-yellow-600 border-black">

                        </div>

                    </div>
                    <span className="w-12 text-center">50/50</span>

                </div>


                <div className="flex items-center justify-around w-full h-10 px-2 ">
                    <span className="text-3xl text-yellow-600"><AiFillStar /></span>
                    <div className="flex justify-center  items-center w-5/6 h-1/2">
                        <div className="w-5/6 h-full rounded-md bg-yellow-300 border-2 border-black">

                        </div>

                    </div>
                    <span className="w-12 text-center">50/50</span>

                </div>

            </div>
        </div>
    )
}
