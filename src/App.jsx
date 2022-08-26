import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MiniDrawer from './components/MiniDrawer/MiniDrawer';
import Task from './components/Task/Task';
import Home from './pages/Home/Home';
function App() {
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
