import React from 'react';
import { ATSScoreResult } from '../types';
import { 
  CheckCircleIcon, 
  AlertCircleIcon, 
  AlertTriangleIcon,
  BarChart3Icon,
  SearchIcon,
  FileTextIcon,
  ListIcon
} from 'lucide-react';

type ATSScoreDisplayProps = {
  score: ATSScoreResult;
};

const ATSScoreDisplay: React.FC<ATSScoreDisplayProps> = ({ score }) => {
  const { overallScore, keywordMatch, formatScore, contentScore, suggestions } = score;
  
  // Helper function to determine color and icon based on score
  const getScoreDetails = (score: number) => {
    if (score >= 90) {
      return { color: 'text-emerald-500', bgColor: 'bg-emerald-500/10', icon: <CheckCircleIcon className="h-5 w-5 text-emerald-500" /> };
    } else if (score >= 70) {
      return { color: 'text-blue-500', bgColor: 'bg-blue-500/10', icon: <CheckCircleIcon className="h-5 w-5 text-blue-500" /> };
    } else if (score >= 50) {
      return { color: 'text-yellow-500', bgColor: 'bg-yellow-500/10', icon: <AlertTriangleIcon className="h-5 w-5 text-yellow-500" /> };
    } else {
      return { color: 'text-red-500', bgColor: 'bg-red-500/10', icon: <AlertCircleIcon className="h-5 w-5 text-red-500" /> };
    }
  };
  
  const overallDetails = getScoreDetails(overallScore);
  const keywordDetails = getScoreDetails(keywordMatch);
  const formatDetails = getScoreDetails(formatScore);
  const contentDetails = getScoreDetails(contentScore);
  
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">ATS Compatibility Score</h3>
        <div className="flex items-center">
          <span className={`text-3xl font-bold ${overallDetails.color}`}>{overallScore}%</span>
          <span className="ml-2">{overallDetails.icon}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ScoreCard 
          title="Keyword Match" 
          score={keywordMatch} 
          icon={<SearchIcon className="h-5 w-5" />}
          details={keywordDetails}
          description="How well your document matches job-specific keywords"
        />
        
        <ScoreCard 
          title="Format Score" 
          score={formatScore} 
          icon={<FileTextIcon className="h-5 w-5" />}
          details={formatDetails}
          description="How well your document is structured for ATS parsing"
        />
        
        <ScoreCard 
          title="Content Score" 
          score={contentScore} 
          icon={<ListIcon className="h-5 w-5" />}
          details={contentDetails}
          description="Quality and completeness of your document content"
        />
      </div>
      
      {suggestions.length > 0 && (
        <div className="mt-6">
          <h4 className="font-medium mb-3 flex items-center">
            <BarChart3Icon className="h-5 w-5 mr-2" />
            Suggestions for Improvement
          </h4>
          
          <ul className="space-y-2">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start p-3 bg-slate-800/50 rounded-lg">
                <div className="flex-shrink-0 mr-3 mt-0.5">
                  {suggestion.includes('great') || suggestion.includes('Good') ? (
                    <CheckCircleIcon className="h-5 w-5 text-emerald-500" />
                  ) : (
                    <AlertCircleIcon className="h-5 w-5 text-blue-500" />
                  )}
                </div>
                <span className="text-slate-300">{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const ScoreCard: React.FC<{
  title: string;
  score: number;
  icon: React.ReactNode;
  details: { color: string; bgColor: string; icon: React.ReactNode };
  description: string;
}> = ({ title, score, icon, details, description }) => {
  return (
    <div className={`rounded-xl p-4 ${details.bgColor} border border-slate-700/50`}>
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <span className={`p-2 rounded-full bg-slate-800/50 mr-2 ${details.color}`}>
            {icon}
          </span>
          <h4 className="font-medium">{title}</h4>
        </div>
        <div className={`font-bold text-xl ${details.color}`}>{score}%</div>
      </div>
      <p className="text-xs text-slate-400">{description}</p>
    </div>
  );
};

export default ATSScoreDisplay;