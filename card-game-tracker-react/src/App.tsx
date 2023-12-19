import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import Start from './components/wizard/start';
import LocalStorageSaveService from './services/localStorage';
import NavMenu from './components/layout/navMenu';
import { ISaveService } from './services/ISaveService';
import Game from './components/wizard/game';

// Create a context for the save service

function App() {
  
  return (
    <div className="App">
      <Router>
        <NavMenu />
        <main>
          <article>
            <Routes>
              <Route path="/" element={<h1>Home</h1>}>
              </Route>
            </Routes>
            <Routes>
              <Route path="/wizard/start" element={<Start />} />
            </Routes>
            <Routes>
              <Route path="/wizard/game/:id" element={<Game />} />
            </Routes>
          </article>
        </main>
      </Router>
    </div>
  );
}

export default App;
export const SaveServiceContext = React.createContext<ISaveService>(new LocalStorageSaveService());
