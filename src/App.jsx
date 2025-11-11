import { useState, useEffect } from 'react'
import './App.css'
import Hero from './components/custom/Hero'
import HomePage from './components/custom/HomePage'

function App() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <>
      {user ? (
        // Show HomePage for logged in users
        <HomePage />
      ) : (
        // Show Hero/Landing page for non-logged in users
        <Hero />
      )}
    </>
  )
}

export default App
