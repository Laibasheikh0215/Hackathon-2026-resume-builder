import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'
import { supabase } from '../../utils/supabaseClient'
import { generatePDF } from '../../utils/pdfGenerator'
import ClassicTemplate from './templates/ClassicTemplate'
import ModernTemplate from './templates/ModernTemplate'
import CreativeTemplate from './templates/CreativeTemplate'
import TemplateSelector from './TemplateSelector'

const ResumeForm = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { isDarkMode, toggleTheme } = useTheme()
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  
  const [formData, setFormData] = useState({
    title: 'My Resume',
    template: 'classic',
    personal_info: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      linkedin: '',
      github: '',
      website: '',
    },
    summary: '',
    education: [],
    experience: [],
    skills: [],
    languages: [],
  })

  const [newEducation, setNewEducation] = useState({
    degree: '',
    institution: '',
    year: '',
    gpa: '',
  })

  const [newExperience, setNewExperience] = useState({
    position: '',
    company: '',
    duration: '',
    description: '',
  })

  const [newSkill, setNewSkill] = useState('')
  const [newLanguage, setNewLanguage] = useState('')

  useEffect(() => {
    if (id) {
      fetchResume()
    }
  }, [id])

  const fetchResume = async () => {
    try {
      const { data, error } = await supabase
        .from('resumes')
        .select('*')
        .eq('id', id)
        .single()
      
      if (error) throw error
      
      if (data) {
        setFormData({
          title: data.title || 'My Resume',
          template: data.template || 'classic',
          personal_info: data.personal_info || {},
          summary: data.summary || '',
          education: data.education || [],
          experience: data.experience || [],
          skills: data.skills || [],
          languages: data.languages || [],
        })
      }
    } catch (error) {
      console.error('Error fetching resume:', error)
    }
  }

  const handlePersonalInfoChange = (e) => {
    setFormData({
      ...formData,
      personal_info: {
        ...formData.personal_info,
        [e.target.name]: e.target.value,
      },
    })
  }

  const addEducation = () => {
    if (newEducation.degree && newEducation.institution) {
      setFormData({
        ...formData,
        education: [...formData.education, { ...newEducation, id: Date.now() }],
      })
      setNewEducation({ degree: '', institution: '', year: '', gpa: '' })
    }
  }

  const removeEducation = (index) => {
    const updatedEducation = formData.education.filter((_, i) => i !== index)
    setFormData({ ...formData, education: updatedEducation })
  }

  const addExperience = () => {
    if (newExperience.position && newExperience.company) {
      setFormData({
        ...formData,
        experience: [...formData.experience, { ...newExperience, id: Date.now() }],
      })
      setNewExperience({ position: '', company: '', duration: '', description: '' })
    }
  }

  const removeExperience = (index) => {
    const updatedExperience = formData.experience.filter((_, i) => i !== index)
    setFormData({ ...formData, experience: updatedExperience })
  }

  const addSkill = () => {
    if (newSkill.trim()) {
      setFormData({
        ...formData,
        skills: [...formData.skills, newSkill.trim()],
      })
      setNewSkill('')
    }
  }

  const removeSkill = (index) => {
    const updatedSkills = formData.skills.filter((_, i) => i !== index)
    setFormData({ ...formData, skills: updatedSkills })
  }

  const addLanguage = () => {
    if (newLanguage.trim()) {
      setFormData({
        ...formData,
        languages: [...formData.languages, newLanguage.trim()],
      })
      setNewLanguage('')
    }
  }

  const removeLanguage = (index) => {
    const updatedLanguages = formData.languages.filter((_, i) => i !== index)
    setFormData({ ...formData, languages: updatedLanguages })
  }

  const handleTemplateSelect = (template) => {
    setFormData({ ...formData, template })
  }

  const handleSave = async () => {
  setSaving(true);
  
  try {
    // Get user from localStorage first
    const storedUser = localStorage.getItem('resume-user');
    if (!storedUser) {
      throw new Error('User not authenticated. Please login again.');
    }
    
    const user = JSON.parse(storedUser);
    
    const resumeData = {
      user_id: user.id,
      title: formData.title,
      template: formData.template,
      personal_info: formData.personal_info,
      summary: formData.summary,
      education: formData.education,
      experience: formData.experience,
      skills: formData.skills,
      languages: formData.languages,
      created_at: id ? undefined : new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    console.log('Saving resume data:', resumeData);
    
    let result;
    
    if (id) {
      // Update existing resume
      result = await supabase
        .from('resumes')
        .update(resumeData)
        .eq('id', id);
    } else {
      // Create new resume
      result = await supabase
        .from('resumes')
        .insert([resumeData]);
    }
    
    const { error, data } = result;
    
    if (error) {
      console.error('Supabase error:', error);
      throw new Error(`Save failed: ${error.message}`);
    }
    
    alert('✅ Resume saved successfully!');
    
    // Redirect to dashboard after save
    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
    
  } catch (error) {
    console.error('Error saving resume:', error);
    
    // If Supabase fails, save to localStorage
    if (error.message.includes('User not authenticated') || error.message.includes('JWT')) {
      console.log('Saving to localStorage instead...');
      saveToLocalStorage();
    } else {
      alert(`❌ Error: ${error.message}`);
    }
  } finally {
    setSaving(false);
  }
};

// Backup function to save to localStorage
const saveToLocalStorage = () => {
  try {
    const resumes = JSON.parse(localStorage.getItem('local-resumes') || '[]');
    const resumeData = {
      id: id || 'resume-' + Date.now(),
      title: formData.title,
      template: formData.template,
      personal_info: formData.personal_info,
      summary: formData.summary,
      education: formData.education,
      experience: formData.experience,
      skills: formData.skills,
      languages: formData.languages,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    if (id) {
      // Update existing
      const index = resumes.findIndex(r => r.id === id);
      if (index !== -1) {
        resumes[index] = resumeData;
      } else {
        resumes.push(resumeData);
      }
    } else {
      // Add new
      resumes.push(resumeData);
    }
    
    localStorage.setItem('local-resumes', JSON.stringify(resumes));
    alert('✅ Resume saved to local storage!');
    
    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
    
  } catch (err) {
    console.error('Local storage error:', err);
    alert('❌ Failed to save resume. Please try again.');
  }
};

  const handleDownloadPDF = () => {
    const resumeElement = document.getElementById('resume-preview')
    if (resumeElement) {
      generatePDF(resumeElement, formData.personal_info.fullName || 'resume')
    }
  }

  const renderTemplate = () => {
    const templateProps = {
      data: formData,
      isDarkMode,
    }

    switch (formData.template) {
      case 'modern':
        return <ModernTemplate {...templateProps} />
      case 'creative':
        return <CreativeTemplate {...templateProps} />
      default:
        return <ClassicTemplate {...templateProps} />
    }
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
          
          <div className="d-flex align-items-center gap-3">
            <button
              onClick={toggleTheme}
              className={`btn btn-sm ${isDarkMode ? 'btn-warning' : 'btn-outline-secondary'}`}
            >
              {isDarkMode ? '☀️ Light' : '🌙 Dark'}
            </button>
            
            <button
              onClick={handleDownloadPDF}
              className="btn btn-success"
            >
              📥 Download PDF
            </button>
            
            <button
              onClick={handleSave}
              disabled={saving}
              className="btn btn-primary"
            >
              {saving ? 'Saving...' : '💾 Save Resume'}
            </button>
            
            <button
              onClick={() => navigate('/dashboard')}
              className="btn btn-outline-secondary"
            >
              ← Dashboard
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container py-4">
        <div className="row g-4">
          {/* Left Column - Form */}
          <div className="col-lg-6">
            <div className={`card ${isDarkMode ? 'bg-dark text-light' : ''}`}>
              <div className="card-body">
                <h2 className="card-title mb-4">Resume Details</h2>
                
                {/* Title */}
                <div className="mb-4">
                  <label className="form-label">Resume Title</label>
                  <input
                    type="text"
                    className={`form-control ${isDarkMode ? 'bg-secondary text-light' : ''}`}
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="My Professional Resume"
                  />
                </div>

                {/* Personal Info */}
                <div className="mb-4">
                  <h5 className="mb-3">Personal Information</h5>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Full Name *</label>
                      <input
                        type="text"
                        name="fullName"
                        className={`form-control ${isDarkMode ? 'bg-secondary text-light' : ''}`}
                        value={formData.personal_info.fullName}
                        onChange={handlePersonalInfoChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Email *</label>
                      <input
                        type="email"
                        name="email"
                        className={`form-control ${isDarkMode ? 'bg-secondary text-light' : ''}`}
                        value={formData.personal_info.email}
                        onChange={handlePersonalInfoChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        className={`form-control ${isDarkMode ? 'bg-secondary text-light' : ''}`}
                        value={formData.personal_info.phone}
                        onChange={handlePersonalInfoChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Address</label>
                      <input
                        type="text"
                        name="address"
                        className={`form-control ${isDarkMode ? 'bg-secondary text-light' : ''}`}
                        value={formData.personal_info.address}
                        onChange={handlePersonalInfoChange}
                      />
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <div className="mb-4">
                  <label className="form-label">Profile Summary</label>
                  <textarea
                    className={`form-control ${isDarkMode ? 'bg-secondary text-light' : ''}`}
                    rows="3"
                    value={formData.summary}
                    onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                    placeholder="Write a brief summary about yourself..."
                  />
                </div>

                {/* Education */}
                <div className="mb-4">
                  <h5 className="mb-3">Education</h5>
                  {formData.education.map((edu, index) => (
                    <div key={index} className="card mb-2">
                      <div className="card-body p-2">
                        <div className="d-flex justify-content-between">
                          <div>
                            <strong>{edu.degree}</strong>
                            <div className="small">{edu.institution} ({edu.year})</div>
                            {edu.gpa && <div className="small">GPA: {edu.gpa}</div>}
                          </div>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => removeEducation(index)}
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="row g-2">
                    <div className="col-md-6">
                      <input
                        type="text"
                        className={`form-control ${isDarkMode ? 'bg-secondary text-light' : ''}`}
                        placeholder="Degree"
                        value={newEducation.degree}
                        onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        className={`form-control ${isDarkMode ? 'bg-secondary text-light' : ''}`}
                        placeholder="Institution"
                        value={newEducation.institution}
                        onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        className={`form-control ${isDarkMode ? 'bg-secondary text-light' : ''}`}
                        placeholder="Year"
                        value={newEducation.year}
                        onChange={(e) => setNewEducation({ ...newEducation, year: e.target.value })}
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        className={`form-control ${isDarkMode ? 'bg-secondary text-light' : ''}`}
                        placeholder="GPA"
                        value={newEducation.gpa}
                        onChange={(e) => setNewEducation({ ...newEducation, gpa: e.target.value })}
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-outline-primary mt-2"
                    onClick={addEducation}
                  >
                    + Add Education
                  </button>
                </div>

                {/* Experience */}
                <div className="mb-4">
                  <h5 className="mb-3">Experience</h5>
                  {formData.experience.map((exp, index) => (
                    <div key={index} className="card mb-2">
                      <div className="card-body p-2">
                        <div className="d-flex justify-content-between">
                          <div>
                            <strong>{exp.position}</strong>
                            <div className="small">{exp.company} • {exp.duration}</div>
                            <div className="small">{exp.description}</div>
                          </div>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => removeExperience(index)}
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="row g-2">
                    <div className="col-md-6">
                      <input
                        type="text"
                        className={`form-control ${isDarkMode ? 'bg-secondary text-light' : ''}`}
                        placeholder="Position"
                        value={newExperience.position}
                        onChange={(e) => setNewExperience({ ...newExperience, position: e.target.value })}
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        className={`form-control ${isDarkMode ? 'bg-secondary text-light' : ''}`}
                        placeholder="Company"
                        value={newExperience.company}
                        onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                      />
                    </div>
                    <div className="col-12">
                      <input
                        type="text"
                        className={`form-control ${isDarkMode ? 'bg-secondary text-light' : ''}`}
                        placeholder="Duration (e.g., 2020-2022)"
                        value={newExperience.duration}
                        onChange={(e) => setNewExperience({ ...newExperience, duration: e.target.value })}
                      />
                    </div>
                    <div className="col-12">
                      <textarea
                        className={`form-control ${isDarkMode ? 'bg-secondary text-light' : ''}`}
                        placeholder="Description"
                        rows="2"
                        value={newExperience.description}
                        onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-outline-primary mt-2"
                    onClick={addExperience}
                  >
                    + Add Experience
                  </button>
                </div>

                {/* Skills */}
                <div className="mb-4">
                  <h5 className="mb-3">Skills</h5>
                  <div className="d-flex flex-wrap gap-2 mb-2">
                    {formData.skills.map((skill, index) => (
                      <span key={index} className="badge bg-primary d-flex align-items-center">
                        {skill}
                        <button
                          type="button"
                          className="btn-close btn-close-white ms-2"
                          style={{ fontSize: '10px' }}
                          onClick={() => removeSkill(index)}
                        ></button>
                      </span>
                    ))}
                  </div>
                  <div className="input-group">
                    <input
                      type="text"
                      className={`form-control ${isDarkMode ? 'bg-secondary text-light' : ''}`}
                      placeholder="Add a skill"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                    />
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={addSkill}
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* Languages */}
                <div className="mb-4">
                  <h5 className="mb-3">Languages</h5>
                  <div className="d-flex flex-wrap gap-2 mb-2">
                    {formData.languages.map((language, index) => (
                      <span key={index} className="badge bg-success d-flex align-items-center">
                        {language}
                        <button
                          type="button"
                          className="btn-close btn-close-white ms-2"
                          style={{ fontSize: '10px' }}
                          onClick={() => removeLanguage(index)}
                        ></button>
                      </span>
                    ))}
                  </div>
                  <div className="input-group">
                    <input
                      type="text"
                      className={`form-control ${isDarkMode ? 'bg-secondary text-light' : ''}`}
                      placeholder="Add a language"
                      value={newLanguage}
                      onChange={(e) => setNewLanguage(e.target.value)}
                    />
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={addLanguage}
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* Template Selector */}
                <TemplateSelector
                  selectedTemplate={formData.template}
                  onTemplateSelect={handleTemplateSelect}
                />
              </div>
            </div>
          </div>

          {/* Right Column - Preview */}
          <div className="col-lg-6">
            <div className={`card ${isDarkMode ? 'bg-dark text-light' : ''}`}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h2 className="card-title mb-0">Live Preview</h2>
                  <small className="text-muted">Changes update in real-time</small>
                </div>
                
                <div className="border rounded p-3" style={{ minHeight: '800px', overflow: 'auto' }}>
                  <div id="resume-preview">
                    {renderTemplate()}
                  </div>
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
                    🖨️ Print Resume
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResumeForm