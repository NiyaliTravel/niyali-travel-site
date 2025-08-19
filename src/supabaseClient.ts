// src/supabaseClient.ts

import fetch from 'node-fetch'
globalThis.fetch = fetch

import { createClient } from '@supabase/supabase-js'

// Your actual Supabase credentials
const SUPABASE_URL = 'https://kcmrwjvwgegmiowzjimt.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtjbXJ3anZ3Z2VnbWlvd3pqaW10Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyODA1NzUsImV4cCI6MjA3MDg1NjU3NX0.fmgk6TO57P3OsFr9OqDPi5GI7tS25iqW4InmfoGqUa8'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export default supabase