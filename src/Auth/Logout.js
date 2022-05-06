import React from "react";
import { GoogleLogout } from "react-google-login";
import { useDispatch } from "react-redux";
import { OPEN_MODAL } from "../Redux/actions";

const clientID = '286571261070-cjkoe7gk3mo32h375e6t43qla80k205u.apps.googleusercontent.com'

export default function Logout() {

    const dispatch = useDispatch()

    const onSuccess = (res) => {
        console.log('Log out successfull!')
        dispatch({ type: OPEN_MODAL })

    }

    return (
        <div id="signOutButton">
            <GoogleLogout
                clientId={clientID}
                buttonText={'Logout'}
                onLogoutSuccess={onSuccess}
            />

        </div>
    )
}
