import React, { useState, useEffect } from 'react';

const Contact = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  // Screen size check for mobile layout
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const clientPhone = "918530270140"; 
  const message = "Hi, I saw your portfolio and I want to hire you for a project. Please share your service pricing!";
  const whatsappUrl = `https://wa.me/${clientPhone}?text=${encodeURIComponent(message)}`;

  const s = {
    container: {
      padding: isMobile ? '80px 5%' : '120px 8%',
      backgroundColor: '#000',
      textAlign: 'center',
      color: '#fff',
      fontFamily: '"Inter", sans-serif',
      position: 'relative',
      overflow: 'hidden'
    },
    glow: {
      position: 'absolute',
      bottom: '-10%',
      left: '50%',
      transform: 'translateX(-50%)',
      width: isMobile ? '200px' : '400px',
      height: isMobile ? '200px' : '400px',
      backgroundColor: 'rgba(255, 77, 0, 0.12)',
      filter: 'blur(100px)',
      borderRadius: '50%',
      zIndex: 1
    },
    content: {
      position: 'relative',
      zIndex: 2
    },
    heading: {
      fontSize: 'clamp(38px, 10vw, 100px)', 
      fontWeight: '900',
      lineHeight: '0.9',
      marginBottom: '25px',
      letterSpacing: '-2px',
      textTransform: 'uppercase'
    },
    subText: {
      color: '#888',
      marginBottom: '40px',
      fontSize: isMobile ? '15px' : '18px',
      maxWidth: '600px',
      margin: '0 auto 40px auto',
      lineHeight: '1.6'
    },
    btn: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '12px',
      padding: isMobile ? '18px 35px' : '22px 55px',
      backgroundColor: '#fff', 
      color: '#000',
      textDecoration: 'none',
      borderRadius: '100px',
      fontWeight: '900',
      fontSize: isMobile ? '12px' : '14px',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      transition: 'all 0.4s ease',
      boxShadow: '0 15px 40px rgba(255, 77, 0, 0.15)'
    },
    callBox: {
      marginTop: '40px',
      color: '#444',
      fontSize: isMobile ? '10px' : '11px',
      letterSpacing: '3px',
      textTransform: 'uppercase',
      fontWeight: 'bold'
    }
  };

  return (
    <section id="contact" style={s.container}>
      <div style={s.glow}></div>
      
      <div style={s.content}>
        <h2 style={s.heading}>
          HIRE FOR <br /> 
          <span style={{color: '#ff4d00'}}>PROJECTS</span>
        </h2>
        
        <p style={s.subText}>
          High-end <strong>
            
             Editing</strong> & <strong>Image Retouching</strong>. <br />
          Ready for collaborations and custom edits.
        </p>
        
        <a 
          href={whatsappUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          style={s.btn}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.backgroundColor = '#ff4d00';
            e.currentTarget.style.color = '#fff';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.backgroundColor = '#fff';
            e.currentTarget.style.color = '#000';
          }}
        >
          Book My Service
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </a>

        <div style={s.callBox}>
          DIRECT LINE: +91 85302 70140
        </div>
      </div>
    </section>
  );
};

export default Contact;