'use client'

import { useState } from 'react'
import { IConsultation } from '@/lib/supabase'

interface IConsultationForm extends Omit<IConsultation, 'id' | 'status' | 'created_at' | 'updated_at'> {}

export default function RecommendedCustomers() {
  const [showConsultationModal, setShowConsultationModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  
  // 상담 신청 폼 데이터
  const [consultationForm, setConsultationForm] = useState<IConsultationForm>({
    name: '',
    phone: '',
    consultation_type: '전화상담',
    preferred_date: '',
    preferred_time: '',
    message: ''
  })

  // 폼 입력 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setConsultationForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // 상담 신청 제출
  const handleConsultationSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')

    try {
      const response = await fetch('/api/consultations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(consultationForm)
      })

      const data = await response.json()

      if (data.success) {
        setSubmitMessage(data.message)
        // 폼 초기화
        setConsultationForm({
          name: '',
          phone: '',
          consultation_type: '전화상담',
          preferred_date: '',
          preferred_time: '',
          message: ''
        })
        // 3초 후 모달 닫기
        setTimeout(() => {
          setShowConsultationModal(false)
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

  // 견적 계산기 (Hero 컴포넌트의 견적 문의와 동일한 기능으로 연결)
  const handleCalculator = () => {
    // 페이지 상단으로 스크롤하여 Hero 섹션의 견적 문의 버튼 클릭 유도
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <section className="relative bg-gradient-to-br from-gray-50 to-slate-100 py-16 lg:py-24 overflow-hidden">
        {/* 배경 패턴 */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/80 via-gray-100/70 to-slate-100/90"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            
            {/* 섹션 헤더 */}
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-800 mb-6 font-garamond">
                <span className="block mb-2">당신을 위한</span>
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                  맞춤형 솔루션
                </span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                고객의 환경과 니즈에 최적화된 CCTV 솔루션을 제안합니다
              </p>
            </div>
            
            {/* 4개 고객 유형 그리드 */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              
              {/* 1. 대형 사업장/창고 */}
              <div className="group bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-slate-200/50 hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    🏢
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">대형 사업장/창고</h3>
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mb-4">
                      <p className="text-blue-800 font-semibold text-lg leading-relaxed">
                        "넓은 공간, 복잡한 관리...<br />
                        이제 합리적인 가격으로 해결하세요"
                      </p>
                    </div>
                    <ul className="space-y-2 text-gray-600 text-sm">
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></span>
                        넓은 공간 전체를 커버하는 광각 카메라
                      </li>
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></span>
                        다중 구역 동시 모니터링 시스템
                      </li>
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></span>
                        물류/재고 관리 연동 기능
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 2. 사무실/상업공간 */}
              <div className="group bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-slate-200/50 hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    🏬
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">사무실/상업공간</h3>
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 mb-4">
                      <p className="text-green-800 font-semibold text-lg leading-relaxed">
                        "출입부터 증빙까지,<br />
                        모든 순간이 기록되는 안전한 업무환경"
                      </p>
                    </div>
                    <ul className="space-y-2 text-gray-600 text-sm">
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3"></span>
                        직원 출입 관리 시스템 연동
                      </li>
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3"></span>
                        고객 응대 품질 향상 모니터링
                      </li>
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3"></span>
                        사업자 보험 할인 혜택 증빙
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 3. 1인 가구 */}
              <div className="group bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-slate-200/50 hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    👤
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">1인 가구</h3>
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 mb-4">
                      <p className="text-purple-800 font-semibold text-lg leading-relaxed">
                        "소중한 나를 지키는<br />
                        가장 현명한 투자"
                      </p>
                    </div>
                    <ul className="space-y-2 text-gray-600 text-sm">
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-3"></span>
                        혼자서도 안심되는 실시간 알림
                      </li>
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-3"></span>
                        간편한 스마트폰 원격 확인
                      </li>
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-3"></span>
                        합리적인 월 구독 요금제
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 4. 주택/아파트 */}
              <div className="group bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-slate-200/50 hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    🏠
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">주택/아파트</h3>
                    <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg p-4 mb-4">
                      <p className="text-orange-800 font-semibold text-lg leading-relaxed">
                        "우리 가족이 편안해하는<br />
                        진짜 이유는 따로 있습니다"
                      </p>
                    </div>
                    <ul className="space-y-2 text-gray-600 text-sm">
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-3"></span>
                        아이들 등하교 확인 서비스
                      </li>
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-3"></span>
                        택배/방문자 실시간 알림
                      </li>
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-3"></span>
                        가족 모두 앱 공유 가능
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

            </div>
            
            {/* 하단 CTA */}
            <div className="text-center bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">
                당신의 상황에 맞는 최적의 솔루션을 찾으셨나요?
              </h3>
              <p className="text-slate-300 mb-6 text-lg">
                전문 상담을 통해 더 정확한 맞춤 견적을 받아보세요
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button 
                  onClick={() => setShowConsultationModal(true)}
                  className="bg-warning-orange hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300 transform hover:scale-105"
                >
                  무료 상담 신청
                </button>
                <button 
                  onClick={handleCalculator}
                  className="border border-slate-400 hover:bg-white hover:text-slate-900 text-slate-300 font-semibold py-3 px-8 rounded-lg transition-all duration-300"
                >
                  견적 계산기
                </button>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* 상담 신청 모달 */}
      {showConsultationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">무료 상담 신청</h2>
                <button
                  onClick={() => setShowConsultationModal(false)}
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

              <form onSubmit={handleConsultationSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      이름 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={consultationForm.name}
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
                      value={consultationForm.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="010-8308-7385"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">상담 방식</label>
                  <select
                    name="consultation_type"
                    value={consultationForm.consultation_type}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="전화상담">전화상담</option>
                    <option value="방문상담">방문상담</option>
                    <option value="온라인상담">온라인상담</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">희망 날짜</label>
                    <input
                      type="date"
                      name="preferred_date"
                      value={consultationForm.preferred_date}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">희망 시간</label>
                    <select
                      name="preferred_time"
                      value={consultationForm.preferred_time}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">선택해주세요</option>
                      <option value="09:00">09:00</option>
                      <option value="10:00">10:00</option>
                      <option value="11:00">11:00</option>
                      <option value="12:00">12:00</option>
                      <option value="13:00">13:00</option>
                      <option value="14:00">14:00</option>
                      <option value="15:00">15:00</option>
                      <option value="16:00">16:00</option>
                      <option value="17:00">17:00</option>
                      <option value="18:00">18:00</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">상담 내용</label>
                  <textarea
                    name="message"
                    value={consultationForm.message}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="상담받고 싶은 내용이나 궁금한 점을 적어주세요."
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowConsultationModal(false)}
                    className="flex-1 px-6 py-3 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? '제출 중...' : '상담 신청'}
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