import React, { useState, useEffect } from 'react';
import { getStudents, addStudent, deleteStudent, getTeachers, addTeacher, deleteTeacher } from '../services/api';

const AdminDashboard = () => {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [activeTab, setActiveTab] = useState('students');
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [studentForm, setStudentForm] = useState({name:'',email:'',rollNumber:'',class:'',marks:'',attendance:''});
  const [teacherForm, setTeacherForm] = useState({name:'',email:'',subject:'',phone:''});

  useEffect(() => {
    fetchStudents();
    fetchTeachers();
  }, []);

  const fetchStudents = async () => {
    try {
      const { data } = await getStudents();
      setStudents(data);
    } catch (err) {
      setError('Failed to fetch students!');
    }
  };

  const fetchTeachers = async () => {
    try {
      const { data } = await getTeachers();
      setTeachers(data);
    } catch (err) {
      setError('Failed to fetch teachers!');
    }
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      await addStudent(studentForm);
      setSuccess('Student added successfully!');
      setShowForm(false);
      setStudentForm({name:'',email:'',rollNumber:'',class:'',marks:'',attendance:''});
      fetchStudents();
    } catch (err) {
      setError(err.response?.data?.message || 'Error adding student!');
    }
  };

  const handleAddTeacher = async (e) => {
    e.preventDefault();
    try {
      await addTeacher(teacherForm);
      setSuccess('Teacher added successfully!');
      setShowForm(false);
      setTeacherForm({name:'',email:'',subject:'',phone:''});
      fetchTeachers();
    } catch (err) {
      setError(err.response?.data?.message || 'Error adding teacher!');
    }
  };

  const handleDeleteStudent = async (id) => {
    try {
      await deleteStudent(id);
      setSuccess('Student deleted!');
      fetchStudents();
    } catch (err) {
      setError('Error deleting student!');
    }
  };

  const handleDeleteTeacher = async (id) => {
    try {
      await deleteTeacher(id);
      setSuccess('Teacher deleted!');
      fetchTeachers();
    } catch (err) {
      setError('Error deleting teacher!');
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
          <span style={{color:'rgba(255,255,255,0.85)',fontSize:'14px'}}>Welcome, Admin</span>
          <button onClick={logout} style={{background:'rgba(255,255,255,0.15)',color:'white',border:'1px solid rgba(255,255,255,0.3)',padding:'6px 14px',borderRadius:'6px',cursor:'pointer'}}>Logout</button>
        </div>
      </nav>

      <div style={{maxWidth:'900px',margin:'24px auto',padding:'0 16px'}}>
        {error && <p style={{color:'#e53935',background:'#ffebee',padding:'10px',borderRadius:'8px',marginBottom:'12px'}}>{error}</p>}
        {success && <p style={{color:'#2e7d32',background:'#e8f5e9',padding:'10px',borderRadius:'8px',marginBottom:'12px'}}>{success}</p>}

        <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'12px',marginBottom:'20px'}}>
          <div style={{background:'white',borderRadius:'10px',padding:'16px',border:'1px solid #e0e0e0',boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}}>
            <p style={{fontSize:'13px',color:'#777',margin:'0 0 6px'}}>Total Students</p>
            <p style={{fontSize:'28px',fontWeight:'600',color:'#1565c0',margin:0}}>{students.length}</p>
          </div>
          <div style={{background:'white',borderRadius:'10px',padding:'16px',border:'1px solid #e0e0e0',boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}}>
            <p style={{fontSize:'13px',color:'#777',margin:'0 0 6px'}}>Total Teachers</p>
            <p style={{fontSize:'28px',fontWeight:'600',color:'#e53935',margin:0}}>{teachers.length}</p>
          </div>
        </div>

        <div style={{display:'flex',gap:'8px',marginBottom:'16px'}}>
          <button onClick={() => {setActiveTab('students');setShowForm(false);}} style={{padding:'8px 20px',borderRadius:'8px',border:'none',cursor:'pointer',background:activeTab==='students'?'#1565c0':'#e0e0e0',color:activeTab==='students'?'white':'#555',fontWeight:'500'}}>Students</button>
          <button onClick={() => {setActiveTab('teachers');setShowForm(false);}} style={{padding:'8px 20px',borderRadius:'8px',border:'none',cursor:'pointer',background:activeTab==='teachers'?'#1565c0':'#e0e0e0',color:activeTab==='teachers'?'white':'#555',fontWeight:'500'}}>Teachers</button>
        </div>

        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'12px'}}>
          <h3 style={{margin:0,color:'#1a1a2e'}}>{activeTab==='students'?'Students List':'Teachers List'}</h3>
          <button onClick={() => setShowForm(!showForm)} style={{background:'#1565c0',color:'white',border:'none',padding:'8px 18px',borderRadius:'8px',cursor:'pointer'}}>
            {showForm?'Cancel':`+ Add ${activeTab==='students'?'Student':'Teacher'}`}
          </button>
        </div>

        {showForm && activeTab==='students' && (
          <form onSubmit={handleAddStudent} style={{background:'white',padding:'1.5rem',borderRadius:'10px',marginBottom:'16px',border:'1px solid #e0e0e0'}}>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
              {[['Name','name','text'],['Email','email','email'],['Roll Number','rollNumber','text'],['Class','class','text'],['Marks','marks','number'],['Attendance %','attendance','number']].map(([label,name,type]) => (
                <div key={name}>
                  <label style={{display:'block',fontSize:'13px',color:'#555',marginBottom:'4px'}}>{label}</label>
                  <input type={type} placeholder={label} value={studentForm[name]} onChange={(e) => setStudentForm({...studentForm,[name]:e.target.value})} style={{width:'100%',padding:'8px 12px',border:'1px solid #e0e0e0',borderRadius:'8px',fontSize:'14px',boxSizing:'border-box'}} required />
                </div>
              ))}
            </div>
            <button type="submit" style={{marginTop:'12px',background:'#1565c0',color:'white',border:'none',padding:'10px 24px',borderRadius:'8px',cursor:'pointer'}}>Add Student</button>
          </form>
        )}

        {showForm && activeTab==='teachers' && (
          <form onSubmit={handleAddTeacher} style={{background:'white',padding:'1.5rem',borderRadius:'10px',marginBottom:'16px',border:'1px solid #e0e0e0'}}>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
              {[['Name','name','text'],['Email','email','email'],['Subject','subject','text'],['Phone','phone','text']].map(([label,name,type]) => (
                <div key={name}>
                  <label style={{display:'block',fontSize:'13px',color:'#555',marginBottom:'4px'}}>{label}</label>
                  <input type={type} placeholder={label} value={teacherForm[name]} onChange={(e) => setTeacherForm({...teacherForm,[name]:e.target.value})} style={{width:'100%',padding:'8px 12px',border:'1px solid #e0e0e0',borderRadius:'8px',fontSize:'14px',boxSizing:'border-box'}} required />
                </div>
              ))}
            </div>
            <button type="submit" style={{marginTop:'12px',background:'#1565c0',color:'white',border:'none',padding:'10px 24px',borderRadius:'8px',cursor:'pointer'}}>Add Teacher</button>
          </form>
        )}

        <div style={{background:'white',borderRadius:'10px',border:'1px solid #e0e0e0',overflow:'hidden',boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}}>
          {activeTab==='students' ? (
            students.length===0 ? (
              <p style={{textAlign:'center',padding:'2rem',color:'#888'}}>No students found. Add a student!</p>
            ) : (
              students.map((s) => (
                <div key={s._id} style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr 80px',padding:'12px 16px',borderBottom:'1px solid #f0f0f0',alignItems:'center',fontSize:'13px'}}>
                  <span style={{fontWeight:'500'}}>{s.name}</span>
                  <span style={{color:'#555'}}>{s.rollNumber}</span>
                  <span style={{color:'#555'}}>{s.class}</span>
                  <span style={{color:'#1565c0',fontWeight:'500'}}>Marks: {s.marks}</span>
                  <button onClick={() => handleDeleteStudent(s._id)} style={{background:'#ffebee',color:'#e53935',border:'none',padding:'4px 10px',borderRadius:'6px',cursor:'pointer',fontSize:'12px'}}>Delete</button>
                </div>
              ))
            )
          ) : (
            teachers.length===0 ? (
              <p style={{textAlign:'center',padding:'2rem',color:'#888'}}>No teachers found. Add a teacher!</p>
            ) : (
              teachers.map((t) => (
                <div key={t._id} style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr 80px',padding:'12px 16px',borderBottom:'1px solid #f0f0f0',alignItems:'center',fontSize:'13px'}}>
                  <span style={{fontWeight:'500'}}>{t.name}</span>
                  <span style={{color:'#555'}}>{t.subject}</span>
                  <span style={{color:'#555'}}>{t.phone}</span>
                  <button onClick={() => handleDeleteTeacher(t._id)} style={{background:'#ffebee',color:'#e53935',border:'none',padding:'4px 10px',borderRadius:'6px',cursor:'pointer',fontSize:'12px'}}>Delete</button>
                </div>
              ))
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;