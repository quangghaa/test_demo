import { Button } from 'antd';
import React from 'react';
import 'antd/dist/antd.css';
import './App.css';
import { Link, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from 'antd/lib/layout/layout';
import Homepage from './features/home/Homepage';
import Instruction from './features/instruction/Instruction';
import Test from './features/test/Test';
import Login from './features/login/Login';
import Schedule from './features/dashboard/schedule/Schedule';
import Question from './features/dashboard/question/Question';


function App() {


  return (
    
    <div className="App">
      <Router>
            
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path='/instruction' element={<Instruction />} />
          <Route path='/test' element={<Test />} />
          
          <Route path='/dashboard' element={<Schedule />} />
          <Route path='/dashboard/schedule' element={<Schedule />} />
          <Route path='/dashboard/question' element={<Question />} />
          {/* <Route path='/dashboard/complete' /> */}
        </Routes>

      </Router>
    </div>
    
  );
}

export default App;
