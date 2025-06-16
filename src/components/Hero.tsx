'use client'

import { useState } from 'react'

export default function Hero() {
  const [phoneNumber, setPhoneNumber] = useState('')

  const handleQuickCall = () => {
    // 전화 걸기 기능
    window.location.href = 'tel:010-1234-5678'
  }

  const handleQuickConsult = () => {
    // 외부 견적 페이지로 이동
    window.open('https://careon-cctv.vercel.app/', '_blank')
  }

  return (
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
              
              {/* 외부 링크 버튼 */}
              <a
                href="https://careon-cctv.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-white bg-gray-800 hover:bg-gray-700 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span className="mr-3"></span>
                <span>무료 견적 받기</span>
                <span className="ml-3">→</span>
              </a>
              
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
  )
} 