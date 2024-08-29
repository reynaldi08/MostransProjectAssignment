import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CharactersList from './pages/CharactersList';
import CharacterDetail from './pages/CharacterDetail';
import CharacterByLocation from './pages/CharacterByLocation';
import AppNavbar from '../src/components/Navbar'; 
import './App.css'; 

function App() {
  return (
    <Router>
      <div className='app-background'>
        <AppNavbar />
        <Routes>
          <Route path="/" element={<CharactersList />} />
          <Route path="/character/:id" element={<CharacterDetail />} />
          <Route path="/locations" element={<CharacterByLocation />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;