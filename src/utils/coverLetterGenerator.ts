import { CoverLetter, PersonalInfo, JobDetails } from '../types';

// Enhanced cover letter generation with template support
export const generateCoverLetterContent = (
  personalInfo: PersonalInfo,
  jobDetails: JobDetails,
  keyPoints?: string[],
  templateId: string = 'professional'
): string => {
  const { fullName } = personalInfo;
  const { company, position, hiringManager } = jobDetails;
  
  const templates = {
    professional: {
      greeting: hiringManager ? 
        `Dear ${hiringManager},` : 
        'Dear Hiring Manager,',
      intro: `I am writing to express my strong interest in the ${position} position at ${company}. With my background and proven track record, I am confident in my ability to become a valuable member of your team.`,
      body: (points: string[]) => 
        `Throughout my career, I have developed expertise that aligns perfectly with this role. ${
          points.length > 0 
            ? `My key qualifications include:\n\n${points.map(point => `• ${point}`).join('\n')}` 
            : ''
        }`,
      closing: `I am excited about the opportunity to bring my unique skills to ${company} and would welcome the chance to discuss how I can contribute to your team's success. Thank you for considering my application.`
    },
    modern: {
      greeting: hiringManager ? 
        `Dear ${hiringManager},` : 
        'Hello,',
      intro: `I'm thrilled about the opportunity to apply for the ${position} role at ${company}. Your company's innovative approach to [industry/product] perfectly aligns with my professional aspirations and expertise.`,
      body: (points: string[]) => 
        `What excites me most about this opportunity is the chance to contribute my unique skills and experience to your team. ${
          points.length > 0 
            ? `Here's what I bring to the table:\n\n${points.map(point => `• ${point}`).join('\n')}` 
            : ''
        }`,
      closing: `I would love the opportunity to discuss how my skills and enthusiasm would benefit ${company}. I look forward to speaking with you soon.`
    },
    creative: {
      greeting: hiringManager ? 
        `Dear ${hiringManager},` : 
        'Greetings!',
      intro: `When I discovered the ${position} opening at ${company}, I knew it was the perfect opportunity to combine my passion for [industry/field] with my professional expertise.`,
      body: (points: string[]) => 
        `My journey has equipped me with unique perspectives and capabilities that I'm excited to bring to your team. ${
          points.length > 0 
            ? `Here are some highlights of my journey:\n\n${points.map(point => `• ${point}`).join('\n')}` 
            : ''
        }`,
      closing: `I'm inspired by ${company}'s vision and would be thrilled to contribute to your continued success. I look forward to the possibility of joining your innovative team.`
    }
  };

  const template = templates[templateId as keyof typeof templates];
  
  return [
    template.greeting,
    '',
    template.intro,
    '',
    template.body(keyPoints || []),
    '',
    template.closing,
    '',
    `Best regards,`,
    fullName
  ].join('\n');
};

// Enhanced key points suggestion based on job description
export const suggestKeyPoints = (jobDescription?: string): string[] => {
  if (!jobDescription) {
    return [
      'Proven track record of delivering results and exceeding expectations',
      'Strong communication and collaboration skills in cross-functional teams',
      'Demonstrated ability to adapt and thrive in fast-paced environments',
      'Experience in leading and implementing successful projects',
      'Commitment to continuous learning and professional development'
    ];
  }

  const suggestions: string[] = [];
  const description = jobDescription.toLowerCase();

  // Technical Skills
  if (description.includes('technical') || description.includes('software')) {
    suggestions.push('Extensive experience with modern technical tools and methodologies');
  }

  // Leadership
  if (description.includes('lead') || description.includes('manage')) {
    suggestions.push('Proven leadership experience in driving team success and project delivery');
  }

  // Communication
  if (description.includes('communicate') || description.includes('presentation')) {
    suggestions.push('Excellence in stakeholder communication and presentation skills');
  }

  // Problem Solving
  if (description.includes('solve') || description.includes('problem')) {
    suggestions.push('Strong analytical and problem-solving capabilities with measurable results');
  }

  // Innovation
  if (description.includes('innovat') || description.includes('creative')) {
    suggestions.push('Track record of innovative solutions and creative problem-solving');
  }

  return suggestions.length ? suggestions : [
    'Demonstrated expertise in relevant industry practices',
    'Strong track record of successful project delivery',
    'Excellent collaboration and team leadership skills'
  ];
};

// Enhanced cover letter optimization
export const optimizeCoverLetter = (
  coverLetter: CoverLetter,
  templateId: string
): CoverLetter => {
  const optimized = { ...coverLetter };
  
  // Template-specific optimizations
  switch (templateId) {
    case 'professional':
      optimized.keyPoints = optimized.keyPoints?.map(point =>
        point.replace(/^I am/i, 'Demonstrated ability to be')
          .replace(/^I have/i, 'Possesses')
      );
      break;
      
    case 'modern':
      optimized.keyPoints = optimized.keyPoints?.map(point =>
        point.replace(/^(Worked|Helped)/i, 'Delivered')
          .replace(/^(Did|Made)/i, 'Created')
      );
      break;
      
    case 'creative':
      optimized.keyPoints = optimized.keyPoints?.map(point =>
        point.replace(/^(Managed|Led)/i, 'Pioneered')
          .replace(/^(Developed|Created)/i, 'Crafted')
      );
      break;
  }

  return optimized;
};

// Generate template-specific cover letter HTML
export const generateCoverLetterHTML = (
  coverLetter: CoverLetter,
  templateId: string
): string => {
  const { personalInfo, jobDetails } = coverLetter;
  
  const templates = {
    professional: {
      container: 'professional-letter bg-white p-8',
      header: 'mb-8',
      senderInfo: 'text-gray-800 mb-8',
      recipientInfo: 'text-gray-800 mb-8',
      content: 'text-gray-700 leading-relaxed space-y-4'
    },
    modern: {
      container: 'modern-letter bg-gradient-to-r from-gray-50 to-white p-8',
      header: 'grid grid-cols-2 gap-8 mb-8',
      senderInfo: 'bg-blue-600 text-white p-6 rounded-lg',
      recipientInfo: 'bg-gray-100 p-6 rounded-lg',
      content: 'text-gray-700 leading-relaxed space-y-6 bg-white rounded-lg p-8 shadow-sm'
    },
    creative: {
      container: 'creative-letter bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 p-8',
      header: 'text-center mb-12',
      senderInfo: 'inline-block bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-full mb-8',
      recipientInfo: 'inline-block bg-white shadow-lg px-8 py-4 rounded-2xl',
      content: 'text-gray-700 leading-relaxed space-y-6 bg-white rounded-xl p-8 shadow-lg backdrop-blur-sm'
    }
  };

  const template = templates[templateId as keyof typeof templates];
  
  const content = generateCoverLetterContent(
    personalInfo,
    jobDetails,
    coverLetter.keyPoints,
    templateId
  );

  return `
    <div class="${template.container}">
      <header class="${template.header}">
        <div class="${template.senderInfo}">
          <p class="font-bold text-lg">${personalInfo.fullName}</p>
          <p>${personalInfo.email}</p>
          <p>${personalInfo.phone}</p>
          <p>${personalInfo.location}</p>
          <p>${new Date().toLocaleDateString()}</p>
        </div>
        
        <div class="${template.recipientInfo}">
          <p class="font-bold">${jobDetails.hiringManager || 'Hiring Manager'}</p>
          <p class="font-semibold">${jobDetails.company}</p>
          ${jobDetails.department ? `<p>${jobDetails.department}</p>` : ''}
        </div>
      </header>
      
      <div class="${template.content}">
        ${content.split('\n').map(line => `<p>${line}</p>`).join('')}
      </div>
    </div>
  `;
};