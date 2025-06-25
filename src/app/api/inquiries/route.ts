import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// 문의사항 생성 API
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // 필수 필드 검증
    if (!body.name || !body.message) {
      return NextResponse.json(
        { error: '이름과 문의내용은 필수입니다.' },
        { status: 400 }
      )
    }

    // 연락처 검증 (이메일 또는 전화번호 중 하나는 필수)
    if (!body.phone && !body.email) {
      return NextResponse.json(
        { error: '연락 가능한 전화번호 또는 이메일을 입력해주세요.' },
        { status: 400 }
      )
    }

    // 전화번호 형식 검증 (있는 경우에만)
    if (body.phone) {
      const phoneRegex = /^01[016789]-?\d{3,4}-?\d{4}$/
      if (!phoneRegex.test(body.phone.replace(/[^\d]/g, ''))) {
        return NextResponse.json(
          { error: '올바른 전화번호를 입력해주세요.' },
          { status: 400 }
        )
      }
    }

    // 이메일 형식 검증 (있는 경우에만)
    if (body.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(body.email)) {
        return NextResponse.json(
          { error: '올바른 이메일 주소를 입력해주세요.' },
          { status: 400 }
        )
      }
    }

    // 데이터베이스에 저장
    const { data, error } = await supabase
      .from('inquiries')
      .insert([
        {
          name: body.name,
          phone: body.phone || null,
          email: body.email || null,
          subject: body.subject || null,
          message: body.message,
          inquiry_type: body.inquiry_type || 'general',
          status: 'new'
        }
      ])
      .select()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: '문의사항 저장 중 오류가 발생했습니다.' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: '문의사항이 성공적으로 접수되었습니다. 빠른 시일 내에 답변드리겠습니다.',
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

// 문의사항 목록 조회 API (관리자용)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const inquiry_type = searchParams.get('inquiry_type')
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = parseInt(searchParams.get('offset') || '0')

    let query = supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (status) {
      query = query.eq('status', status)
    }

    if (inquiry_type) {
      query = query.eq('inquiry_type', inquiry_type)
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