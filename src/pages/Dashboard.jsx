import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';
import { useTheme } from '../components/contexts/ThemeContext';
import Header from '../components/Layout/Header';
import ResumeCard from '../components/Resumes/ResumeCard';

const Dashboard = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [user, setUser] = useState(null);
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
    fetchResumes();
  }, []);

  const checkAuth = async () => {
    try {
      // First check localStorage
      const storedUser = localStorage.getItem('resume-user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        return;
      }
      
      // Then check Supabase session
      const { data: { user: supabaseUser } } = await supabase.auth.getUser();
      
      if (!supabaseUser) {
        navigate('/login');
      } else {
        setUser(supabaseUser);
        localStorage.setItem('resume-user', JSON.stringify(supabaseUser));
      }
    } catch (error) {
      console.error('Auth check error:', error);
      navigate('/login');
    }
  };

  const fetchResumes = async () => {
    try {
      const storedUser = localStorage.getItem('resume-user');
      const currentUser = storedUser ? JSON.parse(storedUser) : null;
      
      if (!currentUser) {
        setLoading(false);
        return;
      }
      
      const { data, error } = await supabase
        .from('resumes')
        .select('*')
        .eq('user_id', currentUser.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setResumes(data || []);
    } catch (error) {
      console.error('Error fetching resumes:', error);
      setResumes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      localStorage.removeItem('resume-user');
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleDeleteResume = async (id) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      try {
        const { error } = await supabase
          .from('resumes')
          .delete()
          .eq('id', id);
        
        if (error) throw error;
        
        setResumes(resumes.filter(resume => resume.id !== id));
        alert('✅ Resume deleted successfully!');
      } catch (error) {
        console.error('Delete error:', error);
        alert('❌ Error deleting resume');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-vh-100 ${isDarkMode ? 'bg-dark' : 'bg-light'}`}>
      <Header user={user} onLogout={handleLogout} />
      
      <main className="container py-5">
        {/* Dashboard Header - Logout button removed */}
        <div className="d-flex justify-content-between align-items-center mb-5">
          <div>
            <h1 className={`display-6 fw-bold ${isDarkMode ? 'text-light' : 'text-dark'}`}>
              My Dashboard
            </h1>
            <p className={`${isDarkMode ? 'text-light' : 'text-muted'}`}>
              Welcome back, {user?.email?.split('@')[0] || 'User'}!
            </p>
          </div>
          <div className="d-flex gap-3">
            {/* Only Create Resume button - Logout button removed */}
            <Link to="/builder" className="btn btn-primary">
              <i className="bi bi-plus-circle me-2"></i>
              Create New Resume
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="row mb-5">
          <div className="col-md-3 mb-3">
            <div className={`card ${isDarkMode ? 'bg-dark text-light border-secondary' : 'bg-white'}`}>
              <div className="card-body text-center">
                <h2 className="display-4">{resumes.length}</h2>
                <p className="text-muted mb-0">Total Resumes</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className={`card ${isDarkMode ? 'bg-dark text-light border-secondary' : 'bg-white'}`}>
              <div className="card-body text-center">
                <h2 className="display-4">3</h2>
                <p className="text-muted mb-0">Templates</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className={`card ${isDarkMode ? 'bg-dark text-light border-secondary' : 'bg-white'}`}>
              <div className="card-body text-center">
                <h2 className="display-4">0</h2>
                <p className="text-muted mb-0">Downloads</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className={`card ${isDarkMode ? 'bg-dark text-light border-secondary' : 'bg-white'}`}>
              <div className="card-body text-center">
                <h2 className="display-4">{resumes.filter(r => r.updated_at).length}</h2>
                <p className="text-muted mb-0">Active</p>
              </div>
            </div>
          </div>
        </div>

        {/* Resumes Section */}
        <div className="mb-4">
          <h3 className={`mb-4 ${isDarkMode ? 'text-light' : 'text-dark'}`}>
            My Resumes
            <span className="badge bg-primary ms-2">{resumes.length}</span>
          </h3>
          
          {resumes.length === 0 ? (
            <div className={`card ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`}>
              <div className="card-body text-center py-5">
                <i className="bi bi-file-text display-1 text-muted mb-3"></i>
                <h4>No Resumes Yet</h4>
                <p className="text-muted">Start by creating your first resume</p>
                <Link to="/builder" className="btn btn-primary">
                  Create First Resume
                </Link>
              </div>
            </div>
          ) : (
            <div className="row">
              {resumes.map((resume) => (
                <div key={resume.id} className="col-md-6 col-lg-4 mb-4">
                  <ResumeCard
                    resume={resume}
                    onDelete={handleDeleteResume}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className={`card ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`}>
          <div className="card-body">
            <h5 className="card-title mb-4">Quick Actions</h5>
            <div className="row g-3">
              <div className="col-md-4">
                <Link to="/builder" className="btn btn-outline-primary w-100">
                  <i className="bi bi-plus-circle me-2"></i>
                  New Resume
                </Link>
              </div>
              <div className="col-md-4">
                <button className="btn btn-outline-success w-100" onClick={() => alert('Export feature coming soon!')}>
                  <i className="bi bi-download me-2"></i>
                  Export All
                </button>
              </div>
              <div className="col-md-4">
                <button className="btn btn-outline-info w-100" onClick={() => window.print()}>
                  <i className="bi bi-printer me-2"></i>
                  Print All
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;