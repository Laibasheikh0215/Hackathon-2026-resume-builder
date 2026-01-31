import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './components/contexts/ThemeContext'
import Login from './components/Auth/Login'
import Signup from './components/Auth/Signup'
import Dashboard from './pages/Dashboard'
import Builder from './pages/Builder'
import ViewResume from './pages/ViewResume'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/css/custom-styles.css'

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/builder" element={<Builder />} />
            <Route path="/builder/:id" element={<Builder />} />
            <Route path="/view/:id" element={<ViewResume />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App