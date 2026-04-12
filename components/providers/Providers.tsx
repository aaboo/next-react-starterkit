'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { TooltipProvider } from '@/components/ui/tooltip'

// QueryClient 인스턴스 (React Query)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5분
      gcTime: 1000 * 60 * 10, // 10분 (이전 cacheTime)
    },
  },
})

// 모든 Provider를 통합한 최상위 Providers 컴포넌트
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          {children}
          {/* sonner Toaster 전역 알림 */}
          <Toaster
            richColors
            position="bottom-right"
            expand={true}
            closeButton
          />
        </TooltipProvider>
      </QueryClientProvider>
    </NextThemesProvider>
  )
}
