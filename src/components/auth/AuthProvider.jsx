import { useState } from 'react';
import Login from './Login';
import App from '../main/App';

function AuthProvider() {
  // Initialize state directly from localStorage
  const initialLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
  const initialUsername = sessionStorage.getItem('currentUser') || '';
  
  const [isAuthenticated, setIsAuthenticated] = useState(initialLoggedIn);
  const [username, setUsername] = useState(initialUsername);

  const handleLogin = (username) => {
    setIsAuthenticated(true);
    setUsername(username);
    // Store in localStorage
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('currentUser', username);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('currentUser');
    setIsAuthenticated(false);
    setUsername('');
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  // Render App with props
  return <App username={username} onLogout={handleLogout} />;
}

export default AuthProvider;