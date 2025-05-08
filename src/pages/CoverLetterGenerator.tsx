import React, { useState, useCallback } from 'react';
import UserInputForm from '../components/UserInputForm';
import CoverLetterPreview from '../components/CoverLetterPreview';
import { CoverLetter, PersonalInfo, JobDetails } from '../types';
import { BrainIcon, RefreshCwIcon, FileType2Icon } from 'lucide-react';
import { suggestKeyPoints, optimizeCoverLetter } from '../utils/coverLetterGenerator';

const CoverLetterGenerator: React.FC = () => {
  const [coverLetter, setCoverLetter] = useState<CoverLetter | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('professional');
  const [showExitDialog, setShowExitDialog] = useState(false);
  
  // Available templates (would have more in a real app)
  const templates = [
    { id: 'professional', name: 'Professional' },
    { id: 'modern', name: 'Modern' },
    { id: 'creative', name: 'Creative' },
  ];
  
  const handleFormSubmit = (data: { 
    personalInfo: PersonalInfo, 
    jobDetails: JobDetails, 
    keyPoints?: string[] 
  }) => {
    setIsGenerating(true);
    
    // Simulate AI processing
    setTimeout(() => {
      // Use the key points from form, or generate them based on job description
      const finalKeyPoints = data.keyPoints && data.keyPoints.length > 0 
        ? data.keyPoints 
        : suggestKeyPoints(data.jobDetails.jobDescription);
      
      setCoverLetter({
        personalInfo: data.personalInfo,
        jobDetails: data.jobDetails,
        keyPoints: finalKeyPoints
      });
      
      setIsGenerating(false);
    }, 1500);
  };
  
  const handleOptimizeCoverLetter = () => {
    if (!coverLetter) return;
    
    setIsGenerating(true);
    
    // Simulate AI optimization
    setTimeout(() => {
      const optimized = optimizeCoverLetter(coverLetter, selectedTemplateId);
      setCoverLetter(optimized);
      setIsGenerating(false);
    }, 1500);
  };

  const handleExit = useCallback(() => {
    setShowExitDialog(true);
  }, []);

  const handleExitConfirm = useCallback(() => {
    setCoverLetter(null);
    setShowExitDialog(false);
  }, []);

  const handleExitCancel = useCallback(() => {
    setShowExitDialog(false);
  }, []);
  
  return (
    <div className="space-y-8 animate-fadeIn">
      <h1 className="text-3xl font-bold text-center">AI-Powered Cover Letter Generator</h1>
      
      {coverLetter ? (
        <>
          {/* Cover Letter and Template Selector */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <CoverLetterPreview 
                coverLetter={coverLetter}
                templateId={selectedTemplateId}
              />
            </div>
            
            <div className="space-y-6">
              {/* Template Selector */}
              <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
                <h3 className="text-xl font-semibold mb-4">Cover Letter Template</h3>
                <div className="space-y-3">
                  {templates.map(template => (
                    <div
                      key={template.id}
                      onClick={() => setSelectedTemplateId(template.id)}
                      className={`cursor-pointer p-3 rounded-lg border flex items-center transition-all ${
                        selectedTemplateId === template.id
                          ? 'border-purple-500 bg-purple-500/10'
                          : 'border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      <div className="flex-shrink-0 mr-3">
                        <FileType2Icon className={`h-5 w-5 ${
                          selectedTemplateId === template.id ? 'text-purple-500' : 'text-slate-400'
                        }`} />
                      </div>
                      <span className={selectedTemplateId === template.id ? 'text-purple-400' : ''}>
                        {template.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Optimize Button */}
              <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
                <h3 className="text-xl font-semibold mb-4">Fine-tune Your Letter</h3>
                <p className="text-slate-400 mb-4">
                  Not quite perfect? Let our AI analyze your cover letter and improve it.
                </p>
                <button
                  onClick={handleOptimizeCoverLetter}
                  className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg text-white flex items-center justify-center transition-colors"
                >
                  <BrainIcon className="h-4 w-4 mr-2" />
                  Enhance Letter
                </button>
              </div>
              
              {/* Start Over Button */}
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
                  Are you sure you want to exit? Your current cover letter will be reset and you'll need to start over.
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
              type="coverLetter"
              onSubmit={handleFormSubmit}
            />
          </div>
          
          {/* Loading indicator */}
          {isGenerating && (
            <div className="fixed inset-0 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm z-50">
              <div className="bg-slate-800 p-6 rounded-xl shadow-xl flex flex-col items-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500 mb-4"></div>
                <p className="text-white text-lg">Generating your cover letter...</p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CoverLetterGenerator;