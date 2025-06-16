'use client'

export default function RecommendedCustomers() {
  return (
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
              <button className="bg-warning-orange hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300 transform hover:scale-105">
                무료 상담 신청
              </button>
              <button className="border border-slate-400 hover:bg-white hover:text-slate-900 text-slate-300 font-semibold py-3 px-8 rounded-lg transition-all duration-300">
                견적 계산기
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
} 