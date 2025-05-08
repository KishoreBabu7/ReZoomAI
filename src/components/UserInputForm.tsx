import React, { useState } from 'react';
import { Resume, PersonalInfo, WorkExperience, Education, Skill, JobDetails } from '../types';
import { PlusIcon, MinusIcon, SaveIcon } from 'lucide-react';

type UserInputFormProps = {
  type: 'resume' | 'coverLetter';
  onSubmit: (data: Partial<Resume> | { personalInfo: PersonalInfo, jobDetails: JobDetails, keyPoints?: string[] }) => void;
  initialData?: Partial<Resume> | { personalInfo: PersonalInfo, jobDetails: JobDetails, keyPoints?: string[] };
};

const UserInputForm: React.FC<UserInputFormProps> = ({
  type,
  onSubmit,
  initialData
}) => {
  // Resume state
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(
    (initialData as any)?.personalInfo || {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedIn: '',
      website: ''
    }
  );
  
  const [summary, setSummary] = useState<string>(
    (initialData as Partial<Resume>)?.summary || ''
  );
  
  const [workExperience, setWorkExperience] = useState<WorkExperience[]>(
    (initialData as Partial<Resume>)?.workExperience || [{
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
      achievements: ['']
    }]
  );
  
  const [education, setEducation] = useState<Education[]>(
    (initialData as Partial<Resume>)?.education || [{
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      gpa: ''
    }]
  );
  
  const [skills, setSkills] = useState<Skill[]>(
    (initialData as Partial<Resume>)?.skills || [{
      name: '',
      level: 'Intermediate'
    }]
  );
  
  // Cover Letter state
  const [jobDetails, setJobDetails] = useState<JobDetails>(
    (initialData as any)?.jobDetails || {
      company: '',
      position: '',
      hiringManager: '',
      department: '',
      jobDescription: ''
    }
  );
  
  const [keyPoints, setKeyPoints] = useState<string[]>(
    (initialData as any)?.keyPoints || ['']
  );
  
  // Form section visibility state
  const [visibleSections, setVisibleSections] = useState({
    personalInfo: true,
    summary: type === 'resume',
    workExperience: type === 'resume',
    education: type === 'resume',
    skills: type === 'resume',
    jobDetails: type === 'coverLetter',
    keyPoints: type === 'coverLetter'
  });
  
  const toggleSection = (section: string) => {
    setVisibleSections(prev => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev]
    }));
  };
  
  // Helper functions for array fields
  const addArrayItem = (field: 'workExperience' | 'education' | 'skills' | 'keyPoints') => {
    if (field === 'workExperience') {
      setWorkExperience([...workExperience, {
        company: '',
        position: '',
        location: '',
        startDate: '',
        endDate: '',
        description: '',
        achievements: ['']
      }]);
    } else if (field === 'education') {
      setEducation([...education, {
        institution: '',
        degree: '',
        fieldOfStudy: '',
        startDate: '',
        endDate: '',
        gpa: ''
      }]);
    } else if (field === 'skills') {
      setSkills([...skills, { name: '', level: 'Intermediate' }]);
    } else if (field === 'keyPoints') {
      setKeyPoints([...keyPoints, '']);
    }
  };
  
  const removeArrayItem = (field: 'workExperience' | 'education' | 'skills' | 'keyPoints', index: number) => {
    if (field === 'workExperience') {
      setWorkExperience(workExperience.filter((_, i) => i !== index));
    } else if (field === 'education') {
      setEducation(education.filter((_, i) => i !== index));
    } else if (field === 'skills') {
      setSkills(skills.filter((_, i) => i !== index));
    } else if (field === 'keyPoints') {
      setKeyPoints(keyPoints.filter((_, i) => i !== index));
    }
  };
  
  // Add achievement to a work experience
  const addAchievement = (expIndex: number) => {
    const newWorkExperience = [...workExperience];
    newWorkExperience[expIndex].achievements.push('');
    setWorkExperience(newWorkExperience);
  };
  
  const removeAchievement = (expIndex: number, achievementIndex: number) => {
    const newWorkExperience = [...workExperience];
    newWorkExperience[expIndex].achievements = 
      newWorkExperience[expIndex].achievements.filter((_, i) => i !== achievementIndex);
    setWorkExperience(newWorkExperience);
  };
  
  const updateAchievement = (expIndex: number, achievementIndex: number, value: string) => {
    const newWorkExperience = [...workExperience];
    newWorkExperience[expIndex].achievements[achievementIndex] = value;
    setWorkExperience(newWorkExperience);
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (type === 'resume') {
      onSubmit({
        personalInfo,
        summary,
        workExperience,
        education,
        skills
      });
    } else {
      onSubmit({
        personalInfo,
        jobDetails,
        keyPoints: keyPoints.filter(point => point.trim() !== '')
      });
    }
  };
  
  return (
    <>
    <div className="max-w-l mx-auto my-4 p-4 bg-yellow-50 border border-yellow-300 rounded-2xl shadow-sm text-yellow-800 text-sm text-center">
      <strong className="block mb-1 text-yellow-900">⚠️ Important Notice</strong>
      <p>
        If you leave this page, any unsaved information will be lost.
        To avoid losing your data, please copy and save it in a notepad before proceeding.
      </p>
    </div>

    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Personal Information Section */}
      <section className="bg-slate-800/30 rounded-xl p-6 backdrop-blur-sm">
        <div 
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection('personalInfo')}
        >
          <h2 className="text-xl font-semibold">Personal Information</h2>
          <span>{visibleSections.personalInfo ? '−' : '+'}</span>
        </div>
        
        {visibleSections.personalInfo && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={personalInfo.fullName}
                onChange={(e) => setPersonalInfo({...personalInfo, fullName: e.target.value})}
                className="w-full px-4 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="John Doe"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Email
              </label>
              <input
                type="email"
                value={personalInfo.email}
                onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
                className="w-full px-4 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="john.doe@example.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Phone
              </label>
              <input
                type="tel"
                value={personalInfo.phone}
                onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
                className="w-full px-4 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="(123) 456-7890"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Location
              </label>
              <input
                type="text"
                value={personalInfo.location}
                onChange={(e) => setPersonalInfo({...personalInfo, location: e.target.value})}
                className="w-full px-4 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="City, State"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                LinkedIn (optional)
              </label>
              <input
                type="url"
                value={personalInfo.linkedIn || ''}
                onChange={(e) => setPersonalInfo({...personalInfo, linkedIn: e.target.value})}
                className="w-full px-4 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://linkedin.com/in/johndoe"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Website (optional)
              </label>
              <input
                type="url"
                value={personalInfo.website || ''}
                onChange={(e) => setPersonalInfo({...personalInfo, website: e.target.value})}
                className="w-full px-4 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://johndoe.com"
              />
            </div>
          </div>
        )}
      </section>
      
      {/* Resume-specific sections */}
      {type === 'resume' && (
        <>
          {/* Professional Summary Section */}
          <section className="bg-slate-800/30 rounded-xl p-6 backdrop-blur-sm">
            <div 
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection('summary')}
            >
              <h2 className="text-xl font-semibold">Professional Summary</h2>
              <span>{visibleSections.summary ? '−' : '+'}</span>
            </div>
            
            {visibleSections.summary && (
              <div className="mt-4">
                <textarea
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[120px]"
                  placeholder="A brief summary of your professional background and key qualifications..."
                />
                <p className="text-xs text-slate-400 mt-2">
                  Pro tip: Keep your summary concise (3-5 sentences) and highlight your most relevant qualifications.
                </p>
              </div>
            )}
          </section>
          
          {/* Work Experience Section */}
          <section className="bg-slate-800/30 rounded-xl p-6 backdrop-blur-sm">
            <div 
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection('workExperience')}
            >
              <h2 className="text-xl font-semibold">Work Experience</h2>
              <span>{visibleSections.workExperience ? '−' : '+'}</span>
            </div>
            
            {visibleSections.workExperience && (
              <div className="mt-4 space-y-6">
                {workExperience.map((exp, index) => (
                  <div key={index} className="p-4 border border-slate-700 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <h3 className="font-medium">Experience {index + 1}</h3>
                      {workExperience.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayItem('workExperience', index)}
                          className="text-red-500 hover:text-red-400"
                        >
                          <MinusIcon className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">
                          Company
                        </label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => {
                            const newExp = [...workExperience];
                            newExp[index].company = e.target.value;
                            setWorkExperience(newExp);
                          }}
                          className="w-full px-4 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Company Name"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">
                          Position
                        </label>
                        <input
                          type="text"
                          value={exp.position}
                          onChange={(e) => {
                            const newExp = [...workExperience];
                            newExp[index].position = e.target.value;
                            setWorkExperience(newExp);
                          }}
                          className="w-full px-4 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Job Title"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">
                          Start Date
                        </label>
                        <input
                          type="text"
                          value={exp.startDate}
                          onChange={(e) => {
                            const newExp = [...workExperience];
                            newExp[index].startDate = e.target.value;
                            setWorkExperience(newExp);
                          }}
                          className="w-full px-4 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="MM/YYYY"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">
                          End Date
                        </label>
                        <input
                          type="text"
                          value={exp.endDate}
                          onChange={(e) => {
                            const newExp = [...workExperience];
                            newExp[index].endDate = e.target.value;
                            setWorkExperience(newExp);
                          }}
                          className="w-full px-4 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="MM/YYYY or Present"
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-300 mb-1">
                          Description
                        </label>
                        <textarea
                          value={exp.description}
                          onChange={(e) => {
                            const newExp = [...workExperience];
                            newExp[index].description = e.target.value;
                            setWorkExperience(newExp);
                          }}
                          className="w-full px-4 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Brief description of your role..."
                          rows={2}
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-300 mb-1">
                          Key Achievements
                        </label>
                        
                        {exp.achievements.map((achievement, achievementIndex) => (
                          <div key={achievementIndex} className="flex items-center mb-2">
                            <input
                              type="text"
                              value={achievement}
                              onChange={(e) => updateAchievement(index, achievementIndex, e.target.value)}
                              className="flex-grow px-4 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Accomplishment with measurable results..."
                            />
                            {exp.achievements.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeAchievement(index, achievementIndex)}
                                className="ml-2 text-red-500 hover:text-red-400"
                              >
                                <MinusIcon className="h-5 w-5" />
                              </button>
                            )}
                          </div>
                        ))}
                        
                        <button
                          type="button"
                          onClick={() => addAchievement(index)}
                          className="mt-2 flex items-center text-blue-400 hover:text-blue-300 text-sm"
                        >
                          <PlusIcon className="h-4 w-4 mr-1" />
                          Add Achievement
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                
                <button
                  type="button"
                  onClick={() => addArrayItem('workExperience')}
                  className="mt-2 flex items-center text-blue-400 hover:text-blue-300"
                >
                  <PlusIcon className="h-5 w-5 mr-1" />
                  Add Work Experience
                </button>
              </div>
            )}
          </section>
          
          {/* Education Section */}
          <section className="bg-slate-800/30 rounded-xl p-6 backdrop-blur-sm">
            <div 
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection('education')}
            >
              <h2 className="text-xl font-semibold">Education</h2>
              <span>{visibleSections.education ? '−' : '+'}</span>
            </div>
            
            {visibleSections.education && (
              <div className="mt-4 space-y-6">
                {education.map((edu, index) => (
                  <div key={index} className="p-4 border border-slate-700 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <h3 className="font-medium">Education {index + 1}</h3>
                      {education.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayItem('education', index)}
                          className="text-red-500 hover:text-red-400"
                        >
                          <MinusIcon className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">
                          Institution
                        </label>
                        <input
                          type="text"
                          value={edu.institution}
                          onChange={(e) => {
                            const newEdu = [...education];
                            newEdu[index].institution = e.target.value;
                            setEducation(newEdu);
                          }}
                          className="w-full px-4 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="University/College Name"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">
                          Degree
                        </label>
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => {
                            const newEdu = [...education];
                            newEdu[index].degree = e.target.value;
                            setEducation(newEdu);
                          }}
                          className="w-full px-4 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Bachelor of Science, Master's, etc."
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">
                          Field of Study
                        </label>
                        <input
                          type="text"
                          value={edu.fieldOfStudy || ''}
                          onChange={(e) => {
                            const newEdu = [...education];
                            newEdu[index].fieldOfStudy = e.target.value;
                            setEducation(newEdu);
                          }}
                          className="w-full px-4 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Computer Science, Business, etc."
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-1">
                            Start Date
                          </label>
                          <input
                            type="text"
                            value={edu.startDate}
                            onChange={(e) => {
                              const newEdu = [...education];
                              newEdu[index].startDate = e.target.value;
                              setEducation(newEdu);
                            }}
                            className="w-full px-4 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="MM/YYYY"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-1">
                            End Date
                          </label>
                          <input
                            type="text"
                            value={edu.endDate}
                            onChange={(e) => {
                              const newEdu = [...education];
                              newEdu[index].endDate = e.target.value;
                              setEducation(newEdu);
                            }}
                            className="w-full px-4 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="MM/YYYY"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                <button
                  type="button"
                  onClick={() => addArrayItem('education')}
                  className="mt-2 flex items-center text-blue-400 hover:text-blue-300"
                >
                  <PlusIcon className="h-5 w-5 mr-1" />
                  Add Education
                </button>
              </div>
            )}
          </section>
          
          {/* Skills Section */}
          <section className="bg-slate-800/30 rounded-xl p-6 backdrop-blur-sm">
            <div 
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection('skills')}
            >
              <h2 className="text-xl font-semibold">Skills</h2>
              <span>{visibleSections.skills ? '−' : '+'}</span>
            </div>
            
            {visibleSections.skills && (
              <div className="mt-4 space-y-4">
                {skills.map((skill, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="flex-grow">
                      <input
                        type="text"
                        value={skill.name}
                        onChange={(e) => {
                          const newSkills = [...skills];
                          newSkills[index].name = e.target.value;
                          setSkills(newSkills);
                        }}
                        className="w-full px-4 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Skill (e.g., JavaScript, Project Management, etc.)"
                      />
                    </div>
                    
                    <div className="w-40">
                      <select
                        value={skill.level || 'Intermediate'}
                        onChange={(e) => {
                          const newSkills = [...skills];
                          newSkills[index].level = e.target.value as any;
                          setSkills(newSkills);
                        }}
                        className="w-full px-4 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                        <option value="Expert">Expert</option>
                      </select>
                    </div>
                    
                    {skills.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem('skills', index)}
                        className="text-red-500 hover:text-red-400"
                      >
                        <MinusIcon className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                ))}
                
                <button
                  type="button"
                  onClick={() => addArrayItem('skills')}
                  className="mt-2 flex items-center text-blue-400 hover:text-blue-300"
                >
                  <PlusIcon className="h-5 w-5 mr-1" />
                  Add Skill
                </button>
                
                <p className="text-xs text-slate-400 mt-2">
                  Pro tip: List technical skills, soft skills, and industry-specific knowledge relevant to the job.
                </p>
              </div>
            )}
          </section>
        </>
      )}
      
      {/* Cover Letter-specific sections */}
      {type === 'coverLetter' && (
        <>
          {/* Job Details Section */}
          <section className="bg-slate-800/30 rounded-xl p-6 backdrop-blur-sm">
            <div 
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection('jobDetails')}
            >
              <h2 className="text-xl font-semibold">Job Details</h2>
              <span>{visibleSections.jobDetails ? '−' : '+'}</span>
            </div>
            
            {visibleSections.jobDetails && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={jobDetails.company}
                    onChange={(e) => setJobDetails({...jobDetails, company: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Company Name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Position
                  </label>
                  <input
                    type="text"
                    value={jobDetails.position}
                    onChange={(e) => setJobDetails({...jobDetails, position: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Job Title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Hiring Manager (optional)
                  </label>
                  <input
                    type="text"
                    value={jobDetails.hiringManager || ''}
                    onChange={(e) => setJobDetails({...jobDetails, hiringManager: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Name of Hiring Manager"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Department (optional)
                  </label>
                  <input
                    type="text"
                    value={jobDetails.department || ''}
                    onChange={(e) => setJobDetails({...jobDetails, department: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Department Name"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Job Description (for ATS optimization)
                  </label>
                  <textarea
                    value={jobDetails.jobDescription || ''}
                    onChange={(e) => setJobDetails({...jobDetails, jobDescription: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px]"
                    placeholder="Paste the job description here to optimize your cover letter..."
                  />
                  <p className="text-xs text-slate-400 mt-2">
                    Pro tip: Including the job description helps our AI personalize your cover letter with relevant keywords.
                  </p>
                </div>
              </div>
            )}
          </section>
          
          {/* Key Points Section */}
          <section className="bg-slate-800/30 rounded-xl p-6 backdrop-blur-sm">
            <div 
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection('keyPoints')}
            >
              <h2 className="text-xl font-semibold">Key Points to Highlight</h2>
              <span>{visibleSections.keyPoints ? '−' : '+'}</span>
            </div>
            
            {visibleSections.keyPoints && (
              <div className="mt-4 space-y-3">
                <p className="text-sm text-slate-300">
                  List specific skills, experiences, or achievements you want to highlight in your cover letter.
                </p>
                
                {keyPoints.map((point, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="text"
                      value={point}
                      onChange={(e) => {
                        const newPoints = [...keyPoints];
                        newPoints[index] = e.target.value;
                        setKeyPoints(newPoints);
                      }}
                      className="flex-grow px-4 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Key qualification, skill, or achievement..."
                    />
                    
                    {keyPoints.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem('keyPoints', index)}
                        className="ml-2 text-red-500 hover:text-red-400"
                      >
                        <MinusIcon className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                ))}
                
                <button
                  type="button"
                  onClick={() => addArrayItem('keyPoints')}
                  className="mt-2 flex items-center text-blue-400 hover:text-blue-300"
                >
                  <PlusIcon className="h-5 w-5 mr-1" />
                  Add Key Point
                </button>
              </div>
            )}
          </section>
        </>
      )}
      
      {/* Submit Button */}
      <div className="flex justify-center mt-8">
        <button
          type="submit"
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full text-white font-medium text-lg hover:shadow-lg hover:shadow-blue-500/20 transform hover:-translate-y-1 transition-all flex items-center"
        >
          <SaveIcon className="h-5 w-5 mr-2" />
          Generate {type === 'resume' ? 'Resume' : 'Cover Letter'}
        </button>
      </div>
    </form>
    </>
  );
};

export default UserInputForm;