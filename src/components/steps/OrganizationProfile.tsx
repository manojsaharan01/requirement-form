import React from 'react';
import FormField from '../FormField';
import { Building, Users } from 'lucide-react';

interface OrganizationProfileProps {
  formData: any;
  handleInputChange: (section: string, name: string, value: any) => void;
  errors: any;
}

const OrganizationProfile: React.FC<OrganizationProfileProps> = ({
  formData,
  handleInputChange,
  errors
}) => {
  const companySizeOptions = [
    { value: '1-10', label: '1-10 employees' },
    { value: '11-50', label: '11-50 employees' },
    { value: '51-200', label: '51-200 employees' },
    { value: '201-500', label: '201-500 employees' },
    { value: '501-1000', label: '501-1000 employees' },
    { value: '1000+', label: '1000+ employees' }
  ];
  
  const industryOptions = [
    { value: 'technology', label: 'Technology' },
    { value: 'finance', label: 'Finance & Banking' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' },
    { value: 'retail', label: 'Retail' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'professional_services', label: 'Professional Services' },
    { value: 'real_estate', label: 'Real Estate' },
    { value: 'other', label: 'Other' }
  ];
  
  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center text-blue-600 mb-2">
          <Building size={20} className="mr-2" />
          <h3 className="text-lg font-medium">Company Information</h3>
        </div>
        <p className="text-gray-600 text-sm mb-4">
          Tell us about your organization to help us understand your business context.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Company Name"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            error={errors.companyName}
            required
            section="organization"
          />
          
          <FormField
            label="Industry"
            name="industry"
            type="select"
            value={formData.industry}
            onChange={handleInputChange}
            options={industryOptions}
            error={errors.industry}
            required
            section="organization"
          />
          
          <FormField
            label="Company Size"
            name="companySize"
            type="select"
            value={formData.companySize}
            onChange={handleInputChange}
            options={companySizeOptions}
            error={errors.companySize}
            required
            section="organization"
          />
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex items-center text-blue-600 mb-2">
          <Users size={20} className="mr-2" />
          <h3 className="text-lg font-medium">Contact Information</h3>
        </div>
        <p className="text-gray-600 text-sm mb-4">
          Please provide your contact details so we can follow up with you.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Primary Contact Name"
            name="contactName"
            value={formData.contactName}
            onChange={handleInputChange}
            error={errors.contactName}
            required
            section="organization"
          />
          
          <FormField
            label="Contact Email"
            name="contactEmail"
            type="email"
            value={formData.contactEmail}
            onChange={handleInputChange}
            error={errors.contactEmail}
            required
            section="organization"
          />
          
          <FormField
            label="Contact Phone"
            name="contactPhone"
            type="tel"
            value={formData.contactPhone}
            onChange={handleInputChange}
            error={errors.contactPhone}
            section="organization"
          />
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex items-center text-blue-600 mb-2">
          <Users size={20} className="mr-2" />
          <h3 className="text-lg font-medium">Decision Maker Information</h3>
        </div>
        <p className="text-gray-600 text-sm mb-4">
          Information about the key decision maker for the AI SDR implementation.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Decision Maker Name"
            name="decisionMakerName"
            value={formData.decisionMakerName}
            onChange={handleInputChange}
            error={errors.decisionMakerName}
            section="organization"
          />
          
          <FormField
            label="Decision Maker Role"
            name="decisionMakerRole"
            value={formData.decisionMakerRole}
            onChange={handleInputChange}
            error={errors.decisionMakerRole}
            section="organization"
          />
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex items-center text-blue-600 mb-2">
          <Users size={20} className="mr-2" />
          <h3 className="text-lg font-medium">Sales Team Structure</h3>
        </div>
        
        <FormField
          label="Describe your current sales team structure"
          name="salesTeamStructure"
          type="textarea"
          value={formData.salesTeamStructure}
          onChange={handleInputChange}
          error={errors.salesTeamStructure}
          placeholder="E.g., Number of SDRs, AEs, reporting structure, etc."
          section="organization"
        />
      </div>
    </div>
  );
};

export default OrganizationProfile;