'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

interface LazyImageWrapperProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  priority?: boolean
  fill?: boolean
  sizes?: string
  unoptimized?: boolean
}

export default function LazyImageWrapper({
  src,
  alt,
  width,
  height,
  className = '',
  placeholder = 'blur',
  blurDataURL,
  priority = false,
  fill = false,
  sizes,
  unoptimized = false
}: LazyImageWrapperProps) {
  const [isInView, setIsInView] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (priority) {
      setIsInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '50px'
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [priority])

  const defaultBlurDataURL = blurDataURL || 
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNmNWY1ZjQiLz48L3N2Zz4K"

  return (
    <div ref={imgRef} className={`relative ${className}`}>
      {isInView ? (
        <Image
          src={src}
          alt={alt}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          fill={fill}
          className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          placeholder={placeholder}
          blurDataURL={defaultBlurDataURL}
          priority={priority}
          loading={priority ? 'eager' : 'lazy'}
          sizes={sizes}
          unoptimized={unoptimized}
          onLoad={() => setIsLoaded(true)}
          quality={85}
        />
      ) : (
        <div 
          className={`w-full h-full bg-gray-200 animate-pulse ${fill ? 'absolute inset-0' : ''}`}
          style={!fill ? { width, height } : undefined}
        />
      )}
    </div>
  )
}