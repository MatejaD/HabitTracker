import React from "react";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";

export default function MainPage() {
    return (
        <article className='w-full bg-blue-500   flex flex-col justify-center gap-4 items-center min-h-screen p-4  '>
            <LeftSide />
            <RightSide />
        </article>
    )
}
