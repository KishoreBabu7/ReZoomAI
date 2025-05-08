import { useState } from 'react';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import ResumeGenerator from './pages/ResumeGenerator';
import CoverLetterGenerator from './pages/CoverLetterGenerator';

type Page = 'home' | 'resume' | 'coverLetter';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  
  return (
    <MainLayout setCurrentPage={setCurrentPage}>
      {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} />}
      {currentPage === 'resume' && <ResumeGenerator />}
      {currentPage === 'coverLetter' && <CoverLetterGenerator />}
    </MainLayout>
  );
}

export default App;