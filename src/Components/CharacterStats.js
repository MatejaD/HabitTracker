import React, { useState } from "react";
import character from '../Images/ch.png'

// Icons
import { AiFillHeart, AiFillStar } from 'react-icons/ai'
import { IoFastFoodOutline } from 'react-icons/io5'
import { FaDrumstickBite } from 'react-icons/fa'

// Redux
import { useSelector } from 'react-redux'

export default function CharacterStats() {



    const returnPercentage = (value, maxValue) => {
        return (value / maxValue) * 100
    }

    const name = useSelector(state => state.name)
    const health = useSelector(state => state.characterStats[0].health)
    const maxHealth = useSelector(state => state.characterStats[0].maxHealth)

    const hunger = useSelector(state => state.characterStats[1].hunger)
    const maxHunger = useSelector(state => state.characterStats[1].maxHunger)

    const experience = useSelector(state => state.characterStats[2].experience)
    const maxExperience = useSelector(state => state.characterStats[2].maxExperience)



    return (
        <div className="flex  items-center justify-center gap-4 w-5/6 h-2/5 border-4 bg-gray-300 border-gray-500">

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
                        <div className="relative flex  justify-start items-center w-5/6 h-full rounded-md bg-slate-500">
                            <div style={{ width: `${returnPercentage(health, maxHealth)}%` }} className={` h-full p-2  border-red-700 rounded-md bg-red-700`}>

                            </div>
                        </div>


                    </div>
                    {/* PERCENTAGE */}
                    <div className="w-12 " >
                        <span className="w-12 text-center">{health}</span>
                        <span className="w-12 text-center">/</span>

                        <span className="w-12 text-center">{maxHealth}</span>

                    </div>
                </div>

                <div className="flex items-center justify-around w-full h-10 px-2 ">
                    <span className="text-3xl text-red-600"><IoFastFoodOutline /></span>
                    <div className="flex justify-center  items-center w-5/6 h-1/2">
                        {/* HUNGER BAR */}
                        <div className="relative flex   justify-start items-center w-5/6 h-full rounded-md bg-slate-500">
                            <div style={{ width: `${returnPercentage(hunger, maxHunger)}%` }} className={` h-full  rounded-md bg-orange-500`}>

                            </div>
                        </div>

                    </div>

                    {/* PERCENTAGE */}
                    <div className="w-12 " >
                        <span className="w-12 text-center">{hunger}</span>
                        <span className="w-12 text-center">/</span>

                        <span className="w-12 text-center">{maxHunger}</span>

                    </div>

                </div>


                <div className="flex items-center justify-around w-full h-10 px-2 ">
                    <span className="text-3xl text-yellow-400"><AiFillStar /></span>
                    <div className="flex justify-center  items-center w-5/6 h-1/2">
                        <div className="relative flex   justify-start items-center w-5/6 h-full rounded-md bg-slate-500">
                            <div style={{ width: `${returnPercentage(experience, maxExperience)}%` }} className={` h-full  rounded-md bg-yellow-500`}>

                            </div>
                        </div>

                    </div>
                    <div className="w-12 " >
                        <span className="w-12 text-center">{experience}</span>
                        <span className="w-12 text-center">/</span>

                        <span className="w-12 text-center">{maxExperience}</span>

                    </div>

                </div>

            </div>
        </div>
    )
}
