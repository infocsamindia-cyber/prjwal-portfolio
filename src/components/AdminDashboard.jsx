import React, { useState, useEffect } from 'react';
import { db, storage } from '../firebase'; 
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const AdminDashboard = () => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [url, setUrl] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);

  // Projects fetch karne ka function
  const fetchProjects = async () => {
    try {
      const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProjects(data);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // PIN LOGIC (Orange Button Logic)
  const handlePin = async (id, currentStatus) => {
    try {
      const projectRef = doc(db, "projects", id);
      await updateDoc(projectRef, {
        isPinned: !currentStatus,
        createdAt: Date.now() // Top par laane ke liye time update
      });
      fetchProjects(); // List refresh
      alert("📍 Pin Status Updated!");
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this project?")) {
      await deleteDoc(doc(db, "projects", id));
      fetchProjects();
    }
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let finalUrl = url;
      if (file) {
        const storageRef = ref(storage, `gallery/${Date.now()}_${file.name}`);
        const uploadTask = await uploadBytesResumable(storageRef, file);
        finalUrl = await getDownloadURL(uploadTask.ref);
      }
      await addDoc(collection(db, "projects"), {
        title, type, url: finalUrl, isPinned: false, createdAt: Date.now() 
      });
      alert("🔥 Project Published!");
      setTitle(''); setType(''); setUrl(''); setFile(null);
      fetchProjects();
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '50px 20px', backgroundColor: '#000', minHeight: '100vh', color: '#fff', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: '750px', margin: '0 auto' }}>
        
        <div style={{ marginBottom: '30px', borderLeft: '4px solid #ff4d00', paddingLeft: '15px' }}>
          <h2 style={{ letterSpacing: '2px', textTransform: 'uppercase', margin: 0 }}>Project Management</h2>
          <p style={{ color: '#666', fontSize: '11px' }}>SECURED ACCESS FOR AYAN ANSARI</p>
        </div>

        {/* UPLOAD FORM */}
        <form onSubmit={handleAddProject} style={formStyle}>
          <input value={title} placeholder="Project Title" onChange={(e) => setTitle(e.target.value)} style={inputStyle} required />
          <select value={type} onChange={(e) => setType(e.target.value)} style={inputStyle} required>
             <option value="">Select Category</option>
             <option value="Video Editing">Video Editing</option>
             <option value="Cyber Security">Cyber Security</option>
             <option value="Web Development">Web Development</option>
          </select>
          <input value={url} placeholder="External URL" onChange={(e) => setUrl(e.target.value)} style={inputStyle} required={!file} />
          
          <div onClick={() => document.getElementById('fileInput').click()} style={dropZoneStyle}>
            <span style={{ fontSize: '24px' }}>☁️</span>
            <p style={{ fontSize: '12px', margin: '10px 0' }}>{file ? file.name : "Click to Upload Video/Image"}</p>
            <input id="fileInput" type="file" onChange={(e) => setFile(e.target.files[0])} style={{ display: 'none' }} />
          </div>

          <button type="submit" disabled={loading} style={loading ? btnDisabled : btnActive}>
            {loading ? "PROCESSING..." : "PUBLISH PROJECT"}
          </button>
        </form>

        {/* ACTIVE PROJECTS LIST */}
        <div style={{ marginTop: '50px' }}>
          <h3 style={{ fontSize: '12px', color: '#444', letterSpacing: '2px', marginBottom: '20px' }}>ACTIVE PROJECTS ({projects.length})</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {projects.map((proj) => (
              <div key={proj.id} style={projectCard}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {proj.title} {proj.isPinned && <span style={{ color: '#ff4d00', fontSize: '12px' }}>📌 PINNED</span>}
                  </div>
                  <div style={{ fontSize: '10px', color: '#666', marginTop: '4px' }}>{proj.type}</div>
                </div>

                {/* --- CONTROL BUTTONS --- */}
                <div style={{ display: 'flex', gap: '8px' }}>
                  {/* ORANGE PIN BUTTON */}
                  <button 
                    onClick={() => handlePin(proj.id, proj.isPinned)}
                    style={{ 
                      ...actionBtn, 
                      backgroundColor: proj.isPinned ? '#fff' : '#ff4d00', 
                      color: proj.isPinned ? '#000' : '#fff',
                      border: 'none'
                    }}
                  >
                    {proj.isPinned ? "UNPIN" : "PIN TO TOP"}
                  </button>

                  <button style={actionBtn}>EDIT</button>
                  <button onClick={() => handleDelete(proj.id)} style={{ ...actionBtn, color: '#ff4444' }}>DELETE</button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

// Internal Styles
const formStyle = { display: 'flex', flexDirection: 'column', gap: '15px', backgroundColor: '#0a0a0a', padding: '25px', borderRadius: '12px', border: '1px solid #1a1a1a' };
const inputStyle = { padding: '14px', backgroundColor: '#000', border: '1px solid #222', color: '#fff', borderRadius: '6px', outline: 'none' };
const dropZoneStyle = { padding: '20px', backgroundColor: '#050505', border: '1px dashed #333', borderRadius: '8px', textAlign: 'center', cursor: 'pointer' };
const btnActive = { padding: '16px', backgroundColor: '#ff4d00', color: '#fff', fontWeight: 'bold', border: 'none', borderRadius: '6px', cursor: 'pointer' };
const btnDisabled = { ...btnActive, backgroundColor: '#333', cursor: 'not-allowed' };
const projectCard = { display: 'flex', alignItems: 'center', backgroundColor: '#0a0a0a', padding: '15px 20px', borderRadius: '10px', border: '1px solid #1a1a1a' };
const actionBtn = { padding: '8px 12px', backgroundColor: '#1a1a1a', border: '1px solid #333', color: '#ccc', borderRadius: '6px', fontSize: '10px', fontWeight: 'bold', cursor: 'pointer', transition: '0.2s' };

export default AdminDashboard;