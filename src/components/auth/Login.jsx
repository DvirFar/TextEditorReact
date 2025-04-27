import { useState, useEffect } from 'react';
import styles from './Login.module.css';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!username.trim() || !password.trim()) {
      setError('Username and password are required');
      return;
    }
    
    // Check if user exists in localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
      // Save login status
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('currentUser', username);
      onLogin(username);
    } else {
      // Check if this is the first login (no users yet)
      if (users.length === 0) {
        setError('Invalid username or password');
      } else {
        setError('Invalid username or password');
      }
    }
  };

  const handleRegister = () => {
    if (!username.trim() || !password.trim()) {
      setError('Username and password are required');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.some(u => u.username === username)) {
      setError('Username already exists');
      return;
    }
    
    const newUsers = [...users, { username, password }];
    localStorage.setItem('users', JSON.stringify(newUsers));
    setError('');
    alert('Registration successful! You can now log in.');
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h2>Text Editor Login</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <div className={styles.error}>{error}</div>}
          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.loginButton}>Login</button>
            <button 
              type="button" 
              className={styles.registerButton}
              onClick={handleRegister}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;