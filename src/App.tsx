import { Button } from 'antd';
import React, { useState } from 'react';
import 'antd/dist/antd.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './features/home/Homepage';
import Instruction from './features/instruction/Instruction';
import Test from './features/test/Test';
import Schedule from './features/dashboard/schedule/Schedule';
import Question from './features/dashboard/question/Question';
import Complete from './features/dashboard/complete/Complete';
import CompleteTest from './features/completetest/CompleteTest';
import QuestionCollection from './features/dashboard/question/QuestionCollection';

function App() {
  const [isBegin, setIsBegin] = useState(false);

  const begin = () => {
    setIsBegin(true);
    console.log("BEGIN!!");
  }

  const finish = () => {
    setIsBegin(false);
    console.log('FINISH!!');
  }

  const [direct, setDirect] = useState('');

  const setJoin = (value: any) => {
    console.log("In set Join");
    setDirect(value);
  }

  return (


    <div className="App">
      <Router>

        <Routes>
          <Route path="/" element={<Homepage start={isBegin} join={setJoin} />} />
          <Route path='/instruction' element={<Instruction start={isBegin} begin={begin} join={direct} />} />
          <Route path='/completetest' element={<CompleteTest start={isBegin} />} />
          <Route path='/test' element={<Test start={isBegin} finish={finish} />} />

          <Route path='/dashboard' element={<Schedule />} />
          <Route path='/dashboard/schedule' element={<Schedule />} />
          <Route path='/dashboard/question' element={<QuestionCollection />} />
          <Route path='/dashboard/complete' element={<Complete />} />
        </Routes>
      </Router>

    </div>

  );
}

export default App;
