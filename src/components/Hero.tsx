'use client'

import { useState } from 'react'
import { IEstimate } from '@/lib/supabase'

interface IEstimateForm extends Omit<IEstimate, 'id' | 'status' | 'created_at' | 'updated_at'> {}

export default function Hero() {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [showEstimateModal, setShowEstimateModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  
  // 견적 문의 폼 데이터 (간소화)
  const [estimateForm, setEstimateForm] = useState<IEstimateForm>({
    name: '',
    phone: '',
    address: '',
    preferred_contact_time: '',
    promo_check: false
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
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = 'checked' in e.target ? e.target.checked : undefined
    setEstimateForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  // 주소 검색 기능
  const handleAddressSearch = () => {
    // 다음 우편번호 API 사용
    if (typeof window !== 'undefined' && (window as any).daum) {
      new (window as any).daum.Postcode({
        oncomplete: function(data: any) {
          setEstimateForm(prev => ({
            ...prev,
            address: `${data.address} ${data.buildingName ? `(${data.buildingName})` : ''}`
          }))
        }
      }).open()
    } else {
      alert('주소 검색 서비스를 불러오는 중입니다. 잠시 후 다시 시도해주세요.')
    }
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
          address: '',
          preferred_contact_time: '',
          promo_check: false
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

              <form onSubmit={handleEstimateSubmit} className="space-y-6">
                {/* 이름 */}
                <div>
                  <label className="block text-lg font-semibold text-gray-800 mb-3">
                    이름 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={estimateForm.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-warning-orange focus:border-warning-orange text-lg font-medium"
                    placeholder="홍길동"
                  />
                </div>

                {/* 무료 견적 받으실 주소 */}
                <div>
                  <label className="block text-lg font-semibold text-gray-800 mb-3">
                    무료 견적 받으실 주소 <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      name="address"
                      value={estimateForm.address}
                      onChange={handleInputChange}
                      required
                      className="flex-1 px-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-warning-orange focus:border-warning-orange text-lg"
                      placeholder="주소 검색 버튼을 클릭해주세요"
                      readOnly
                    />
                    <button
                      type="button"
                      onClick={handleAddressSearch}
                      className="px-6 py-4 bg-warning-orange text-white rounded-xl hover:bg-red-500 transition-all duration-300 font-bold whitespace-nowrap shadow-lg hover:shadow-xl"
                    >
                      🔍 주소검색
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    📍 정확한 주소를 입력해주시면 더 정확한 견적을 제공해드릴 수 있습니다
                  </p>
                </div>

                {/* 전화번호 */}
                <div>
                  <label className="block text-lg font-semibold text-gray-800 mb-3">
                    전화번호 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={estimateForm.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-warning-orange focus:border-warning-orange text-lg font-medium"
                    placeholder="010-1234-5678 (어떤 형식으로도 입력 가능)"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    📞 010, 011, 016, 017, 018, 019로 시작하는 번호 모두 가능합니다
                  </p>
                </div>

                {/* 연락 희망시간 */}
                <div>
                  <label className="block text-lg font-semibold text-gray-800 mb-3">
                    연락 희망시간 <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="preferred_contact_time"
                    value={estimateForm.preferred_contact_time}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-warning-orange focus:border-warning-orange text-lg font-medium bg-white"
                  >
                    <option value="">언제 연락 받으시겠어요?</option>
                    <option value="오전">🌅 오전 (09:00-12:00)</option>
                    <option value="오후">☀️ 오후 (12:00-18:00)</option>
                    <option value="저녁">🌆 저녁 (18:00-21:00)</option>
                    <option value="야간">🌙 야간 (21:00-23:00)</option>
                  </select>
                </div>

                {/* 무료 설치 프로모션 체크박스 */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-xl border-2 border-amber-200">
                  <label className="flex items-start space-x-4 cursor-pointer">
                    <input
                      type="checkbox"
                      name="promo_check"
                      checked={estimateForm.promo_check || false}
                      onChange={handleInputChange}
                      className="mt-2 w-6 h-6 text-warning-orange border-2 border-gray-300 rounded-md focus:ring-warning-orange"
                    />
                    <div className="flex-1">
                      <span className="text-lg font-bold text-gray-800 block">
                        🎁 <span className="text-warning-orange">무료 설치 프로모션</span>을 보고 오신 경우 체크해주세요
                      </span>
                      <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                        ✅ 체크하시면 <span className="font-semibold text-green-600">특별 할인 혜택</span>을 받으실 수 있습니다<br />
                        💰 최대 30% 할인 + 무료 A/S 연장 서비스
                      </p>
                    </div>
                  </label>
                </div>

                {/* 제출 버튼 */}
                <div className="grid grid-cols-2 gap-4 pt-6">
                  <button
                    type="button"
                    onClick={() => setShowEstimateModal(false)}
                    className="px-6 py-4 text-gray-700 bg-gray-200 rounded-xl hover:bg-gray-300 transition-all duration-300 font-semibold text-lg"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-4 text-white bg-gradient-to-r from-warning-orange to-red-500 rounded-xl hover:from-red-500 hover:to-warning-orange transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-bold text-lg shadow-lg hover:shadow-xl"
                  >
                    {isSubmitting ? '📤 제출 중...' : '🚀 무료견적 받기'}
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