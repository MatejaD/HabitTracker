import React from "react";

export default function Loading() {
    return <div className="fixed top-0 right-0 flex  gap-2 justify-center items-center z-50  w-screen h-screen bg-blue-500">


        <h2 className="text-6xl font-bold font-body">Loading</h2>

        <div className="w-36 h-16 flex justify-center gap-4 items-end">

            <div
                className="bg-white p-2  w-8 h-8 rounded-full animate-bounce first-circle"
            ></div>
            <div
                className="bg-white p-2 w-8 h-8 rounded-full animate-bounce second-circle"
            ></div>
            <div
                className="bg-white p-2   w-8 h-8 rounded-full animate-bounce third-circle"
            ></div>

        </div>
    </div>;
}
