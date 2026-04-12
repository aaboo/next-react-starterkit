'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/layout/Container'
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations'
import { Star, Sparkles } from 'lucide-react'

// 홈페이지 Hero 섹션
// 타이틀, 서브타이틀, CTA 버튼들이 스테거 애니메이션으로 진입
export function HeroSection() {
  return (
    <section className="relative py-20 sm:py-28 lg:py-36 overflow-hidden">
      {/* 배경 그래디언트 효과 */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-primary/20 via-transparent to-transparent rounded-full blur-3xl opacity-30 dark:opacity-20" />
      </div>

      <Container>
        <motion.div
          className="flex flex-col items-center gap-8 text-center lg:gap-12"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          {/* 배지 */}
          <motion.div variants={staggerItem}>
            <div className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">
                Claude Code 마스터리 · Section 13
              </span>
            </div>
          </motion.div>

          {/* 메인 타이틀 */}
          <motion.div variants={staggerItem}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="block">Claude Code로 만든</span>
              <span className="block bg-gradient-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent">
                Next.js 예제 프로젝트
              </span>
            </h1>
          </motion.div>

          {/* 서브타이틀 */}
          <motion.div variants={staggerItem} className="max-w-2xl">
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
              shadcn/ui 컴포넌트, React Hook Form, 데이터 테이블, 다크모드, 애니메이션 등
              현대적인 웹 개발에 필요한 실습 예제들을 모아놓았습니다.
              <br />
              각 기능을 직접 체험해보고 코드를 확인하세요.
            </p>
          </motion.div>

          {/* CTA 버튼들 */}
          <motion.div variants={staggerItem} className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link href="/examples">
              <Button size="lg" className="text-base">
                컴포넌트 보기
              </Button>
            </Link>
            <Link href="/examples/layout">
              <Button size="lg" variant="outline" className="text-base gap-2">
                <Star className="h-5 w-5" />
                레이아웃 예제
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
