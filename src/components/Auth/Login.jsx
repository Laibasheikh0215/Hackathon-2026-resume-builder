import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../utils/supabaseClient';
import { useTheme } from '../contexts/ThemeContext';

const Login = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      console.log('Attempting login with:', formData.email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password
      });
      
      console.log('Login response:', data, error);
      
      if (error) {
        throw error;
      }
      
      if (data.user) {
        console.log('User logged in:', data.user);
        
        // Check if user exists in users table, if not create
        const { data: userData } = await supabase
          .from('users')
          .select('*')
          .eq('id', data.user.id)
          .single();
          
        if (!userData) {
          // Create user profile
          await supabase
            .from('users')
            .insert({
              id: data.user.id,
              email: data.user.email,
              full_name: data.user.user_metadata?.full_name || data.user.email.split('@')[0],
              created_at: new Date().toISOString()
            });
        }
        
        // Store user in localStorage
        localStorage.setItem('resume-user', JSON.stringify(data.user));
        
        // Redirect to dashboard
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-vh-100 d-flex align-items-center ${isDarkMode ? 'bg-dark' : 'bg-light'}`}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className={`card shadow-lg border-0 ${isDarkMode ? 'bg-dark text-light' : ''}`}>
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <h1 className="h2 fw-bold mb-3">Welcome Back 👋</h1>
                  <p className="text-muted">Sign in to your Resume Builder account</p>
                </div>
                
                {error && (
                  <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>Error:</strong> {error}
                    <button type="button" className="btn-close" onClick={() => setError('')}></button>
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      className={`form-control ${isDarkMode ? 'bg-secondary text-light' : ''}`}
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className={`form-control ${isDarkMode ? 'bg-secondary text-light' : ''}`}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="btn btn-primary w-100 py-2 mb-3"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Signing in...
                      </>
                    ) : (
                      'Sign In'
                    )}
                  </button>
                  
                  <div className="text-center">
                    <p className="mb-0">
                      Don't have an account?{' '}
                      <Link to="/signup" className="text-decoration-none fw-bold">
                        Sign up
                      </Link>
                    </p>
                    
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;