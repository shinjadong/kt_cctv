// Vercel Blob Storage 이미지 URL 매핑
const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || '';

// Vercel Blob Storage에서 사용하는 전체 URL 매핑
const VERCEL_IMAGE_URLS = {
  'kt-telecop_CI_logo.png': 'kt-telecop_CI_logo-e9M3nHKIVihGnhUpofYh41BClqyLWJ.png',
  'seoul-night.jpg': 'seoul-night-jN1U9L5TTkxvMAamSqEK4PJfpySY0X.jpg',
  'video_1.gif': 'video_1-o0bJcqs2RPtGGLbDnJHbx2SCyGpi73.gif',
  'video_2.gif': 'video_2-ZZ0WOaRWWZkvgMjPz7pe1ZvOZYNIKS.gif',
  'video_3.gif': 'video_3-l5KkGYJdIMooMmUF09R8IGr7mvw8pF.gif',
  'video_4.gif': 'video_4-rTuyQvTIoCi6rgpVV7Nj7QYNmOjriW.gif'
};

export const getImageUrl = (imageName: string, useLocal = false): string => {
  // 로컬 이미지 사용 시
  if (useLocal || !IMAGE_BASE_URL) {
    return `/images/${imageName}`;
  }
  
  // Vercel Blob Storage URL 사용
  const vercelFileName = VERCEL_IMAGE_URLS[imageName as keyof typeof VERCEL_IMAGE_URLS];
  if (vercelFileName) {
    return `${IMAGE_BASE_URL}/${vercelFileName}`;
  }
  
  // 매핑이 없으면 로컬 이미지 사용
  return `/images/${imageName}`;
};

// 특정 이미지별 설정
export const imageConfig = {
  // 로고도 Vercel Blob Storage 사용 (최적화된 CDN)
  logo: {
    src: getImageUrl('kt-telecop_CI_logo.png'),
    local: false
  },
  
  // 대용량 배경 이미지는 Vercel Blob Storage 사용
  seoulNight: {
    src: getImageUrl('seoul-night.jpg'),
    local: false
  },
  
  // GIF 파일들은 Vercel Blob Storage 사용 (대용량, CDN 최적화)
  videos: {
    video1: {
      src: getImageUrl('video_1.gif'),
      local: false
    },
    video2: {
      src: getImageUrl('video_2.gif'),
      local: false
    },
    video3: {
      src: getImageUrl('video_3.gif'),
      local: false
    },
    video4: {
      src: getImageUrl('video_4.gif'),
      local: false
    }
  }
};