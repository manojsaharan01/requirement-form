import React from 'react';
import { CheckCircle, Download, Mail } from 'lucide-react';

interface FormCompleteProps {
  formData: any;
  submissionStatus?: string | null;
}

const FormComplete: React.FC<FormCompleteProps> = ({ formData, submissionStatus }) => {
  const handleDownloadPDF = () => {
    // In a real application, this would generate a PDF
    alert('PDF download functionality would be implemented here');
  };
  
  return (
    <div className="text-center py-8">
      <div className="flex justify-center mb-6">
        <div className="bg-green-100 p-4 rounded-full">
          <CheckCircle size={64} className="text-green-600" />
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Thank You for Your Submission!</h2>
      <p className="text-gray-600 mb-8 max-w-lg mx-auto">
        Your AI Voice Agents SDR implementation requirements have been successfully submitted. Our team will review your information and contact you shortly.
      </p>
      
      {submissionStatus === 'success' && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8 max-w-lg mx-auto">
          <p className="text-green-800 font-medium">
            Your data has been successfully saved to our database.
          </p>
        </div>
      )}
      
      <div className="bg-blue-50 rounded-lg p-6 mb-8 max-w-lg mx-auto">
        <h3 className="text-lg font-semibold text-blue-800 mb-3">What happens next?</h3>
        <ol className="text-left text-blue-800 space-y-3">
          <li className="flex items-start">
            <span className="bg-blue-200 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">1</span>
            <span>Our team will review your requirements within 1-2 business days</span>
          </li>
          <li className="flex items-start">
            <span className="bg-blue-200 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">2</span>
            <span>A dedicated AI Voice Agents consultant will contact you to discuss your needs in detail</span>
          </li>
          <li className="flex items-start">
            <span className="bg-blue-200 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">3</span>
            <span>We'll prepare a customized implementation plan based on your requirements</span>
          </li>
          <li className="flex items-start">
            <span className="bg-blue-200 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">4</span>
            <span>After your approval, we'll begin the implementation process</span>
          </li>
        </ol>
      </div>
      
      <div className="flex flex-col md:flex-row justify-center gap-4">
        <button 
          onClick={handleDownloadPDF}
          className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Download size={20} className="mr-2" />
          Download Summary
        </button>
        
        <a 
          href="mailto:info@hireana.ai"
          className="flex items-center justify-center px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
        >
          <Mail size={20} className="mr-2" />
          Contact Support
        </a>
      </div>
      
      <p className="text-sm text-gray-500 mt-8">
        Reference ID: {Math.random().toString(36).substring(2, 10).toUpperCase()}
      </p>
    </div>
  );
};

export default FormComplete;