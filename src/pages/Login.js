import React, { useState } from 'react';
import { login } from '../services/api';
const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await login(formData);
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      localStorage.setItem('userName', data.name);
      if (data.role === 'admin') window.location.href = '/admin';
      else if (data.role === 'teacher') window.location.href = '/teacher';
      else window.location.href = '/student';
    } catch (err) {
      setError(err.response?.data?.message || 'Server error!');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div style={{minHeight:'100vh',background:'#f0f2f5',display:'flex',justifyContent:'center',alignItems:'center'}}>
      <div style={{background:'white',borderRadius:'12px',padding:'2rem',width:'100%',maxWidth:'420px',boxShadow:'0 2px 12px rgba(0,0,0,0.08)'}}>
        <div style={{textAlign:'center',marginBottom:'1.5rem'}}>
          <h1 style={{fontSize:'24px',fontWeight:'600',color:'#1a1a2e',margin:'0 0 4px'}}>🏫 School Management</h1>
          <p style={{fontSize:'13px',color:'#888',margin:0}}>Login to your account</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{marginBottom:'1rem'}}>
            <label style={{display:'block',fontSize:'13px',color:'#555',marginBottom:'5px'}}>Email</label>
            <input type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} style={{width:'100%',padding:'10px 12px',border:'1px solid #e0e0e0',borderRadius:'8px',fontSize:'14px',outline:'none',boxSizing:'border-box'}} required />
          </div>
          <div style={{marginBottom:'1rem'}}>
            <label style={{display:'block',fontSize:'13px',color:'#555',marginBottom:'5px'}}>Password</label>
            <input type="password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} style={{width:'100%',padding:'10px 12px',border:'1px solid #e0e0e0',borderRadius:'8px',fontSize:'14px',outline:'none',boxSizing:'border-box'}} required />
          </div>
          {error && <p style={{color:'#e53935',fontSize:'13px',marginBottom:'8px'}}>{error}</p>}
          <button type="submit" style={{width:'100%',padding:'11px',background:'#1565c0',color:'white',border:'none',borderRadius:'8px',fontSize:'15px',fontWeight:'500',cursor:'pointer',marginTop:'0.5rem'}} disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};
export default Login;