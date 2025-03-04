import React from 'react';
import FormField from '../FormField';
import { Database, Shield, Server } from 'lucide-react';

interface TechnicalEnvironmentProps {
  formData: any;
  handleInputChange: (section: string, name: string, value: any) => void;
  errors: any;
}

const TechnicalEnvironment: React.FC<TechnicalEnvironmentProps> = ({
  formData,
  handleInputChange,
  errors
}) => {
  const crmOptions = [
    { value: 'salesforce', label: 'Salesforce' },
    { value: 'hubspot', label: 'HubSpot' },
    { value: 'zoho', label: 'Zoho CRM' },
    { value: 'pipedrive', label: 'Pipedrive' },
    { value: 'microsoft_dynamics', label: 'Microsoft Dynamics' },
    { value: 'sugarcrm', label: 'SugarCRM' },
    { value: 'freshsales', label: 'Freshsales' },
    { value: 'other', label: 'Other' }
  ];
  
  const salesTechOptions = [
    { value: 'outreach', label: 'Outreach.io' },
    { value: 'salesloft', label: 'SalesLoft' },
    { value: 'apollo', label: 'Apollo.io' },
    { value: 'zoominfo', label: 'ZoomInfo' },
    { value: 'lusha', label: 'Lusha' },
    { value: 'clearbit', label: 'Clearbit' },
    { value: 'gong', label: 'Gong.io' },
    { value: 'linkedin_sales_navigator', label: 'LinkedIn Sales Navigator' },
    { value: 'seamless_ai', label: 'Seamless.AI' },
    { value: 'other', label: 'Other' }
  ];
  
  const dataSourceOptions = [
    { value: 'crm_data', label: 'CRM Data' },
    { value: 'marketing_automation', label: 'Marketing Automation Platform' },
    { value: 'website_analytics', label: 'Website Analytics' },
    { value: 'third_party_data', label: 'Third-Party Data Providers' },
    { value: 'social_media', label: 'Social Media Data' },
    { value: 'customer_surveys', label: 'Customer Surveys/Feedback' },
    { value: 'internal_databases', label: 'Internal Databases' },
    { value: 'other', label: 'Other' }
  ];
  
  const securityOptions = [
    { value: 'gdpr', label: 'GDPR Compliance' },
    { value: 'ccpa', label: 'CCPA Compliance' },
    { value: 'hipaa', label: 'HIPAA Compliance' },
    { value: 'soc2', label: 'SOC 2 Compliance' },
    { value: 'iso27001', label: 'ISO 27001' },
    { value: 'encryption', label: 'Data Encryption Requirements' },
    { value: 'access_controls', label: 'Strict Access Controls' },
    { value: 'audit_logging', label: 'Audit Logging' },
    { value: 'other', label: 'Other' }
  ];
  
  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center text-blue-600 mb-2">
          <Database size={20} className="mr-2" />
          <h3 className="text-lg font-medium">CRM and Sales Technology</h3>
        </div>
        <p className="text-gray-600 text-sm mb-4">
          Tell us about your current CRM and sales technology stack.
        </p>
        
        <FormField
          label="CRM Platform"
          name="crmPlatform"
          type="select"
          value={formData.crmPlatform}
          onChange={handleInputChange}
          options={crmOptions}
          error={errors.crmPlatform}
          required
          tooltip="The CRM system where your sales data is stored"
          section="technicalEnvironment"
        />
        
        {formData.crmPlatform === 'other' && (
          <FormField
            label="Please specify your CRM platform"
            name="crmPlatformOther"
            value={formData.crmPlatformOther}
            onChange={handleInputChange}
            error={errors.crmPlatformOther}
            section="technicalEnvironment"
          />
        )}
        
        <div className="mt-4">
          <FormField
            label="Sales Technology Stack"
            name="salesTechStack"
            type="checkbox-group"
            value={formData.salesTechStack}
            onChange={handleInputChange}
            options={salesTechOptions}
            error={errors.salesTechStack}
            tooltip="Select all the sales tools you currently use"
            section="technicalEnvironment"
          />
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex items-center text-blue-600 mb-2">
          <Server size={20} className="mr-2" />
          <h3 className="text-lg font-medium">Data Sources and Enrichment</h3>
        </div>
        <p className="text-gray-600 text-sm mb-4">
          What data sources do you use for prospecting and lead enrichment?
        </p>
        
        <FormField
          label="Data Sources"
          name="dataSources"
          type="checkbox-group"
          value={formData.dataSources}
          onChange={handleInputChange}
          options={dataSourceOptions}
          error={errors.dataSources}
          section="technicalEnvironment"
        />
        
        <div className="mt-4">
          <FormField
            label="Additional information about your data sources"
            name="dataSourcesDetails"
            type="textarea"
            value={formData.dataSourcesDetails}
            onChange={handleInputChange}
            error={errors.dataSourcesDetails}
            placeholder="Please provide more details about how you collect and manage prospect data..."
            section="technicalEnvironment"
          />
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex items-center text-blue-600 mb-2">
          <Shield size={20} className="mr-2" />
          <h3 className="text-lg font-medium">Security and Compliance</h3>
        </div>
        <p className="text-gray-600 text-sm mb-4">
          What security protocols and compliance requirements must be considered?
        </p>
        
        <FormField
          label="Security Protocols and Compliance Needs"
          name="securityProtocols"
          type="checkbox-group"
          value={formData.securityProtocols}
          onChange={handleInputChange}
          options={securityOptions}
          error={errors.securityProtocols}
          section="technicalEnvironment"
        />
        
        <div className="mt-4">
          <FormField
            label="Additional security requirements"
            name="securityDetails"
            type="textarea"
            value={formData.securityDetails}
            onChange={handleInputChange}
            error={errors.securityDetails}
            placeholder="Please specify any additional security requirements or concerns..."
            section="technicalEnvironment"
          />
        </div>
      </div>
    </div>
  );
};

export default TechnicalEnvironment;