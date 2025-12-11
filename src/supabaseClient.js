import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zrwijfxjqschqpqnwvxh.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpyd2lqZnhqcXNjaHFwcW53dnhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU0NTg5MzYsImV4cCI6MjA4MTAzNDkzNn0.h0koM0fs5qLHdXn-0Iu_X8p3MmkhIxU38JAiz-m0a-U";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
