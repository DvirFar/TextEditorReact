import { useState } from 'react';
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
    
    let user = JSON.parse(localStorage.getItem(username) || '');
    
    if (user?.password === password) {
      // Save login status
      sessionStorage.setItem('isLoggedIn', 'true');
      sessionStorage.setItem('currentUser', username);
      onLogin(username);
    } else {
        setError('Invalid username or password');
    }
  };

  const handleRegister = () => {
    if (!username.trim() || !password.trim()) {
      setError('Username and password are required');
      return;
    }

    const userNameList = JSON.parse(localStorage.getItem('userNameList') || '[]');
    
    if (userNameList.includes(username)) {
      setError('Username already exists');
      return;
    }


    
    const newUsers = [...userNameList, username];
    localStorage.setItem('userNameList', JSON.stringify(newUsers));
    localStorage.setItem(username, JSON.stringify({ password, files: {} }));
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