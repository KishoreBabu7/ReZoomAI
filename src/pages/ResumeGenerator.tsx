import React, { useState, useCallback } from 'react';
import UserInputForm from '../components/UserInputForm';
import ResumePreview from '../components/ResumePreview';
import { Resume, ATSScoreResult } from '../types';
import { generateATSScore, generateResumeSummary, optimizeResume } from '../utils/resumeGenerator';
import { FileTextIcon, BrainIcon, RefreshCwIcon } from 'lucide-react';

const ResumeGenerator: React.FC = () => {
  const [resume, setResume] = useState<Partial<Resume>>({});
  const [atsScore, setAtsScore] = useState<ATSScoreResult | undefined>();
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('modern');
  const [jobDescription, setJobDescription] = useState<string>('');
  const [showOptimizeForm, setShowOptimizeForm] = useState(false);
  const [showExitDialog, setShowExitDialog] = useState(false);
  
  // Available templates (would have more in a real app)
  const templates = [
    { id: 'modern', name: 'Modern Professional' },
    { id: 'classic', name: 'Classic' },
    { id: 'creative', name: 'Creative' },
  ];
  
  const handleFormSubmit = (data: Partial<Resume>) => {
    setIsGenerating(true);
    
    // Simulate AI processing
    setTimeout(() => {
      // If there's no summary, generate one
      if (!data.summary) {
        data.summary = generateResumeSummary(data);
      }
      
      setResume(data);
      
      // Generate ATS score
      const score = generateATSScore(data, jobDescription);
      setAtsScore(score);
      
      setIsGenerating(false);
    }, 1500);
  };
  
  const handleOptimize = () => {
    setIsGenerating(true);
    
    // Simulate AI optimization
    setTimeout(() => {
      const optimizedResume = optimizeResume(resume, jobDescription);
      setResume(optimizedResume);
      
      // Generate new ATS score
      const newScore = generateATSScore(optimizedResume, jobDescription);
      setAtsScore(newScore);
      
      setIsGenerating(false);
      setShowOptimizeForm(false);
    }, 2000);
  };

  const handleExit = useCallback(() => {
    setShowExitDialog(true);
  }, []);

  const handleExitConfirm = useCallback(() => {
    setResume({});
    setShowExitDialog(false);
  }, []);

  const handleExitCancel = useCallback(() => {
    setShowExitDialog(false);
  }, []);
  
  return (
    <div className="space-y-8 animate-fadeIn">
      <h1 className="text-3xl font-bold text-center">AI-Powered Resume Generator</h1>
      
      {resume.personalInfo ? (
        <>
          {/* Resume and ATS Score Display */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ResumePreview 
                resume={resume} 
                atsScore={atsScore}
                templateId={selectedTemplateId}
              />
            </div>
            
            <div className="space-y-6">
              {/* Template Selector */}
              <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
                <h3 className="text-xl font-semibold mb-4">Resume Template</h3>
                <div className="space-y-3">
                  {templates.map(template => (
                    <div
                      key={template.id}
                      onClick={() => setSelectedTemplateId(template.id)}
                      className={`cursor-pointer p-3 rounded-lg border flex items-center transition-all ${
                        selectedTemplateId === template.id
                          ? 'border-blue-500 bg-blue-500/10'
                          : 'border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      <div className="flex-shrink-0 mr-3">
                        <FileTextIcon className={`h-5 w-5 ${
                          selectedTemplateId === template.id ? 'text-blue-500' : 'text-slate-400'
                        }`} />
                      </div>
                      <span className={selectedTemplateId === template.id ? 'text-blue-400' : ''}>
                        {template.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Optimize for Job */}
              <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
                <h3 className="text-xl font-semibold mb-4">Optimize for Job</h3>
                
                {showOptimizeForm ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1">
                        Job Description
                      </label>
                      <textarea
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[120px]"
                        placeholder="Paste the job description here to optimize your resume..."
                      />
                    </div>
                    
                    <div className="flex justify-between">
                      <button
                        onClick={() => setShowOptimizeForm(false)}
                        className="px-4 py-2 border border-slate-600 hover:border-slate-500 rounded-lg text-slate-300 transition-colors"
                      >
                        Cancel
                      </button>
                      
                      <button
                        onClick={handleOptimize}
                        disabled={!jobDescription.trim()}
                        className={`px-4 py-2 rounded-lg text-white flex items-center ${
                          !jobDescription.trim() 
                            ? 'bg-slate-700 cursor-not-allowed' 
                            : 'bg-blue-600 hover:bg-blue-500'
                        }`}
                      >
                        <BrainIcon className="h-4 w-4 mr-2" />
                        Optimize Resume
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-slate-400 mb-4">
                      Want to tailor your resume for a specific job? Let our AI optimize it for you.
                    </p>
                    <button
                      onClick={() => setShowOptimizeForm(true)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white transition-colors"
                    >
                      Optimize Now
                    </button>
                  </div>
                )}
              </div>
              
              {/* Edit Button */}
              <div className="text-center">
                <button
                  onClick={handleExit}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white flex items-center mx-auto"
                >
                  <RefreshCwIcon className="h-4 w-4 mr-2" />
                  Start Over
                </button>
              </div>
            </div>
          </div>

          {/* Exit Confirmation Dialog */}
          {showExitDialog && (
            <div className="fixed inset-0 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm z-50">
              <div className="bg-slate-800 p-6 rounded-xl shadow-xl max-w-md w-full mx-4">
                <h3 className="text-xl font-semibold mb-4">Exit Preview?</h3>
                <p className="text-slate-300 mb-6">
                  Are you sure you want to exit? Your current resume will be reset and you'll need to start over.
                </p>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={handleExitCancel}
                    className="px-4 py-2 border border-slate-600 hover:border-slate-500 rounded-lg text-slate-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleExitConfirm}
                    className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-white transition-colors"
                  >
                    Exit
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          {/* Form to collect user information */}
          <div className={`transition-opacity duration-300 ${isGenerating ? 'opacity-50' : 'opacity-100'}`}>
            <UserInputForm 
              type="resume"
              onSubmit={handleFormSubmit}
            />
          </div>
          
          {/* Loading indicator */}
          {isGenerating && (
            <div className="fixed inset-0 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm z-50">
              <div className="bg-slate-800 p-6 rounded-xl shadow-xl flex flex-col items-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                <p className="text-white text-lg">Generating your resume...</p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ResumeGenerator;