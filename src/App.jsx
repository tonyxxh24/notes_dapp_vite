import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import './App.css';

import HomePage from './pages/HomePage';
import Login from './components/Login';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    </Router>
  )
}

export default App
