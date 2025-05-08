import React from 'react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900/80 backdrop-blur-sm py-8 border-t border-slate-700/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">ReZoom AI</h3>
            <p className="text-slate-400 max-w-xs">
              Creating professional, ATS-friendly resumes and cover letters with the power of AI.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">Create Resume or Cover letter</a></li>
            <p className="mt-4 text-slate-400">
              Made with <span role="img" aria-label="heart">♥</span> by <a href="https://tulugukishorebabu.vercel.app" className="text-blue-400 hover:underline">KB7</a>
            </p>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="https://x.com/kishore_babu_7" className="text-slate-400 hover:text-blue-500 transition-colors">
                <TwitterIcon className="h-6 w-6" />
              </a>
              <a href="https://www.linkedin.com/in/kishorebabu-tulugu/" className="text-slate-400 hover:text-blue-700 transition-colors">
                <LinkedinIcon className="h-6 w-6" />
              </a>
              <a href="https://github.com/KishoreBabu7" className="text-slate-400 hover:text-slate-200 transition-colors">
                <GithubIcon className="h-6 w-6" />
              </a>
            </div>
            <p className="mt-4 text-slate-400">
              Contact us at: <a href="mailto:tulugukishorebabu@gmail.com" className="text-blue-400 hover:underline">tulugukishorebabu@gmail.com</a>
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-slate-800 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} ResumeAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;