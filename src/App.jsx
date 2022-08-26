import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Task from './pages/Task/Task';
import Home from './pages/Home/Home';

const App = () => {
 
  return (
    <Router>
        <Routes>
          <Route path='/' element={<Home />}>
            <Route path='tasks/:id' element={<Task />} />
          </Route>
        </Routes>
    </Router>
  );
}

export default App;
