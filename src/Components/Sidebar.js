import React, { useState } from "react";
import { GrHomeRounded } from 'react-icons/gr'
import { BsCalendarCheck, BsShop, BsCoin, BsArrowReturnRight, BsArrowReturnLeft } from 'react-icons/bs'
import { GoPackage } from 'react-icons/go'
import Overlay from "./Overlay";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function Sidebar() {

    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()

    const icons = [
        {
            icon: < GrHomeRounded />,
            navigate: '/'



        },
        {
            icon: <BsCalendarCheck />,
            navigate: '/calendar'




        },
        {
            icon: <BsShop />,
            navigate: '/'



        },
        {
            icon: <GoPackage />,
            navigate: '/'




        },
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
            <nav className={`flex flex-col duration-200 ease-in-out rounded-md  z-30  items-left px-2 justify-around text-3xl h-full bg-white fixed left-0 top-0 ${isOpen ? 'w-48' : 'w-16'}`}>
                <button
                    className="px-2"
                    onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <BsArrowReturnLeft /> : <BsArrowReturnRight />}
                </button>
                <div className=" w-1/2 h-4/5  flex gap-8">
                    <div className="relative h-3/5 w-8  flex items-right px-2 justify-between flex-col  py-2 border-black">
                        {icons.map((singleIcon) => {
                            return (<button onClick={() => {
                                setIsOpen(false)
                                navigate(`${singleIcon.navigate}`, { replace: true })
                                navigate(0)
                            }}>
                                <h2>
                                    {singleIcon.icon}
                                </h2>
                            </button>
                            )

                        })}
                    </div>
                    {isOpen ?
                        <div className="w-full text-xl  h-3/5 flex items-right justify-between py-2.5 flex-col">
                            {tags.map((tag) => {
                                return <h2>{tag}</h2>
                            })}
                        </div>

                        : ''}

                </div>
                {/* <div className="h-2/5 w-full border-b-4 border-t-4 shadow-sm shadow-black rounded-lg border-black">
            </div> */}

            </nav>
            {
                isOpen ?
                    <div
                        onClick={() => setIsOpen(false)}
                        className="w-screen h-screen fixed z-20">
                        <Overlay />
                    </div>


                    : ""
            }
        </>
    )
}
