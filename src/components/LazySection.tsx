'use client'

import { useState, useRef, useEffect, ReactNode } from 'react'

interface LazySectionProps {
  children: ReactNode
  className?: string
  fallback?: ReactNode
  threshold?: number
  rootMargin?: string
}

export default function LazySection({
  children,
  className = '',
  fallback,
  threshold = 0.1,
  rootMargin = '50px'
}: LazySectionProps) {
  const [isInView, setIsInView] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return (
    <div ref={sectionRef} className={className}>
      {isInView ? children : (fallback || <div className="min-h-96 bg-gray-100 animate-pulse" />)}
    </div>
  )
}