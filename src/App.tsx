import React, { useState, useEffect } from 'react';
import { LoginPage } from './pages/LoginPage';
import { AdminPanel } from './pages/AdminPanel';
import { DeveloperPanel } from './pages/DeveloperPanel';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState<'admin' | 'developer'>('admin');

  useEffect(() => {
    const auth = localStorage.getItem('auth');
    if (auth) {
      const { loggedIn, userRole } = JSON.parse(auth);
      setIsLoggedIn(loggedIn);
      setRole(userRole);
    }
  }, []);

  const handleLogin = (userRole: 'admin' | 'developer') => {
    setRole(userRole);
    setIsLoggedIn(true);
    localStorage.setItem('auth', JSON.stringify({ loggedIn: true, userRole }));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('auth');
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <>
      {role === 'admin' ? (
        <AdminPanel onLogout={handleLogout} />
      ) : (
        <DeveloperPanel onLogout={handleLogout} />
      )}
    </>
  );
}

export default App;
