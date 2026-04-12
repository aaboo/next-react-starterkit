'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Container } from '@/components/layout/Container'
import { useAnimateOnView } from '@/hooks/useAnimateOnView'
import { staggerContainer, staggerItem } from '@/lib/animations'
import { exampleNavItems } from '@/lib/nav-config'
import {
  Box,
  FileText,
  LayoutDashboard,
  LayoutTemplate,
  Zap,
  Settings,
  Database,
} from 'lucide-react'

// 예제별 아이콘 매핑
const iconMap: { [key: string]: React.ReactNode } = {
  '컴포넌트 쇼케이스': <Box className="h-6 w-6" />,
  '폼 예제': <FileText className="h-6 w-6" />,
  '레이아웃 예제': <LayoutTemplate className="h-6 w-6" />,
  '데이터그리드 예제': <Database className="h-6 w-6" />,
  'usehooks-ts 예제': <Zap className="h-6 w-6" />,
  '데이터 페칭': <LayoutDashboard className="h-6 w-6" />,
  '설정 및 최적화': <Settings className="h-6 w-6" />,
}

// 예제별 태그
const categoryTags: { [key: string]: string[] } = {
  '컴포넌트 쇼케이스': ['shadcn/ui', 'UI'],
  '폼 예제': ['React Hook Form', 'Zod'],
  '레이아웃 예제': ['CSS', 'Layout'],
  '데이터그리드 예제': ['Table', 'Data'],
  'usehooks-ts 예제': ['Hooks', 'React'],
  '데이터 페칭': ['API', 'Data'],
  '설정 및 최적화': ['Performance', 'Best Practices'],
}

// 예제 인덱스 페이지
export default function ExamplesPage() {
  const { ref, isInView } = useAnimateOnView()

  return (
    <main className="flex-1">
      <section className="py-12 border-b">
        <Container>
          {/* Breadcrumb */}
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">홈</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>컴포넌트</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* 페이지 헤더 */}
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              컴포넌트 모음
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              이 프로젝트의 다양한 기능과 패턴들을 직접 체험해보세요.
              각 예제에서는 실제 코드와 함께 특정 기능을 설명합니다.
            </p>
          </div>
        </Container>
      </section>

      <section ref={ref} className="py-12 sm:py-16 lg:py-20">
        <Container>
          {/* 예제 카드 그리드 */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="initial"
            animate={isInView ? 'animate' : 'initial'}
            variants={staggerContainer}
          >
            {exampleNavItems.map((item, index) => (
              <motion.div key={index} variants={staggerItem}>
                <Card className="h-full flex flex-col hover:border-primary/50 transition-colors hover:shadow-lg">
                  <CardHeader>
                    <div className="mb-4 inline-flex rounded-lg bg-accent p-3 text-primary">
                      {iconMap[item.label] || <Box className="h-6 w-6" />}
                    </div>
                    <CardTitle className="line-clamp-2">{item.label}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <CardDescription className="text-base mb-4 flex-1">
                      {item.description}
                    </CardDescription>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {categoryTags[item.label]?.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Link href={item.href} className="w-full">
                      <Button className="w-full">
                        예제 보기
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>
    </main>
  )
}
