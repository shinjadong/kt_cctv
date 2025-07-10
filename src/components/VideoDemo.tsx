'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { imageConfig } from '@/lib/images'

export default function VideoDemo() {
  const [imageLoaded, setImageLoaded] = useState({
    video1: false,
    video2: false,
    video3: false,
    video4: false
  })
  
  const [inView, setInView] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleImageLoad = (videoKey: string) => {
    setImageLoaded(prev => ({ ...prev, [videoKey]: true }))
  }

  const handleImageError = (videoKey: string) => {
    setImageLoaded(prev => ({ ...prev, [videoKey]: false }))
  }

  return (
    <section ref={sectionRef} className="relative bg-gradient-to-br from-stone-100 to-amber-50 py-16 lg:py-24 overflow-hidden">
      {/* 배경 패턴 */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50/80 via-stone-100/70 to-amber-100/90"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          
          {/* 섹션 헤더 */}
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-800 mb-6 font-garamond">
              <span className="block mb-2">당신이 믿고 맡길 수 있는</span>
              <span className="block bg-gradient-to-r from-warning-orange via-red-500 to-pink-500 bg-clip-text text-transparent">
                유일한 선택
              </span>
            </h2>
            
            {/* KT 텔래캅 로고 */}
            <div className="flex justify-center mb-6">
              {inView && (
                <Image 
                  src={imageConfig.logo.src}
                  alt="KT 텔래캅" 
                  width={64}
                  height={64}
                  className="h-12 lg:h-16 drop-shadow-lg"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIGZpbGw9IiNmNWY1ZjQiLz48L3N2Zz4K"
                />
              )}
            </div>
          </div>
          
          {/* 4개 영상 데모 그리드 */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            
            {/* 1. 500만화소 - 고화질 영상 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-2xl border border-amber-200/50 hover:shadow-3xl transition-all duration-300">
              <div className="aspect-video bg-gray-100 rounded-lg mb-3 overflow-hidden relative">
                {inView && (
                  <Image 
                    src={imageConfig.videos.video1.src}
                    alt="500만화소 고화질 CCTV 영상" 
                    fill
                    className={`object-cover transition-opacity duration-300 ${imageLoaded.video1 ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => handleImageLoad('video1')}
                    onError={() => handleImageError('video1')}
                    loading="lazy"
                    unoptimized
                  />
                )}
                {/* 플레이스홀더 - GIF 파일이 로드되지 않은 경우에만 표시 */}
                {!imageLoaded.video1 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-700 text-white">
                    <div className="text-center">
                      <div className="text-4xl mb-2">📹</div>
                      <div className="text-sm font-semibold">500만화소 영상</div>
                    </div>
                  </div>
                )}
              </div>
              <div className="px-2">
                <h3 className="text-xl font-bold text-gray-800 mb-1">500만화소</h3>
                <p className="text-warning-orange font-semibold text-lg mb-1">
                  얼굴까지 선명하게, 진실까지 명확하게
                </p>
                <p className="text-gray-600 text-sm">
                  Ultra HD 화질로 범죄자의 얼굴 특징까지 놓치지 않습니다
                </p>
              </div>
            </div>

            {/* 2. 실시간 모니터링 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-2xl border border-amber-200/50 hover:shadow-3xl transition-all duration-300">
              <div className="aspect-video bg-gray-100 rounded-lg mb-3 overflow-hidden relative">
                {inView && (
                  <Image 
                    src={imageConfig.videos.video2.src}
                    alt="실시간 모니터링 화면" 
                    fill
                    className={`object-cover transition-opacity duration-300 ${imageLoaded.video2 ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => handleImageLoad('video2')}
                    onError={() => handleImageError('video2')}
                    loading="lazy"
                    unoptimized
                  />
                )}
                {/* 플레이스홀더 - GIF 파일이 로드되지 않은 경우에만 표시 */}
                {!imageLoaded.video2 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-green-600 to-teal-700 text-white">
                    <div className="text-center">
                      <div className="text-4xl mb-2">📱</div>
                      <div className="text-sm font-semibold">실시간 모니터링</div>
                    </div>
                  </div>
                )}
              </div>
              <div className="px-2">
                <h3 className="text-xl font-bold text-gray-800 mb-1">실시간 모니터링</h3>
                <p className="text-warning-orange font-semibold text-lg mb-1">
                  어디서나 집과 연결된 일상
                </p>
                <p className="text-gray-600 text-sm">
                  스마트폰으로 언제 어디서나 우리 집을 확인할 수 있습니다
                </p>
              </div>
            </div>

            {/* 3. 객체별 감시 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-2xl border border-amber-200/50 hover:shadow-3xl transition-all duration-300">
              <div className="aspect-video bg-gray-100 rounded-lg mb-3 overflow-hidden relative">
                {inView && (
                  <Image 
                    src={imageConfig.videos.video3.src}
                    alt="AI 객체 인식 기능" 
                    fill
                    className={`object-cover transition-opacity duration-300 ${imageLoaded.video3 ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => handleImageLoad('video3')}
                    onError={() => handleImageError('video3')}
                    loading="lazy"
                    unoptimized
                  />
                )}
                {/* 플레이스홀더 - GIF 파일이 로드되지 않은 경우에만 표시 */}
                {!imageLoaded.video3 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-orange-600 to-red-700 text-white">
                    <div className="text-center">
                      <div className="text-4xl mb-2">🤖</div>
                      <div className="text-sm font-semibold">AI 객체 인식</div>
                    </div>
                  </div>
                )}
              </div>
              <div className="px-2">
                <h3 className="text-xl font-bold text-gray-800 mb-1">객체별 감시</h3>
                <p className="text-warning-orange font-semibold text-lg mb-1">
                  사람은 사람대로, 차량은 차량대로
                </p>
                <p className="text-gray-600 text-sm">
                  AI가 사람, 차량, 동물을 구분하여 정확한 알림을 제공합니다
                </p>
              </div>
            </div>

            {/* 4. 침입 및 경계 알림 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-2xl border border-amber-200/50 hover:shadow-3xl transition-all duration-300">
              <div className="aspect-video bg-gray-100 rounded-lg mb-3 overflow-hidden relative">
                {inView && (
                  <Image 
                    src={imageConfig.videos.video4.src}
                    alt="침입 감지 및 알림 시스템" 
                    fill
                    className={`object-cover transition-opacity duration-300 ${imageLoaded.video4 ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => handleImageLoad('video4')}
                    onError={() => handleImageError('video4')}
                    loading="lazy"
                    unoptimized
                  />
                )}
                {/* 플레이스홀더 - GIF 파일이 로드되지 않은 경우에만 표시 */}
                {!imageLoaded.video4 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-red-600 to-pink-700 text-white">
                    <div className="text-center">
                      <div className="text-4xl mb-2">🚨</div>
                      <div className="text-sm font-semibold">침입 감지 알림</div>
                    </div>
                  </div>
                )}
              </div>
              <div className="px-2">
                <h3 className="text-xl font-bold text-gray-800 mb-1">침입 및 경계 알림</h3>
                <p className="text-warning-orange font-semibold text-lg mb-1">
                  위험이 다가오기 전, 먼저 알려드립니다
                </p>
                <p className="text-gray-600 text-sm">
                  24시간 무인 경계로 침입자를 즉시 감지하고 알림을 보냅니다
                </p>
              </div>
            </div>

          </div>
          
          {/* 하단 특징 포인트 */}
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 border border-amber-200/30">
              <div className="text-warning-orange text-3xl mb-3">⚡</div>
              <h4 className="font-bold text-gray-800 mb-2">빠른 설치</h4>
              <p className="text-gray-600 text-sm">
                평균 2-3시간 내<br />완료되는 신속한 설치
              </p>
            </div>
            
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 border border-amber-200/30">
              <div className="text-warning-orange text-3xl mb-3">🔧</div>
              <h4 className="font-bold text-gray-800 mb-2">전문 기술</h4>
              <p className="text-gray-600 text-sm">
                10년 경력의 전문가가<br />직접 설치 및 설정
              </p>
            </div>
            
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 border border-amber-200/30">
              <div className="text-warning-orange text-3xl mb-3">📱</div>
              <h4 className="font-bold text-gray-800 mb-2">스마트 연동</h4>
              <p className="text-gray-600 text-sm">
                스마트폰 앱 연동 및<br />실시간 모니터링 설정
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
} 