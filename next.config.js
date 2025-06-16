/** @type {import('next').NextConfig} */
const nextConfig = {
  // SEO 최적화: Vercel 배포 최적화 설정
  trailingSlash: true,
  images: {
    domains: ['fonts.gstatic.com', 'fonts.googleapis.com'],
    formats: ['image/webp', 'image/avif']
  },
  
  // 성능 최적화: CSS 및 폰트 최적화 비활성화 (Vercel 호환성)
  experimental: {
    // optimizeCss: true 주석 처리 (Vercel 배포 이슈)
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