import React, { useState, useEffect } from 'react';
// Firebase services ko import kiya
import { db } from '../firebase'; 
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, orderBy, serverTimestamp } from 'firebase/firestore';

const Admin = () => {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [type, setType] = useState('Video (Reel)');
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    fetchProjects();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- FIREBASE SE DATA LENA ---
  const fetchProjects = async () => {
    try {
      const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      // Sorting: Pinned wale top par
      const sorted = data.sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0));
      setProjects(sorted);
    } catch (err) { console.error("Fetch Error:", err); }
  };

  // --- PIN LOGIC (FIREBASE UPDATE) ---
  const togglePin = async (id) => {
    const project = projects.find(p => p.id === id);
    const docRef = doc(db, "projects", id);
    await updateDoc(docRef, { isPinned: !project.isPinned });
    fetchProjects();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        const docRef = doc(db, "projects", editingId);
        await updateDoc(docRef, { title, url, type });
        setEditingId(null);
      } else {
        await addDoc(collection(db, "projects"), {
          title, url, type,
          isPinned: false,
          createdAt: serverTimestamp()
        });
      }
      
      setTitle(''); setUrl('');
      fetchProjects();
      alert("🔥 Published to Cloud Successfully!");
    } catch (err) { alert("Error: " + err.message); }
    setLoading(false);
  };

  const deleteProject = async (id) => {
    if(window.confirm("Kyan aap is project ko DELETE karna chahte hain?")) {
      await deleteDoc(doc(db, "projects", id));
      fetchProjects();
    }
  };

  // --- STYLES (NO CHANGES AS PER YOUR REQUEST) ---
  const s = {
    container: { padding: isMobile ? '20px 15px' : '40px 5%', backgroundColor: '#000', minHeight: '100vh', color: '#fff', fontFamily: 'Inter, sans-serif' },
    formCard: { backgroundColor: '#0a0a0a', padding: '25px', borderRadius: '20px', border: '1px solid #111', maxWidth: '500px', margin: '0 auto 40px auto' },
    input: { width: '100%', padding: '14px', margin: '8px 0', backgroundColor: '#000', border: '1px solid #222', color: '#fff', borderRadius: '12px', outline: 'none', fontSize: '16px' },
    item: { display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center', padding: '20px', backgroundColor: '#050505', border: '1px solid #111', marginBottom: '15px', borderRadius: '15px', gap: isMobile ? '15px' : '0' },
    btnGroup: { display: 'flex', gap: '8px', width: isMobile ? '100%' : 'auto', flexWrap: 'wrap' },
    actionBtn: { padding: '10px 16px', borderRadius: '8px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', flex: isMobile ? '1' : 'none', textAlign: 'center', textTransform: 'uppercase' }
  };

  return (
    <div style={s.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', alignItems: 'center' }}>
        <div>
          <h2 style={{margin:0, fontSize: isMobile ? '18px' : '24px', letterSpacing: '1px'}}>OG <span style={{color:'#00e5ff'}}>ADMIN</span> <span style={{color:'#ff4d00'}}>DASHBOARD</span></h2>
          {/* SECURE TAG FOR AYAN */}
          <p style={{ margin: '5px 0 0 0', fontSize: '10px', color: '#444', letterSpacing: '1px', fontWeight: 'bold' }}>
            ENCRYPTED ACCESS: <span style={{ color: '#3cff00' }}>AYAN ANSARI</span>
          </p>
        </div>
        <button style={{color: '#ff4444', background: 'none', border: '1px solid #331111', padding: '8px 15px', borderRadius: '5px', cursor:'pointer', fontSize: '12px'}} onClick={() => {localStorage.removeItem('isAyanAdmin'); window.location.reload();}}>LOGOUT</button>
      </div>

      <div style={s.formCard}>
        <form onSubmit={handleSubmit}>
          <select style={s.input} value={type} onChange={(e) => setType(e.target.value)}>OG
            <option>Video (Reel)</option>
            <option>Image</option>
          </select>
          <input style={s.input} placeholder="Project Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <input style={s.input} placeholder="URL (Instagram or Image Link)" value={url} onChange={(e) => setUrl(e.target.value)} required />
          
          <button type="submit" style={{width:'100%', padding:'16px', background: '#ff4d00', color:'#fff', border:'none', borderRadius:'12px', fontWeight:'bold', marginTop:'20px', cursor:'pointer'}} disabled={loading}>
            {loading ? `PUBLISHING...` : (editingId ? 'UPDATE PROJECT' : 'PUBLISH PROJECT')}
          </button>
        </form>
      </div>

      <div style={{maxWidth: '800px', margin: '0 auto'}}>
        <h3 style={{fontSize: '12px', color: '#444', marginBottom: '15px', letterSpacing: '2px', textTransform: 'uppercase'}}>Database Management</h3>
        {projects.map((p) => (
          <div key={p.id} style={s.item}>
            <div style={{flex: 1}}>
              <div style={{fontWeight:'bold', fontSize: '16px', marginBottom: '4px'}}>{p.title} {p.isPinned && "📌"}</div>
              <div style={{fontSize:'10px', color:'#ff4d00', fontWeight: 'bold'}}>{p.type}</div>
            </div>
            <div style={s.btnGroup}>
              <button style={{...s.actionBtn, background: p.isPinned ? '#ff4d00' : '#111', color: '#fff', border: '1px solid #222'}} onClick={() => togglePin(p.id)}>
                {p.isPinned ? "UNPIN" : "PIN TOP"}
              </button>
              <button style={{...s.actionBtn, background: '#111', color: '#fff', border: '1px solid #222'}} onClick={() => {setEditingId(p.id); setTitle(p.title); setUrl(p.url); setType(p.type); window.scrollTo(0,0);}}>
                EDIT
              </button>
              <button style={{...s.actionBtn, background: '#331111', color: '#ff4444', border: '1px solid #441111'}} onClick={() => deleteProject(p.id)}>
                DELETE
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;