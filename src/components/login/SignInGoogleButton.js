import React, {useEffect} from 'react'

import {Button} from "@mui/material";

import {useNavigate} from "react-router-dom";

import {EVENT_CREATE_PATH} from "../../constants/URLs";

/*

import {useMainContext} from "../../services/contexts/MainContext";

import {BACKEND_HOST} from "../../constants/generalConstants";

import {SIGN_IN_URL} from "../../constants/URLs";

import {postTo} from "../../services/helpers/RequestService";

import {EXPO_ID, ANDROID_ID, WEB_KEY} from "../../constants/dataConstants";

import {GOOGLE_AUTH_ERR_LBL, GOOGLE_LOG_IN_ERR_LBL, GOOGLE_LOG_IN_LBL} from "../../constants/logIn/logInConstants";

import {getFirebaseUserData} from "../../services/helpers/FirebaseService"; */

const buttonStyles = {
    position: "fixed",
    top: "80%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "16px",
    backgroundColor: "white",
    color: "black",
    borderRadius: "4px",
    cursor: "pointer",
    zIndex: 100
};

const SignInWithGoogle = (props) => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate(EVENT_CREATE_PATH);
    }

    /*  const {logIn} = useMainContext();

    const [request, response, promptAsync] = Google.useAuthRequest({
      androidClientId: ANDROID_ID
    });

    let handleSignInWithGoogle = async (googleAuth) => {
      const userData = await getFirebaseUserData(googleAuth);

      const requestBody = {
        token: googleAuth.accessToken,

        id: userData.id,

        email: userData.email,

        firstName: userData.given_name,

        lastName: userData.family_name,

        pictureUrl: userData.picture,

        isOrganizer: true
      };

      postTo(`${BACKEND_HOST}${SIGN_IN_URL}`, requestBody).then((res) => {
        if (res.error !== undefined) {
          alert(res.error);

          return
        }

        logIn({
          token: googleAuth.accessToken,

          id: userData.id,

          email: userData.email,

          firstName: userData.given_name
        });
      });
    };

    useEffect(() => {
      if (response?.type === 'success') {
        const {authentication} = response;

        handleSignInWithGoogle(authentication).catch(e => {
            console.log(JSON.stringify(e));

            alert(GOOGLE_AUTH_ERR_LBL);
          });
      }
    }, [response]);  */

  return (
      <Button
        icon='google'
        onClick={handleLogin}
        style={buttonStyles}
        variant="contained">Ingresar
      </Button>
  );
}

export default SignInWithGoogle;
