'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/layout/Container'
import { useAnimateOnView } from '@/hooks/useAnimateOnView'
import { scaleIn } from '@/lib/animations'
import { ArrowRight } from 'lucide-react'

// CTA (Call To Action) 섹션 - 사용자 행동 유도
// 스크롤 진입 시 scaleIn 애니메이션
export function CTASection() {
  const { ref, isInView } = useAnimateOnView()

  return (
    <section ref={ref} className="py-20 sm:py-28 lg:py-36">
      <Container>
        <motion.div
          className="relative rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 p-8 sm:p-12 lg:p-16"
          initial="initial"
          animate={isInView ? 'animate' : 'initial'}
          variants={scaleIn}
        >
          {/* 배경 효과 */}
          <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-transparent" />

          <div className="flex flex-col items-center gap-8 text-center">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                지금 시작하세요
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl">
                스타터킷으로 당신의 다음 프로젝트를 빠르게 시작하세요.
                <br />
                모든 것이 준비되어 있습니다.
              </p>
            </div>

            <Link href="/examples">
              <Button asChild size="lg" className="text-base gap-2">
                <span>
                  프로젝트 시작하기
                  <ArrowRight className="h-5 w-5" />
                </span>
              </Button>
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
