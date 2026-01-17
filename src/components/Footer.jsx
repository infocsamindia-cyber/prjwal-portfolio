import React, { useState, useEffect } from 'react';

const Footer = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // WhatsApp Links with Pre-filled Messages (Ayan Special)
  const prjwalWhatsApp = "https://wa.me/918530270140?text=Hi%20Prjwal,%20I%20want%20to%20discuss%20a%20video%20project%20with%20you!";
  const ayanWhatsApp = "https://wa.me/919970889890?text=Hi%20Ayan,%20I%20saw%20your%20work%20on%20OG%20Prjwal%27s%20portfolio!";
  
  const skills = [
    "Adobe After Effects", "Premiere Pro", "Photoshop", "DaVinci Resolve", 
    "Lightroom", "VFX & CGI", "Color Grading", "Motion Graphics", 
    "Sound Design", "4K Rendering", "Secure Data Storage"
  ];

  const s = {
    footer: {
      padding: isMobile ? '60px 5% 30px 5%' : '80px 8% 40px 8%',
      backgroundColor: '#000',
      borderTop: '1px solid #111',
      color: '#fff',
      fontFamily: '"Inter", sans-serif',
    },
    aboutSection: {
      maxWidth: '850px',
      margin: '0 auto 40px auto',
      textAlign: 'center',
    },
    aboutTitle: {
      fontSize: isMobile ? '14px' : '18px',
      letterSpacing: '5px',
      color: '#ff4d00', 
      marginBottom: '20px',
      fontWeight: '900',
      textTransform: 'uppercase'
    },
    aboutText: { 
      fontSize: isMobile ? '14px' : '17px', 
      color: '#bbb', 
      lineHeight: '1.8', 
      marginBottom: '30px',
    },
    skillsContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '10px',
      marginBottom: '40px',
    },
    skillTag: {
      fontSize: isMobile ? '9px' : '11px',
      padding: '6px 15px',
      backgroundColor: 'rgba(255, 77, 0, 0.05)',
      border: '1px solid #222',
      borderRadius: '4px',
      color: '#ff4d00',
      letterSpacing: '1px',
      textTransform: 'uppercase',
      fontWeight: 'bold',
      transition: '0.3s'
    },
    bottomBar: {
      borderTop: '1px solid #0a0a0a',
      paddingTop: '30px',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    }
  };

  return (
    <footer id="about" style={s.footer}>
      <div style={s.aboutSection}>
        <div style={s.aboutTitle}>THE MASTERMIND BEHIND THE LENS</div>
        
        <p style={s.aboutText}>
          <strong>OG PRJWAL</strong> is not just an editor; he is a visual architect. With mastery over the world's most 
          powerful PC tools, he transforms raw concepts into **cinematic masterpieces**. 
        </p>

        <div style={s.skillsContainer}>
          {skills.map((skill, index) => (
            <span key={index} style={s.skillTag} className="skill-hover">{skill}</span>
          ))}
        </div>
      </div>

      {/* Trust Badges */}
      <div style={{display: 'flex', justifyContent: 'center', gap: '40px', marginBottom: '40px', color: '#444', fontSize: '12px', fontWeight: 'bold'}}>
        <span>✓ FAST DELIVERY</span>
        <span>✓ 4K QUALITY</span>
        <span>✓ SECURE WORKFLOW</span>
      </div>

      <div style={{display: 'flex', justifyContent: 'center', gap: isMobile ? '30px' : '50px', marginBottom: '50px'}}>
        <a href="https://instagram.com/ogprjwal" target="_blank" rel="noreferrer" style={{textDecoration: 'none', color: '#E1306C', fontWeight: 'bold', letterSpacing: '2px', fontSize: '13px'}}>INSTAGRAM</a>
        {/* Prjwal's WhatsApp with Message */}
        <a href={prjwalWhatsApp} target="_blank" rel="noreferrer" style={{textDecoration: 'none', color: '#25D366', fontWeight: 'bold', letterSpacing: '2px', fontSize: '13px'}}>WHATSAPP</a>
      </div>

      <div style={s.bottomBar}>
        <div style={{ color: '#333', fontSize: '9px', letterSpacing: '2px', fontWeight: 'bold' }}>
          © 2026 OG PRJWAL. ALL RIGHTS RESERVED.
        </div>
        
        {/* Ayan's WhatsApp with Message */}
        <a href={ayanWhatsApp} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
          <div style={{ color: '#00d4ff', fontSize: isMobile ? '10px' : '12px', letterSpacing: '3px', fontWeight: '800', textTransform: 'uppercase', padding: '10px 20px', border: '1px solid rgba(0, 212, 255, 0.2)', borderRadius: '4px', transition: '0.4s' }} className="developer-credit">
            BUILT BY AYAN ANSARI
          </div>
        </a>
      </div>

      <style>{`
        .skill-hover:hover {
          border-color: #ff4d00 !important;
          background-color: rgba(255, 77, 0, 0.1) !important;
          transform: translateY(-3px);
        }
        .developer-credit:hover {
          background-color: rgba(0, 212, 255, 0.1) !important;
          box-shadow: 0 0 20px rgba(0, 212, 255, 0.4) !important;
          border-color: #00d4ff !important;
          transform: scale(1.02);
        }
      `}</style>
    </footer>
  );
};

export default Footer;

