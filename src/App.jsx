import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Project from './pages/Project/Project';
import Home from './pages/Home/Home';

const App = () => {
 
  return (
    <Router>
        <Routes>
          <Route path='/' element={<Home />}>
            <Route path='tasks/:id' element={<Project />} />
          </Route>
        </Routes>
    </Router>
  );
}

export default App;
