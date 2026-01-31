import React from 'react'
import { useTheme } from '../contexts/ThemeContext'

const Footer = () => {
  const { isDarkMode } = useTheme()

  return (
    <footer className={`${isDarkMode ? 'bg-dark text-light' : 'bg-light text-dark'} py-4 mt-5`}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h5 className="mb-3">📄 Resume Builder</h5>
            <p className="mb-0">
              Create professional resumes in minutes. Free forever.
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <p className="mb-1">
              © {new Date().getFullYear()} Resume Builder. All rights reserved.
            </p>
            <p className="text-muted mb-0">
              Built with ❤️ using React & Supabase
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer