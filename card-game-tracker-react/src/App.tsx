import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap-icons/font/fonts/bootstrap-icons.woff2';
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
              <Route path="/" element={<div><h1>Home</h1><NavLink className="btn btn-primary" to="/wizard/start/">Wizard</NavLink></div>}>
              </Route>
              <Route path="/wizard/start/" element={<Start />} />
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
