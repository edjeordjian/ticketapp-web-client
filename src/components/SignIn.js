import * as React from "react";

import main_screen from "../media/login/login_screen.png";

import SignInGoogleButton from "./login/SignInGoogleButton";

export default function SignInSide() {
    const [wallpaper, setWallpaper] = React.useState(main_screen);

    const handleButtonClick = () => {
        setWallpaper(main_screen);
    };

  return (
      <div
          className="wallpaper"
          style={{
              backgroundImage: `url(${wallpaper})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              height: "100vh",
              width: "100vw",
              backgroundSize: "cover"
          }}
      >
          <SignInGoogleButton/>
      </div>
  );
}
