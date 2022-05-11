import React from "react";
import Login from "../Auth/Login";
import { auth, provider } from "../Firebase/firebase";
import { signInWithPopup } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { REMOVE_LOADING_SCREEN } from "../Redux/actions";

export default function Loading() {

    const isLoggedIn = useSelector(state => state.isLoggedIn)
    const dispatch = useDispatch()

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((res) => {
                localStorage.setItem('isLoggedIn', true)
                console.log(res)

            })
    }

    if(localStorage.getItem('isLoggedIn')){
        dispatch({type:REMOVE_LOADING_SCREEN})
    }

    return <div className="fixed top-0 right-0 flex  gap-2 justify-center items-center z-50  w-screen h-screen bg-blue-500">

        <button onClick={signInWithGoogle}>Login</button>

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
