// User Information Types
export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedIn?: string;
  website?: string;
}

export interface Education {
  institution: string;
  degree: string;
  fieldOfStudy?: string;
  startDate: string;
  endDate: string | 'Present';
  gpa?: string;
  highlights?: string[];
}

export interface WorkExperience {
  company: string;
  position: string;
  location?: string;
  startDate: string;
  endDate: string | 'Present';
  description: string;
  achievements: string[];
}

export interface Skill {
  name: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  startDate?: string;
  endDate?: string | 'Present';
}

export interface Certificate {
  name: string;
  issuer: string;
  date: string;
  link?: string;
}

export interface Language {
  name: string;
  proficiency: 'Basic' | 'Conversational' | 'Fluent' | 'Native';
}

export interface Resume {
  personalInfo: PersonalInfo;
  summary?: string;
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  projects?: Project[];
  certificates?: Certificate[];
  languages?: Language[];
}

// Cover Letter Types
export interface JobDetails {
  company: string;
  position: string;
  hiringManager?: string;
  department?: string;
  jobDescription?: string;
}

export interface CoverLetter {
  personalInfo: PersonalInfo;
  jobDetails: JobDetails;
  keyPoints?: string[];
  customIntro?: string;
  customClosing?: string;
}

// ATS Scoring
export interface ATSScoreResult {
  overallScore: number; // 0-100
  keywordMatch: number; // 0-100
  formatScore: number; // 0-100
  contentScore: number; // 0-100
  suggestions: string[];
}

// Template Types
export interface Template {
  id: string;
  name: string;
  type: 'resume' | 'coverLetter';
  previewImage?: string;
}