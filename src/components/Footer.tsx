import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 메인 푸터 컨텐츠 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* 회사 정보 */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-amber-400">케어온</h3>
            <p className="text-gray-300 leading-relaxed">
              믿을 수 있는 CCTV 설치 전문업체<br />
              보안카메라 설치부터 유지보수까지 원스톱 서비스
            </p>
            <div className="flex flex-col space-y-2 text-sm text-gray-400">
              <span>📞 24시간 무료상담</span>
              <span>🔧 당일설치 가능</span>
              <span>✅ A/S 보장</span>
            </div>
          </div>

          {/* 연락처 정보 */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-amber-400">연락처</h4>
            <div className="space-y-2 text-gray-300">
              <div className="flex items-center space-x-2">
                <span className="text-amber-400">📞</span>
                <a href="tel:010-8308-7385" className="hover:text-amber-400 transition-colors">
                  010-8308-7385
                </a>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-amber-400 mt-1">📍</span>
                <span className="text-sm leading-relaxed">
                  경상남도 창원시 의창구<br />
                  사화로90번길 20, 201호
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-amber-400">⏰</span>
                <span className="text-sm">평일 09:00 - 18:00</span>
              </div>
            </div>
          </div>

          {/* 서비스 메뉴 */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-amber-400">서비스</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>
                <a href="#" className="hover:text-amber-400 transition-colors">
                  가정용 CCTV 설치
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-400 transition-colors">
                  상업용 CCTV 설치
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-400 transition-colors">
                  IP 카메라 설치
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-400 transition-colors">
                  CCTV 유지보수
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-400 transition-colors">
                  무료 견적 상담
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 구분선 */}
        <div className="border-t border-gray-700 pt-8">
          {/* 사업자 정보 */}
          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <h4 className="text-lg font-semibold text-amber-400 mb-4">사업자 정보</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
              <div className="space-y-1">
                <div><span className="text-gray-400">상호명:</span> 케어온 (제이앤유통)</div>
                <div><span className="text-gray-400">대표자:</span> 신예준</div>
                <div><span className="text-gray-400">사업자등록번호:</span> 609-41-95762</div>
                <div><span className="text-gray-400">통신판매업등록번호:</span> 제2024-경남창원-0453호</div>
              </div>
              <div className="space-y-1">
                <div><span className="text-gray-400">업태:</span> 소매업</div>
                <div><span className="text-gray-400">종목:</span> 컴퓨터기계, 전자상거래</div>
                <div><span className="text-gray-400">개업일:</span> 2023년 06월 27일</div>
              </div>
            </div>
          </div>

          {/* 하단 카피라이트 */}
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm text-gray-400">
            <div className="text-center md:text-left">
              <p>&copy; 2024 케어온 (제이앤유통). All rights reserved.</p>
              <p className="mt-1">케어온 - 믿을 수 있는 CCTV 설치 전문업체</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <a href="#" className="hover:text-amber-400 transition-colors text-xs">
                개인정보처리방침
              </a>
              <span className="text-gray-600">|</span>
              <a href="#" className="hover:text-amber-400 transition-colors text-xs">
                이용약관
              </a>
            </div>
          </div>
        </div>

        {/* 하단 고정 문구 */}
        <div className="mt-6 text-center">
          <div className="bg-amber-50 text-gray-800 rounded-lg p-4 inline-block">
            <p className="text-sm font-medium">
              💡 <span className="font-bold text-amber-600">24시간 무료상담</span> | 
              <span className="font-bold text-amber-600"> 당일설치 가능</span> | 
              <span className="font-bold text-amber-600"> 전국 서비스</span>
            </p>
            <p className="text-xs text-gray-600 mt-1">
              믿을 수 있는 CCTV 전문업체와 함께하세요
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 