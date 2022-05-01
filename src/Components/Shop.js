import React from "react";

export default function Shop() {
    return (
        <div className="w-11/12 h-4/5 flex flex-col justify-start items-end min-h-screen mx-auto mt-10 border-2 border-black">
            <div className="w-full flex flex-col justify-around items-center h-60 bg-amber-700">
                <h1 className="flex justify-center items-center font-semibold text-2xl w-48 h-10 text-slate-100 text-opacity-90 bg-yellow-600 text-center rounded-md border-2 border-yellow-300">
                    Featured Items!
                </h1>
                <div className="flex justify-between items-center h-2/3 w-2/5">
                    <div className="w-36 h-36 bg-black">

                    </div>

                    <div className="w-36 h-36 bg-black">

                    </div>

                    <div className="w-36 h-36 bg-black">

                    </div>
                </div>

            </div>
            <div className="h-60 w-full bg-slate-50">

            </div>
        </div>
    )
}
