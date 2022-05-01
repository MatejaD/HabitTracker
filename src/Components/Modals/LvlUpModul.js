import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Overlay from "../Overlay";
import character from '../../Images/ch.png'
import { CLOSE_LVL_MODAL } from "../../Redux/actions";


export default function LvlUpModul() {

    const name = useSelector(state => state.name)
    const level = useSelector(state => state.characterStats[3].level)

    const dispatch = useDispatch()

    return (<>
        <div
            className="flex flex-col justify-evenly py-2 items-center fixed z-40  rounded-sm top-15 right-25 w-1/4 h-4/5 bg-white border-2 border-black">

            <div className="flex flex-col justify-around z-40 items-center h-1/2 w-full">
                <h2 className=" w-56  text-center h-10 mb-0 text-xl">You just leveled up! You're lvl {level} now.</h2>
                <img className="w-44
            " src={character} alt="" />
            </div>

            <p className="w-56 text-center">Congrats, You're healed!</p>
            <button
                onClick={() => dispatch({ type: CLOSE_LVL_MODAL })}
                className="border-2 border-green-700 bg-slate-200 rounded-md w-24 h-8">Close</button>
        </div>


        <Overlay />
    </>

    );
}
