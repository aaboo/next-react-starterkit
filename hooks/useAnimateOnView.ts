'use client'

import { useRef, useEffect, useState } from 'react'

// IntersectionObserver를 사용한 스크롤 진입 감지 훅
// ref와 isInView를 반환하여 Framer Motion 애니메이션 트리거에 사용
export function useAnimateOnView(options?: IntersectionObserverInit): {
  ref: React.RefObject<HTMLDivElement | null>
  isInView: boolean
} {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true)
        // 한 번 트리거된 후 관찰 해제 (성능 최적화)
        observer.unobserve(entry.target)
      }
    }, {
      threshold: 0.1,
      ...options,
    })

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [options])

  return { ref, isInView }
}
