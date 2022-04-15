import React, { useState } from "react";
import { GrHomeRounded } from 'react-icons/gr'
import { BsCalendarCheck, BsShop, BsCoin, BsArrowReturnRight, BsArrowReturnLeft } from 'react-icons/bs'
import { GoPackage } from 'react-icons/go'
export default function Sidebar() {

    const [isOpen, setIsOpen] = useState(false)

    const icons = [
        < GrHomeRounded />,
        <BsCalendarCheck />,
        <BsShop />,
        <GoPackage />,
        // <BsCoin/>,
    ]

    const tags = [
        'Home',
        'Calendar',
        'Shop',
        'Inventory'
    ]

    return (
        <>
            <nav className={`flex flex-col duration-200 ease-in-out rounded-md  z-10  items-left px-2 justify-around text-3xl h-full bg-white absolute left-0 top-0 ${isOpen ? 'w-48' : 'w-16'}`}>
                <button
                    className="px-2"
                    onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <BsArrowReturnLeft /> : <BsArrowReturnRight />}
                </button>
                <div className=" w-1/2 h-4/5  flex gap-8">
                    <div className="relative h-3/5 w-8  flex items-right px-2 justify-between flex-col  py-2 border-black">
                        {icons.map((singleIcon) => {
                            return (<button>{singleIcon}</button>
                            )

                        })}
                    </div>
                    {isOpen ?
                        <div className="w-full text-2xl  h-3/5 flex items-right justify-between p-2 flex-col">
                            {tags.map((tag) => {
                                return <h2>{tag}</h2>
                            })}
                        </div>

                        : ''}

                </div>
                {/* <div className="h-2/5 w-full border-b-4 border-t-4 shadow-sm shadow-black rounded-lg border-black">
            </div> */}

            </nav>
            {isOpen ?
                <div className="absolute w-screen h-screen bg-black opacity-50 ">

                </div>

                : ""}
        </>
    )
}
