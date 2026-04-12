'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/layout/Container'
import { useAnimateOnView } from '@/hooks/useAnimateOnView'
import { staggerContainer, staggerItem } from '@/lib/animations'
import { Counter } from '@/components/Counter'

interface Stat {
  value: number
  label: string
  suffix?: string
}

const stats: Stat[] = [
  { value: 50, label: '컴포넌트', suffix: '+' },
  { value: 100, label: '코드 예제', suffix: '+' },
  { value: 15, label: '기술스택' },
  { value: 99.9, label: 'LightHouse 점수', suffix: '%' },
]

// Stats 섹션 - 숫자 카운트 업 애니메이션
export function StatsSection() {
  const { ref, isInView } = useAnimateOnView()

  return (
    <section ref={ref} className="py-20 sm:py-28 lg:py-36 bg-accent/30">
      <Container>
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
          initial="initial"
          animate={isInView ? 'animate' : 'initial'}
          variants={staggerContainer}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className="flex flex-col items-center gap-2 text-center"
            >
              {/* 숫자 카운트 업 */}
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                {isInView ? (
                  <Counter value={stat.value} />
                ) : (
                  '0'
                )}
                <span className="text-2xl sm:text-3xl text-primary">
                  {stat.suffix}
                </span>
              </div>

              {/* 라벨 */}
              <p className="text-sm sm:text-base text-muted-foreground font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
