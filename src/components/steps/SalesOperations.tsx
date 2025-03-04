import React from 'react';
import FormField from '../FormField';
import { BarChart, MessageCircle, AlertTriangle } from 'lucide-react';

interface SalesOperationsProps {
  formData: any;
  handleInputChange: (section: string, name: string, value: any) => void;
  errors: any;
}

const SalesOperations: React.FC<SalesOperationsProps> = ({
  formData,
  handleInputChange,
  errors
}) => {
  const outreachVolumeOptions = [
    { value: 'less_than_100', label: 'Less than 100 per month' },
    { value: '100_500', label: '100-500 per month' },
    { value: '501_1000', label: '501-1,000 per month' },
    { value: '1001_5000', label: '1,001-5,000 per month' },
    { value: '5001_10000', label: '5,001-10,000 per month' },
    { value: 'more_than_10000', label: 'More than 10,000 per month' }
  ];
  
  const successMetricsOptions = [
    { value: 'meetings_booked', label: 'Meetings Booked' },
    { value: 'response_rate', label: 'Response Rate' },
    { value: 'conversion_rate', label: 'Conversion Rate' },
    { value: 'pipeline_generated', label: 'Pipeline Generated' },
    { value: 'revenue_influenced', label: 'Revenue Influenced' },
    { value: 'cost_per_meeting', label: 'Cost Per Meeting' },
    { value: 'time_to_qualification', label: 'Time to Qualification' },
    { value: 'other', label: 'Other' }
  ];
  
  const painPointsOptions = [
    { value: 'low_response_rates', label: 'Low Response Rates' },
    { value: 'poor_lead_quality', label: 'Poor Lead Quality' },
    { value: 'high_sdr_turnover', label: 'High SDR Turnover' },
    { value: 'inconsistent_messaging', label: 'Inconsistent Messaging' },
    { value: 'scaling_challenges', label: 'Scaling Challenges' },
    { value: 'inefficient_processes', label: 'Inefficient Processes' },
    { value: 'lack_of_personalization', label: 'Lack of Personalization' },
    { value: 'data_quality_issues', label: 'Data Quality Issues' },
    { value: 'other', label: 'Other' }
  ];
  
  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center text-blue-600 mb-2">
          <MessageCircle size={20} className="mr-2" />
          <h3 className="text-lg font-medium">Current SDR Process</h3>
        </div>
        <p className="text-gray-600 text-sm mb-4">
          Tell us about your current sales development process and outreach activities.
        </p>
        
        <FormField
          label="Describe your current SDR process workflow"
          name="sdrProcessWorkflow"
          type="textarea"
          value={formData.sdrProcessWorkflow}
          onChange={handleInputChange}
          error={errors.sdrProcessWorkflow}
          placeholder="E.g., Prospecting methods, outreach channels, follow-up cadence, etc."
          section="salesOperations"
        />
        
        <div className="mt-4">
          <FormField
            label="Monthly Outreach Volume"
            name="monthlyOutreachVolume"
            type="select"
            value={formData.monthlyOutreachVolume}
            onChange={handleInputChange}
            options={outreachVolumeOptions}
            error={errors.monthlyOutreachVolume}
            required
            section="salesOperations"
          />
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex items-center text-blue-600 mb-2">
          <BarChart size={20} className="mr-2" />
          <h3 className="text-lg font-medium">Success Metrics and KPIs</h3>
        </div>
        <p className="text-gray-600 text-sm mb-4">
          What metrics do you use to measure the success of your sales development efforts?
        </p>
        
        <FormField
          label="Select the key metrics you track"
          name="successMetrics"
          type="checkbox-group"
          value={formData.successMetrics}
          onChange={handleInputChange}
          options={successMetricsOptions}
          error={errors.successMetrics}
          section="salesOperations"
        />
      </div>
      
      <div className="mb-6">
        <div className="flex items-center text-blue-600 mb-2">
          <AlertTriangle size={20} className="mr-2" />
          <h3 className="text-lg font-medium">Pain Points and Challenges</h3>
        </div>
        <p className="text-gray-600 text-sm mb-4">
          What are the main challenges you face with your current sales development process?
        </p>
        
        <FormField
          label="Select your top pain points"
          name="painPoints"
          type="checkbox-group"
          value={formData.painPoints}
          onChange={handleInputChange}
          options={painPointsOptions}
          error={errors.painPoints}
          section="salesOperations"
        />
        
        <div className="mt-4">
          <FormField
            label="Additional details about your challenges"
            name="painPointsDetails"
            type="textarea"
            value={formData.painPointsDetails}
            onChange={handleInputChange}
            error={errors.painPointsDetails}
            placeholder="Please provide more context about your specific challenges..."
            section="salesOperations"
          />
        </div>
      </div>
    </div>
  );
};

export default SalesOperations;