import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const Header = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      localStorage.removeItem('resume-user');
      navigate('/login');
    }
  };

  return (
    <nav className={`navbar navbar-expand-lg ${isDarkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-white'} shadow-sm`}>
      <div className="container">
        <Link className="navbar-brand fw-bold fs-4" to="/dashboard">
          <span className="text-primary">📄 Resume</span>
          <span className="text-gradient ms-1">Builder</span>
        </Link>
        
        <div className="d-flex align-items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`btn btn-sm ${isDarkMode ? 'btn-warning' : 'btn-outline-secondary'}`}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
          
          {/* User Info */}
          {user && (
            <span className={`${isDarkMode ? 'text-light' : 'text-dark'}`}>
              👋 {user.email?.split('@')[0]}
            </span>
          )}
          
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="btn btn-outline-danger btn-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;