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
import {EVENT_CREATE_PATH} from "./constants/URLs";


export default function MyApp() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignInSide />} />
        <Route path={EVENT_CREATE_PATH} element={<EventsListView/>}/>
        <Route path='/events/create' element={<CreateEventView/>}/>
      </Routes>
    </Router>
    
  );
} 