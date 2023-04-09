import {Route, Routes} from "react-router-dom";
import {EVENT_CREATE_PATH, EVENT_VIEW_PATH,
        EVENTS_PATH, LOG_IN_PATH} from "../../constants/URLs";
import CreateEventView from "../../views/CreateEventView";
import EventsListView from "../../views/EventsListView";
import SignInSide from "../../components/SignIn";
import {ViewEventView} from "../../views/ViewEventView";

const LoggedRouter = () => {
    /* Remember to add "exact" to allow users to type the endpoint directly. */
    return (
        <div>
            <Routes>
                <Route exact path="/" element={<EventsListView/>} />

                <Route exact path={LOG_IN_PATH} element={<SignInSide />} />

                <Route exact path={EVENTS_PATH} element={<EventsListView/>}/>

                <Route exact path={EVENT_CREATE_PATH} element={<CreateEventView/>}/>

                <Route exact path={EVENT_VIEW_PATH} element={<ViewEventView/>}/>
            </Routes>
        </div>
    );
};

export {
    LoggedRouter
};
