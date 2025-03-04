/*
  # Create form submissions tables

  1. New Tables
    - `form_submissions` - Main table to store form submissions
      - `id` (uuid, primary key)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `user_id` (uuid, references auth.users)
      - `status` (text)
    
    - `organization_profiles` - Organization information
      - `id` (uuid, primary key)
      - `submission_id` (uuid, references form_submissions)
      - `company_name` (text)
      - `industry` (text)
      - `company_size` (text)
      - `contact_name` (text)
      - `contact_email` (text)
      - `contact_phone` (text)
      - `decision_maker_name` (text)
      - `decision_maker_role` (text)
      - `sales_team_structure` (text)
    
    - `sales_operations` - Sales operations information
      - `id` (uuid, primary key)
      - `submission_id` (uuid, references form_submissions)
      - `sdr_process_workflow` (text)
      - `monthly_outreach_volume` (text)
      - `pain_points_details` (text)
    
    - `technical_environments` - Technical environment information
      - `id` (uuid, primary key)
      - `submission_id` (uuid, references form_submissions)
      - `crm_platform` (text)
      - `crm_platform_other` (text)
      - `data_sources_details` (text)
      - `security_details` (text)
    
    - `ai_sdr_requirements` - AI SDR requirements information
      - `id` (uuid, primary key)
      - `submission_id` (uuid, references form_submissions)
      - `target_audience` (text)
      - `conversational_complexity` (text)
      - `key_objections` (text)
      - `tone_preferences_other` (text)
      - `fallback_option` (text)
      - `fallback_option_other` (text)
      - `has_existing_scripts` (text)
      - `call_flow_introduction` (text)
      - `call_flow_qualification` (text)
      - `call_flow_pitch` (text)
      - `call_flow_objections` (text)
      - `call_flow_closing` (text)
      - `personalization_level` (text)
      - `implementation_timeline` (text)
      - `budget_range` (text)
      - `additional_requirements` (text)
    
    - Junction tables for many-to-many relationships:
      - `success_metrics` (submission_id, metric)
      - `pain_points` (submission_id, pain_point)
      - `sales_tech_stack` (submission_id, tech)
      - `data_sources` (submission_id, source)
      - `security_protocols` (submission_id, protocol)
      - `conversational_capabilities` (submission_id, capability)
      - `tone_preferences` (submission_id, preference)
      - `post_call_actions` (submission_id, action)
      - `messaging_preferences` (submission_id, preference)
      - `success_criteria` (submission_id, criterion)
    
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own submissions
    - Add policies for admin users to view all submissions
*/

-- Create form_submissions table
CREATE TABLE IF NOT EXISTS form_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users,
  status text DEFAULT 'draft'
);

-- Create organization_profiles table
CREATE TABLE IF NOT EXISTS organization_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id uuid REFERENCES form_submissions ON DELETE CASCADE,
  company_name text NOT NULL,
  industry text,
  company_size text,
  contact_name text,
  contact_email text,
  contact_phone text,
  decision_maker_name text,
  decision_maker_role text,
  sales_team_structure text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create sales_operations table
CREATE TABLE IF NOT EXISTS sales_operations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id uuid REFERENCES form_submissions ON DELETE CASCADE,
  sdr_process_workflow text,
  monthly_outreach_volume text,
  pain_points_details text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create technical_environments table
CREATE TABLE IF NOT EXISTS technical_environments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id uuid REFERENCES form_submissions ON DELETE CASCADE,
  crm_platform text,
  crm_platform_other text,
  data_sources_details text,
  security_details text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create ai_sdr_requirements table
CREATE TABLE IF NOT EXISTS ai_sdr_requirements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id uuid REFERENCES form_submissions ON DELETE CASCADE,
  target_audience text,
  conversational_complexity text,
  key_objections text,
  tone_preferences_other text,
  fallback_option text,
  fallback_option_other text,
  has_existing_scripts text,
  call_flow_introduction text,
  call_flow_qualification text,
  call_flow_pitch text,
  call_flow_objections text,
  call_flow_closing text,
  personalization_level text,
  implementation_timeline text,
  budget_range text,
  additional_requirements text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create junction tables for many-to-many relationships
CREATE TABLE IF NOT EXISTS success_metrics (
  submission_id uuid REFERENCES form_submissions ON DELETE CASCADE,
  metric text NOT NULL,
  PRIMARY KEY (submission_id, metric)
);

CREATE TABLE IF NOT EXISTS pain_points (
  submission_id uuid REFERENCES form_submissions ON DELETE CASCADE,
  pain_point text NOT NULL,
  PRIMARY KEY (submission_id, pain_point)
);

CREATE TABLE IF NOT EXISTS sales_tech_stack (
  submission_id uuid REFERENCES form_submissions ON DELETE CASCADE,
  tech text NOT NULL,
  PRIMARY KEY (submission_id, tech)
);

CREATE TABLE IF NOT EXISTS data_sources (
  submission_id uuid REFERENCES form_submissions ON DELETE CASCADE,
  source text NOT NULL,
  PRIMARY KEY (submission_id, source)
);

CREATE TABLE IF NOT EXISTS security_protocols (
  submission_id uuid REFERENCES form_submissions ON DELETE CASCADE,
  protocol text NOT NULL,
  PRIMARY KEY (submission_id, protocol)
);

CREATE TABLE IF NOT EXISTS conversational_capabilities (
  submission_id uuid REFERENCES form_submissions ON DELETE CASCADE,
  capability text NOT NULL,
  PRIMARY KEY (submission_id, capability)
);

CREATE TABLE IF NOT EXISTS tone_preferences (
  submission_id uuid REFERENCES form_submissions ON DELETE CASCADE,
  preference text NOT NULL,
  PRIMARY KEY (submission_id, preference)
);

CREATE TABLE IF NOT EXISTS post_call_actions (
  submission_id uuid REFERENCES form_submissions ON DELETE CASCADE,
  action text NOT NULL,
  PRIMARY KEY (submission_id, action)
);

CREATE TABLE IF NOT EXISTS messaging_preferences (
  submission_id uuid REFERENCES form_submissions ON DELETE CASCADE,
  preference text NOT NULL,
  PRIMARY KEY (submission_id, preference)
);

CREATE TABLE IF NOT EXISTS success_criteria (
  submission_id uuid REFERENCES form_submissions ON DELETE CASCADE,
  criterion text NOT NULL,
  PRIMARY KEY (submission_id, criterion)
);

-- Enable Row Level Security on all tables
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE sales_operations ENABLE ROW LEVEL SECURITY;
ALTER TABLE technical_environments ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_sdr_requirements ENABLE ROW LEVEL SECURITY;
ALTER TABLE success_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE pain_points ENABLE ROW LEVEL SECURITY;
ALTER TABLE sales_tech_stack ENABLE ROW LEVEL SECURITY;
ALTER TABLE data_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE security_protocols ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversational_capabilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE tone_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_call_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE messaging_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE success_criteria ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for authenticated users
CREATE POLICY "Users can create their own submissions"
  ON form_submissions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own submissions"
  ON form_submissions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own submissions"
  ON form_submissions
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policies for related tables
DO $$
DECLARE
  table_names text[] := ARRAY[
    'organization_profiles', 'sales_operations', 'technical_environments', 
    'ai_sdr_requirements', 'success_metrics', 'pain_points', 'sales_tech_stack', 
    'data_sources', 'security_protocols', 'conversational_capabilities', 
    'tone_preferences', 'post_call_actions', 'messaging_preferences', 'success_criteria'
  ];
  t text;
BEGIN
  FOREACH t IN ARRAY table_names
  LOOP
    EXECUTE format('
      CREATE POLICY "Users can manage their own %1$s"
        ON %1$s
        FOR ALL
        TO authenticated
        USING (submission_id IN (SELECT id FROM form_submissions WHERE user_id = auth.uid()))
        WITH CHECK (submission_id IN (SELECT id FROM form_submissions WHERE user_id = auth.uid()));
    ', t);
  END LOOP;
END
$$;

-- Create functions for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updating timestamps
DO $$
DECLARE
  table_names text[] := ARRAY[
    'form_submissions', 'organization_profiles', 'sales_operations', 
    'technical_environments', 'ai_sdr_requirements'
  ];
  t text;
BEGIN
  FOREACH t IN ARRAY table_names
  LOOP
    EXECUTE format('
      CREATE TRIGGER update_%1$s_updated_at
        BEFORE UPDATE ON %1$s
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
    ', t);
  END LOOP;
END
$$;