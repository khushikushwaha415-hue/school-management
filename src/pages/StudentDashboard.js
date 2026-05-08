import React from 'react';

const StudentDashboard = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Student Dashboard</h1>
      <p>Welcome Student!</p>
    </div>
  );
};

const styles = {
  container: { minHeight: '100vh', background: '#f0f2f5', padding: '2rem' },
  title: { color: '#1565c0' },
};

export default StudentDashboard;