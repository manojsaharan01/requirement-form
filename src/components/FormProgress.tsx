import React from 'react';

interface Step {
  name: string;
  icon: React.ReactNode;
}

interface FormProgressProps {
  currentStep: number;
  steps: Step[];
}

const FormProgress: React.FC<FormProgressProps> = ({ currentStep, steps }) => {
  return (
    <div className="w-full">
      <div className="hidden md:flex items-center justify-between">
        {steps.map((step, index) => (
          <div 
            key={index} 
            className={`flex flex-col items-center relative ${
              index === steps.length - 1 ? 'flex-1' : 'flex-1'
            }`}
          >
            <div 
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                index < currentStep 
                  ? 'bg-blue-600 text-white' 
                  : index === currentStep 
                  ? 'bg-blue-100 border-2 border-blue-600 text-blue-600' 
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {step.icon}
            </div>
            <p 
              className={`mt-2 text-xs font-medium ${
                index <= currentStep ? 'text-blue-600' : 'text-gray-500'
              }`}
            >
              {step.name}
            </p>
            
            {index < steps.length - 1 && (
              <div 
                className={`absolute top-5 left-1/2 w-full h-0.5 ${
                  index < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>
      
      {/* Mobile progress indicator */}
      <div className="md:hidden">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm font-medium text-blue-600">
            Step {currentStep + 1} of {steps.length}
          </p>
          <p className="text-sm font-medium text-gray-700">
            {steps[currentStep].name}
          </p>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full" 
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default FormProgress;