import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

type MainLayoutProps = {
  children: React.ReactNode;
  setCurrentPage: (page: 'home' | 'resume' | 'coverLetter') => void;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children, setCurrentPage }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <Header setCurrentPage={setCurrentPage} />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;