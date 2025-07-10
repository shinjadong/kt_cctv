import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 타입 정의 (간소화된 견적 폼)
export interface IEstimate {
  id?: string
  name: string
  phone: string
  address: string
  preferred_contact_time: string
  promo_check?: boolean
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