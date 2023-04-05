import {Route, Routes} from "react-router-dom";
import {EVENT_CREATE_PATH, EVENTS_PATH, LOG_IN_PATH} from "../../constants/URLs";
import CreateEventView from "../../views/CreateEventView";
import EventsListView from "../../views/EventsListView";
import SignInSide from "../../components/SignIn";

const LoggedRouter = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<EventsListView/>} />

                <Route path={LOG_IN_PATH} element={<SignInSide />} />

                <Route path={EVENTS_PATH} element={<EventsListView/>}/>

                <Route path={EVENT_CREATE_PATH} element={<CreateEventView/>}/>
            </Routes>
        </div>
    );
};

export {
    LoggedRouter
};
