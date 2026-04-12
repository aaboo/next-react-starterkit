import React from 'react'

interface ContainerProps {
  children: React.ReactNode
  className?: string
}

// max-width 래퍼 유틸리티
// 모든 섹션에서 재사용하여 일관된 padding과 width 유지
export function Container({ children, className = '' }: ContainerProps) {
  return (
    <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  )
}
