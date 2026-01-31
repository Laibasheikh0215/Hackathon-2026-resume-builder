import React from 'react';

const ClassicTemplate = ({ data, isDarkMode }) => {
  const { personal_info, education, experience, skills, languages, summary } = data;

  return (
    <div className={`classic-template ${isDarkMode ? 'dark-mode' : ''}`} style={{ 
      fontFamily: "'Times New Roman', Times, serif",
      maxWidth: '800px',
      margin: '0 auto',
      padding: '40px 30px',
      backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
      color: isDarkMode ? '#e0e0e0' : '#333333',
      lineHeight: '1.6'
    }}>
      {/* Header */}
      <div style={{ 
        textAlign: 'center',
        marginBottom: '40px',
        borderBottom: `2px solid ${isDarkMode ? '#444' : '#333'}`,
        paddingBottom: '20px'
      }}>
        <h1 style={{
          fontSize: '36px',
          fontWeight: 'bold',
          marginBottom: '8px',
          color: isDarkMode ? '#ffffff' : '#2c3e50',
          letterSpacing: '1px'
        }}>
          {personal_info?.fullName || 'YOUR NAME'}
        </h1>
        
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '20px',
          fontSize: '15px',
          color: isDarkMode ? '#b0b0b0' : '#555'
        }}>
          {personal_info?.email && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '16px' }}>✉️</span>
              <span>{personal_info.email}</span>
            </div>
          )}
          {personal_info?.phone && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '16px' }}>📱</span>
              <span>{personal_info.phone}</span>
            </div>
          )}
          {personal_info?.address && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '16px' }}>📍</span>
              <span>{personal_info.address}</span>
            </div>
          )}
        </div>
      </div>

      {/* Two Column Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
        {/* Left Column */}
        <div>
          {/* Profile Summary */}
          {summary && (
            <div style={{ marginBottom: '30px' }}>
              <div style={{
                borderBottom: `2px solid ${isDarkMode ? '#444' : '#ddd'}`,
                marginBottom: '15px',
                paddingBottom: '8px'
              }}>
                <h2 style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: isDarkMode ? '#ffffff' : '#2c3e50',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  PROFILE SUMMARY
                </h2>
              </div>
              <p style={{
                fontSize: '15px',
                textAlign: 'justify',
                color: isDarkMode ? '#d0d0d0' : '#444'
              }}>
                {summary}
              </p>
            </div>
          )}

          {/* Experience */}
          {experience && experience.length > 0 && (
            <div style={{ marginBottom: '30px' }}>
              <div style={{
                borderBottom: `2px solid ${isDarkMode ? '#444' : '#ddd'}`,
                marginBottom: '15px',
                paddingBottom: '8px'
              }}>
                <h2 style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: isDarkMode ? '#ffffff' : '#2c3e50',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  PROFESSIONAL EXPERIENCE
                </h2>
              </div>
              <div style={{ paddingLeft: '15px' }}>
                {experience.map((exp, idx) => (
                  <div key={idx} style={{ marginBottom: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                      <h3 style={{
                        fontSize: '17px',
                        fontWeight: 'bold',
                        color: isDarkMode ? '#f0f0f0' : '#2c3e50'
                      }}>
                        {exp.position}
                      </h3>
                      <span style={{
                        fontSize: '14px',
                        color: isDarkMode ? '#888' : '#666',
                        fontWeight: '500'
                      }}>
                        {exp.duration}
                      </span>
                    </div>
                    <h4 style={{
                      fontSize: '15px',
                      color: isDarkMode ? '#4cc9f0' : '#3498db',
                      marginBottom: '8px',
                      fontStyle: 'italic'
                    }}>
                      {exp.company}
                    </h4>
                    <p style={{
                      fontSize: '14px',
                      color: isDarkMode ? '#c0c0c0' : '#555',
                      marginTop: '5px'
                    }}>
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div>
          {/* Education */}
          {education && education.length > 0 && (
            <div style={{ marginBottom: '30px' }}>
              <div style={{
                borderBottom: `2px solid ${isDarkMode ? '#444' : '#ddd'}`,
                marginBottom: '15px',
                paddingBottom: '8px'
              }}>
                <h2 style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: isDarkMode ? '#ffffff' : '#2c3e50',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  EDUCATION
                </h2>
              </div>
              <div style={{ paddingLeft: '15px' }}>
                {education.map((edu, idx) => (
                  <div key={idx} style={{ marginBottom: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                      <h3 style={{
                        fontSize: '17px',
                        fontWeight: 'bold',
                        color: isDarkMode ? '#f0f0f0' : '#2c3e50'
                      }}>
                        {edu.degree}
                      </h3>
                      <span style={{
                        fontSize: '14px',
                        color: isDarkMode ? '#888' : '#666',
                        fontWeight: '500'
                      }}>
                        {edu.year}
                      </span>
                    </div>
                    <h4 style={{
                      fontSize: '15px',
                      color: isDarkMode ? '#4cc9f0' : '#3498db',
                      marginBottom: '5px'
                    }}>
                      {edu.institution}
                    </h4>
                    {edu.gpa && (
                      <div style={{
                        fontSize: '14px',
                        color: isDarkMode ? '#c0c0c0' : '#555',
                        fontWeight: '500'
                      }}>
                        GPA: {edu.gpa}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {skills && skills.length > 0 && (
            <div style={{ marginBottom: '30px' }}>
              <div style={{
                borderBottom: `2px solid ${isDarkMode ? '#444' : '#ddd'}`,
                marginBottom: '15px',
                paddingBottom: '8px'
              }}>
                <h2 style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: isDarkMode ? '#ffffff' : '#2c3e50',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  TECHNICAL SKILLS
                </h2>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', paddingLeft: '15px' }}>
                {skills.map((skill, idx) => (
                  <span key={idx} style={{
                    padding: '8px 15px',
                    backgroundColor: isDarkMode ? '#2a2a2a' : '#f8f9fa',
                    color: isDarkMode ? '#f0f0f0' : '#2c3e50',
                    borderRadius: '20px',
                    fontSize: '14px',
                    border: `1px solid ${isDarkMode ? '#444' : '#dee2e6'}`,
                    fontWeight: '500'
                  }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages && languages.length > 0 && (
            <div style={{ marginBottom: '30px' }}>
              <div style={{
                borderBottom: `2px solid ${isDarkMode ? '#444' : '#ddd'}`,
                marginBottom: '15px',
                paddingBottom: '8px'
              }}>
                <h2 style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: isDarkMode ? '#ffffff' : '#2c3e50',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  LANGUAGES
                </h2>
              </div>
              <div style={{ paddingLeft: '25px' }}>
                {languages.map((lang, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '10px',
                    fontSize: '15px',
                    color: isDarkMode ? '#d0d0d0' : '#444'
                  }}>
                    <span style={{ marginRight: '10px', fontSize: '16px' }}>•</span>
                    <span>{lang}</span>
                    <div style={{
                      marginLeft: 'auto',
                      fontSize: '13px',
                      color: isDarkMode ? '#888' : '#666',
                      fontWeight: '500'
                    }}>
                      Fluent
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact Info (if not in header) */}
          {(personal_info?.linkedin || personal_info?.github) && (
            <div style={{ marginTop: '30px' }}>
              <div style={{
                borderBottom: `2px solid ${isDarkMode ? '#444' : '#ddd'}`,
                marginBottom: '15px',
                paddingBottom: '8px'
              }}>
                <h2 style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: isDarkMode ? '#ffffff' : '#2c3e50',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  CONTACT
                </h2>
              </div>
              <div style={{ paddingLeft: '15px' }}>
                {personal_info?.linkedin && (
                  <div style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '16px' }}>💼</span>
                    <span style={{ fontSize: '14px', color: isDarkMode ? '#d0d0d0' : '#444' }}>
                      LinkedIn: {personal_info.linkedin}
                    </span>
                  </div>
                )}
                {personal_info?.github && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '16px' }}>🔗</span>
                    <span style={{ fontSize: '14px', color: isDarkMode ? '#d0d0d0' : '#444' }}>
                      GitHub: {personal_info.github}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassicTemplate;