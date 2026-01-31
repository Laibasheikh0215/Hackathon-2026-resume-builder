import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../utils/supabaseClient'
import { useTheme } from '../components/contexts/ThemeContext'
import ClassicTemplate from '../components/Resumes/templates/ClassicTemplate'
import ModernTemplate from '../components/Resumes/templates/ModernTemplate'
import CreativeTemplate from '../components/Resumes/templates/CreativeTemplate'
import { generatePDF } from '../utils/pdfGenerator'

const ViewResume = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isDarkMode } = useTheme()
  const [resume, setResume] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchResume()
  }, [id])

  const fetchResume = async () => {
    try {
      const { data, error } = await supabase
        .from('resumes')
        .select('*')
        .eq('id', id)
        .single()
      
      if (error) throw error
      
      setResume(data)
    } catch (error) {
      console.error('Error fetching resume:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadPDF = () => {
    const resumeElement = document.getElementById('resume-preview')
    if (resumeElement) {
      generatePDF(resumeElement, resume?.personal_info?.fullName || 'resume')
    }
  }

  const renderTemplate = () => {
    if (!resume) return null

    const templateProps = {
      data: resume,
      isDarkMode,
    }

    switch (resume.template) {
      case 'modern':
        return <ModernTemplate {...templateProps} />
      case 'creative':
        return <CreativeTemplate {...templateProps} />
      default:
        return <ClassicTemplate {...templateProps} />
    }
  }

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  if (!resume) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <h2>Resume not found</h2>
          <button 
            className="btn btn-primary mt-3"
            onClick={() => navigate('/dashboard')}
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-vh-100 ${isDarkMode ? 'bg-dark' : 'bg-light'}`}>
      {/* Header */}
      <nav className={`navbar ${isDarkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-white'} shadow-sm`}>
        <div className="container">
          <div className="navbar-brand fw-bold">
            <span className="text-primary">📄 Resume</span>
            <span className="text-gradient ms-1">Builder</span>
          </div>
          
          <div className="d-flex gap-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="btn btn-outline-secondary"
            >
              ← Dashboard
            </button>
            <button
              onClick={() => navigate(`/builder/${resume.id}`)}
              className="btn btn-primary"
            >
              Edit Resume
            </button>
            <button
              onClick={handleDownloadPDF}
              className="btn btn-success"
            >
              📥 Download PDF
            </button>
          </div>
        </div>
      </nav>

      {/* Resume Preview */}
      <div className="container py-5">
        <div className="card">
          <div className="card-body">
            <div className="text-center mb-4">
              <h1>{resume.title}</h1>
              <p className="text-muted">Template: {resume.template}</p>
            </div>
            
            <div id="resume-preview">
              {renderTemplate()}
            </div>
            
            <div className="d-flex justify-content-center gap-3 mt-4">
              <button
                onClick={handleDownloadPDF}
                className="btn btn-success"
              >
                📥 Download PDF
              </button>
              <button
                onClick={() => window.print()}
                className="btn btn-primary"
              >
                🖨️ Print
              </button>
              <button
                onClick={() => navigate(`/builder/${resume.id}`)}
                className="btn btn-warning"
              >
                ✏️ Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewResume