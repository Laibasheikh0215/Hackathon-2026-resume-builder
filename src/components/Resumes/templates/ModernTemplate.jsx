import React from 'react';

const ModernTemplate = ({ data, isDarkMode }) => {
  const { personal_info, education, experience, skills, languages, summary } = data;

  // CSS Grid ko camelCase me likhna hoga
  const gridStyles = {
    display: 'grid',
    gridTemplateColumns: '1fr 350px', // ✅ Correct - string format me
    gap: '50px'
  };

  const educationGridStyles = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr', // ✅ Correct - string format me
    gap: '20px'
  };

  return (
    <div className="modern-template" style={{
      fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
      maxWidth: '850px',
      margin: '0 auto',
      backgroundColor: isDarkMode ? '#121212' : '#ffffff',
      color: isDarkMode ? '#ffffff' : '#333333'
    }}>
      {/* Header with Gradient */}
      <div style={{
        background: isDarkMode 
          ? 'linear-gradient(135deg, #1a237e 0%, #311b92 100%)' 
          : 'linear-gradient(135deg, #1976d2 0%, #0d47a1 100%)',
        color: 'white',
        padding: '40px 50px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Pattern */}
        <div style={{
          position: 'absolute',
          top: '0',
          right: '0',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          opacity: '0.3'
        }}></div>
        
        <div style={{ position: 'relative', zIndex: '1' }}>
          <h1 style={{
            fontSize: '42px',
            fontWeight: '700',
            marginBottom: '10px',
            letterSpacing: '-0.5px'
          }}>
            {personal_info?.fullName || 'YOUR NAME'}
          </h1>
          
          <div style={{
            fontSize: '18px',
            opacity: '0.9',
            marginBottom: '25px',
            maxWidth: '600px'
          }}>
            {summary?.split('.')[0] || 'Professional seeking new opportunities'}
          </div>
          
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '25px',
            fontSize: '15px'
          }}>
            {personal_info?.email && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px'
                }}>
                  ✉️
                </div>
                <span>{personal_info.email}</span>
              </div>
            )}
            
            {personal_info?.phone && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px'
                }}>
                  📱
                </div>
                <span>{personal_info.phone}</span>
              </div>
            )}
            
            {personal_info?.address && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px'
                }}>
                  📍
                </div>
                <span>{personal_info.address}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: '40px 50px' }}>
        <div style={gridStyles}>
          {/* Left Column - Main Content */}
          <div>
            {/* Summary */}
            {summary && (
              <div style={{ marginBottom: '40px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  marginBottom: '20px'
                }}>
                  <div style={{
                    width: '40px',
                    height: '4px',
                    background: isDarkMode ? '#4fc3f7' : '#1976d2',
                    borderRadius: '2px'
                  }}></div>
                  <h2 style={{
                    fontSize: '22px',
                    fontWeight: '600',
                    color: isDarkMode ? '#4fc3f7' : '#1976d2',
                    textTransform: 'uppercase',
                    letterSpacing: '2px'
                  }}>
                    About Me
                  </h2>
                </div>
                <p style={{
                  fontSize: '15px',
                  lineHeight: '1.7',
                  color: isDarkMode ? '#cccccc' : '#555555',
                  textAlign: 'justify'
                }}>
                  {summary}
                </p>
              </div>
            )}

            {/* Experience */}
            {experience && experience.length > 0 && (
              <div style={{ marginBottom: '40px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  marginBottom: '25px'
                }}>
                  <div style={{
                    width: '40px',
                    height: '4px',
                    background: isDarkMode ? '#4fc3f7' : '#1976d2',
                    borderRadius: '2px'
                  }}></div>
                  <h2 style={{
                    fontSize: '22px',
                    fontWeight: '600',
                    color: isDarkMode ? '#4fc3f7' : '#1976d2',
                    textTransform: 'uppercase',
                    letterSpacing: '2px'
                  }}>
                    Experience
                  </h2>
                </div>
                
                <div style={{ position: 'relative' }}>
                  {/* Timeline Line */}
                  <div style={{
                    position: 'absolute',
                    left: '15px',
                    top: '0',
                    bottom: '0',
                    width: '2px',
                    background: isDarkMode ? '#333' : '#e0e0e0'
                  }}></div>
                  
                  {experience.map((exp, idx) => (
                    <div key={idx} style={{ 
                      position: 'relative',
                      marginBottom: '30px',
                      paddingLeft: '40px'
                    }}>
                      {/* Timeline Dot */}
                      <div style={{
                        position: 'absolute',
                        left: '8px',
                        top: '5px',
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        background: isDarkMode ? '#4fc3f7' : '#1976d2',
                        border: `3px solid ${isDarkMode ? '#121212' : '#ffffff'}`,
                        zIndex: '2'
                      }}></div>
                      
                      <div style={{
                        background: isDarkMode ? '#1e1e1e' : '#f8f9fa',
                        padding: '20px',
                        borderRadius: '8px',
                        borderLeft: "4px solid ${isDarkMode ? '#4fc3f7' : '#1976d2}"
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                          <h3 style={{
                            fontSize: '18px',
                            fontWeight: '600',
                            color: isDarkMode ? '#ffffff' : '#2c3e50',
                            marginBottom: '5px'
                          }}>
                            {exp.position}
                          </h3>
                          <span style={{
                            fontSize: '13px',
                            color: isDarkMode ? '#888' : '#666',
                            background: isDarkMode ? '#2a2a2a' : '#e9ecef',
                            padding: '4px 12px',
                            borderRadius: '20px',
                            fontWeight: '500'
                          }}>
                            {exp.duration}
                          </span>
                        </div>
                        
                        <h4 style={{
                          fontSize: '15px',
                          color: isDarkMode ? '#4fc3f7' : '#1976d2',
                          marginBottom: '10px',
                          fontWeight: '500'
                        }}>
                          {exp.company}
                        </h4>
                        
                        <p style={{
                          fontSize: '14px',
                          color: isDarkMode ? '#b0b0b0' : '#666',
                          lineHeight: '1.6'
                        }}>
                          {exp.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {education && education.length > 0 && (
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  marginBottom: '25px'
                }}>
                  <div style={{
                    width: '40px',
                    height: '4px',
                    background: isDarkMode ? '#4fc3f7' : '#1976d2',
                    borderRadius: '2px'
                  }}></div>
                  <h2 style={{
                    fontSize: '22px',
                    fontWeight: '600',
                    color: isDarkMode ? '#4fc3f7' : '#1976d2',
                    textTransform: 'uppercase',
                    letterSpacing: '2px'
                  }}>
                    Education
                  </h2>
                </div>
                
                <div style={educationGridStyles}>
                  {education.map((edu, idx) => (
                    <div key={idx} style={{
                      background: isDarkMode ? '#1e1e1e' : '#f8f9fa',
                      padding: '20px',
                      borderRadius: '8px',
                      borderTop: "3px solid ${isDarkMode ? '#4fc3f7' : '#1976d2}"
                    }}>
                      <h3 style={{
                        fontSize: '17px',
                        fontWeight: '600',
                        color: isDarkMode ? '#ffffff' : '#2c3e50',
                        marginBottom: '10px'
                      }}>
                        {edu.degree}
                      </h3>
                      
                      <div style={{
                        fontSize: '14px',
                        color: isDarkMode ? '#4fc3f7' : '#1976d2',
                        marginBottom: '8px',
                        fontWeight: '500'
                      }}>
                        {edu.institution}
                      </div>
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                        <span style={{ color: isDarkMode ? '#888' : '#666' }}>
                          {edu.year}
                        </span>
                        {edu.gpa && (
                          <span style={{
                            color: isDarkMode ? '#81c784' : '#4caf50',
                            fontWeight: '600'
                          }}>
                            GPA: {edu.gpa}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div>
            {/* Skills */}
            {skills && skills.length > 0 && (
              <div style={{ marginBottom: '40px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  marginBottom: '20px'
                }}>
                  <div style={{
                    width: '40px',
                    height: '4px',
                    background: isDarkMode ? '#ff9800' : '#ff9800',
                    borderRadius: '2px'
                  }}></div>
                  <h2 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: isDarkMode ? '#ff9800' : '#ff9800',
                    textTransform: 'uppercase',
                    letterSpacing: '2px'
                  }}>
                    Skills
                  </h2>
                </div>
                
                <div style={{ paddingLeft: '15px' }}>
                  {skills.map((skill, idx) => (
                    <div key={idx} style={{ marginBottom: '15px' }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '6px',
                        fontSize: '14px',
                        color: isDarkMode ? '#cccccc' : '#555'
                      }}>
                        <span>{skill}</span>
                        <span>90%</span>
                      </div>
                      <div style={{
                        height: '6px',
                        background: isDarkMode ? '#333' : '#e0e0e0',
                        borderRadius: '3px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          height: '100%',
                          width: '90%',
                          background: isDarkMode ? '#ff9800' : '#ff9800',
                          borderRadius: '3px'
                        }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Languages */}
            {languages && languages.length > 0 && (
              <div style={{ marginBottom: '40px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  marginBottom: '20px'
                }}>
                  <div style={{
                    width: '40px',
                    height: '4px',
                    background: isDarkMode ? '#81c784' : '#4caf50',
                    borderRadius: '2px'
                  }}></div>
                  <h2 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: isDarkMode ? '#81c784' : '#4caf50',
                    textTransform: 'uppercase',
                    letterSpacing: '2px'
                  }}>
                    Languages
                  </h2>
                </div>
                
                <div style={{ paddingLeft: '15px' }}>
                  {languages.map((lang, idx) => (
                    <div key={idx} style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '12px',
                      fontSize: '15px',
                      color: isDarkMode ? '#cccccc' : '#555'
                    }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: isDarkMode ? '#2a2a2a' : '#f0f0f0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '12px',
                        fontSize: '16px'
                      }}>
                        🌐
                      </div>
                      <span style={{ flex: '1' }}>{lang}</span>
                      <span style={{
                        fontSize: '12px',
                        color: isDarkMode ? '#81c784' : '#4caf50',
                        fontWeight: '600',
                        background: isDarkMode ? 'rgba(129, 199, 132, 0.2)' : 'rgba(76, 175, 80, 0.1)',
                        padding: '2px 10px',
                        borderRadius: '12px'
                      }}>
                        Fluent
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Info */}
            <div style={{
              background: isDarkMode 
                ? 'linear-gradient(135deg, #1a237e 0%, #311b92 100%)' 
                : 'linear-gradient(135deg, #1976d2 0%, #0d47a1 100%)',
              color: 'white',
              padding: '25px',
              borderRadius: '8px',
              marginTop: '30px'
            }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '600',
                marginBottom: '15px',
                color: 'rgba(255,255,255,0.9)'
              }}>
                Additional Information
              </h3>
              
              <div style={{ fontSize: '13px', lineHeight: '1.6' }}>
                {(personal_info?.linkedin || personal_info?.github) && (
                  <div style={{ marginBottom: '15px' }}>
                    <div style={{ fontWeight: '500', marginBottom: '5px' }}>Online Profiles:</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                      {personal_info?.linkedin && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span>🔗</span>
                          <span>LinkedIn: {personal_info.linkedin}</span>
                        </div>
                      )}
                      {personal_info?.github && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span>💻</span>
                          <span>GitHub: {personal_info.github}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                <div>
                  <div style={{ fontWeight: '500', marginBottom: '5px' }}>Availability:</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#81c784' }}>●</span>
                    <span>Available for full-time positions</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;