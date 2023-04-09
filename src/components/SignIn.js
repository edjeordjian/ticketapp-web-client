import * as React from "react";

import logoImage from "../media/logo.png";

import SignInGoogleButton from "./login/SignInGoogleButton";

export default function SignInSide() {

    return (
        <section
            style={{
                height: "100vh",
                width: "100vw", 
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                background: 'rgb(26,85,208)',
                background: 'linear-gradient(129deg, rgba(26,85,208,1) 31%, rgba(168,187,70,1) 70%)'
            }}
        >
            <img src={logoImage} style={{height: '200px', width: '200px'}}></img>
            <SignInGoogleButton/>
        </section>
    );
}
