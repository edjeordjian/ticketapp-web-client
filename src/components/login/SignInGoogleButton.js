import React, {useEffect} from 'react'

import {Button} from "@mui/material";

import {useMainContext} from "../../services/contexts/MainContext";

import {auth} from "../../services/helpers/FirebaseService";

import {useNavigate} from "react-router-dom";

import Typography from "@mui/material/Typography";

import {AUTHENTICATION_ERR_LBL, GOOGLE_LOG_IN_ERR_LBL, GOOGLE_LOG_IN_LBL} from "../../constants/LogInConstants";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import SweetAlert2 from 'sweetalert2';

import {signInButtonStyle} from "../../styles/login/SignInButtonStyle";

import {postTo} from "../../services/helpers/RequestHelper";

import {EVENTS_PATH, SIGN_IN_URL} from "../../constants/URLs";


const SignInWithGoogle = (props) => {
    const navigate = useNavigate();

    const {logIn} = useMainContext();

    const handleSignIn = async () => {
        const provider = new GoogleAuthProvider();

        const firebaseResponse = await signInWithPopup(auth, provider)
            .catch(async (err) => {
                console.log(err.toString());

                return err.toString();
            } );

        if (firebaseResponse.user === undefined) {
            SweetAlert2.fire({
                icon: "info",
                title: GOOGLE_LOG_IN_ERR_LBL
            }).then();

            return;
        }

        const idToken = await auth.currentUser.getIdToken();

        const user = firebaseResponse.user;

        const uid = user.providerData[0].uid;

        const requestBody = {
            id:  uid,

            email: user.email,

            idToken: idToken,

            pictureUrl: user.photoURL,

            firstName: user.displayName.substring(0, user.displayName.lastIndexOf(" ")),

            lastName: user.displayName.substring(user.displayName.lastIndexOf(" ")),

            isConsumer: true
        };

        const response = await postTo(`${process.env.REACT_APP_BACKEND_HOST}${SIGN_IN_URL}`,
                                      requestBody);

        if (response.error) {
            SweetAlert2.fire({
                icon: "info",
                title: AUTHENTICATION_ERR_LBL
            }).then();
        } else {
            const userData = {
                id: uid,

                name: user.displayName,

                email: user.email,

                photoURL: user.photoURL
            };

            logIn(userData, idToken);

            navigate(EVENTS_PATH);
        }
    };

    return (
            <Button
                icon='google'
                mode="contained"
                onClick={handleSignIn}
                style={signInButtonStyle}>
                <Typography>{GOOGLE_LOG_IN_LBL}</Typography>
            </Button>
    );
}

export default SignInWithGoogle;
