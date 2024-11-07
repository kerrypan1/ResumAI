import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css'
import HomePage from './pages/Homepage.jsx'
import AboutPage from './pages/Aboutpage.jsx';
import ContactPage from './pages/Contactpage.jsx';
import Navbar from "./components/Navbar";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar />
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Router>
  </StrictMode>,
)