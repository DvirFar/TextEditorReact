import { useState, useEffect } from 'react';
import Login from './Login';
import App from '../main/App';

function AuthProvider() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const savedUsername = localStorage.getItem('currentUser');
    
    if (loggedIn && savedUsername) {
      setIsAuthenticated(true);
      setUsername(savedUsername);
    }
    
    setLoading(false);
  }, []);

  const handleLogin = (username) => {
    setIsAuthenticated(true);
    setUsername(username);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    setIsAuthenticated(false);
    setUsername('');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  // Render App with props
  return <App username={username} onLogout={handleLogout} />;
}

export default AuthProvider;