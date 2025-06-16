'use client'

import Image from 'next/image'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleCall = () => {
    window.location.href = 'tel:010-1234-5678'
  }

  const handleKakaoTalk = () => {
    window.open('https://pf.kakao.com/_your_channel_id', '_blank')
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="bg-amber-50/95 border-b border-amber-200/50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          {/* 로고 섹션 */}
          <div className="flex items-center">
            <Image
              src="/images/logos/kt-telecop_CI_logo.png"
              alt="KT 텔레캅 로고"
              width={150}
              height={50}
              className="h-10 w-auto object-contain"
              priority
            />
          </div>

          {/* 햄버거 메뉴 버튼 */}
          <button
            onClick={toggleMenu}
            className="flex flex-col justify-center items-center w-8 h-8 space-y-1 hover:opacity-70 transition-opacity duration-300"
          >
            <div className={`w-6 h-0.5 bg-gray-800 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-gray-800 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-gray-800 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
          </button>

        </div>

        {/* 드롭다운 메뉴 */}
        {isMenuOpen && (
          <div className="border-t border-amber-200 py-4 bg-amber-50/95">
            <div className="space-y-4">
              
              {/* 전화 상담 */}
              <button
                onClick={handleCall}
                className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-warning-orange to-red-500 hover:from-red-500 hover:to-warning-orange py-3 rounded-xl text-white font-bold transition-all duration-300"
              >
                <span className="text-xl">📞</span>
                <span>010-1234-5678 전화걸기</span>
              </button>

              {/* 카카오톡 상담 */}
              <button
                onClick={handleKakaoTalk}
                className="w-full flex items-center justify-center space-x-3 bg-yellow-400 hover:bg-yellow-300 py-3 rounded-xl text-black font-bold transition-all duration-300"
              >
                <span className="text-xl">💬</span>
                <span>카카오톡 상담</span>
              </button>

              {/* 무료 견적 */}
              <button
                onClick={() => {
                  window.open('https://careon-cctv.vercel.app/', '_blank')
                  setIsMenuOpen(false)
                }}
                className="w-full flex items-center justify-center space-x-3 bg-white border-2 border-warning-orange text-warning-orange hover:bg-warning-orange hover:text-white py-3 rounded-xl font-bold transition-all duration-300"
              >
                <span className="text-xl">📝</span>
                <span>무료 견적 신청</span>
              </button>
              
            </div>
          </div>
        )}
      </div>
    </header>
  )
} 