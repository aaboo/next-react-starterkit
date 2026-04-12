'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/layout/Container'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { fadeInUp } from '@/lib/animations'

export default function UseHooksTsPage() {
  const hooks = [
    {
      name: 'useLocalStorage',
      description: '브라우저 로컬 스토리지 관리',
    },
    {
      name: 'useSessionStorage',
      description: '브라우저 세션 스토리지 관리',
    },
    {
      name: 'useAsync',
      description: '비동기 작업 관리',
    },
    {
      name: 'useWindowSize',
      description: '윈도우 크기 추적',
    },
    {
      name: 'useMediaQuery',
      description: '미디어 쿼리 상태 추적',
    },
    {
      name: 'usePrevious',
      description: '이전 상태값 참조',
    },
    {
      name: 'useDebounce',
      description: '디바운스 처리',
    },
    {
      name: 'useThrottle',
      description: '쓰로틀 처리',
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
              <BreadcrumbItem><BreadcrumbPage>usehooks-ts 예제</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* 헤더 */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">usehooks-ts 예제</h1>
            <p className="text-lg text-muted-foreground">
              유용한 React 커스텀 훅 라이브러리를 소개합니다.
            </p>
          </div>

          {/* 훅 목록 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {hooks.map((hook) => (
              <Card key={hook.name} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg font-mono">{hook.name}</CardTitle>
                  <CardDescription>{hook.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="outline">usehooks-ts</Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* 설명 섹션 */}
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50">
            <CardHeader>
              <CardTitle>usehooks-ts란?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                usehooks-ts는 TypeScript를 지원하는 유용한 React 커스텀 훅들의 모음입니다.
              </p>
              <p className="text-muted-foreground">
                자주 사용되는 로직들을 재사용 가능한 훅으로 제공하여 개발 생산성을 높일 수 있습니다.
              </p>
              <Button asChild>
                <a href="https://usehooks-ts.com" target="_blank" rel="noopener noreferrer">
                  공식 문서 방문
                </a>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </div>
  )
}
