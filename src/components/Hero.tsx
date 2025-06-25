'use client'

import { useState } from 'react'
import { IEstimate } from '@/lib/supabase'

interface IEstimateForm extends Omit<IEstimate, 'id' | 'status' | 'created_at' | 'updated_at'> {}

export default function Hero() {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [showEstimateModal, setShowEstimateModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  
  // 견적 문의 폼 데이터
  const [estimateForm, setEstimateForm] = useState<IEstimateForm>({
    name: '',
    phone: '',
    email: '',
    address: '',
    property_type: '',
    camera_count: undefined,
    budget_range: '',
    preferred_contact_time: '',
    additional_notes: ''
  })

  const handleQuickCall = () => {
    // 전화 걸기 기능
    window.location.href = 'tel:010-1234-5678'
  }

  const handleQuickConsult = () => {
    // 견적 문의 모달 열기
    setShowEstimateModal(true)
  }

  // 폼 입력 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setEstimateForm(prev => ({
      ...prev,
      [name]: name === 'camera_count' ? (value ? parseInt(value) : undefined) : value
    }))
  }

  // 견적 문의 제출
  const handleEstimateSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')

    try {
      const response = await fetch('/api/estimates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(estimateForm)
      })

      const data = await response.json()

      if (data.success) {
        setSubmitMessage(data.message)
        // 폼 초기화
        setEstimateForm({
          name: '',
          phone: '',
          email: '',
          address: '',
          property_type: '',
          camera_count: undefined,
          budget_range: '',
          preferred_contact_time: '',
          additional_notes: ''
        })
        // 3초 후 모달 닫기
        setTimeout(() => {
          setShowEstimateModal(false)
          setSubmitMessage('')
        }, 3000)
      } else {
        setSubmitMessage(data.error || '오류가 발생했습니다.')
      }
    } catch (error) {
      console.error('Error:', error)
      setSubmitMessage('네트워크 오류가 발생했습니다.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <section className="relative bg-gradient-to-br from-amber-50 to-stone-100 min-h-screen flex items-center overflow-hidden">
        {/* 배경 이미지 - CCTV 설치 현장이나 보안 관련 이미지 */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{
            backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080"><rect width="1920" height="1080" fill="%23f7f5f3"/><circle cx="200" cy="200" r="2" fill="%23d4a574" opacity="0.3"/><circle cx="400" cy="300" r="1" fill="%23c4915c" opacity="0.2"/><circle cx="600" cy="150" r="1.5" fill="%23b8956f" opacity="0.25"/><circle cx="800" cy="400" r="2" fill="%23d4a574" opacity="0.3"/><circle cx="1000" cy="250" r="1" fill="%23c4915c" opacity="0.2"/><circle cx="1200" cy="350" r="1.5" fill="%23b8956f" opacity="0.25"/><circle cx="1400" cy="180" r="2" fill="%23d4a574" opacity="0.3"/><circle cx="1600" cy="320" r="1" fill="%23c4915c" opacity="0.2"/></svg>')`
          }}
        />
        
        {/* 그라데이션 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/80 via-stone-100/70 to-amber-100/90"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            
            {/* 메인 타이틀 - 강렬한 타이포그래피 */}
            <div className="text-center mb-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 leading-tight tracking-tight mb-8 font-garamond antialiased subpixel-antialiased">
                <span className="block">CCTV 설치</span>
                <span className="block bg-gradient-to-r from-warning-orange via-red-500 to-pink-500 bg-clip-text text-transparent">
                  공식가입센터
                </span>
              </h1>
              
              <div className="text-lg lg:text-xl text-gray-700 font-light tracking-wide max-w-3xl mx-auto leading-relaxed antialiased mb-4">
                <span className="text-gray-800 font-semibold">당신의 보안 파트너 KT</span><br />
                <span className="text-warning-orange font-semibold">전국 곳곳에서 안전한 보안을 만나보세요.</span>
              </div>
            </div>
            
            {/* 강력한 카피라이팅 섹션 */}
            <div className="text-center mb-16">
              <div className="max-w-4xl mx-auto">
                
                {/* 견적 문의 버튼 */}
                <button
                  onClick={handleQuickConsult}
                  className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-white bg-gray-800 hover:bg-gray-700 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl mr-4"
                >
                  <span className="mr-3">📋</span>
                  <span>무료 견적 받기</span>
                  <span className="ml-3">→</span>
                </button>

                {/* 전화 상담 버튼 */}
                <button
                  onClick={handleQuickCall}
                  className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-gray-800 bg-white hover:bg-gray-50 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border-2 border-gray-200"
                >
                  <span className="mr-3">📞</span>
                  <span>전화 상담</span>
                </button>
                
                <div className="flex items-center justify-center gap-8 text-gray-600 text-sm mt-6">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    <span>30초 간단 입력</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    <span>즉시 견적 확인</span>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
        
      </section>

      {/* 견적 문의 모달 */}
      {showEstimateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">무료 견적 문의</h2>
                <button
                  onClick={() => setShowEstimateModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              {submitMessage && (
                <div className={`p-4 rounded-lg mb-6 ${submitMessage.includes('성공') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {submitMessage}
                </div>
              )}

              <form onSubmit={handleEstimateSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      이름 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={estimateForm.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="홍길동"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      전화번호 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={estimateForm.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="010-1234-5678"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">이메일</label>
                  <input
                    type="email"
                    name="email"
                    value={estimateForm.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="example@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">설치 주소</label>
                  <input
                    type="text"
                    name="address"
                    value={estimateForm.address}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="서울시 강남구..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">건물 유형</label>
                    <select
                      name="property_type"
                      value={estimateForm.property_type}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">선택해주세요</option>
                      <option value="주택">주택</option>
                      <option value="아파트">아파트</option>
                      <option value="상가">상가</option>
                      <option value="사무실">사무실</option>
                      <option value="공장">공장</option>
                      <option value="기타">기타</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">카메라 대수</label>
                    <input
                      type="number"
                      name="camera_count"
                      value={estimateForm.camera_count || ''}
                      onChange={handleInputChange}
                      min="1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="4"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">예산 범위</label>
                    <select
                      name="budget_range"
                      value={estimateForm.budget_range}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">선택해주세요</option>
                      <option value="100만원 미만">100만원 미만</option>
                      <option value="100-300만원">100-300만원</option>
                      <option value="300-500만원">300-500만원</option>
                      <option value="500만원 이상">500만원 이상</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">연락 희망시간</label>
                    <select
                      name="preferred_contact_time"
                      value={estimateForm.preferred_contact_time}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">선택해주세요</option>
                      <option value="오전 (09:00-12:00)">오전 (09:00-12:00)</option>
                      <option value="오후 (12:00-18:00)">오후 (12:00-18:00)</option>
                      <option value="저녁 (18:00-21:00)">저녁 (18:00-21:00)</option>
                      <option value="언제든지">언제든지</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">추가 요청사항</label>
                  <textarea
                    name="additional_notes"
                    value={estimateForm.additional_notes}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="특별한 요구사항이나 궁금한 점이 있으시면 적어주세요."
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowEstimateModal(false)}
                    className="flex-1 px-6 py-3 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? '제출 중...' : '견적 요청'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
} 