import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dkxkoliqtdhejjuqqrgy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRreGtvbGlxdGRoZWpqdXFxcmd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4ODQ2NTAsImV4cCI6MjA2MTQ2MDY1MH0.pSqo-hsV35vqYLBFCDuqlXU8yF_XTVar4bvtlLOJzBU';
export const supabase = createClient(supabaseUrl, supabaseKey);
