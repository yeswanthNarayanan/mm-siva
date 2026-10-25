import Navbar from '@/components/Navbar/Navbar'
import Hero from '@/components/Hero/Hero'
import DealBanner from '@/components/DealBanner/DealBanner'
import CategoryShowcase from '@/components/CategoryShowcase/CategoryShowcase'
import ProductsSection from '@/components/ProductsSection/ProductsSection'
import LifestyleShowcase from '@/components/LifestyleShowcase/LifestyleShowcase'
import ShowroomLocator from '@/components/ShowroomLocator/ShowroomLocator'
import WhyUs from '@/components/WhyUs/WhyUs'
import VideoShowcase from '@/components/VideoShowcase/VideoShowcase'
import Testimonials from '@/components/Testimonials/Testimonials'
import About from '@/components/About/About'
import Contact from '@/components/Contact/Contact'
import Footer from '@/components/Footer/Footer'
import FloatingConcierge from '@/components/FloatingConcierge/FloatingConcierge'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <DealBanner />
        <CategoryShowcase />
        <ProductsSection />
        <LifestyleShowcase />
        <ShowroomLocator />
        <WhyUs />
        <VideoShowcase />
        <Testimonials />
        <About />
        <Contact />
      </main>
      <Footer />
      <FloatingConcierge />
    </>
  )
}
