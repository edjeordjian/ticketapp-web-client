 import * as React from 'react';
import SignInSide from './components/SignIn';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import BasicForm from './components/BasicForm';



export default function MyApp() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<SignInSide />} />
      <Route path='/events' element={<BasicForm/>}/>
      </Routes>
    </Router>
    
  );
} 