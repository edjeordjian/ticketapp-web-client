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


export default function MyApp() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignInSide />} />
        <Route path='/events' element={<EventsListView/>}/>
        <Route path='/events/create' element={<CreateEventView/>}/>
      </Routes>
    </Router>
    
  );
} 