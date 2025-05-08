import { Resume, ATSScoreResult } from '../types';

// Generate a professional summary based on user's experience and skills
export const generateResumeSummary = (resume: Partial<Resume>): string => {
  const { workExperience, skills } = resume;
  
  // Get years of experience from work history
  const totalYears = workExperience?.reduce((total, job) => {
    const start = new Date(job.startDate);
    const end = job.endDate === 'Present' ? new Date() : new Date(job.endDate);
    const years = (end.getFullYear() - start.getFullYear());
    return total + years;
  }, 0) || 0;

  // Get the most recent job title
  const currentRole = workExperience?.[0]?.position || 'professional';

  // Get top skills
  const topSkills = skills?.slice(0, 3).map(skill => skill.name).join(', ') || '';

  // Generate summary
  return `${currentRole} with ${totalYears}+ years of experience. Demonstrated expertise in ${topSkills}. Proven track record of delivering high-quality results and driving business value through technical excellence and innovative solutions.`;
};

// More accurate ATS scoring based on real-world ATS systems
export const generateATSScore = (resume: Partial<Resume>, jobDescription?: string): ATSScoreResult => {
  let formatScore = 0;
  let keywordMatch = 0;
  let contentScore = 0;
  const suggestions: string[] = [];

  // Format Score Analysis (30% of total)
  if (resume.personalInfo) {
    const { fullName, email, phone, location } = resume.personalInfo;
    if (fullName) formatScore += 7.5;
    if (email?.includes('@')) formatScore += 7.5;
    if (phone?.match(/^[\d\s\-\(\)]+$/)) formatScore += 7.5;
    if (location) formatScore += 7.5;
  }

  // Content Score Analysis (35% of total)
  if (resume.workExperience?.length) {
    const recentExperience = resume.workExperience[0];
    
    // Check for measurable achievements
    const hasMetrics = recentExperience.achievements.some(a => 
      a.match(/\d+%|\d+x|\$\d+|increased|decreased|improved|reduced|generated|saved/i)
    );
    if (hasMetrics) contentScore += 10;

    // Check for action verbs
    const hasActionVerbs = recentExperience.achievements.some(a =>
      a.match(/^(led|managed|developed|created|implemented|designed|analyzed)/i)
    );
    if (hasActionVerbs) contentScore += 10;

    // Experience description quality
    if (recentExperience.description.length > 50) contentScore += 7.5;
    if (resume.workExperience.length >= 2) contentScore += 7.5;
  }

  // Keyword Match Analysis (35% of total)
  if (jobDescription) {
    const jobKeywords = extractKeywords(jobDescription.toLowerCase());
    let matchedKeywords = 0;

    // Check resume content for keyword matches
    const resumeContent = [
      resume.summary,
      ...resume.workExperience?.map(exp => `${exp.description} ${exp.achievements.join(' ')}`) || [],
      ...resume.skills?.map(skill => skill.name) || []
    ].join(' ').toLowerCase();

    jobKeywords.forEach(keyword => {
      if (resumeContent.includes(keyword)) matchedKeywords++;
    });

    keywordMatch = (matchedKeywords / jobKeywords.length) * 35;
  } else {
    // Without job description, base on general industry keywords
    keywordMatch = 20; // Base score
    if (resume.skills?.length >= 5) keywordMatch += 5;
    if (resume.summary?.length > 100) keywordMatch += 5;
    if (resume.workExperience?.length >= 2) keywordMatch += 5;
  }

  // Generate meaningful suggestions
  if (!resume.summary || resume.summary.length < 100) {
    suggestions.push('Add a detailed professional summary (100-150 words) highlighting your key qualifications');
  }

  if (!resume.workExperience?.length) {
    suggestions.push('Include your work experience with specific achievements and metrics');
  } else {
    const achievements = resume.workExperience[0].achievements;
    if (!achievements.some(a => a.match(/\d+/))) {
      suggestions.push('Add quantifiable achievements (e.g., "Increased sales by 25%", "Managed a team of 10")');
    }
  }

  if (!resume.skills?.length || resume.skills.length < 5) {
    suggestions.push('List at least 5-7 relevant technical and soft skills');
  }

  if (jobDescription && keywordMatch < 25) {
    suggestions.push('Your resume needs more keywords from the job description. Consider adding relevant terms and skills.');
  }

  const overallScore = Math.round(formatScore + contentScore + keywordMatch);

  return {
    overallScore,
    keywordMatch: Math.round(keywordMatch * (100/35)), // Normalize to 100
    formatScore: Math.round(formatScore * (100/30)), // Normalize to 100
    contentScore: Math.round(contentScore * (100/35)), // Normalize to 100
    suggestions: suggestions.length ? suggestions : ['Your resume is well-optimized! Consider tailoring it further for specific job applications.']
  };
};

// Helper function to extract keywords from job description
const extractKeywords = (text: string): string[] => {
  // Common technical skills and qualifications
  const commonKeywords = [
    'javascript', 'python', 'java', 'react', 'angular', 'vue', 'node', 'sql',
    'agile', 'scrum', 'project management', 'leadership', 'communication',
    'analysis', 'development', 'design', 'testing', 'deployment', 'architecture',
    'cloud', 'aws', 'azure', 'devops', 'ci/cd', 'team management'
  ];

  // Extract words and phrases
  const words = text.match(/\b\w+\b/g) || [];
  const phrases = text.match(/\b\w+\s+\w+\b/g) || [];

  // Combine and filter relevant keywords
  return [...new Set([...words, ...phrases])].filter(keyword =>
    commonKeywords.some(common => keyword.includes(common)) ||
    keyword.length > 4 // Include longer words that might be important
  );
};

// Enhanced resume optimization based on template and job description
export const optimizeResume = (resume: Partial<Resume>, jobDescription: string): Partial<Resume> => {
  const optimized = { ...resume };

  // Extract keywords from job description
  const keywords = extractKeywords(jobDescription);

  // Enhance summary with relevant keywords
  if (optimized.summary && keywords.length > 0) {
    const relevantKeywords = keywords.filter(keyword => 
      !optimized.summary?.toLowerCase().includes(keyword.toLowerCase())
    ).slice(0, 3);

    if (relevantKeywords.length > 0) {
      optimized.summary += ` Expertise in ${relevantKeywords.join(', ')}.`;
    }
  }

  return optimized;
};

// Generate template-specific resume HTML
export const generateResumeHTML = (resume: Partial<Resume>, templateId: string): string => {
  const { personalInfo, summary, workExperience, education, skills } = resume;
  
  if (!personalInfo) return '<p>Missing personal information</p>';

  // Template-specific classes and layouts
  const templates = {
    modern: {
      container: 'modern-resume bg-white p-8',
      header: 'flex flex-col items-center text-center mb-8',
      name: 'text-3xl font-bold text-gray-800 mb-2',
      contact: 'text-gray-600 flex flex-wrap justify-center gap-3 text-sm',
      section: 'mb-8',
      sectionTitle: 'text-2xl font-bold text-blue-600 mb-4 pb-2 border-b-2 border-blue-200',
      jobTitle: 'text-xl font-semibold text-gray-800',
      jobCompany: 'text-lg text-blue-600',
      skillContainer: 'flex flex-wrap gap-2',
      skill: 'px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium'
    },
    professional: {
      container: 'professional-resume bg-white p-8',
      header: 'border-b-2 border-gray-800 pb-4 mb-8',
      name: 'text-4xl font-bold text-gray-900',
      contact: 'text-gray-700 mt-2 space-x-4',
      section: 'mb-8',
      sectionTitle: 'text-xl font-bold text-gray-900 mb-4 uppercase tracking-wider',
      jobTitle: 'font-bold text-gray-800',
      jobCompany: 'text-gray-700',
      skillContainer: 'grid grid-cols-2 md:grid-cols-3 gap-3',
      skill: 'px-3 py-1 bg-gray-100 text-gray-800 rounded text-sm'
    },
    creative: {
      container: 'creative-resume bg-gradient-to-br from-indigo-50 to-white p-8',
      header: 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg p-6 mb-8 shadow-lg',
      name: 'text-3xl font-bold mb-2',
      contact: 'text-indigo-100 flex flex-wrap gap-4',
      section: 'mb-8 bg-white rounded-lg p-6 shadow-md',
      sectionTitle: 'text-2xl font-bold text-indigo-600 mb-4',
      jobTitle: 'text-lg font-semibold text-gray-800',
      jobCompany: 'text-indigo-600 font-medium',
      skillContainer: 'flex flex-wrap gap-3',
      skill: 'px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg text-sm font-medium shadow-sm'
    }
  };

  const template = templates[templateId as keyof typeof templates];

  return `
    <div class="${template.container}">
      <header class="${template.header}">
        <h1 class="${template.name}">${personalInfo.fullName}</h1>
        <div class="${template.contact}">
          <span>${personalInfo.email}</span>
          <span>•</span>
          <span>${personalInfo.phone}</span>
          <span>•</span>
          <span>${personalInfo.location}</span>
          ${personalInfo.linkedIn ? `
            <span>•</span>
            <a href="${personalInfo.linkedIn}" class="text-blue-600 hover:text-blue-800">LinkedIn</a>
          ` : ''}
        </div>
      </header>

      ${summary ? `
        <section class="${template.section}">
          <h2 class="${template.sectionTitle}">Professional Summary</h2>
          <p class="text-gray-700 leading-relaxed">${summary}</p>
        </section>
      ` : ''}

      ${workExperience?.length ? `
        <section class="${template.section}">
          <h2 class="${template.sectionTitle}">Work Experience</h2>
          ${workExperience.map(job => `
            <div class="mb-6">
              <div class="flex justify-between items-start mb-2">
                <div>
                  <h3 class="${template.jobTitle}">${job.position}</h3>
                  <p class="${template.jobCompany}">${job.company}${job.location ? ` • ${job.location}` : ''}</p>
                </div>
                <p class="text-gray-600 text-sm">${job.startDate} - ${job.endDate}</p>
              </div>
              <p class="text-gray-700 mb-3">${job.description}</p>
              <ul class="list-disc ml-5 text-gray-700 space-y-1">
                ${job.achievements.map(achievement => 
                  achievement.trim() ? `<li>${achievement}</li>` : ''
                ).join('')}
              </ul>
            </div>
          `).join('')}
        </section>
      ` : ''}

      ${education?.length ? `
        <section class="${template.section}">
          <h2 class="${template.sectionTitle}">Education</h2>
          ${education.map(edu => `
            <div class="mb-4">
              <div class="flex justify-between mb-1">
                <h3 class="${template.jobTitle}">${edu.degree}${edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</h3>
                <p class="text-gray-600 text-sm">${edu.startDate} - ${edu.endDate}</p>
              </div>
              <p class="${template.jobCompany}">${edu.institution}${edu.gpa ? ` • GPA: ${edu.gpa}` : ''}</p>
            </div>
          `).join('')}
        </section>
      ` : ''}

      ${skills?.length ? `
        <section class="${template.section}">
          <h2 class="${template.sectionTitle}">Skills</h2>
          <div class="${template.skillContainer}">
            ${skills.map(skill => 
              skill.name.trim() ? `
                <span class="${template.skill}">
                  ${skill.name}
                </span>
              ` : ''
            ).join('')}
          </div>
        </section>
      ` : ''}
    </div>
  `;
};