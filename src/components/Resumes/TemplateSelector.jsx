import React from 'react'

const TemplateSelector = ({ selectedTemplate, onTemplateSelect }) => {
  const templates = [
    {
      id: 'classic',
      name: 'Classic',
      description: 'Professional and traditional design',
      icon: '📄',
      color: 'secondary'
    },
    {
      id: 'modern',
      name: 'Modern',
      description: 'Clean and contemporary design',
      icon: '✨',
      color: 'primary'
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'Unique and eye-catching design',
      icon: '🎨',
      color: 'success'
    }
  ]

  return (
    <div className="mb-4">
      <h5 className="mb-3">Choose Template</h5>
      <div className="row g-3">
        {templates.map((template) => (
          <div key={template.id} className="col-md-4">
            <div 
              className={`card cursor-pointer ${selectedTemplate === template.id ? 'border-2 border-primary' : ''}`}
              onClick={() => onTemplateSelect(template.id)}
              style={{ cursor: 'pointer' }}
            >
              <div className="card-body text-center">
                <div className="display-4 mb-2">{template.icon}</div>
                <h6>{template.name}</h6>
                <p className="small text-muted mb-0">{template.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TemplateSelector