import React from 'react';
import FormField from '../FormField';
import { Target, MessageSquare, Clock, DollarSign, PhoneCall, Mic } from 'lucide-react';

interface AiSdrRequirementsProps {
  formData: any;
  handleInputChange: (section: string, name: string, value: any) => void;
  errors: any;
}

const AiSdrRequirements: React.FC<AiSdrRequirementsProps> = ({
  formData,
  handleInputChange,
  errors
}) => {
  const messagingPreferencesOptions = [
    { value: 'email', label: 'Email Outreach' },
    { value: 'linkedin', label: 'LinkedIn Messages' },
    { value: 'phone', label: 'Phone Calls' },
    { value: 'sms', label: 'SMS/Text Messages' },
    { value: 'multi_channel', label: 'Multi-Channel Sequences' },
    { value: 'other', label: 'Other' }
  ];
  
  const personalizationOptions = [
    { value: 'minimal', label: 'Minimal (Name, Company only)' },
    { value: 'moderate', label: 'Moderate (Industry insights, role-specific content)' },
    { value: 'high', label: 'High (Deep research, personalized pain points)' },
    { value: 'dynamic', label: 'Dynamic (AI-driven personalization based on behavior)' }
  ];
  
  const successCriteriaOptions = [
    { value: 'response_rate', label: 'Increased Response Rate' },
    { value: 'meeting_volume', label: 'Higher Meeting Volume' },
    { value: 'conversion_rate', label: 'Improved Conversion Rate' },
    { value: 'cost_efficiency', label: 'Lower Cost Per Meeting' },
    { value: 'time_savings', label: 'Time Savings for Sales Team' },
    { value: 'pipeline_growth', label: 'Pipeline Growth' },
    { value: 'revenue_impact', label: 'Revenue Impact' },
    { value: 'other', label: 'Other' }
  ];
  
  const timelineOptions = [
    { value: 'immediate', label: 'Immediate (0-30 days)' },
    { value: 'short_term', label: 'Short-term (1-3 months)' },
    { value: 'medium_term', label: 'Medium-term (3-6 months)' },
    { value: 'long_term', label: 'Long-term (6+ months)' }
  ];
  
  const budgetOptions = [
    { value: 'under_5k', label: 'Under $5,000 per month' },
    { value: '5k_10k', label: '$5,000 - $10,000 per month' },
    { value: '10k_25k', label: '$10,000 - $25,000 per month' },
    { value: '25k_50k', label: '$25,000 - $50,000 per month' },
    { value: 'over_50k', label: 'Over $50,000 per month' },
    { value: 'not_determined', label: 'Not yet determined' }
  ];
  
  const conversationalCapabilityOptions = [
    { value: 'chatbot', label: 'Chatbot' },
    { value: 'voice_agent', label: 'Voice agent only' }
  ];
  
  const conversationalComplexityOptions = [
    { value: 'basic', label: 'Basic scripted responses' },
    { value: 'dynamic', label: 'Dynamic responses (adapts to prospect questions)' },
    { value: 'advanced', label: 'Advanced NLP for natural dialogue' }
  ];
  
  const voicePreferenceOptions = [
    { value: 'male', label: 'Male voice' },
    { value: 'female', label: 'Female voice' },
    { value: 'professional', label: 'Professional/formal' },
    { value: 'friendly', label: 'Friendly/conversational' },
    { value: 'other', label: 'Other' }
  ];
  
  const fallbackOptions = [
    { value: 'human_transfer', label: 'Transfer to human agent' },
    { value: 'callback', label: 'Schedule callback' },
    { value: 'other', label: 'Other' }
  ];
  
  const callScriptOptions = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' }
  ];
  
  const postCallOptions = [
    { value: 'follow_up_email', label: 'Send follow-up email' },
    { value: 'update_crm', label: 'Update CRM' },
    { value: 'notify_sales', label: 'Notify sales team' }
  ];
  
  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center text-blue-600 mb-2">
          <Target size={20} className="mr-2" />
          <h3 className="text-lg font-medium">Target Audience</h3>
        </div>
        <p className="text-gray-600 text-sm mb-4">
          Define your ideal customer profile and target audience for the AI SDR.
        </p>
        
        <FormField
          label="Target Audience Definition"
          name="targetAudience"
          type="textarea"
          value={formData.targetAudience}
          onChange={handleInputChange}
          error={errors.targetAudience}
          placeholder="Describe your ideal customer profile, including industry, company size, job titles, etc."
          section="aiSdrRequirements"
        />
      </div>
      
      <div className="mb-6">
        <div className="flex items-center text-blue-600 mb-2">
          <Mic size={20} className="mr-2" />
          <h3 className="text-lg font-medium">AI & Conversational Capabilities</h3>
        </div>
        <p className="text-gray-600 text-sm mb-4">
          Specify your AI and conversational requirements for the voice agent.
        </p>
        
        <FormField
          label="Capabilities"
          name="conversationalCapabilities"
          type="checkbox-group"
          value={formData.conversationalCapabilities}
          onChange={handleInputChange}
          options={conversationalCapabilityOptions}
          error={errors.conversationalCapabilities}
          section="aiSdrRequirements"
        />
        
        <div className="mt-4">
          <FormField
            label="Desired level of conversational complexity"
            name="conversationalComplexity"
            type="radio-group"
            value={formData.conversationalComplexity}
            onChange={handleInputChange}
            options={conversationalComplexityOptions}
            error={errors.conversationalComplexity}
            section="aiSdrRequirements"
          />
        </div>
        
        <div className="mt-4">
          <FormField
            label="Key objections to handle"
            name="keyObjections"
            type="textarea"
            value={formData.keyObjections}
            onChange={handleInputChange}
            error={errors.keyObjections}
            placeholder="List the common objections that the AI should be prepared to address..."
            section="aiSdrRequirements"
          />
        </div>
        
        <div className="mt-4">
          <FormField
            label="Tone and style preferences"
            name="tonePreferences"
            type="checkbox-group"
            value={formData.tonePreferences}
            onChange={handleInputChange}
            options={voicePreferenceOptions}
            error={errors.tonePreferences}
            section="aiSdrRequirements"
          />
        </div>
        
        {formData.tonePreferences?.includes('other') && (
          <div className="mt-2 ml-6">
            <FormField
              label="Please specify other tone preferences"
              name="tonePreferencesOther"
              value={formData.tonePreferencesOther}
              onChange={handleInputChange}
              error={errors.tonePreferencesOther}
              section="aiSdrRequirements"
            />
          </div>
        )}
        
        <div className="mt-4">
          <FormField
            label="Fallback option if AI cannot answer"
            name="fallbackOption"
            type="radio-group"
            value={formData.fallbackOption}
            onChange={handleInputChange}
            options={fallbackOptions}
            error={errors.fallbackOption}
            section="aiSdrRequirements"
          />
        </div>
        
        {formData.fallbackOption === 'other' && (
          <div className="mt-2 ml-6">
            <FormField
              label="Please specify other fallback option"
              name="fallbackOptionOther"
              value={formData.fallbackOptionOther}
              onChange={handleInputChange}
              error={errors.fallbackOptionOther}
              section="aiSdrRequirements"
            />
          </div>
        )}
      </div>
      
      <div className="mb-6">
        <div className="flex items-center text-blue-600 mb-2">
          <PhoneCall size={20} className="mr-2" />
          <h3 className="text-lg font-medium">Call Workflow & Scripting</h3>
        </div>
        <p className="text-gray-600 text-sm mb-4">
          Define the structure and flow of your sales calls.
        </p>
        
        <FormField
          label="Attach existing call scripts/pitch decks"
          name="hasExistingScripts"
          type="radio-group"
          value={formData.hasExistingScripts}
          onChange={handleInputChange}
          options={callScriptOptions}
          error={errors.hasExistingScripts}
          section="aiSdrRequirements"
        />
        
        <div className="mt-4">
          <h4 className="text-md font-medium text-gray-700 mb-2">Call flow structure</h4>
          
          <FormField
            label="Introduction"
            name="callFlowIntroduction"
            type="textarea"
            value={formData.callFlowIntroduction}
            onChange={handleInputChange}
            error={errors.callFlowIntroduction}
            placeholder="Describe how the call should be introduced..."
            section="aiSdrRequirements"
          />
          
          <FormField
            label="Qualification questions"
            name="callFlowQualification"
            type="textarea"
            value={formData.callFlowQualification}
            onChange={handleInputChange}
            error={errors.callFlowQualification}
            placeholder="List key qualification questions to ask..."
            section="aiSdrRequirements"
          />
          
          <FormField
            label="Product/Service pitch highlights"
            name="callFlowPitch"
            type="textarea"
            value={formData.callFlowPitch}
            onChange={handleInputChange}
            error={errors.callFlowPitch}
            placeholder="Outline the main points to highlight in the pitch..."
            section="aiSdrRequirements"
          />
          
          <FormField
            label="Handling objections"
            name="callFlowObjections"
            type="textarea"
            value={formData.callFlowObjections}
            onChange={handleInputChange}
            error={errors.callFlowObjections}
            placeholder="Describe how objections should be handled..."
            section="aiSdrRequirements"
          />
          
          <FormField
            label="Closing (e.g., schedule meeting)"
            name="callFlowClosing"
            type="textarea"
            value={formData.callFlowClosing}
            onChange={handleInputChange}
            error={errors.callFlowClosing}
            placeholder="Describe the desired closing approach..."
            section="aiSdrRequirements"
          />
        </div>
        
        <div className="mt-4">
          <FormField
            label="Post-call actions"
            name="postCallActions"
            type="checkbox-group"
            value={formData.postCallActions}
            onChange={handleInputChange}
            options={postCallOptions}
            error={errors.postCallActions}
            section="aiSdrRequirements"
          />
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex items-center text-blue-600 mb-2">
          <MessageSquare size={20} className="mr-2" />
          <h3 className="text-lg font-medium">Messaging and Personalization</h3>
        </div>
        <p className="text-gray-600 text-sm mb-4">
          Specify your preferences for outreach channels and personalization level.
        </p>
        
        <FormField
          label="Preferred Outreach Channels"
          name="messagingPreferences"
          type="checkbox-group"
          value={formData.messagingPreferences}
          onChange={handleInputChange}
          options={messagingPreferencesOptions}
          error={errors.messagingPreferences}
          section="aiSdrRequirements"
        />
        
        <div className="mt-4">
          <FormField
            label="Desired Personalization Level"
            name="personalizationLevel"
            type="radio-group"
            value={formData.personalizationLevel}
            onChange={handleInputChange}
            options={personalizationOptions}
            error={errors.personalizationLevel}
            section="aiSdrRequirements"
          />
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex items-center text-blue-600 mb-2">
          <Target size={20} className="mr-2" />
          <h3 className="text-lg font-medium">Success Criteria</h3>
        </div>
        <p className="text-gray-600 text-sm mb-4">
          How will you measure the success of the AI SDR implementation?
        </p>
        
        <FormField
          label="Success Criteria"
          name="successCriteria"
          type="checkbox-group"
          value={formData.successCriteria}
          onChange={handleInputChange}
          options={successCriteriaOptions}
          error={errors.successCriteria}
          section="aiSdrRequirements"
        />
      </div>
      
      <div className="mb-6">
        <div className="flex items-center text-blue-600 mb-2">
          <Clock size={20} className="mr-2" />
          <h3 className="text-lg font-medium">Implementation Timeline</h3>
        </div>
        <p className="text-gray-600 text-sm mb-4">
          What is your desired timeline for implementing the AI SDR solution?
        </p>
        
        <FormField
          label="Implementation Timeline"
          name="implementationTimeline"
          type="radio-group"
          value={formData.implementationTimeline}
          onChange={handleInputChange}
          options={timelineOptions}
          error={errors.implementationTimeline}
          required
          section="aiSdrRequirements"
        />
      </div>
      
      <div className="mb-6">
        <div className="flex items-center text-blue-600 mb-2">
          <DollarSign size={20} className="mr-2" />
          <h3 className="text-lg font-medium">Budget Range</h3>
        </div>
        <p className="text-gray-600 text-sm mb-4">
          What is your approximate budget for the AI SDR implementation?
        </p>
        
        <FormField
          label="Budget Range"
          name="budgetRange"
          type="radio-group"
          value={formData.budgetRange}
          onChange={handleInputChange}
          options={budgetOptions}
          error={errors.budgetRange}
          required
          section="aiSdrRequirements"
        />
      </div>
      
      <div className="mb-6">
        <div className="flex items-center text-blue-600 mb-2">
          <MessageSquare size={20} className="mr-2" />
          <h3 className="text-lg font-medium">Additional Requirements</h3>
        </div>
        
        <FormField
          label="Any additional requirements or comments"
          name="additionalRequirements"
          type="textarea"
          value={formData.additionalRequirements}
          onChange={handleInputChange}
          error={errors.additionalRequirements}
          placeholder="Please share any other requirements or information that would be helpful..."
          section="aiSdrRequirements"
        />
      </div>
    </div>
  );
};

export default AiSdrRequirements;