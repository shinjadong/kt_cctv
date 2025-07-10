'use client'

import { useState, useEffect } from 'react'
import { IEstimate, IConsultation, IInquiry } from '@/lib/supabase'

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'estimates' | 'consultations' | 'inquiries'>('estimates')
  const [estimates, setEstimates] = useState<IEstimate[]>([])
  const [consultations, setConsultations] = useState<IConsultation[]>([])
  const [inquiries, setInquiries] = useState<IInquiry[]>([])
  const [loading, setLoading] = useState(false)

  // 데이터 로드 함수
  const loadData = async (type: 'estimates' | 'consultations' | 'inquiries') => {
    setLoading(true)
    try {
      const response = await fetch(`/api/${type}`)
      const data = await response.json()
      
      if (data.success) {
        switch (type) {
          case 'estimates':
            setEstimates(data.data)
            break
          case 'consultations':
            setConsultations(data.data)
            break
          case 'inquiries':
            setInquiries(data.data)
            break
        }
      }
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  // 컴포넌트 마운트 시 초기 데이터 로드
  useEffect(() => {
    loadData(activeTab)
  }, [activeTab])

  // 날짜 포맷 함수
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ko-KR')
  }

  // 상태별 색상
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'contacted':
      case 'scheduled':
        return 'bg-blue-100 text-blue-800'
      case 'completed':
      case 'resolved':
        return 'bg-green-100 text-green-800'
      case 'new':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          
          {/* 헤더 */}
          <div className="bg-gray-800 text-white p-6">
            <h1 className="text-3xl font-bold">CCTV 관리자 대시보드</h1>
            <p className="text-gray-300 mt-2">고객 문의 및 상담 현황을 관리하세요</p>
          </div>

          {/* 탭 네비게이션 */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('estimates')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'estimates'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                견적 문의 ({estimates.length})
              </button>
              <button
                onClick={() => setActiveTab('consultations')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'consultations'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                상담 신청 ({consultations.length})
              </button>
              <button
                onClick={() => setActiveTab('inquiries')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'inquiries'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                일반 문의 ({inquiries.length})
              </button>
            </nav>
          </div>

          {/* 콘텐츠 영역 */}
          <div className="p-6">
            {loading && (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="mt-2 text-gray-600">데이터를 불러오는 중...</p>
              </div>
            )}

            {/* 견적 문의 탭 */}
            {activeTab === 'estimates' && !loading && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">견적 문의 목록</h2>
                  <button 
                    onClick={() => loadData('estimates')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    새로고침
                  </button>
                </div>
                
                {estimates.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    아직 견적 문의가 없습니다.
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {estimates.map((estimate) => (
                      <div key={estimate.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold text-lg">{estimate.name}</h3>
                            <p className="text-gray-600">{estimate.phone}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(estimate.status || 'pending')}`}>
                            {estimate.status || 'pending'}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-gray-700">주소:</span>
                            <p className="text-gray-600">{estimate.address}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">연락희망시간:</span>
                            <p className="text-gray-600">{estimate.preferred_contact_time}</p>
                          </div>
                        </div>
                        
                        {/* 프로모션 체크 여부 */}
                        <div className="mt-3">
                          <span className="font-medium text-gray-700">프로모션 체크:</span>
                          <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${estimate.promo_check ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                            {estimate.promo_check ? '🎁 프로모션 대상' : '일반 문의'}
                          </span>
                        </div>
                        
                        <div className="mt-3 text-xs text-gray-500">
                          신청일: {formatDate(estimate.created_at || '')}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 상담 신청 탭 */}
            {activeTab === 'consultations' && !loading && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">상담 신청 목록</h2>
                  <button 
                    onClick={() => loadData('consultations')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    새로고침
                  </button>
                </div>
                
                {consultations.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    아직 상담 신청이 없습니다.
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {consultations.map((consultation) => (
                      <div key={consultation.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold text-lg">{consultation.name}</h3>
                            <p className="text-gray-600">{consultation.phone}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(consultation.status || 'pending')}`}>
                            {consultation.status || 'pending'}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-gray-700">상담방식:</span>
                            <p className="text-gray-600">{consultation.consultation_type || '전화상담'}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">희망날짜:</span>
                            <p className="text-gray-600">{consultation.preferred_date || '미입력'}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">희망시간:</span>
                            <p className="text-gray-600">{consultation.preferred_time || '미입력'}</p>
                          </div>
                        </div>
                        
                        {consultation.message && (
                          <div className="mt-3">
                            <span className="font-medium text-gray-700">상담 내용:</span>
                            <p className="text-gray-600 mt-1">{consultation.message}</p>
                          </div>
                        )}
                        
                        <div className="mt-3 text-xs text-gray-500">
                          신청일: {formatDate(consultation.created_at || '')}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 일반 문의 탭 */}
            {activeTab === 'inquiries' && !loading && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">일반 문의 목록</h2>
                  <button 
                    onClick={() => loadData('inquiries')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    새로고침
                  </button>
                </div>
                
                {inquiries.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    아직 일반 문의가 없습니다.
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {inquiries.map((inquiry) => (
                      <div key={inquiry.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold text-lg">{inquiry.name}</h3>
                            <div className="text-gray-600 space-y-1">
                              {inquiry.phone && <p>📞 {inquiry.phone}</p>}
                              {inquiry.email && <p>✉️ {inquiry.email}</p>}
                            </div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(inquiry.status || 'new')}`}>
                            {inquiry.status || 'new'}
                          </span>
                        </div>
                        
                        {inquiry.subject && (
                          <div className="mb-3">
                            <span className="font-medium text-gray-700">제목:</span>
                            <p className="text-gray-600">{inquiry.subject}</p>
                          </div>
                        )}
                        
                        <div className="mb-3">
                          <span className="font-medium text-gray-700">문의 내용:</span>
                          <p className="text-gray-600 mt-1 whitespace-pre-wrap">{inquiry.message}</p>
                        </div>
                        
                        <div className="flex justify-between items-center text-xs text-gray-500">
                          <span>문의 유형: {inquiry.inquiry_type || 'general'}</span>
                          <span>문의일: {formatDate(inquiry.created_at || '')}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 