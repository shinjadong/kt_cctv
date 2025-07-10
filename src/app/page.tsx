import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Footer from '@/components/Footer'

const KTBrand = dynamic(() => import('@/components/KTBrand'), {
  loading: () => <div className="min-h-screen bg-gradient-to-br from-amber-50 to-stone-100" />
})

const VideoDemo = dynamic(() => import('@/components/VideoDemo'), {
  loading: () => <div className="min-h-96 bg-gradient-to-br from-stone-100 to-amber-50" />
})

const RecommendedCustomers = dynamic(() => import('@/components/RecommendedCustomers'), {
  loading: () => <div className="min-h-96 bg-white" />
})

// 메인 페이지 SEO 메타데이터
export const metadata: Metadata = {
  title: 'CCTV 설치 전문업체 | 24시간 무료상담 | 믿을 수 있는 보안카메라',
  description: '🔒 CCTV 설치 전문업체 ✅ 무료 현장견적 ✅ 당일설치 가능 ✅ A/S 보장 ✅ 전국 서비스 | 가정용·상업용 보안카메라 설치부터 유지보수까지 원스톱 서비스',
  keywords: [
    'CCTV 설치', 'CCTV 설치 업체', 'CCTV 설치 비용', '보안카메라 설치',
    '무선 CCTV', 'IP 카메라', '실시간 모니터링', 'CCTV 유지보수',
    '가정용 CCTV', '상업용 CCTV', '사무실 CCTV', '매장 CCTV'
  ],
  openGraph: {
    title: 'CCTV 설치 전문업체 | 24시간 무료상담',
    description: '🔒 전국 CCTV 설치 전문업체 ✅ 무료 견적 ✅ 당일설치 ✅ A/S 보장',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'CCTV 설치 전문업체'
      }
    ]
  }
}

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Critical Above the Fold Content */}
      <Header />
      <Hero />
      
      {/* Lazy Loaded Below the Fold Content */}
      <KTBrand />
      <VideoDemo />
      <RecommendedCustomers />
      
      {/* Footer */}
      <Footer />
    </main>
  )
} 