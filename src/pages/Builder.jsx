import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ResumeForm from '../components/Resumes/ResumeForm'
import { supabase } from '../utils/supabaseClient'

const Builder = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      // Check localStorage first
      const storedUser = localStorage.getItem('resume-user')
      if (storedUser) {
        setLoading(false)
        return
      }
      
      // Check Supabase session
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        navigate('/login')
      } else {
        localStorage.setItem('resume-user', JSON.stringify(user))
        setLoading(false)
      }
    } catch (error) {
      console.error('Auth error:', error)
      navigate('/login')
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

  return <ResumeForm />
}

export default Builder