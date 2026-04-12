'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Container } from '@/components/layout/Container'
import { useAnimateOnView } from '@/hooks/useAnimateOnView'
import { staggerContainer, staggerItem } from '@/lib/animations'
import {
  Zap,
  Shield,
  Smartphone,
  Palette,
  Layers,
  Rocket
} from 'lucide-react'

interface Feature {
  icon: React.ReactNode
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: <Zap className="h-6 w-6" />,
    title: 'Next.js 16 + App Router',
    description: '최신 Next.js App Router를 활용한 현대적인 웹 개발과 SEO 최적화.',
  },
  {
    icon: <Layers className="h-6 w-6" />,
    title: 'shadcn/ui 컴포넌트',
    description: '재사용 가능한 고퀄리티 UI 컴포넌트 라이브러리로 빠른 개발.',
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: 'React Hook Form + Zod',
    description: '강력한 폼 관리와 타입 안전한 유효성 검사 솔루션.',
  },
  {
    icon: <Palette className="h-6 w-6" />,
    title: 'Tailwind CSS & 다크모드',
    description: 'Tailwind CSS로 빠른 스타일링, next-themes로 다크모드 자동 지원.',
  },
  {
    icon: <Smartphone className="h-6 w-6" />,
    title: '데이터 테이블 & 필터링',
    description: 'TanStack Query와 함께 강력한 데이터 그리드 구현 예제.',
  },
  {
    icon: <Rocket className="h-6 w-6" />,
    title: 'Framer Motion 애니메이션',
    description: '부드럽고 자연스러운 인터랙션과 페이지 전환 애니메이션.',
  },
]

// Feature 섹션 - 스크롤 진입 시 카드 stagger 애니메이션
export function FeatureSection() {
  const { ref, isInView } = useAnimateOnView()

  return (
    <section ref={ref} className="py-20 sm:py-28 lg:py-36">
      <Container>
        {/* 섹션 제목 */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            기술 스택
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            이 프로젝트에서 다루는 핵심 기술들입니다.
          </p>
        </div>

        {/* Feature 카드 그리드 */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="initial"
          animate={isInView ? 'animate' : 'initial'}
          variants={staggerContainer}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={staggerItem}>
              <Card className="h-full hover:border-primary/50 transition-colors hover:shadow-lg">
                <CardHeader>
                  <div className="mb-4 inline-flex rounded-lg bg-accent p-3 text-primary">
                    {feature.icon}
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
