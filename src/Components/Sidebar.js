import React, { useState } from "react";
import { GrHomeRounded } from 'react-icons/gr'
import { BsCalendarCheck, BsShop, BsCoin, BsArrowReturnRight, BsArrowReturnLeft } from 'react-icons/bs'
import { GoPackage } from 'react-icons/go'
import Overlay from "./Overlay";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Sidebar() {


    const profilePic = useSelector(state => state.profilePic)

    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()

    const coins = useSelector(state => state.coins)

    const icons = [
        {
            icon: < GrHomeRounded />,
            navigate: '/',
            id: 1,
        },

        {
            icon: <BsShop />,
            navigate: '/shop',
            id: 2,
        },
        {
            icon: <GoPackage />,
            navigate: '/',
            id: 3,
        },
    ]

    const tags = [
        'Home',
        'Shop',
        'Inventory'
    ]


    return (
        <>
            <nav className={`hidden md:flex flex-col duration-200 ease-in-out rounded-md  z-30  items-left px-2 justify-around text-3xl h-full bg-white fixed left-0 top-0 ${isOpen ? 'w-48' : 'w-16'}`}>
                <button
                    className="px-2"
                    onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <BsArrowReturnLeft /> : <BsArrowReturnRight />}
                </button>
                <div className=" w-1/2 h-3/5 relative flex gap-8">
                    <div className="relative h-3/5 w-8  flex items-right px-2 justify-around flex-col  py-2 border-black">
                        {icons.map((singleIcon) => {
                            return (<button key={singleIcon.id} onClick={() => {
                                setIsOpen(false)
                                navigate(`${singleIcon.navigate}`, { replace: true })
                                navigate(0)
                            }}>
                                <h2 >
                                    {singleIcon.icon}
                                </h2>
                            </button>
                            )

                        })}


                    </div>
                    <div className={`flex h-16 left-1 absolute bottom-5 ${isOpen ? 'w-36 flex-row justify-start gap-3 pl-2 items-center duration-200 ' : 'justify-center items-center flex-col w-10'}`}>
                        <span className=""><BsCoin /></span>
                        <p className="text-lg">{coins}$</p>
                    </div>

                    <div className={`flex h-10 w-10 left-1 absolute -bottom-12 justify-center items-center ${isOpen ? 'left-2' : 'left-1'}`}>
                        <img className="w-full h-full rounded-full" src={profilePic} alt="Pic" />
                    </div>

                    {isOpen ?
                        <div className="w-full text-xl  h-3/5 flex items-right justify-around py-2.5 flex-col">
                            {tags.map((tag) => {
                                return <h2 key={tag}>{tag}</h2>
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
                        className="w-screen h-screen  fixed top-0 z-20">
                        <Overlay />
                    </div>


                    : ""
            }
        </>
    )
}
