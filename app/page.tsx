import { HeroSection } from '@/components/sections/HeroSection'
import { FeatureSection } from '@/components/sections/FeatureSection'
import { StatsSection } from '@/components/sections/StatsSection'

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero 섹션 */}
      <HeroSection />

      {/* Feature 섹션 */}
      <FeatureSection />

      {/* Stats 섹션 */}
      <StatsSection />
    </div>
  )
}
