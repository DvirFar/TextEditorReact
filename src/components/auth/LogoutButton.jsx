import styles from './LogoutButton.module.css';

function LogoutButton({ username, onLogout }) {
  return (
    <div className={styles.logoutContainer}>
      <span className={styles.username}>Logged in as: {username}</span>
      <button onClick={onLogout} className={styles.logoutButton}>Logout</button>
    </div>
  );
}

export default LogoutButton;