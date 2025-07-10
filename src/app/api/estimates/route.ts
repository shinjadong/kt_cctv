import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// 견적 문의 생성 API
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // 필수 필드 검증
    if (!body.name || !body.phone || !body.address || !body.preferred_contact_time) {
      return NextResponse.json(
        { error: '모든 필수 항목을 입력해주세요.' },
        { status: 400 }
      )
    }

    // 전화번호 형식 검증 (유연한 한국 전화번호 패턴)
    const cleanPhone = body.phone.replace(/[^\d]/g, '') // 숫자만 추출
    const phoneRegex = /^01[016789]\d{7,8}$/ // 01X로 시작하고 총 10-11자리
    if (!phoneRegex.test(cleanPhone)) {
      return NextResponse.json(
        { error: '올바른 전화번호를 입력해주세요. (010, 011, 016, 017, 018, 019로 시작)' },
        { status: 400 }
      )
    }

    // 데이터베이스에 저장 (간소화된 폼)
    const { data, error } = await supabase
      .from('estimates')
      .insert([
        {
          name: body.name,
          phone: cleanPhone, // 정제된 전화번호 저장
          address: body.address,
          preferred_contact_time: body.preferred_contact_time,
          promo_check: body.promo_check || false,
          status: 'pending'
        }
      ])
      .select()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: '견적 문의 저장 중 오류가 발생했습니다.' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: '견적 문의가 성공적으로 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.',
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

// 견적 문의 목록 조회 API (관리자용)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = parseInt(searchParams.get('offset') || '0')

    let query = supabase
      .from('estimates')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (status) {
      query = query.eq('status', status)
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