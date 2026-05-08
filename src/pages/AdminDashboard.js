import React from 'react';

const AdminDashboard = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Admin Dashboard</h1>
      <p>Welcome Admin!</p>
    </div>
  );
};

const styles = {
  container: { minHeight: '100vh', background: '#f0f2f5', padding: '2rem' },
  title: { color: '#1565c0' },
};

export default AdminDashboard;