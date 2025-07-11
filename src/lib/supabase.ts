import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://clbutkcmgxfetdcceoaa.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNsYnV0a2NtZ3hmZXRkY2Nlb2FhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxMzM5ODksImV4cCI6MjA2NzcwOTk4OX0.ueDigeMvdez2-PQD5X_nVwE4BiX8QZI1eRsiDtaZUWM"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 타입 정의 (간소화된 견적 폼)
export interface IEstimate {
  id?: string
  name: string
  phone: string
  address: string
  preferred_contact_time: string
  status?: string
  created_at?: string
  updated_at?: string
}

export interface IConsultation {
  id?: string
  name: string
  phone: string
  consultation_type?: string
  preferred_date?: string
  preferred_time?: string
  message?: string
  status?: string
  created_at?: string
  updated_at?: string
}

export interface IInquiry {
  id?: string
  name: string
  phone?: string
  email?: string
  subject?: string
  message: string
  inquiry_type?: string
  status?: string
  created_at?: string
  updated_at?: string
} 