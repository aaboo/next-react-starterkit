'use client'

import { useEffect, useState } from 'react'

// 스크롤 위치가 threshold 이상이면 true 반환
// 헤더의 배경 blur 강도 제어에 사용
export function useScrolled(threshold = 10): boolean {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  return isScrolled
}
