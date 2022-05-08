import React from "react";
import { GoogleLogin } from 'react-google-login'
import { useDispatch } from "react-redux";
import { ADD_LOADING_SCREEN, CLOSE_MODAL, REMOVE_LOADING_SCREEN, SET_NAME, SET_PROFILE_PIC } from "../Redux/actions";


const clientID = '286571261070-cjkoe7gk3mo32h375e6t43qla80k205u.apps.googleusercontent.com'

export default function Login() {

    const dispatch = useDispatch()

    const onSuccess = (res) => {
        
        console.log('LOGIN SUCCESS! Current user: ', res.profileObj)
        dispatch({type:ADD_LOADING_SCREEN})
        dispatch({ type: SET_NAME, payload: res.profileObj.givenName })
        dispatch({ type: CLOSE_MODAL })
        dispatch({ type: SET_PROFILE_PIC, payload: res.profileObj.imageUrl })
        dispatch({ type: REMOVE_LOADING_SCREEN })

    }

    const onFailure = (res) => {
        console.log('LOGIN FAILED! res:', res)
    }


    return (
        <div id="signInButton">
            <GoogleLogin
                clientId={clientID}
                buttonText='Login'
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />

        </div>
    )
}
