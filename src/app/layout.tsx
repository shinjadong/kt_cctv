import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

// 구글 폰트 최적화 로딩 (Core Web Vitals 개선)
const inter = Inter({ subsets: ['latin'] })
const playfair = Playfair_Display({ 
  subsets: ['latin', 'latin-ext'],
  variable: '--font-garamond',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
})

// SEO 메타데이터 - 이것이 바로 "테서랙트"의 핵심!
// 구글 검색엔진이 우리 사이트를 이해하는 "번역기" 역할
export const metadata: Metadata = {
  title: {
    default: 'CCTV 설치 전문업체 | 믿을 수 있는 보안카메라 설치',
    template: '%s | CCTV 전문업체'
  },
  description: 'CCTV 설치 전문업체입니다. 가정용, 상업용 보안카메라 설치부터 유지보수까지 원스톱 서비스를 제공합니다. 무료 견적 상담 가능.',
  keywords: [
    'CCTV 설치', 'CCTV 업체', '보안카메라', '감시카메라', 
    'IP카메라', 'DVR', 'NVR', '무선카메라', 'CCTV 유지보수'
  ],
  authors: [{ name: 'CCTV 전문업체' }],
  creator: 'CCTV 전문업체',
  publisher: 'CCTV 전문업체',
  
  // Open Graph (소셜 미디어 공유시 표시되는 정보)
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://your-domain.com',
    title: 'CCTV 설치 전문업체 | 믿을 수 있는 보안카메라 설치',
    description: 'CCTV 설치 전문업체입니다. 가정용, 상업용 보안카메라 설치부터 유지보수까지 원스톱 서비스를 제공합니다.',
    siteName: 'CCTV 전문업체',
  },
  
  // Twitter 카드 (트위터 공유시 표시)
  twitter: {
    card: 'summary_large_image',
    title: 'CCTV 설치 전문업체',
    description: 'CCTV 설치 전문업체입니다. 무료 견적 상담 가능.',
  },
  
  // 로봇 크롤링 허용 설정
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // 검증 코드들 (실제 운영시 추가)
  verification: {
    google: 'google-site-verification-code',
    // naver: 'naver-site-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className="scroll-smooth">
      <head>
        {/* 구조화된 데이터 (JSON-LD) - 구글이 우리 사이트를 더 잘 이해하게 하는 "설명서" */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'CCTV 설치 전문업체',
              description: 'CCTV 설치 및 보안카메라 전문 업체',
              url: 'https://your-domain.com',
              telephone: '+82-10-1234-5678',
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'KR',
                addressLocality: '서울시',
              },
              serviceArea: {
                '@type': 'State',
                name: '전국'
              },
              priceRange: '$$',
              openingHours: 'Mo-Fr 09:00-18:00',
              sameAs: [
                // 'https://www.facebook.com/your-page',
                // 'https://www.instagram.com/your-page'
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.className} ${playfair.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
} 