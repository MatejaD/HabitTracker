import React from "react";
import { CLOSE_NO_HEALTH_MODAL } from "../../Redux/actions";
import Overlay from "../Overlay";
import character from '../../Images/ch.png'
import { useDispatch } from "react-redux";

export default function NoHealthModal() {


    const dispatch = useDispatch()

    return (
        <>
            <div
                className="flex flex-col justify-center gap-2 py-2  items-center fixed  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  z-40  rounded-md top-25 right-25 w-1/4 h-4/5 bg-white border-2 border-black">

                <div className="flex flex-col  justify-around z-40 items-center h-1/4 w-full">
                    <h2 className=" w-56  text-center h-10 mb-0 text-xl">You died...</h2>
                    <img className="w-44
            " src={character} alt="" />
                </div>
                <div className="w-full h-2/5 px-2 flex justify-evenly items-center gap-2   flex-col">
                    <h2 className="text-center text-lg font-bold">Don't give up, keep up with your habits!</h2>
                    <p className=" text-center text-red-700  font-semibold">You lost a level and some coins, but you can get them back with hard work! Good luck!</p>

                </div>
                <div className="w-full h-1/5 flex flex-col gap-2 justify-center items-center">

                    <button
                        onClick={() => dispatch({ type: CLOSE_NO_HEALTH_MODAL })}
                        className="border-2 border-red-700 rounded-md w-10/12 bg-red-500 text-lg h-8 font-semibold">Heal and continue your journey </button>
                    <p className="text-center flex justify-center items-center  gap-1 text-sm">Does this keep happening often?
                        <span className="text-sm text-blue-800 font-bold">
                            This might help.
                        </span></p>
                </div>

            </div>
            <Overlay />
        </>

    )
}
