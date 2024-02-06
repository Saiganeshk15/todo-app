import React from 'react';
import './App.css';
import Popin from './components/Popin';
import Navbar from './components/Navbar';
import { HomePage } from './components/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/todo-app/" element={<Popin />} />
          <Route path='/todo-app/Homepage' element={<HomePage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;