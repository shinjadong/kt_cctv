/** @type {import('next').NextConfig} */
const nextConfig = {
  // SEO 최적화: 정적 사이트 생성 활성화 (검색엔진이 더 쉽게 크롤링)
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  
  // 성능 최적화: 번들 사이즈 분석 및 최적화
  experimental: {
    optimizeCss: true
  },
  
  // 보안 헤더 설정 (구글이 선호하는 HTTPS 보안)
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig 