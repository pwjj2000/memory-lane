import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
    "https://yehkqqaxghtpwxnrloqu.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InllaGtxcWF4Z2h0cHd4bnJsb3F1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTMwMzEyMTQsImV4cCI6MTk2ODYwNzIxNH0.7aOoC0peRbXi-QGuhW4fARn578zbMj_tujXn8U1NtEs"
)

export { supabase }