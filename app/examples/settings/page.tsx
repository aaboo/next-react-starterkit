'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/layout/Container'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { fadeInUp } from '@/lib/animations'

export default function SettingsOptimizationPage() {
  const optimizationTips = [
    {
      title: '이미지 최적화',
      description: 'Next.js Image 컴포넌트를 사용한 이미지 최적화',
      badge: 'Performance',
    },
    {
      title: '코드 스플리팅',
      description: '동적 import를 사용한 번들 크기 감소',
      badge: 'Bundle',
    },
    {
      title: '메모이제이션',
      description: 'useMemo, useCallback으로 렌더링 최적화',
      badge: 'Rendering',
    },
    {
      title: 'Lazy Loading',
      description: '필요한 시점에 컴포넌트 로드',
      badge: 'Loading',
    },
    {
      title: 'Next.js 캐싱',
      description: '정적 생성과 동적 렌더링 활용',
      badge: 'Cache',
    },
    {
      title: '웹 바이탈',
      description: 'LCP, FID, CLS 개선',
      badge: 'Metrics',
    },
  ]

  return (
    <div className="min-h-screen py-20">
      <Container>
        <motion.div initial="initial" animate="animate" variants={fadeInUp} className="space-y-12">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink href="/">HOME</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbLink href="/examples">컴포넌트</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbPage>설정 및 최적화</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* 헤더 */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">설정 및 최적화</h1>
            <p className="text-lg text-muted-foreground">
              성능 최적화 및 프로젝트 설정 가이드입니다.
            </p>
          </div>

          {/* 최적화 팁 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {optimizationTips.map((tip) => (
              <Card key={tip.title} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{tip.title}</CardTitle>
                  <CardDescription>{tip.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="outline">{tip.badge}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* 성능 측정 */}
          <Card>
            <CardHeader>
              <CardTitle>성능 측정</CardTitle>
              <CardDescription>Web Vitals 확인 방법</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="border-b pb-3">
                  <h4 className="font-semibold text-sm">Largest Contentful Paint (LCP)</h4>
                  <p className="text-sm text-muted-foreground mt-1">큰 콘텐츠 렌더링 시간 - 목표: 2.5초 이내</p>
                </div>
                <div className="border-b pb-3">
                  <h4 className="font-semibold text-sm">First Input Delay (FID)</h4>
                  <p className="text-sm text-muted-foreground mt-1">첫 상호작용 응답 시간 - 목표: 100ms 이내</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Cumulative Layout Shift (CLS)</h4>
                  <p className="text-sm text-muted-foreground mt-1">레이아웃 변화 정도 - 목표: 0.1 이내</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 추천 도구 */}
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-base">🛠️ 추천 도구</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-blue-900">
              <p>• <strong>Lighthouse</strong> - Chrome DevTools에서 제공하는 성능 감사</p>
              <p>• <strong>Web Vitals</strong> - Core Web Vitals 측정</p>
              <p>• <strong>Bundle Analyzer</strong> - 번들 크기 분석</p>
              <p>• <strong>React DevTools Profiler</strong> - 컴포넌트 성능 분석</p>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </div>
  )
}
