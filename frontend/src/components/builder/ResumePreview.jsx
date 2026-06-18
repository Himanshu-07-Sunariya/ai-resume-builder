import { RESUME_TEMPLATES } from '../../constants';

export default function ResumePreview({ resume }) {
  const templateId = resume?.template || 'modern';

  // Simple preview rendering - you can enhance with proper template components
  return (
    <div className="p-8 bg-white">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 space-y-6">
        {/* Header */}
        {resume?.personal && (
          <div className="text-center border-b-2 border-primary-200 pb-6">
            <h1 className="text-4xl font-bold text-dark">{resume.personal.fullName || 'Your Name'}</h1>
            <p className="text-lg text-gray-600 mt-2">{resume.personal.profession || 'Professional Title'}</p>
            <div className="flex justify-center gap-4 mt-4 text-sm text-gray-600">
              {resume.personal.email && <span>{resume.personal.email}</span>}
              {resume.personal.phone && <span>•</span>}
              {resume.personal.phone && <span>{resume.personal.phone}</span>}
              {resume.personal.location && <span>•</span>}
              {resume.personal.location && <span>{resume.personal.location}</span>}
            </div>
          </div>
        )}

        {/* Summary */}
        {resume?.summary && (
          <div>
            <h2 className="text-xl font-bold text-dark mb-3">Professional Summary</h2>
            <p className="text-gray-700 leading-relaxed">{resume.summary}</p>
          </div>
        )}

        {/* Experience */}
        {resume?.experiences && resume.experiences.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-dark mb-3">Experience</h2>
            <div className="space-y-4">
              {resume.experiences.map((exp, idx) => (
                <div key={idx}>
                  <div className="flex justify-between">
                    <h3 className="font-semibold text-dark">{exp.jobTitle}</h3>
                    <span className="text-sm text-gray-600">
                      {new Date(exp.startDate).getFullYear()} - {exp.isCurrent ? 'Present' : new Date(exp.endDate).getFullYear()}
                    </span>
                  </div>
                  <p className="text-gray-600">{exp.company}</p>
                  <p className="text-gray-700 mt-1">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {resume?.educations && resume.educations.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-dark mb-3">Education</h2>
            <div className="space-y-4">
              {resume.educations.map((edu, idx) => (
                <div key={idx}>
                  <div className="flex justify-between">
                    <h3 className="font-semibold text-dark">{edu.degree}</h3>
                    <span className="text-sm text-gray-600">{new Date(edu.graduationDate).getFullYear()}</span>
                  </div>
                  <p className="text-gray-600">{edu.school}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {resume?.skills && resume.skills.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-dark mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {resume.skills.map((skill, idx) => (
                <span key={idx} className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {resume?.projects && resume.projects.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-dark mb-3">Projects</h2>
            <div className="space-y-4">
              {resume.projects.map((project, idx) => (
                <div key={idx}>
                  <h3 className="font-semibold text-dark">{project.title}</h3>
                  <p className="text-gray-700">{project.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
