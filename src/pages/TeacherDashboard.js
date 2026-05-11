import React, { useState, useEffect } from 'react';
import { getStudents } from '../services/api';

const TeacherDashboard = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');
  const userName = localStorage.getItem('userName');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const { data } = await getStudents();
      setStudents(data);
    } catch (err) {
      setError('Failed to fetch students!');
    }
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <div style={{minHeight:'100vh',background:'#f0f2f5'}}>
      <nav style={{background:'#1565c0',padding:'14px 24px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <span style={{color:'white',fontSize:'18px',fontWeight:'600'}}>🏫 School Management</span>
        <div style={{display:'flex',alignItems:'center',gap:'16px'}}>
          <span style={{color:'rgba(255,255,255,0.85)',fontSize:'14px'}}>Welcome, {userName}</span>
          <button onClick={logout} style={{background:'rgba(255,255,255,0.15)',color:'white',border:'1px solid rgba(255,255,255,0.3)',padding:'6px 14px',borderRadius:'6px',cursor:'pointer'}}>Logout</button>
        </div>
      </nav>

      <div style={{maxWidth:'900px',margin:'24px auto',padding:'0 16px'}}>

        {error && <p style={{color:'#e53935',background:'#ffebee',padding:'10px',borderRadius:'8px',marginBottom:'12px'}}>{error}</p>}

        <div style={{background:'white',borderRadius:'10px',padding:'16px',border:'1px solid #e0e0e0',boxShadow:'0 2px 8px rgba(0,0,0,0.06)',marginBottom:'20px'}}>
          <p style={{fontSize:'13px',color:'#777',margin:'0 0 6px'}}>Total Students</p>
          <p style={{fontSize:'28px',fontWeight:'600',color:'#1565c0',margin:0}}>{students.length}</p>
        </div>

        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'12px'}}>
          <h3 style={{margin:0,color:'#1a1a2e'}}>Students List</h3>
        </div>

        <div style={{background:'white',borderRadius:'10px',border:'1px solid #e0e0e0',overflow:'hidden',boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}}>
          <div style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr 1fr',padding:'10px 16px',background:'#f5f5f5',borderBottom:'1px solid #e0e0e0',fontSize:'13px',fontWeight:'600',color:'#555'}}>
            <span>Name</span>
            <span>Roll No</span>
            <span>Class</span>
            <span>Marks</span>
            <span>Attendance %</span>
          </div>

          {students.length === 0 ? (
            <p style={{textAlign:'center',padding:'2rem',color:'#888'}}>No students found!</p>
          ) : (
            students.map((s) => (
              <div key={s._id} style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr 1fr',padding:'12px 16px',borderBottom:'1px solid #f0f0f0',alignItems:'center',fontSize:'13px'}}>
                <span style={{fontWeight:'500'}}>{s.name}</span>
                <span style={{color:'#555'}}>{s.rollNumber}</span>
                <span style={{color:'#555'}}>{s.class}</span>
                <span style={{color:'#1565c0',fontWeight:'500'}}>{s.marks}</span>
                <span style={{color:'#2e7d32',fontWeight:'500'}}>{s.attendance}%</span>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default TeacherDashboard;