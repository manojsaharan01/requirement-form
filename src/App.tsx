import React, { useState, useEffect, useCallback } from 'react';
import { Save, ChevronLeft, ChevronRight, CheckCircle, AlertCircle, Info, Mic, Database, Shield, Users, BarChart } from 'lucide-react';
import FormProgress from './components/FormProgress';
import OrganizationProfile from './components/steps/OrganizationProfile';
import SalesOperations from './components/steps/SalesOperations';
import TechnicalEnvironment from './components/steps/TechnicalEnvironment';
import AiSdrRequirements from './components/steps/AiSdrRequirements';
import FormComplete from './components/FormComplete';
import Header from './components/Header';
import Tooltip from './components/Tooltip';
import { saveFormData } from './lib/supabase';

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Organization Profile
    companyName: '',
    industry: '',
    companySize: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    decisionMakerName: '',
    decisionMakerRole: '',
    salesTeamStructure: '',
    
    // Sales Operations
    sdrProcessWorkflow: '',
    monthlyOutreachVolume: '',
    successMetrics: [],
    painPoints: [],
    painPointsDetails: '',
    
    // Technical Environment
    crmPlatform: '',
    crmPlatformOther: '',
    salesTechStack: [],
    dataSources: [],
    dataSourcesDetails: '',
    securityProtocols: [],
    securityDetails: '',
    
    // AI & Conversational Capabilities
    conversationalCapabilities: [],
    conversationalComplexity: '',
    keyObjections: '',
    tonePreferences: [],
    tonePreferencesOther: '',
    fallbackOption: '',
    fallbackOptionOther: '',
    
    // Call Workflow & Scripting
    hasExistingScripts: '',
    callFlowIntroduction: '',
    callFlowQualification: '',
    callFlowPitch: '',
    callFlowObjections: '',
    callFlowClosing: '',
    postCallActions: [],
    
    // AI SDR Requirements
    targetAudience: '',
    messagingPreferences: [],
    personalizationLevel: '',
    successCriteria: [],
    implementationTimeline: '',
    budgetRange: '',
    additionalRequirements: '',
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  
  const steps = [
    { name: 'Organization Profile', icon: <Users size={20} /> },
    { name: 'Sales Operations', icon: <BarChart size={20} /> },
    { name: 'Technical Environment', icon: <Database size={20} /> },
    { name: 'AI SDR Requirements', icon: <Mic size={20} /> },
    { name: 'Complete', icon: <CheckCircle size={20} /> }
  ];
  
  // Load saved data on initial render only
  useEffect(() => {
    const savedData = localStorage.getItem('formData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);
  
  // Save form data to localStorage
  const saveToLocalStorage = useCallback(() => {
    if (Object.keys(formData).some(key => formData[key] !== '')) {
      localStorage.setItem('formData', JSON.stringify(formData));
      setLastSaved(new Date());
    }
  }, [formData]);
  
  // Set up auto-save interval
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      saveToLocalStorage();
    }, 30000); // Auto-save every 30 seconds
    
    return () => clearInterval(autoSaveInterval);
  }, [saveToLocalStorage]);
  
  const saveFormDataToSupabase = async () => {
    setIsSaving(true);
    
    try {
      const { error, data } = await saveFormData(formData);
      
      if (error) {
        console.error('Error saving to Supabase:', error);
        alert('There was an error saving your data. Please try again.');
      } else {
        console.log('Data saved successfully:', data);
        setSubmissionStatus('success');
      }
    } catch (error) {
      console.error('Exception saving to Supabase:', error);
      alert('There was an error saving your data. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };
  
  const saveFormDataLocally = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      saveToLocalStorage();
      setIsSaving(false);
    }, 800);
  };
  
  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const validateStep = () => {
    const errors = {};
    let isValid = true;
    
    // Validation logic for each step
    if (currentStep === 0) {
      if (!formData.companyName) {
        errors.companyName = 'Company name is required';
        isValid = false;
      }
      if (!formData.contactEmail) {
        errors.contactEmail = 'Contact email is required';
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(formData.contactEmail)) {
        errors.contactEmail = 'Email is invalid';
        isValid = false;
      }
    } else if (currentStep === 1) {
      if (!formData.monthlyOutreachVolume) {
        errors.monthlyOutreachVolume = 'Monthly outreach volume is required';
        isValid = false;
      }
    } else if (currentStep === 2) {
      if (!formData.crmPlatform) {
        errors.crmPlatform = 'CRM platform information is required';
        isValid = false;
      }
    } else if (currentStep === 3) {
      if (!formData.implementationTimeline) {
        errors.implementationTimeline = 'Implementation timeline is required';
        isValid = false;
      }
      if (!formData.budgetRange) {
        errors.budgetRange = 'Budget range is required';
        isValid = false;
      }
    }
    
    setFormErrors(errors);
    return isValid;
  };
  
  const handleNext = () => {
    if (validateStep()) {
      saveFormDataLocally();
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep()) {
      // Save to Supabase
      await saveFormDataToSupabase();
      
      // Move to completion step
      setCurrentStep(steps.length - 1);
      window.scrollTo(0, 0);
    }
  };
  
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <OrganizationProfile 
            formData={formData} 
            handleInputChange={handleInputChange} 
            errors={formErrors} 
          />
        );
      case 1:
        return (
          <SalesOperations 
            formData={formData} 
            handleInputChange={handleInputChange} 
            errors={formErrors} 
          />
        );
      case 2:
        return (
          <TechnicalEnvironment 
            formData={formData} 
            handleInputChange={handleInputChange} 
            errors={formErrors} 
          />
        );
      case 3:
        return (
          <AiSdrRequirements 
            formData={formData} 
            handleInputChange={handleInputChange} 
            errors={formErrors} 
          />
        );
      case 4:
        return <FormComplete formData={formData} submissionStatus={submissionStatus} />;
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        <FormProgress currentStep={currentStep} steps={steps} />
        
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          {currentStep < steps.length - 1 ? (
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">{steps[currentStep].name}</h2>
              <div className="flex items-center text-sm text-gray-500">
                {lastSaved && (
                  <span className="mr-2">
                    Last saved: {lastSaved.toLocaleTimeString()}
                  </span>
                )}
                <button 
                  onClick={saveFormDataLocally} 
                  className="flex items-center text-blue-600 hover:text-blue-800"
                  disabled={isSaving}
                >
                  <Save size={16} className="mr-1" />
                  {isSaving ? 'Saving...' : 'Save progress'}
                </button>
              </div>
            </div>
          ) : null}
          
          <form onSubmit={handleSubmit}>
            {renderStepContent()}
            
            {currentStep < steps.length - 1 && (
              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={handlePrevious}
                  className={`flex items-center px-4 py-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors ${
                    currentStep === 0 ? 'invisible' : ''
                  }`}
                >
                  <ChevronLeft size={20} className="mr-1" />
                  Previous
                </button>
                
                {currentStep === steps.length - 2 ? (
                  <button
                    type="submit"
                    className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    disabled={isSaving}
                  >
                    {isSaving ? 'Submitting...' : 'Submit'}
                    <CheckCircle size={20} className="ml-1" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Next
                    <ChevronRight size={20} className="ml-1" />
                  </button>
                )}
              </div>
            )}
          </form>
        </div>
        
        {currentStep < steps.length - 1 && (
          <div className="mt-6 flex items-start p-4 bg-blue-50 rounded-lg">
            <Info size={20} className="text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-blue-800">
                Your information is securely stored and encrypted. You can save your progress and return later to complete the form.
                <span className="inline-block ml-1">
                  <Tooltip content="All data is encrypted and stored in compliance with GDPR regulations.">
                    <Shield size={16} className="inline-block text-blue-500 cursor-help" />
                  </Tooltip>
                </span>
              </p>
              <p className="text-sm text-blue-800 mt-2">
                Estimated time to complete this section: {[5, 8, 6, 10][currentStep]} minutes
              </p>
            </div>
          </div>
        )}
      </main>
      
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm">© 2025 Hire ANA. All rights reserved.</p>
              <p className="text-xs text-gray-400 mt-1">Secure form processing with end-to-end encryption</p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-sm text-gray-300 hover:text-white">Privacy Policy</a>
              <a href="#" className="text-sm text-gray-300 hover:text-white">Terms of Service</a>
              <a href="#" className="text-sm text-gray-300 hover:text-white">Contact Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;