import React from 'react';

const CreativeTemplate = ({ data, isDarkMode }) => {
  const { personal_info, education, experience, skills, languages, summary } = data;

  return (
    <div className="creative-template" style={{
      fontFamily: "'Poppins', 'Montserrat', 'Segoe UI', sans-serif",
      maxWidth: '900px',
      margin: '0 auto',
      backgroundColor: isDarkMode ? '#0a0a0a' : '#f8f9fa',
      color: isDarkMode ? '#ffffff' : '#333333'
    }}>
      {/* Creative Header */}
      <div style={{
        background: isDarkMode 
          ? 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)'
          : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '50px 40px 30px 40px',
        borderRadius: '0 0 30px 30px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Geometric Pattern */}
        <div style={{
          position: 'absolute',
          top: '-50%',
          right: '-10%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 2px, transparent 2px)',
          backgroundSize: '30px 30px',
          transform: 'rotate(45deg)',
          opacity: '0.3'
        }}></div>
        
        <div style={{ position: 'relative', zIndex: '2' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '30px', marginBottom: '30px' }}>
            {/* Profile Avatar */}
            <div style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: isDarkMode ? 'linear-gradient(135deg, #fff 0%, #f0f0f0 100%)' : 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '48px',
              color: '#764ba2',
              fontWeight: 'bold',
              border: '4px solid rgba(255,255,255,0.3)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
            }}>
              {personal_info.fullName?.charAt(0) || 'U'}
            </div>
            
            <div style={{ flex: '1' }}>
              <h1 style={{
                fontSize: '46px',
                fontWeight: '800',
                marginBottom: '10px',
                letterSpacing: '-1px',
                background: 'linear-gradient(45deg, #fff, #f0f0f0)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                {personal_info.fullName || 'YOUR NAME'}
              </h1>
              
              <div style={{
                fontSize: '20px',
                opacity: '0.9',
                marginBottom: '20px',
                fontWeight: '300'
              }}>
                {personal_info.email || 'your.email@example.com'}
              </div>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', fontSize: '15px' }}>
                {personal_info?.phone && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.15)', padding: '6px 15px', borderRadius: '20px' }}>
                    <span style={{ fontSize: '16px' }}>📱</span>
                    <span>{personal_info.phone}</span>
                  </div>
                )}
                {personal_info?.address && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.15)', padding: '6px 15px', borderRadius: '20px' }}>
                    <span style={{ fontSize: '16px' }}>📍</span>
                    <span>{personal_info.address}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: '40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px' }}>
          {/* Left Column */}
          <div>
            {/* Profile Summary */}
            {summary && (
              <div style={{
                background: isDarkMode ? '#1a1a1a' : 'white',
                padding: '30px',
                borderRadius: '20px',
                marginBottom: '30px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                border: isDarkMode ? '1px solid #333' : 'none'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '22px'
                  }}>
                    ✨
                  </div>
                  <h2 style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    color: isDarkMode ? '#ffffff' : '#333',
                    margin: '0'
                  }}>
                    About Me
                  </h2>
                </div>
                <p style={{
                  fontSize: '16px',
                  lineHeight: '1.8',
                  color: isDarkMode ? '#cccccc' : '#666',
                  textAlign: 'justify'
                }}>
                  {summary}
                </p>
              </div>
            )}

            {/* Experience */}
            {experience && experience.length > 0 && (
              <div style={{
                background: isDarkMode ? '#1a1a1a' : 'white',
                padding: '30px',
                borderRadius: '20px',
                marginBottom: '30px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                border: isDarkMode ? '1px solid #333' : 'none'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '22px'
                  }}>
                    💼
                  </div>
                  <h2 style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    color: isDarkMode ? '#ffffff' : '#333',
                    margin: '0'
                  }}>
                    Work Experience
                  </h2>
                </div>
                
                <div style={{ position: 'relative', paddingLeft: '25px' }}>
                  {/* Creative Timeline */}
                  <div style={{
                    position: 'absolute',
                    left: '0',
                    top: '0',
                    bottom: '0',
                    width: '3px',
                    background: 'linear-gradient(to bottom, #4facfe, #00f2fe)',
                    borderRadius: '3px'
                  }}></div>
                  
                  {experience.map((exp, idx) => (
                    <div key={idx} style={{ 
                      position: 'relative',
                      marginBottom: '30px',
                      paddingLeft: '30px'
                    }}>
                      {/* Timeline Node */}
                      <div style={{
                        position: 'absolute',
                        left: '-10px',
                        top: '5px',
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                        border: `4px solid ${isDarkMode ? '#1a1a1a' : 'white'}`,
                        boxShadow: '0 0 0 2px #4facfe'
                      }}></div>
                      
                      <div style={{
                        padding: '20px',
                        background: isDarkMode ? '#222' : '#f8f9fa',
                        borderRadius: '15px',
                        borderLeft: '4px solid #4facfe'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                          <h3 style={{
                            fontSize: '18px',
                            fontWeight: '600',
                            color: isDarkMode ? '#ffffff' : '#333',
                            marginBottom: '5px'
                          }}>
                            {exp.position}
                          </h3>
                          <span style={{
                            fontSize: '14px',
                            color: isDarkMode ? '#4facfe' : '#4facfe',
                            background: isDarkMode ? 'rgba(79, 172, 254, 0.1)' : 'rgba(79, 172, 254, 0.1)',
                            padding: '5px 15px',
                            borderRadius: '20px',
                            fontWeight: '600'
                          }}>
                            {exp.duration}
                          </span>
                        </div>
                        
                        <h4 style={{
                          fontSize: '16px',
                          color: isDarkMode ? '#00f2fe' : '#00a8ff',
                          marginBottom: '10px',
                          fontWeight: '500'
                        }}>
                          {exp.company}
                        </h4>
                        
                        <p style={{
                          fontSize: '15px',
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
          </div>

          {/* Right Column */}
          <div>
            {/* Education */}
            {education && education.length > 0 && (
              <div style={{
                background: isDarkMode ? '#1a1a1a' : 'white',
                padding: '30px',
                borderRadius: '20px',
                marginBottom: '30px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                border: isDarkMode ? '1px solid #333' : 'none'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '22px'
                  }}>
                    🎓
                  </div>
                  <h2 style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    color: isDarkMode ? '#ffffff' : '#333',
                    margin: '0'
                  }}>
                    Education
                  </h2>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {education.map((edu, idx) => (
                    <div key={idx} style={{
                      padding: '20px',
                      background: isDarkMode ? '#222' : '#f8f9fa',
                      borderRadius: '15px',
                      borderTop: '3px solid #f5576c'
                    }}>
                      <h3 style={{
                        fontSize: '17px',
                        fontWeight: '600',
                        color: isDarkMode ? '#ffffff' : '#333',
                        marginBottom: '10px'
                      }}>
                        {edu.degree}
                      </h3>
                      
                      <div style={{
                        fontSize: '15px',
                        color: isDarkMode ? '#f093fb' : '#f5576c',
                        marginBottom: '8px',
                        fontWeight: '500'
                      }}>
                        {edu.institution}
                      </div>
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{
                          fontSize: '14px',
                          color: isDarkMode ? '#888' : '#666',
                          fontWeight: '500'
                        }}>
                          {edu.year}
                        </span>
                        {edu.gpa && (
                          <span style={{
                            fontSize: '14px',
                            color: '#4cd137',
                            fontWeight: '700',
                            background: 'rgba(76, 209, 55, 0.1)',
                            padding: '4px 12px',
                            borderRadius: '12px'
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

            {/* Skills */}
            {skills && skills.length > 0 && (
              <div style={{
                background: isDarkMode ? '#1a1a1a' : 'white',
                padding: '30px',
                borderRadius: '20px',
                marginBottom: '30px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                border: isDarkMode ? '1px solid #333' : 'none'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '22px'
                  }}>
                    ⚡
                  </div>
                  <h2 style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    color: isDarkMode ? '#ffffff' : '#333',
                    margin: '0'
                  }}>
                    Skills
                  </h2>
                </div>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                  {skills.map((skill, idx) => (
                    <div key={idx} style={{
                      padding: '10px 18px',
                      background: isDarkMode 
                        ? 'linear-gradient(135deg, rgba(67, 233, 123, 0.2) 0%, rgba(56, 249, 215, 0.2) 100%)' 
                        : 'linear-gradient(135deg, rgba(67, 233, 123, 0.1) 0%, rgba(56, 249, 215, 0.1) 100%)',
                      color: isDarkMode ? '#43e97b' : '#27ae60',
                      borderRadius: '25px',
                      fontSize: '14px',
                      fontWeight: '600',
                      border: `2px solid ${isDarkMode ? 'rgba(67, 233, 123, 0.3)' : 'rgba(67, 233, 123, 0.2)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <span style={{ fontSize: '16px' }}>✓</span>
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Languages */}
            {languages && languages.length > 0 && (
              <div style={{
                background: isDarkMode ? '#1a1a1a' : 'white',
                padding: '30px',
                borderRadius: '20px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                border: isDarkMode ? '1px solid #333' : 'none'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '22px'
                  }}>
                    🌍
                  </div>
                  <h2 style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    color: isDarkMode ? '#ffffff' : '#333',
                    margin: '0'
                  }}>
                    Languages
                  </h2>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {languages.map((lang, idx) => (
                    <div key={idx} style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '12px 15px',
                      background: isDarkMode ? '#222' : '#f8f9fa',
                      borderRadius: '12px'
                    }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '10px',
                        background: isDarkMode 
                          ? 'linear-gradient(135deg, rgba(250, 112, 154, 0.2) 0%, rgba(254, 225, 64, 0.2) 100%)' 
                          : 'linear-gradient(135deg, rgba(250, 112, 154, 0.1) 0%, rgba(254, 225, 64, 0.1) 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '15px',
                        fontSize: '18px'
                      }}>
                        🗣️
                      </div>
                      
                      <div style={{ flex: '1' }}>
                        <div style={{
                          fontSize: '15px',
                          fontWeight: '600',
                          color: isDarkMode ? '#ffffff' : '#333',
                          marginBottom: '5px'
                        }}>
                          {lang}
                        </div>
                        <div style={{
                          width: '100%',
                          height: '6px',
                          background: isDarkMode ? '#333' : '#e0e0e0',
                          borderRadius: '3px',
                          overflow: 'hidden'
                        }}>
                          <div style={{
                            height: '100%',
                            width: '85%',
                            background: 'linear-gradient(90deg, #fa709a, #fee140)',
                            borderRadius: '3px'
                          }}></div>
                        </div>
                      </div>
                      
                      <div style={{
                        fontSize: '12px',
                        color: isDarkMode ? '#fa709a' : '#e74c3c',
                        fontWeight: '700',
                        marginLeft: '10px'
                      }}>
                        85%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        background: isDarkMode ? '#111' : '#f1f1f1',
        padding: '30px 40px',
        borderTop: '2px solid',
        borderImage: isDarkMode 
          ? 'linear-gradient(135deg, #667eea, #764ba2, #f093fb) 1'
          : 'linear-gradient(135deg, #667eea, #764ba2) 1',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '14px',
        color: isDarkMode ? '#888' : '#666'
      }}>
        <div>
          {(personal_info?.linkedin || personal_info?.github) && (
            <div style={{ display: 'flex', gap: '20px' }}>
              {personal_info?.linkedin && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '18px' }}>💼</span>
                  <span>LinkedIn: {personal_info.linkedin}</span>
                </div>
              )}
              {personal_info?.github && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '18px' }}>💻</span>
                  <span>GitHub: {personal_info.github}</span>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '12px', opacity: '0.7' }}>
            Professional Resume • Generated with Resume Builder
          </div>
          <div style={{ fontSize: '12px', opacity: '0.5', marginTop: '5px' }}>
            {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreativeTemplate;