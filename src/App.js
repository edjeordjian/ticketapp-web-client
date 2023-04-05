import * as React from 'react';
import SignInSide from './components/SignIn';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import CreateEventView from './views/CreateEventView';
import EventsListView from './views/EventsListView';
import {EVENT_CREATE_PATH, EVENTS_PATH} from "./constants/URLs";


export default function MyApp() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignInSide />} />
        <Route path={EVENTS_PATH} element={<EventsListView/>}/>
        <Route path={EVENT_CREATE_PATH} element={<CreateEventView/>}/>
      </Routes>
    </Router>
    
  );
} 