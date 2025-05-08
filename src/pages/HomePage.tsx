import React from 'react';
import { FileTextIcon, FileType2Icon, BarChart3Icon, DownloadIcon, BrainIcon, CheckCircleIcon, TrendingUpIcon } from 'lucide-react';

type HomePageProps = {
  setCurrentPage: (page: 'home' | 'resume' | 'coverLetter') => void;
};

const HomePage: React.FC<HomePageProps> = ({ setCurrentPage }) => {
  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="text-center space-y-6 max-w-4xl mx-auto">
        <div className="inline-block animate-float">
          <BrainIcon className="h-16 w-16 text-blue-500 mb-6" />
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-fadeIn">
          Create <span className="gradient-text">ATS-Friendly</span> Resumes & Cover Letters with AI
        </h1>
        
        <p className="text-xl text-slate-300 max-w-3xl mx-auto animate-fadeInDelayed">
          Generate professionally designed, ATS-optimized documents in seconds. 
          Stand out from the competition and land your dream job.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4 animate-fadeInMoreDelayed">
          <button 
            onClick={() => setCurrentPage('resume')}
            className="btn-gradient group"
          >
            <span className="flex items-center justify-center">
              <FileTextIcon className="h-5 w-5 mr-2 group-hover:rotate-6 transition-transform" />
              Create Resume
            </span>
          </button>
          
          <button 
            onClick={() => setCurrentPage('coverLetter')}
            className="btn-gradient group"
          >
            <span className="flex items-center justify-center">
              <FileType2Icon className="h-5 w-5 mr-2 group-hover:rotate-6 transition-transform" />
              Create Cover Letter
            </span>
          </button>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-12 gradient-text">Why Choose ResumeAI?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard 
            icon={<FileTextIcon className="h-10 w-10" />}
            title="Smart Resume Builder"
            description="Generate perfectly structured resumes with AI-powered content suggestions and formatting."
            color="from-blue-500 to-indigo-600"
          />
          
          <FeatureCard 
            icon={<FileType2Icon className="h-10 w-10" />}
            title="Dynamic Cover Letters"
            description="Create personalized cover letters that adapt to each job description automatically."
            color="from-purple-500 to-pink-600"
          />
          
          <FeatureCard 
            icon={<BarChart3Icon className="h-10 w-10" />}
            title="Real-time ATS Analysis"
            description="Get instant feedback and optimization suggestions to improve your hiring chances."
            color="from-teal-500 to-emerald-600"
          />
          
          <FeatureCard 
            icon={<DownloadIcon className="h-10 w-10" />}
            title="Multiple Formats"
            description="Export your documents in various formats including PDF, Word, and plain text."
            color="from-orange-500 to-red-600"
          />
        </div>
      </section>
      
      {/* Statistics Section */}
      <section className="py-12 glass-morphism rounded-3xl">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCard number="98%" label="ATS Success Rate" icon={<CheckCircleIcon />} />
            <StatCard number="2x" label="Interview Chances" icon={<TrendingUpIcon />} />
            <StatCard number="5min" label="Average Creation Time" icon={<FileTextIcon />} />
            <StatCard number="50k+" label="Happy Users" icon={<BrainIcon />} />
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-12 bg-slate-800/30 rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center mb-12 gradient-text">How It Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <StepCard 
            number={1}
            title="Input Your Details"
            description="Simply fill in your information or import from LinkedIn. Our AI helps with phrasing and formatting."
          />
          
          <StepCard 
            number={2}
            title="AI Optimization"
            description="Our AI analyzes and enhances your content for maximum impact and ATS compatibility."
          />
          
          <StepCard 
            number={3}
            title="Download & Apply"
            description="Get your perfectly formatted documents in multiple formats, ready to help you land interviews."
          />
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-12 gradient-text">Success Stories</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TestimonialCard 
            quote="The AI suggestions helped me highlight achievements I would have otherwise overlooked. Got 3 interviews in a week!"
            author="Sarah K."
            role="Software Engineer"
          />
          
          <TestimonialCard 
            quote="The ATS optimization feature is a game-changer. My response rate improved dramatically after using ResumeAI."
            author="Michael R."
            role="Marketing Manager"
          />
          
          <TestimonialCard 
            quote="Created both my resume and cover letter in under 10 minutes. The templates are modern and professional."
            author="Emily T."
            role="Product Designer"
          />
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="text-center py-12">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold gradient-text">Ready to Transform Your Job Search?</h2>
          <p className="text-xl text-slate-300">
            Join thousands of professionals who have accelerated their careers with ResumeAI.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <button 
              onClick={() => setCurrentPage('resume')}
              className="btn-gradient group"
            >
              <span className="flex items-center justify-center">
                <BrainIcon className="h-5 w-5 mr-2 group-hover:rotate-6 transition-transform" />
                Start Building Now
              </span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard: React.FC<{ 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  color: string;
}> = ({ icon, title, description, color }) => {
  return (
    <div className="glass-card hover-card-effect p-6">
      <div className={`bg-gradient-to-r ${color} rounded-lg p-3 w-fit mb-4`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-slate-400">{description}</p>
    </div>
  );
};

const StatCard: React.FC<{
  number: string;
  label: string;
  icon: React.ReactNode;
}> = ({ number, label, icon }) => {
  return (
    <div className="text-center p-6 hover-card-effect">
      <div className="flex justify-center mb-4">
        <div className="text-blue-500">
          {icon}
        </div>
      </div>
      <div className="text-3xl font-bold mb-2 gradient-text">{number}</div>
      <div className="text-slate-400">{label}</div>
    </div>
  );
};

const StepCard: React.FC<{
  number: number;
  title: string;
  description: string;
}> = ({ number, title, description }) => {
  return (
    <div className="glass-card hover-card-effect text-center relative p-6">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">
        {number}
      </div>
      <h3 className="text-xl font-semibold mt-6 mb-3">{title}</h3>
      <p className="text-slate-400">{description}</p>
    </div>
  );
};

const TestimonialCard: React.FC<{
  quote: string;
  author: string;
  role: string;
}> = ({ quote, author, role }) => {
  return (
    <div className="glass-card hover-card-effect p-6">
      <p className="text-slate-300 mb-4 italic">"{quote}"</p>
      <div className="text-sm">
        <p className="font-semibold text-white">{author}</p>
        <p className="text-slate-400">{role}</p>
      </div>
    </div>
  );
};

export default HomePage;