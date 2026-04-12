'use client'

import { useEffect, useState } from 'react'

interface CounterProps {
  value: number
  duration?: number
  decimals?: number
}

// 숫자를 천천히 증가시키는 카운터 컴포넌트
// Stats 섹션의 숫자 애니메이션에 사용
export function Counter({
  value,
  duration = 2000,
  decimals = 0,
}: CounterProps) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationId: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      const currentValue = value * progress
      setDisplayValue(
        decimals > 0
          ? Math.round(currentValue * Math.pow(10, decimals)) /
              Math.pow(10, decimals)
          : Math.round(currentValue)
      )

      if (progress < 1) {
        animationId = requestAnimationFrame(animate)
      }
    }

    animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [value, duration, decimals])

  return <span>{displayValue}</span>
}
