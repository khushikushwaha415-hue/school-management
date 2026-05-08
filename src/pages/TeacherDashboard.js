import React from 'react';

const TeacherDashboard = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Teacher Dashboard</h1>
      <p>Welcome Teacher!</p>
    </div>
  );
};

const styles = {
  container: { minHeight: '100vh', background: '#f0f2f5', padding: '2rem' },
  title: { color: '#1565c0' },
};

export default TeacherDashboard;