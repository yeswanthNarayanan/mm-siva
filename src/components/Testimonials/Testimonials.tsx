'use client'
import { useState, useEffect } from 'react'
import { Star, CheckCircle, Quote, ChevronLeft, ChevronRight, Sparkles, MapPin } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import type { Testimonial } from '@/lib/types'
import styles from './Testimonials.module.css'

interface RealHomeStory {
  id: string
  customerName: string
  location: string
  product: string
  woodType: string
  review: string
  rating: number
  image: string
  verified: boolean
}

const REAL_HOMES: RealHomeStory[] = [
  {
    id: 'story-1',
    customerName: 'Dr. Ramesh Kumar & Sangeetha',
    location: 'Anna Nagar, Chennai',
    product: 'Royal Teak Wood 5-Seater Sofa Suite',
    woodType: 'Burma Teak (Natural Honey Finish)',
    review: 'The sheer weight and finish of the teak wood blew us away. You cannot find this quality in mainstream malls. MM Siva delivered and assembled it directly in our living room with flawless care.',
    rating: 5,
    image: '/images/lifestyle/living.png',
    verified: true
  },
  {
    id: 'story-2',
    customerName: 'Priya & Arvind Nair',
    location: 'Race Course, Coimbatore',
    product: 'Sheesham King Size Hydraulic Bed',
    woodType: 'Kiln-Dried Sheesham (Walnut Finish)',
    review: 'The hydraulic lift mechanism is effortlessly smooth. Even with a heavy 10-inch mattress, my wife can lift it with one hand. The wood grain on the headboard is breathtaking.',
    rating: 5,
    image: '/images/lifestyle/bedroom.png',
    verified: true
  },
  {
    id: 'story-3',
    customerName: 'Vijay & Meenakshi Sundaram',
    location: 'KK Nagar, Madurai',
    product: 'Handcrafted 6-Seater Banquet Dining Table',
    woodType: 'Solid Mango & Teak Blend',
    review: 'Our family dinners feel like a royal feast. The satin PU polish is completely resistant to hot sambar bowls and water rings. Truly heirloom furniture crafted with passion.',
    rating: 5,
    image: '/images/lifestyle/dining.png',
    verified: true
  }
]

export default function Testimonials() {
  const [activeStory, setActiveStory] = useState(0)

  const next = () => setActiveStory((prev) => (prev + 1) % REAL_HOMES.length)
  const prev = () => setActiveStory((prev) => (prev === 0 ? REAL_HOMES.length - 1 : prev - 1))

  const story = REAL_HOMES[activeStory]

  return (
    <section id="testimonials" className={styles.section}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header-center">
          <span className="section-label">
            <Sparkles size={13} />
            <span>Verified Customer Stories</span>
          </span>
          <h2 className="section-title">Real Homes, Real Solid Wood</h2>
          <p className="section-subtitle">
            Over 10,000+ Indian families have furnished their homes with MM Siva. 
            Here is what our patrons across Chennai, Coimbatore, and Madurai share.
          </p>
        </div>

        {/* Aggregate Trust Bar */}
        <div className={styles.trustScoreBar}>
          <div className={styles.scoreItem}>
            <div className={styles.bigScore}>4.9/5</div>
            <div className={styles.starsRow}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} fill="#F59E0B" color="#F59E0B" />
              ))}
            </div>
            <span className={styles.scoreLabel}>1,840+ Google & Store Reviews</span>
          </div>
          <div className={styles.scoreDivider} />
          <div className={styles.scoreItem}>
            <div className={styles.bigScore}>25+ Yrs</div>
            <span className={styles.scoreSubtitle}>Heritage Atelier</span>
            <span className={styles.scoreLabel}>Established in Tamil Nadu, 1998</span>
          </div>
          <div className={styles.scoreDivider} />
          <div className={styles.scoreItem}>
            <div className={styles.bigScore}>100%</div>
            <span className={styles.scoreSubtitle}>Solid Hardwood</span>
            <span className={styles.scoreLabel}>Zero Particle Board or Cheap MDF</span>
          </div>
        </div>

        {/* Feature Spotlight Review Slider */}
        <div className={styles.spotlightCard}>
          <div className={styles.spotlightImageCol}>
            <img src={story.image} alt={story.product} className={styles.spotlightImg} />
            <div className={styles.verifiedTag}>
              <CheckCircle size={14} className={styles.verifiedIcon} />
              <span>Verified Home Installation</span>
            </div>
          </div>

          <div className={styles.spotlightContentCol}>
            <div className={styles.ratingStars}>
              {[...Array(story.rating)].map((_, i) => (
                <Star key={i} size={18} fill="#F59E0B" color="#F59E0B" />
              ))}
            </div>

            <Quote size={36} className={styles.quoteIcon} />
            <p className={styles.reviewText}>"{story.review}"</p>

            <div className={styles.authorMeta}>
              <h4 className={styles.customerName}>{story.customerName}</h4>
              <div className={styles.locationRow}>
                <MapPin size={13} className={styles.locIcon} />
                <span>{story.location}</span>
              </div>
              <div className={styles.productBadge}>
                <span>Purchased: {story.product}</span>
                <span className={styles.woodBadge}>• {story.woodType}</span>
              </div>
            </div>

            {/* Slider Controls */}
            <div className={styles.sliderControls}>
              <button className={styles.controlBtn} onClick={prev} aria-label="Previous review">
                <ChevronLeft size={20} />
              </button>
              <div className={styles.dots}>
                {REAL_HOMES.map((_, i) => (
                  <button
                    key={i}
                    className={`${styles.dot} ${i === activeStory ? styles.dotActive : ''}`}
                    onClick={() => setActiveStory(i)}
                    aria-label={`Story ${i + 1}`}
                  />
                ))}
              </div>
              <button className={styles.controlBtn} onClick={next} aria-label="Next review">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
