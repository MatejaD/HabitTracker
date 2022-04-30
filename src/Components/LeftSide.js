import React from "react";
import CharacterStats from "./CharacterStats";

export default function LeftSide() {
    return (
        <div className='h-full w-1/2 flex flex-col justify-around items-center '>
            <CharacterStats />
        </div>
    )
}
