import React, { useState, useEffect } from 'react';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    // AI-driven security: Simple but effective for personal portfolios
    // Yahan aap apna pasandida email/password set kar sakte hain
    setTimeout(() => {
      if (email === "prjwal@edit.com" && password === "prjwaleditor996023") {
        localStorage.setItem('isAyanAdmin', 'true'); // Local session save
        onLogin(); // App.jsx ko signal bhejna
      } else {
        alert("Incorrect Admin Credentials!");
      }
      setLoading(false);
    }, 1000); // 1s ka delay to feel like verification
  };

  const s = {
    container: { 
      height: '100vh', display: 'flex', justifyContent: 'center', 
      alignItems: 'center', backgroundColor: '#000', padding: '20px',
      fontFamily: '"Inter", sans-serif'
    },
    form: { 
      padding: isMobile ? '30px 20px' : '40px', backgroundColor: '#0a0a0a', 
      borderRadius: '24px', border: '1px solid #151515', width: '100%',
      maxWidth: '380px', textAlign: 'center'
    },
    title: { color: '#fff', fontSize: '22px', fontWeight: '900', marginBottom: '10px', letterSpacing: '2px' },
    subtitle: { color: '#555', fontSize: '12px', marginBottom: '30px', display: 'block', letterSpacing: '1px' },
    input: { 
      width: '100%', padding: '15px', margin: '8px 0', backgroundColor: '#000', 
      border: '1px solid #222', color: '#fff', borderRadius: '12px', 
      boxSizing: 'border-box', fontSize: '14px', outline: 'none', transition: '0.3s'
    },
    button: { 
      width: '100%', padding: '16px', backgroundColor: '#ff4d00', color: '#fff', 
      border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer',
      marginTop: '15px', fontSize: '14px', letterSpacing: '1px'
    }
  };

  return (
    <div style={s.container}>
      <form onSubmit={handleLogin} style={s.form}>
        <h2 style={s.title}>ADMIN <span style={{color: '#ff4d00'}}>ACCESS</span></h2>
        <span style={s.subtitle}>NO FIREBASE - LOCAL SECURE LOGIN</span>
        
        <input 
          style={s.input} type="email" placeholder="Email Address" 
          onChange={(e) => setEmail(e.target.value)} required 
        />
        
        <input 
          style={s.input} type="password" placeholder="Password" 
          onChange={(e) => setPassword(e.target.value)} required 
        />
        
        <button type="submit" style={s.button} disabled={loading}>
          {loading ? 'VERIFYING...' : 'LOGIN'}
        </button>

        <p style={{color: '#333', fontSize: '10px', marginTop: '25px', letterSpacing: '1px'}}>
          SECURED BY AYAN ANSARI (BCA CYBER SECURITY)
        </p>
      </form>
    </div>
  );
};

export default Login;