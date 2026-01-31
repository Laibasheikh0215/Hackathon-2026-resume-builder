import React from 'react'
import { Link } from 'react-router-dom'

const ResumeCard = ({ resume, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      onDelete(resume.id)
    }
  }

  const getTemplateBadge = (template) => {
    const badges = {
      classic: { color: 'secondary', label: 'Classic' },
      modern: { color: 'primary', label: 'Modern' },
      creative: { color: 'success', label: 'Creative' }
    }
    return badges[template] || badges.classic
  }

  const badge = getTemplateBadge(resume.template)

  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <h5 className="card-title">{resume.title}</h5>
          <span className={`badge bg-${badge.color}`}>
            {badge.label}
          </span>
        </div>
        
        <div className="mb-3">
          <p className="mb-1">
            <strong>Name:</strong> {resume.personal_info?.fullName || 'Not set'}
          </p>
          <p className="mb-1">
            <strong>Education:</strong> {resume.education?.length || 0} entries
          </p>
          <p className="mb-1">
            <strong>Experience:</strong> {resume.experience?.length || 0} entries
          </p>
          <p className="mb-0">
            <strong>Skills:</strong> {resume.skills?.length || 0} skills
          </p>
        </div>
        
        <div className="mt-auto">
          <div className="d-flex gap-2">
            <Link 
              to={`/view/${resume.id}`} 
              className="btn btn-outline-primary btn-sm flex-fill"
            >
              View
            </Link>
            <Link 
              to={`/builder/${resume.id}`} 
              className="btn btn-outline-warning btn-sm flex-fill"
            >
              Edit
            </Link>
            <button 
              onClick={handleDelete}
              className="btn btn-outline-danger btn-sm flex-fill"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResumeCard