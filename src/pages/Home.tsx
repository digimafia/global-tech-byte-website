import { usePageMeta } from '../hooks/usePageMeta'
import { Hero } from '../components/sections/Hero'
import { Services } from '../components/sections/Services'
import { Process } from '../components/sections/Process'
import { ProductShowcase } from '../components/sections/ProductShowcase'
import { WorkPreview } from '../components/sections/WorkPreview'
import { CTABanner } from '../components/sections/CTABanner'
import { Highlights } from '../components/sections/Highlights'
import { WhyUs } from '../components/sections/WhyUs'
import { JoinTeam } from '../components/sections/JoinTeam'

export function Home() {
  usePageMeta({
    title: 'Global Tech Byte | Custom Software & Web Development',
    description:
      'Global Tech Byte develops custom web applications, React frontends and .NET software solutions. Turn your business idea into a powerful digital product.',
    path: '/',
    brandFirst: true,
  })

  return (
    <>
      <Hero />
      <Services />
      <Process />
      <ProductShowcase />
      <WorkPreview />
      <CTABanner />
      <Highlights />
      <WhyUs />
      <JoinTeam />
    </>
  )
}
