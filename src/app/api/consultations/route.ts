import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// 상담 신청 생성 API
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // 필수 필드 검증
    if (!body.name || !body.phone) {
      return NextResponse.json(
        { error: '이름과 전화번호는 필수입니다.' },
        { status: 400 }
      )
    }

    // 전화번호 형식 검증
    const phoneRegex = /^01[016789]-?\d{3,4}-?\d{4}$/
    if (!phoneRegex.test(body.phone.replace(/[^\d]/g, ''))) {
      return NextResponse.json(
        { error: '올바른 전화번호를 입력해주세요.' },
        { status: 400 }
      )
    }

    // 데이터베이스에 저장
    const { data, error } = await supabase
      .from('consultations')
      .insert([
        {
          name: body.name,
          phone: body.phone,
          consultation_type: body.consultation_type || '전화상담',
          preferred_date: body.preferred_date || null,
          preferred_time: body.preferred_time || null,
          message: body.message || null,
          status: 'pending'
        }
      ])
      .select()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: '상담 신청 저장 중 오류가 발생했습니다.' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: '상담 신청이 성공적으로 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.',
      data: data[0]
    })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

// 상담 신청 목록 조회 API (관리자용)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const consultation_type = searchParams.get('consultation_type')
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = parseInt(searchParams.get('offset') || '0')

    let query = supabase
      .from('consultations')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (status) {
      query = query.eq('status', status)
    }

    if (consultation_type) {
      query = query.eq('consultation_type', consultation_type)
    }

    const { data, error } = await query

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: '데이터 조회 중 오류가 발생했습니다.' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: data,
      count: data?.length || 0
    })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
} 