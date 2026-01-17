import React, { useEffect, useState } from 'react';
// Firebase services ko import kiya
import { db } from '../firebase'; 
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);

    // --- FIREBASE SE REAL-TIME DATA LENA ---
    // Isse bina refresh kiye naya project dikhne lagega
    const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Sorting Logic: (Exactly same jaisa aapne diya tha)
      // Pinned projects ko top par rakhne ke liye
      data.sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return 0; // Baaki date ke hisaab se query mein hi sorted hain
      });

      setProjects(data);
      setLoading(false);
    }, (error) => {
      console.error("Firebase Error: ", error);
      setLoading(false);
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      unsubscribe(); // Cleanup listener
    };
  }, []);

  const getEmbedUrl = (url) => {
    if (!url) return "";
    if (url.includes('instagram.com')) {
      const cleanUrl = url.split('?')[0];
      const finalUrl = cleanUrl.endsWith('/') ? cleanUrl : cleanUrl + '/';
      return `${finalUrl}embed/captioned/`; 
    }
    if (url.includes('youtube.com/watch')) {
      return url.replace('watch?v=', 'embed/');
    }
    if (url.includes('youtu.be/')) {
      return url.replace('youtu.be/', 'youtube.com/embed/');
    }
    return url;
  };

  // --- AAPKA ORIGINAL DESIGN (NO CHANGES) ---
  const s = {
    section: {
      padding: isMobile ? '60px 5%' : '80px 8%',
      backgroundColor: '#171616',
      minHeight: '100vh',
      fontFamily: '"Inter", sans-serif'
    },
    titleContainer: {
      textAlign: 'left',
      marginBottom: isMobile ? '40px' : '60px',
      borderLeft: '4px solid #1a1817',
      paddingLeft: '20px'
    },
    title: {
      fontSize: 'clamp(32px, 8vw, 55px)',
      color: '#fff',
      fontWeight: '900',
      textTransform: 'uppercase',
      letterSpacing: '-1px',
      lineHeight: '1'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 420px))',
      gap: isMobile ? '30px' : '40px',
      maxWidth: '1500px',
      margin: '0 auto',
      justifyContent: 'center'
    },
    card: {
      backgroundColor: '#000000',
      borderRadius: '24px',
      overflow: 'hidden',
      border: '1px solid #151515',
      transition: '0.4s ease',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative'
    },
    videoWrapper: {
      position: 'relative',
      width: '100%',
      height: isMobile ? '480px' : '520px',
      backgroundColor: '#000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden'
    },
    videoFrame: {
      width: '100%',
      height: '100%',
      border: 'none',
      display: 'block',
      objectFit: 'contain'
    },
    infoArea: {
      padding: '20px',
      backgroundColor: '#0a0a0a',
      borderTop: '1px solid #151515'
    },
    projectTitle: { color: '#fff', fontSize: '16px', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '5px' },
    projectType: { color: '#ff4d00', fontSize: '11px', fontWeight: 'bold', letterSpacing: '1px' },
    pinTag: { 
      position: 'absolute', top: '15px', right: '15px', backgroundColor: '#ff4d00', 
      color: '#fff', fontSize: '10px', padding: '5px 10px', borderRadius: '20px', 
      fontWeight: 'bold', zIndex: 10, letterSpacing: '1px' 
    }
  };

  if (loading) return (
    <div style={{ color: '#fff', textAlign: 'center', backgroundColor: '#000', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ fontSize: '11px', letterSpacing: '5px', fontWeight: 'bold' }}>LOADING ARCHIVE...</div>
    </div>
  );

  return (
    <div id="portfolio" style={s.section}>
      <div style={s.titleContainer}>
        <h2 style={s.title}>Selected<br /><span style={{ color: '#ff4d00' }}>Works</span></h2>
      </div>

      {projects.length === 0 ? (
        <div style={{ textAlign: 'center', color: '#444', marginTop: '50px' }}>
          <p style={{ fontSize: '14px' }}>NO PROJECTS FOUND IN DATABASE.</p>
        </div>
      ) : (
        <div style={s.grid}>
          {projects.map((project) => (
            <div
              key={project.id}
              style={s.card}
              onMouseOver={(e) => e.currentTarget.style.borderColor = '#ff4d00'}
              onMouseOut={(e) => e.currentTarget.style.borderColor = '#151515'}
            >
              {project.isPinned && <div style={s.pinTag}>PINNED</div>}

              <div style={s.videoWrapper}>
                {/* Firebase Storage ya MP4 URL handle ho raha hai */}
                {project.url && (project.url.includes('firebasestorage') || project.url.includes('cloudinary') || project.url.endsWith('.mp4')) ? (
                  <video 
                    src={project.url} 
                    controls 
                    playsInline 
                    webkit-playsinline="true"
                    preload="metadata"
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                  />
                ) : project.type && project.type.toLowerCase().includes('video') ? (
                  <iframe 
                    src={getEmbedUrl(project.url)} 
                    style={s.videoFrame} 
                    title={project.title}
                    scrolling="no"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share; fullscreen"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <img src={project.url} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                )}
              </div>

              <div style={s.infoArea}>
                <h3 style={s.projectTitle}>{project.title}</h3>
                <p style={s.projectType}>{project.type}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Portfolio;