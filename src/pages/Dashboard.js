import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [textOpacity, setTextOpacity] = useState(0); // Initialize opacity to 0

  useEffect(() => {
    // Change opacity to 1 to trigger fade-in after the component is mounted
    const timer = setTimeout(() => {
      setTextOpacity(1);
    }, 100); // Adding a slight delay to ensure the component is fully mounted
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh', 
      textAlign: 'center',
      backgroundColor: '#0f3c42' // Background color of the container
    }}>
      <h1 style={{
        color: '#35c9dd', // Text color
        opacity: textOpacity, // Use state for dynamic opacity
        transition: 'opacity 3.5s ease-in',
        margin: '0 auto', 
        width: '90%', // Responsive width
        maxWidth: '600px' // Maximum width for larger screens
      }}>
        Welcome to the Rick and Morty Universe!
      </h1>
      <button onClick={() => navigate('/character')} style={{ 
        marginTop: '20px', 
        padding: '10px 20px', 
        fontSize: '16px', 
        cursor: 'pointer', 
        width: '250px', 
        height: '50px', 
        borderRadius: '48px', 
        backgroundColor: '#35c9dd', 
        color: 'black', 
        fontWeight:'500',
        border: 'none'
      }}>
        Let's get started! →
      </button>
    </div>
  );
};

export default Dashboard;