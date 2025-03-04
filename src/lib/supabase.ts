import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type FormSubmission = {
  id?: string;
  user_id?: string;
  status: string;
};

export type OrganizationProfile = {
  submission_id?: string;
  company_name: string;
  industry: string;
  company_size: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  decision_maker_name: string;
  decision_maker_role: string;
  sales_team_structure: string;
};

export type SalesOperations = {
  submission_id?: string;
  sdr_process_workflow: string;
  monthly_outreach_volume: string;
  pain_points_details: string;
};

export type TechnicalEnvironment = {
  submission_id?: string;
  crm_platform: string;
  crm_platform_other: string;
  data_sources_details: string;
  security_details: string;
};

export type AiSdrRequirements = {
  submission_id?: string;
  target_audience: string;
  conversational_complexity: string;
  key_objections: string;
  tone_preferences_other: string;
  fallback_option: string;
  fallback_option_other: string;
  has_existing_scripts: string;
  call_flow_introduction: string;
  call_flow_qualification: string;
  call_flow_pitch: string;
  call_flow_objections: string;
  call_flow_closing: string;
  personalization_level: string;
  implementation_timeline: string;
  budget_range: string;
  additional_requirements: string;
};

export type ArrayFields = {
  success_metrics: string[];
  pain_points: string[];
  sales_tech_stack: string[];
  data_sources: string[];
  security_protocols: string[];
  conversational_capabilities: string[];
  tone_preferences: string[];
  post_call_actions: string[];
  messaging_preferences: string[];
  success_criteria: string[];
};

export async function saveFormData(formData: any): Promise<{ error: any; data: any }> {
  try {
    // Get the current user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return { error: 'User not authenticated', data: null };
    }
    
    // Start a transaction by creating the main submission
    const { data: submission, error: submissionError } = await supabase
      .from('form_submissions')
      .insert({
        user_id: user.id,
        status: 'submitted'
      })
      .select()
      .single();
    
    if (submissionError || !submission) {
      return { error: submissionError, data: null };
    }
    
    // Insert organization profile
    const organizationProfile: OrganizationProfile = {
      submission_id: submission.id,
      company_name: formData.companyName || '',
      industry: formData.industry || '',
      company_size: formData.companySize || '',
      contact_name: formData.contactName || '',
      contact_email: formData.contactEmail || '',
      contact_phone: formData.contactPhone || '',
      decision_maker_name: formData.decisionMakerName || '',
      decision_maker_role: formData.decisionMakerRole || '',
      sales_team_structure: formData.salesTeamStructure || ''
    };
    
    await supabase.from('organization_profiles').insert(organizationProfile);
    
    // Insert sales operations
    const salesOperations: SalesOperations = {
      submission_id: submission.id,
      sdr_process_workflow: formData.sdrProcessWorkflow || '',
      monthly_outreach_volume: formData.monthlyOutreachVolume || '',
      pain_points_details: formData.painPointsDetails || ''
    };
    
    await supabase.from('sales_operations').insert(salesOperations);
    
    // Insert technical environment
    const technicalEnvironment: TechnicalEnvironment = {
      submission_id: submission.id,
      crm_platform: formData.crmPlatform || '',
      crm_platform_other: formData.crmPlatformOther || '',
      data_sources_details: formData.dataSourcesDetails || '',
      security_details: formData.securityDetails || ''
    };
    
    await supabase.from('technical_environments').insert(technicalEnvironment);
    
    // Insert AI SDR requirements
    const aiSdrRequirements: AiSdrRequirements = {
      submission_id: submission.id,
      target_audience: formData.targetAudience || '',
      conversational_complexity: formData.conversationalComplexity || '',
      key_objections: formData.keyObjections || '',
      tone_preferences_other: formData.tonePreferencesOther || '',
      fallback_option: formData.fallbackOption || '',
      fallback_option_other: formData.fallbackOptionOther || '',
      has_existing_scripts: formData.hasExistingScripts || '',
      call_flow_introduction: formData.callFlowIntroduction || '',
      call_flow_qualification: formData.callFlowQualification || '',
      call_flow_pitch: formData.callFlowPitch || '',
      call_flow_objections: formData.callFlowObjections || '',
      call_flow_closing: formData.callFlowClosing || '',
      personalization_level: formData.personalizationLevel || '',
      implementation_timeline: formData.implementationTimeline || '',
      budget_range: formData.budgetRange || '',
      additional_requirements: formData.additionalRequirements || ''
    };
    
    await supabase.from('ai_sdr_requirements').insert(aiSdrRequirements);
    
    // Insert array fields into junction tables
    const arrayFields: ArrayFields = {
      success_metrics: formData.successMetrics || [],
      pain_points: formData.painPoints || [],
      sales_tech_stack: formData.salesTechStack || [],
      data_sources: formData.dataSources || [],
      security_protocols: formData.securityProtocols || [],
      conversational_capabilities: formData.conversationalCapabilities || [],
      tone_preferences: formData.tonePreferences || [],
      post_call_actions: formData.postCallActions || [],
      messaging_preferences: formData.messagingPreferences || [],
      success_criteria: formData.successCriteria || []
    };
    
    // Insert each array field into its respective junction table
    for (const [table, values] of Object.entries(arrayFields)) {
      if (Array.isArray(values) && values.length > 0) {
        const rows = values.map(value => ({
          submission_id: submission.id,
          [table.endsWith('s') ? table.slice(0, -1) : table]: value
        }));
        
        await supabase.from(table).insert(rows);
      }
    }
    
    return { error: null, data: submission };
  } catch (error) {
    console.error('Error saving form data:', error);
    return { error, data: null };
  }
}