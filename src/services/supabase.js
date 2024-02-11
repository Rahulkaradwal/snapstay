import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = 'https://mhuakitottmdslslzrjc.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1odWFraXRvdHRtZHNsc2x6cmpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc1NDg2NTIsImV4cCI6MjAyMzEyNDY1Mn0.e9FJQts3JUke3nCyFAIbvtRapZ17MSB3txYU4TJLxb0';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
