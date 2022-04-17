import React from "react";
import Rewards from "./Rewards";
import CharacterStats from "./CharacterStats";

export default function LeftSide() {
    return (
        <div className='h-full w-1/2 '>
            <CharacterStats />

            <Rewards />

        </div>
    )
}
