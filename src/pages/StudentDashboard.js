import React, { useState, useEffect } from 'react';
import { getStudents } from '../services/api';

const StudentDashboard = () => {
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState('');
  const userName = localStorage.getItem('userName');

  useEffect(() => {
    fetchMyData();
  }, []);

  const fetchMyData = async () => {
    try {
      const { data } = await getStudents();
      const myData = data.find(s => s.email === localStorage.getItem('userEmail'));
      setStudentData(myData);
    } catch (err) {
      setError('Failed to fetch data!');
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

      <div style={{maxWidth:'700px',margin:'24px auto',padding:'0 16px'}}>

        {error && <p style={{color:'#e53935',background:'#ffebee',padding:'10px',borderRadius:'8px',marginBottom:'12px'}}>{error}</p>}

        <h2 style={{color:'#1a1a2e',marginBottom:'16px'}}>My Profile</h2>

        {studentData ? (
          <div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'12px',marginBottom:'20px'}}>
              <div style={{background:'white',borderRadius:'10px',padding:'16px',border:'1px solid #e0e0e0',boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}}>
                <p style={{fontSize:'13px',color:'#777',margin:'0 0 6px'}}>My Marks</p>
                <p style={{fontSize:'28px',fontWeight:'600',color:'#1565c0',margin:0}}>{studentData.marks}</p>
              </div>
              <div style={{background:'white',borderRadius:'10px',padding:'16px',border:'1px solid #e0e0e0',boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}}>
                <p style={{fontSize:'13px',color:'#777',margin:'0 0 6px'}}>My Attendance</p>
                <p style={{fontSize:'28px',fontWeight:'600',color:'#2e7d32',margin:0}}>{studentData.attendance}%</p>
              </div>
            </div>

            <div style={{background:'white',borderRadius:'10px',padding:'1.5rem',border:'1px solid #e0e0e0',boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}}>
              <h3 style={{margin:'0 0 16px',color:'#1a1a2e'}}>My Details</h3>
              {[['Name', studentData.name],['Email', studentData.email],['Roll Number', studentData.rollNumber],['Class', studentData.class]].map(([label, value]) => (
                <div key={label} style={{display:'flex',justifyContent:'space-between',padding:'10px 0',borderBottom:'1px solid #f0f0f0'}}>
                  <span style={{fontSize:'13px',color:'#777'}}>{label}</span>
                  <span style={{fontSize:'13px',fontWeight:'500',color:'#1a1a2e'}}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div style={{background:'white',borderRadius:'10px',padding:'2rem',border:'1px solid #e0e0e0',textAlign:'center'}}>
            <p style={{color:'#888'}}>No profile data found. Please contact Admin.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default StudentDashboard;
