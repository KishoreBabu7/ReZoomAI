import React from 'react';
import { CoverLetter } from '../types';
import { DownloadIcon } from 'lucide-react';
import { exportDocument } from '../utils/pdfExport';
import { generateCoverLetterContent } from '../utils/coverLetterGenerator';

type CoverLetterPreviewProps = {
  coverLetter: CoverLetter;
  templateId: string;
};

const CoverLetterPreview: React.FC<CoverLetterPreviewProps> = ({
  coverLetter,
  templateId
}) => {
  const { personalInfo, jobDetails, keyPoints } = coverLetter;
  
  const handleDownload = () => {
    exportDocument('coverLetterDocument', `${personalInfo.fullName.replace(/ /g, '_')}_CoverLetter_${jobDetails.company.replace(/ /g, '_')}.pdf`);
  };
  
  // Generate cover letter content
  const letterContent = generateCoverLetterContent(personalInfo, jobDetails, keyPoints);
  
  // Split the content into paragraphs
  const paragraphs = letterContent.split('\n\n');
  
  return (
    <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Cover Letter Preview</h3>
        
        <button
          onClick={handleDownload}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white flex items-center transition-colors"
        >
          <DownloadIcon className="h-4 w-4 mr-2" />
          Download PDF
        </button>
      </div>
      
      {/* This div will be used to generate the PDF */}
      <div id="coverLetterDocument" className="bg-white text-black rounded-lg p-8 overflow-hidden">
        {/* Sender Information */}
        <div className="mb-8">
          <p className="font-semibold text-gray-900">{personalInfo.fullName}</p>
          <p className="text-gray-700">{personalInfo.email}</p>
          <p className="text-gray-700">{personalInfo.phone}</p>
          <p className="text-gray-700">{personalInfo.location}</p>
          <p className="text-gray-700">{new Date().toLocaleDateString()}</p>
        </div>
        
        {/* Recipient Information */}
        <div className="mb-8">
          <p className="font-semibold text-gray-900">{jobDetails.hiringManager || 'Hiring Manager'}</p>
          <p className="text-gray-700">{jobDetails.company}</p>
          {jobDetails.department && <p className="text-gray-700">{jobDetails.department}</p>}
        </div>
        
        {/* Cover Letter Content */}
        <div className="text-gray-800 space-y-4">
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoverLetterPreview;