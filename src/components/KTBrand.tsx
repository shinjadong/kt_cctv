'use client'

import Image from 'next/image'

export default function KTBrand() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      
      {/* 실제 서울 야경 배경 이미지 */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/seoul-night.jpg"
          alt="서울 야경"
          fill
          style={{ objectFit: 'cover' }}
          priority
          quality={100}
          className="filter brightness-75"
        />
      </div>
      
      {/* 오버레이 - 배경을 적절히 어둡게 하여 로고와 텍스트가 잘 보이도록 */}
      <div className="absolute inset-0 bg-black/30"></div>
      
      {/* 그라디언트 오버레이 - 더 깊은 느낌을 위해 */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-black/40"></div>
      
      {/* 메인 컨텐츠 */}
      <div className="relative z-10 text-center">
        
        {/* KT 텔레캅 로고 컨테이너 */}
        <div className="mb-8">
          {/* 실제 KT 텔레캅 로고 이미지 - 사이즈 축소 */}
          <img 
            src="/images/logos/kt-telecop_CI_logo.png" 
            alt="KT 텔레캅 로고" 
            className="h-20 lg:h-24 mx-auto drop-shadow-2xl filter brightness-110"
          />
        </div>
        
        {/* 서브 텍스트 */}
        <div className="text-white text-center max-w-2xl mx-auto px-4">
          <p className="text-xl lg:text-2xl font-light mb-4 drop-shadow-lg">
            <span className="font-semibold text-orange-400">KT 텔레캅</span>과 함께하는
          </p>
          <p className="text-2xl lg:text-3xl font-bold drop-shadow-lg">
            안전한 대한민국
          </p>
          
          {/* 장식적 요소 */}
          <div className="flex justify-center items-center mt-8 space-x-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-white/50"></div>
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-white/50"></div>
          </div>
        </div>
        
      </div>
      
      {/* 파티클 효과 - 실제 야경과 조화되도록 조정 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white/40 rounded-full animate-ping"></div>
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-orange-400/50 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-white/30 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
      </div>
      
    </section>
  )
} 