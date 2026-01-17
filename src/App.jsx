import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Components
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer'; 
import Admin from './components/Admin';
import Login from './components/Login';

// Loading Screen Component
const Loader = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => onFinish(), 2500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div style={{
      height: '100vh', width: '100%', backgroundColor: '#000',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      alignItems: 'center', position: 'fixed', top: 0, left: 0, zIndex: 9999
    }}>
      <h1 style={{ 
        fontSize: 'clamp(80px, 20vw, 250px)', fontWeight: '900', color: '#fff', 
        margin: 0, letterSpacing: '-5px', animation: 'ogPulse 1.5s infinite ease-in-out' 
      }}>
        OG<span style={{color: '#ff4d00'}}>.</span>
      </h1>
      <div style={{ marginTop: '10px', color: '#ff4d00', letterSpacing: '5px', fontSize: '12px', fontWeight: 'bold', opacity: 0.8 }}>
        LOADING ARCHIVE
      </div>
      <style>{`
        @keyframes ogPulse { 0% { opacity: 0.5; transform: scale(0.98); } 50% { opacity: 1; transform: scale(1); } 100% { opacity: 0.5; transform: scale(0.98); } }
      `}</style>
    </div>
  );
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  // Check login status from localStorage on startup
  useEffect(() => {
    const authStatus = localStorage.getItem('isAyanAdmin') === 'true';
    setIsLoggedIn(authStatus);
  }, []);

  const globalStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
    * { box-sizing: border-box; }
    html { scroll-behavior: smooth; background-color: #000; }
    body { margin: 0; background-color: #000; font-family: 'Inter', sans-serif; color: #fff; overflow-x: hidden; }
  `;

  if (showLoader) return <Loader onFinish={() => setShowLoader(false)} />;

  return (
    <Router>
      <style>{globalStyles}</style>
      <div style={{ backgroundColor: '#000', minHeight: '100vh' }}>
        <Routes>
          {/* Main Portfolio Page */}
          <Route path="/" element={
            <div className="animate-fade">
              <Hero />
              <Portfolio />
              <Contact />
              <Footer />
            </div>
          } />
          
          {/* Custom Auth System (Firebase Hata Diya) */}
          <Route 
            path="/login" 
            element={isLoggedIn ? <Navigate to="/admin" replace /> : <Login onLogin={() => setIsLoggedIn(true)} />} 
          />
          
          <Route 
            path="/admin" 
            element={isLoggedIn ? <Admin /> : <Navigate to="/login" replace />} 
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      
      <style>{`
        .animate-fade { animation: fadeInPage 1s ease-in; }
        @keyframes fadeInPage { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </Router>
  );
}

export default App;
