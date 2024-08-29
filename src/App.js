import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import CharactersList from './pages/CharactersList';
import CharacterDetail from './pages/CharacterDetail';
import CharacterByLocation from './pages/CharacterByLocation';
import Dashboard from './pages/Dashboard';
import AppNavbar from './components/Navbar'; 
import './App.css'; 

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const location = useLocation(); // This hook gives you access to the location object

  return (
    <div className='app-background'>
      {location.pathname !== '/' && <AppNavbar />}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/character" element={<CharactersList />} />
        <Route path="/character/:id" element={<CharacterDetail />} />
        <Route path="/locations" element={<CharacterByLocation />} />
      </Routes>
    </div>
  );
}

export default AppWrapper;