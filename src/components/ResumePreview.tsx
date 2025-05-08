import React from 'react';
import { Resume, ATSScoreResult } from '../types';
import { 
  DownloadIcon, 
  ExternalLinkIcon, 
  CheckCircleIcon, 
  AlertCircleIcon,
  AlertTriangleIcon
} from 'lucide-react';
import { exportDocument } from '../utils/pdfExport';

type ResumePreviewProps = {
  resume: Partial<Resume>;
  atsScore?: ATSScoreResult;
  templateId: string;
};

const ResumePreview: React.FC<ResumePreviewProps> = ({
  resume,
  atsScore,
  templateId
}) => {
  const { personalInfo, summary, workExperience, education, skills } = resume;
  
  if (!personalInfo) {
    return (
      <div className="text-center p-8">
        <p>Please enter your information to generate a resume preview.</p>
      </div>
    );
  }
  
  const handleDownload = () => {
    exportDocument('resumeDocument', `${personalInfo.fullName.replace(/ /g, '_')}_Resume.pdf`);
  };
  
  // Determine ATS score color
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-500';
    if (score >= 70) return 'text-blue-500';
    if (score >= 50) return 'text-yellow-500';
    return 'text-red-500';
  };
  
  // Determine score icon
  const getScoreIcon = (score: number) => {
    if (score >= 90) return <CheckCircleIcon className="h-6 w-6 text-emerald-500" />;
    if (score >= 70) return <CheckCircleIcon className="h-6 w-6 text-blue-500" />;
    if (score >= 50) return <AlertTriangleIcon className="h-6 w-6 text-yellow-500" />;
    return <AlertCircleIcon className="h-6 w-6 text-red-500" />;
  };
  
  return (
    <div className="space-y-6">
      {/* ATS Score Card */}
      {atsScore && (
        <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 animate-fadeIn">
          <h3 className="text-xl font-semibold mb-4">ATS Compatibility Score</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex flex-col items-center bg-slate-800/70 p-4 rounded-lg">
              <div className="mb-2">
                {getScoreIcon(atsScore.overallScore)}
              </div>
              <div className={`text-3xl font-bold ${getScoreColor(atsScore.overallScore)}`}>
                {atsScore.overallScore}%
              </div>
              <div className="text-sm text-slate-400 mt-1">Overall Score</div>
            </div>
            
            <div className="flex flex-col items-center bg-slate-800/70 p-4 rounded-lg">
              <div className={`text-3xl font-bold ${getScoreColor(atsScore.keywordMatch)}`}>
                {atsScore.keywordMatch}%
              </div>
              <div className="text-sm text-slate-400 mt-1">Keyword Match</div>
            </div>
            
            <div className="flex flex-col items-center bg-slate-800/70 p-4 rounded-lg">
              <div className={`text-3xl font-bold ${getScoreColor(atsScore.formatScore)}`}>
                {atsScore.formatScore}%
              </div>
              <div className="text-sm text-slate-400 mt-1">Format Score</div>
            </div>
            
            <div className="flex flex-col items-center bg-slate-800/70 p-4 rounded-lg">
              <div className={`text-3xl font-bold ${getScoreColor(atsScore.contentScore)}`}>
                {atsScore.contentScore}%
              </div>
              <div className="text-sm text-slate-400 mt-1">Content Score</div>
            </div>
          </div>
          
          {atsScore.suggestions.length > 0 && (
            <div className="mt-4">
              <h4 className="font-medium text-sm text-slate-300 mb-2">Suggestions for Improvement:</h4>
              <ul className="space-y-2">
                {atsScore.suggestions.map((suggestion, index) => (
                  <li key={index} className="flex items-start text-sm">
                    <span className="flex-shrink-0 mr-2">•</span>
                    <span className="text-slate-400">{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      
      {/* Resume Preview & Download Button */}
      <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Resume Preview</h3>
          
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white flex items-center transition-colors"
          >
            <DownloadIcon className="h-4 w-4 mr-2" />
            Download PDF
          </button>
        </div>
        
        {/* This div will be used to generate the PDF */}
        <div id="resumeDocument" className="bg-white text-black rounded-lg p-6 overflow-hidden">
          {/* Resume Header with Personal Info */}
          <div className="border-b-2 border-gray-800 pb-4 mb-6">
            <h1 className="text-3xl font-bold text-gray-900">{personalInfo.fullName}</h1>
            <div className="flex flex-wrap text-sm text-gray-700 mt-2">
              <div className="mr-4">{personalInfo.email}</div>
              <div className="mr-4">{personalInfo.phone}</div>
              <div className="mr-4">{personalInfo.location}</div>
              {personalInfo.linkedIn && (
                <div className="flex items-center mr-4">
                  <ExternalLinkIcon className="h-3 w-3 mr-1" />
                  <span>LinkedIn</span>
                </div>
              )}
              {personalInfo.website && (
                <div className="flex items-center">
                  <ExternalLinkIcon className="h-3 w-3 mr-1" />
                  <span>Portfolio</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Professional Summary */}
          {summary && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-2">Professional Summary</h2>
              <p className="text-gray-700">{summary}</p>
            </div>
          )}
          
          {/* Work Experience */}
          {workExperience && workExperience.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-3">Work Experience</h2>
              
              {workExperience.map((job, index) => (
                <div key={index} className={index < workExperience.length - 1 ? 'mb-4' : ''}>
                  <div className="flex justify-between mb-1">
                    <h3 className="font-bold text-gray-800">{job.position}</h3>
                    <span className="text-gray-600 text-sm">{job.startDate} - {job.endDate}</span>
                  </div>
                  <div className="mb-1 text-gray-700">{job.company}{job.location ? `, ${job.location}` : ''}</div>
                  <p className="text-gray-700 mb-1">{job.description}</p>
                  
                  {job.achievements.length > 0 && (
                    <ul className="list-disc ml-5 text-gray-700">
                      {job.achievements.map((achievement, i) => (
                        achievement.trim() ? <li key={i}>{achievement}</li> : null
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
          
          {/* Education */}
          {education && education.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-3">Education</h2>
              
              {education.map((edu, index) => (
                <div key={index} className={index < education.length - 1 ? 'mb-3' : ''}>
                  <div className="flex justify-between mb-1">
                    <h3 className="font-bold text-gray-800">{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</h3>
                    <span className="text-gray-600 text-sm">{edu.startDate} - {edu.endDate}</span>
                  </div>
                  <div className="text-gray-700">{edu.institution}{edu.gpa ? `, GPA: ${edu.gpa}` : ''}</div>
                </div>
              ))}
            </div>
          )}
          
          {/* Skills */}
          {skills && skills.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">Skills</h2>
              <div className="flex flex-wrap">
                {skills.map((skill, index) => (
                  skill.name.trim() ? (
                    <span 
                      key={index} 
                      className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm mr-2 mb-2"
                    >
                      {skill.name}
                    </span>
                  ) : null
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