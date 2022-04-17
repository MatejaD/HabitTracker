import React from "react";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";

export default function MainPage() {
    return (
        <article className='w-11/12 ml-12 flex justify-around   h-screen p-4 '>
            <LeftSide />
            <RightSide />

        </article>
    )
}
