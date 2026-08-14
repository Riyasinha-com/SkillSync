import { Hero } from '@/components/landing/Hero'
import { FeatureGrid } from '@/components/landing/FeatureGrid'
import { TrustSection } from '@/components/landing/TrustSection'
import { FinalCTA } from '@/components/landing/FinalCTA'

export default function LandingPage() {
  return (
    <div className="relative z-10">
      <Hero />
      <FeatureGrid />
      <TrustSection />
      <FinalCTA />
    </div>
  )
}
