import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// SAFE KEYS — PUBLIC
export const supabase = createClient(
  "https://hsjzyqnpigxurnovlxvs.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhzanp5cW5waWd4dXJub3ZseHZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM3NTMwNDgsImV4cCI6MjA3OTMyOTA0OH0.U2FGDGJq2ym0tK0eWkBruJoSkS0rqwJ1scW4Wvj_gyg"
);
