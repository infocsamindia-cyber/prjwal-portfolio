import React, { useState, useEffect } from 'react';

const Hero = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const s = {
        nav: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: isMobile ? '15px 5%' : '20px 5%',
            backgroundColor: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(20px)',
            position: 'fixed',
            top: 0, left: 0, right: 0,
            zIndex: 1000,
            borderBottom: '1px solid rgba(255,255,255,0.1)',
        },
        container: {
            backgroundColor: '#000',
            fontFamily: '"Inter", sans-serif',
            width: '100%',
            overflow: 'hidden'
        },
        logo: {
            fontSize: isMobile ? '20px' : '24px', 
            fontWeight: '900', color: '#fff',
            textDecoration: 'none',
            letterSpacing: '2px',
            position: 'relative',
        },
        heroCard: {
            position: 'relative',
            width: '100%',
            // MOBILE PAR SIZE HALF KAR DIYA HAI (35vh)
            height: isMobile ? '70vh' : '100vh', 
            display: 'flex',
            alignItems: 'flex-end',
            overflow: 'hidden',
        },
        videoBg: {
            position: 'absolute',
            top: '0', left: '0',
            width: '100%', height: '100%',
            objectFit: 'cover',
            zIndex: 0
        },
        overlay: {
            position: 'absolute',
            top: 0, left: 0, width: '100%', height: '100%',
            background: 'linear-gradient(to top, rgba(0,0,0,1) 15%, rgba(0,0,0,0.2) 100%)',
            zIndex: 1
        },
        content: {
            position: 'relative',
            zIndex: 2,
            padding: isMobile ? '0 6% 20px 6%' : '0 5% 80px 5%',
            width: '100%',
            textAlign: 'left',
        },
        badge: {
            color: '#ff4d00', fontSize: isMobile ? '10px' : '12px', fontWeight: 'bold',
            letterSpacing: '3px', marginBottom: '15px', display: 'block',
        },
        heading: {
            fontSize: isMobile ? '40px' : 'clamp(50px, 10vw, 100px)', 
            fontWeight: '900', lineHeight: '0.8', margin: '0 0 20px 0',
            color: '#fff', textTransform: 'uppercase',
            letterSpacing: '-3px'
        },
        subText: {
            color: '#ccc', fontSize: isMobile ? '14px' : '18px', lineHeight: '1.5',
            marginBottom: '35px', maxWidth: '500px',
        },
        cta: {
            padding: isMobile ? '16px 28px' : '18px 40px', 
            backgroundColor: '#fff', color: '#000',
            border: 'none', borderRadius: '50px', fontWeight: 'bold',
            fontSize: isMobile ? '12px' : '14px', cursor: 'pointer', 
            textTransform: 'uppercase', transition: '0.4s',
            boxShadow: '0 0 20px rgba(255,255,255,0.2)'
        }
    };

    return (
        <>
            <nav style={s.nav}>
                <a href="#home" style={s.logo} className="lightning-text">
                    OG <span style={{ color: '#ff4d00' }}>PRJWAL</span>
                </a>
                <div>
                    <a href="#portfolio" className="nav-item">Portfolio</a>
                    <a href="#about" className="nav-item" style={{marginLeft: isMobile ? '15px' : '30px'}}>About</a>
                </div>
            </nav>

            <div style={s.container}>
                <div id="home" style={s.heroCard}>
                    <video autoPlay loop muted playsInline style={s.videoBg}>
                        <source src="/hero-video.mp4" type="video/mp4" />
                    </video>
                    <div style={s.overlay}></div>

                    <div style={s.content} className="animate-hero">
                        <span style={s.badge}>PREMIUM EDITING SERVICES</span>
                        <h1 style={s.heading}>
                            High-End <br />
                            <span style={{ color: '#ff4d00' }}>Visuals</span>
                        </h1>
                        <p style={s.subText}>
                            Crafting high-impact content for brands that want to stand out. 
                        </p>
                        <button
                            style={s.cta}
                            className="btn-hover"
                            onClick={() => window.open('https://wa.me/918530270140?text=Hi, I am interested in your editing services!', '_blank')}
                        >
                            Get a Quote →
                        </button>
                    </div>
                </div>
            </div>

            <style>{`
                .lightning-text {
                    text-shadow: 0 0 5px #fff;
                    animation: flicker 3s infinite;
                }

                @keyframes flicker {
                    0%, 18%, 22%, 25%, 53%, 57%, 100% {
                        text-shadow: 0 0 4px #fff, 0 0 11px #fff, 0 0 19px #ff4d00, 0 0 40px #ff4d00, 0 0 80px #ff4d00;
                    }
                    20%, 24%, 55% {         
                        text-shadow: none;
                    }
                }

                .nav-item {
                    font-size: ${isMobile ? '12px' : '14px'};
                    color: #888;
                    text-decoration: none;
                    font-weight: bold;
                    text-transform: uppercase;
                    transition: 0.3s;
                }
                .nav-item:hover { color: #fff; text-shadow: 0 0 10px #ff4d00; }

                .animate-hero { animation: fadeInUp 1.2s ease-out forwards; }
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(40px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .btn-hover:hover {
                    background-color: #ff4d00 !important;
                    color: #fff !important;
                    transform: scale(1.05);
                    box-shadow: 0 0 30px rgba(255, 77, 0, 0.6);
                }
            `}</style>
        </>
    );
};

export default Hero;