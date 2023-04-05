import {Route, Routes} from "react-router-dom";
import SignInSide from "../../components/SignIn";

const NotLoggedRouter = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<SignInSide />} />
            </Routes>
        </div>
    );
};

export {
    NotLoggedRouter
};
