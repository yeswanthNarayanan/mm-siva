'use client'
import { useState, useEffect, useCallback } from 'react'
import { 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  TreePine, 
  Hammer, 
  Award,
  PhoneCall
} from 'lucide-react'
import styles from './Hero.module.css'

interface HeroSlide {
  image: string
  tagline: string
  heading: string
  highlightText: string
  subHeading: string
  priceTag: string
  primaryCta: string
  primaryLink: string
  secondaryCta: string
  secondaryLink: string
  badge: string
}

const HERO_SLIDES: HeroSlide[] = [
  {
    image: '/images/lifestyle/living.png',
    tagline: 'LUXURY LIVING ROOM COLLECTION',
    heading: 'Handcrafted Teak & Sheesham',
    highlightText: 'Sofa Sets',
    subHeading: 'Experience timeless craftsmanship with solid wood frames, high-density foam, and bespoke upholstery made to order.',
    priceTag: 'Solid Teak Sets from ₹32,999',
    primaryCta: 'Explore Living Collection',
    primaryLink: '#products',
    secondaryCta: 'Book Showroom Visit',
    secondaryLink: '#contact',
    badge: '★ Best Seller 2026'
  },
  {
    image: '/images/lifestyle/bedroom.png',
    tagline: 'MASTER BEDROOM SUITES',
    heading: 'Royal Solid Wood Beds with',
    highlightText: 'Hydraulic Storage',
    subHeading: 'Crafted from 100% kiln-dried Indian Sheesham. Heavy-duty hydraulic German lift mechanisms with 10-year warranty.',
    priceTag: 'King Size Beds from ₹28,999',
    primaryCta: 'View Bedroom Sets',
    primaryLink: '#products',
    secondaryCta: 'Custom Dimensions Quote',
    secondaryLink: '#contact',
    badge: '10-Year Structural Warranty'
  },
  {
    image: '/images/lifestyle/dining.png',
    tagline: 'HEIRLOOM DINING COLLECTIONS',
    heading: 'Solid Wood 6 & 8-Seater',
    highlightText: 'Dining Tables',
    subHeading: 'Bring the warmth of pure mango & teak wood to your family gatherings. Hand-planed surfaces with scratch-resistant lacquer.',
    priceTag: 'Dining Sets from ₹34,999',
    primaryCta: 'Explore Dining Tables',
    primaryLink: '#products',
    secondaryCta: 'Talk to Wood Specialist',
    secondaryLink: 'tel:+919999999999',
    badge: 'Free In-Home Assembly'
  },
  {
    image: '/hero.png',
    tagline: 'CUSTOM FURNITURE STUDIO',
    heading: 'Bespoke Furniture Crafted',
    highlightText: 'Just For Your Space',
    subHeading: 'Cant find the exact size or stain? Our 50+ master artisans build custom solid wood furniture tailored to your exact floorplan.',
    priceTag: 'Factory-Direct Pricing',
    primaryCta: 'Request Custom Order',
    primaryLink: '#contact',
    secondaryCta: 'Chat on WhatsApp',
    secondaryLink: 'https://wa.me/919999999999',
    badge: 'Direct Manufacturer'
  }
]

const VALUE_PILLARS = [
  {
    icon: TreePine,
    title: '100% Solid Seasoned Wood',
    desc: 'Grade-A Teak, Sheesham & Mango wood kiln-dried for zero warping'
  },
  {
    icon: Truck,
    title: 'Free Delivery & Assembly',
    desc: 'White-glove doorstep delivery and setup across Tamil Nadu & India'
  },
  {
    icon: ShieldCheck,
    title: '10-Year Warranty',
    desc: 'Backed by our factory structural durability certificate'
  },
  {
    icon: Hammer,
    title: 'Factory-Direct Advantage',
    desc: 'No showroom middlemen — pass 30-40% savings directly to you'
  },
  {
    icon: Award,
    title: '25+ Years of Mastery',
    desc: 'Trusted by 10,000+ homes and architects since 1998'
  }
]

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)

  const goTo = useCallback((index: number) => {
    if (animating) return
    setAnimating(true)
    setCurrent(index)
    setTimeout(() => setAnimating(false), 500)
  }, [animating])

  const next = useCallback(() => goTo((current + 1) % HERO_SLIDES.length), [current, goTo])
  const prev = useCallback(() => goTo(current === 0 ? HERO_SLIDES.length - 1 : current - 1), [current, goTo])

  useEffect(() => {
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [next])

  const slide = HERO_SLIDES[current]

  return (
    <section className={styles.heroSection} id="home">
      {/* ─── Hero Slide Viewport ─── */}
      <div className={styles.viewport}>
        {HERO_SLIDES.map((s, idx) => (
          <div
            key={idx}
            className={`${styles.slideBg} ${idx === current ? styles.slideActive : ''}`}
            style={{ backgroundImage: `url(${s.image})` }}
          />
        ))}

        {/* Editorial Vignette & Gradient Overlays */}
        <div className={styles.overlay} />

        {/* Slide Content */}
        <div className={`container ${styles.slideContainer}`}>
          <div className={styles.slideContent}>
            {/* Tagline Badge */}
            <div className={styles.badgeRow}>
              <span className={styles.editorialBadge}>
                <Sparkles size={12} className={styles.sparkleIcon} />
                <span>{slide.tagline}</span>
              </span>
              <span className={styles.metaBadge}>{slide.badge}</span>
            </div>

            {/* Headline */}
            <h1 className={styles.heading}>
              {slide.heading} <span className={styles.highlightText}>{slide.highlightText}</span>
            </h1>

            {/* Subheading */}
            <p className={styles.subHeading}>{slide.subHeading}</p>

            {/* Price Tag Pill */}
            <div className={styles.pricePill}>
              <span className={styles.priceDot} />
              <span>{slide.priceTag}</span>
              <span className={styles.emiText}>• EMI from ₹1,499/mo</span>
            </div>

            {/* Dual CTAs */}
            <div className={styles.ctaGroup}>
              <a href={slide.primaryLink} className="btn btn-primary btn-lg" id={`hero-primary-${current}`}>
                <span>{slide.primaryCta}</span>
                <ArrowRight size={17} />
              </a>
              <a href={slide.secondaryLink} className="btn btn-ghost btn-lg" id={`hero-secondary-${current}`}>
                {slide.secondaryCta}
              </a>
            </div>
          </div>
        </div>

        {/* Slide Navigation Controls */}
        <button 
          className={`${styles.navArrow} ${styles.prevArrow}`} 
          onClick={prev} 
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          className={`${styles.navArrow} ${styles.nextArrow}`} 
          onClick={next} 
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>

        {/* Dot Indicators */}
        <div className={styles.dotsWrap}>
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ─── Wooden Street Grade Value Pillars Strip ─── */}
      <div className={styles.pillarsStrip}>
        <div className={`container ${styles.pillarsInner}`}>
          {VALUE_PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon
            return (
              <div key={idx} className={styles.pillarItem}>
                <div className={styles.pillarIconWrap}>
                  <Icon size={22} className={styles.pillarIcon} />
                </div>
                <div className={styles.pillarText}>
                  <h4 className={styles.pillarTitle}>{pillar.title}</h4>
                  <p className={styles.pillarDesc}>{pillar.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
