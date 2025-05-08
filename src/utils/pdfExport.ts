import html2pdf from 'html2pdf.js';

export const exportToPDF = async (elementId: string, filename: string): Promise<void> => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error('Element not found');
    return;
  }

  const options = {
    margin: 10,
    filename: filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  try {
    await html2pdf().set(options).from(element).save();
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
};

// Function to prepare the document for PDF export
export const prepareForExport = (elementId: string): void => {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  // Add print-specific styles
  element.classList.add('pdf-export');
};

// Function to clean up after export
export const cleanupAfterExport = (elementId: string): void => {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  // Remove print-specific styles
  element.classList.remove('pdf-export');
};

// Helper function to export a document and handle all the steps
export const exportDocument = async (elementId: string, filename: string): Promise<void> => {
  prepareForExport(elementId);
  await exportToPDF(elementId, filename);
  cleanupAfterExport(elementId);
};