import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Link } from 'react-router-dom';

const ResumePreview = ({ resume }) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  if (!resume) {
    return <div className="text-center py-8">No resume data available</div>;
  }

  const { personal_info, education, experience, skills, languages, summary, template } = resume;

  // Template-based styling
  const templateStyles = {
    classic: {
      header: 'bg-gray-800 text-white',
      section: 'border-b border-gray-300 pb-4 mb-4',
      title: 'text-xl font-bold text-gray-800',
      subtitle: 'text-lg font-semibold text-gray-700',
    },
    modern: {
      header: 'bg-blue-600 text-white',
      section: 'border-l-4 border-blue-500 pl-4 mb-6',
      title: 'text-2xl font-bold text-blue-700',
      subtitle: 'text-xl font-semibold text-blue-600',
    },
    creative: {
      header: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white',
      section: 'rounded-lg bg-gray-50 p-4 mb-4 shadow-sm',
      title: 'text-2xl font-bold text-purple-700',
      subtitle: 'text-xl font-semibold text-pink-600',
    },
  };

  const style = templateStyles[template] || templateStyles.classic;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Action Buttons */}
      <div className="flex justify-between items-center mb-6">
        <Link
          to={`/edit/${resume.id}`}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Edit Resume
        </Link>
        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Download/Print
        </button>
      </div>

      {/* Resume Preview */}
      <div ref={componentRef} className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header */}
        <div className={`p-8 ${style.header}`}>
          <h1 className="text-3xl font-bold">{personal_info.fullName}</h1>
          <div className="mt-2 space-y-1">
            <p>{personal_info.email}</p>
            <p>{personal_info.phone}</p>
            <p>{personal_info.address}</p>
            <div className="flex space-x-4 mt-2">
              {personal_info.linkedin && (
                <span>LinkedIn: {personal_info.linkedin}</span>
              )}
              {personal_info.github && (
                <span>GitHub: {personal_info.github}</span>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Summary */}
          {summary && (
            <div className={style.section}>
              <h2 className={style.subtitle}>Profile Summary</h2>
              <p className="text-gray-700 mt-2">{summary}</p>
            </div>
          )}

          {/* Education */}
          {education && education.length > 0 && (
            <div className={style.section}>
              <h2 className={style.subtitle}>Education</h2>
              {education.map((edu, index) => (
                <div key={index} className="mt-4">
                  <h3 className="font-bold text-gray-800">{edu.degree}</h3>
                  <p className="text-gray-700">{edu.institution}</p>
                  <p className="text-gray-600">{edu.year} {edu.gpa && `• GPA: ${edu.gpa}`}</p>
                </div>
              ))}
            </div>
          )}

          {/* Experience */}
          {experience && experience.length > 0 && (
            <div className={style.section}>
              <h2 className={style.subtitle}>Experience</h2>
              {experience.map((exp, index) => (
                <div key={index} className="mt-4">
                  <h3 className="font-bold text-gray-800">{exp.position}</h3>
                  <p className="text-gray-700">{exp.company} • {exp.duration}</p>
                  <p className="text-gray-600 mt-2">{exp.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {skills && skills.length > 0 && (
            <div className={style.section}>
              <h2 className={style.subtitle}>Skills</h2>
              <div className="flex flex-wrap gap-2 mt-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages && languages.length > 0 && (
            <div className={style.section}>
              <h2 className={style.subtitle}>Languages</h2>
              <div className="flex flex-wrap gap-2 mt-2">
                {languages.map((language, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                  >
                    {language}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;