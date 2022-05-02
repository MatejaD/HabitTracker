import React from "react";
import DisplayHabits from "../DisplayHabits";
import LeftSide from "./LeftSide";

export default function MainPage() {
    return (
        <article className='w-full bg-blue-500 -z-30   flex flex-col justify-center gap-4 items-center min-h-screen p-4  '>
            <LeftSide />
            <DisplayHabits />
        </article>
    )
}
