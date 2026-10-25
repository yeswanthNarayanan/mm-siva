'use client'
import { useState } from 'react'
import { 
  TreePine, 
  ShieldCheck, 
  Hammer, 
  Sparkles, 
  Truck, 
  Award, 
  CheckCircle2, 
  ArrowRight,
  Flame,
  BadgePercent
} from 'lucide-react'
import styles from './WhyUs.module.css'

const WOOD_SPECIES = [
  {
    id: 'teak',
    name: 'Grade-A Indian & Burma Teak',
    tag: 'Heirloom Grade (50+ Years)',
    desc: 'Dense hardwood packed with natural preservation oils. Immune to termites, moisture decay, and tropical humidity.',
    features: ['Natural weather & water resistance', 'Rich golden-brown patina with age', 'Traditional mortise & tenon joinery'],
    hardness: '98% Hardness Index',
    termiteShield: 'Lifetime Termite Resistance',
  },
  {
    id: 'sheesham',
    name: 'Seasoned Indian Sheesham (Rosewood)',
    tag: 'Distinctive Dramatic Grain',
    desc: 'Renowned for dramatic dark chestnut streaks and exceptional strength. Kiln-dried under controlled humidity to prevent warping.',
    features: ['Unique natural wood swirl patterns', 'Extreme structural strength & density', 'Smooth hand-buffed satin touch'],
    hardness: '94% Hardness Index',
    termiteShield: 'Kiln-Treated & Boron Dipped',
  },
  {
    id: 'mango',
    name: 'Sustainable Mango Hardwood',
    tag: 'Eco-Luxury & Carved Art',
    desc: 'Harvested only after trees complete fruit production cycles. Highly receptive to intricate carving and warm honey stain tones.',
    features: ['100% sustainable green timber', 'Warm golden undertones', 'Resilient everyday dining performance'],
    hardness: '88% Hardness Index',
    termiteShield: 'Deep Vacuum Pressure Impregnated',
  }
]

const PILLARS = [
  {
    icon: TreePine,
    title: '100% Kiln-Dried Hardwood',
    desc: 'Every timber plank undergoes 21 days in controlled seasoning kilns, reducing internal moisture to an optimal 8-10% to eliminate future warping or seasonal cracks.',
  },
  {
    icon: Hammer,
    title: 'Heritage Mortise & Tenon Joinery',
    desc: 'No flimsy dowels or cheap staples. Our master carpenters craft traditional interlocking joints that bear hundreds of kilograms without creaking.',
  },
  {
    icon: Sparkles,
    title: '7-Stage Italian PU Hand Finishing',
    desc: 'Each surface is sanded with ultra-fine grits, sealed with polyurethane coats, and hand-rubbed for a silky smooth touch resistant to stains and hot cups.',
  },
  {
    icon: ShieldCheck,
    title: '10-Year Factory Warranty',
    desc: 'Direct manufacturer confidence. Every piece comes with a stamped certificate protecting your investment against structural manufacturing faults.',
  },
  {
    icon: BadgePercent,
    title: 'Direct Factory Advantage',
    desc: 'Zero retail distributors and no luxury showroom markups. You pay 30% to 40% less than upscale metro retail stores for superior wood grade.',
  },
  {
    icon: Truck,
    title: 'White-Glove Home Assembly',
    desc: 'Our own logistics fleet carefully unboxes, inspects, and installs your furniture right inside your desired room with zero hassle.',
  },
]

export default function WhyUs() {
  const [activeWood, setActiveWood] = useState(0)
  const currentWood = WOOD_SPECIES[activeWood]

  return (
    <section id="why-us" className={styles.section}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header-center">
          <span className="section-label">
            <Sparkles size={13} />
            <span>The Solid Wood Benchmark</span>
          </span>
          <h2 className="section-title">Why Connoisseurs Choose MM Siva</h2>
          <p className="section-subtitle">
            While mass-market stores use laminated MDF and particle board that deteriorates in humidity, 
            we handcraft exclusively with seasoned 100% genuine hardwood built to last for generations.
          </p>
        </div>

        {/* ─── Interactive Wood Species Guide ─── */}
        <div className={styles.woodGuideBox}>
          <div className={styles.woodGuideHead}>
            <div className={styles.woodBadge}>Master Material Selector</div>
            <h3 className={styles.woodGuideTitle}>Understand The Timber You Are Investing In</h3>
            <p className={styles.woodGuideSubtitle}>
              Select a wood species to inspect its natural grain properties, density rating, and suitability.
            </p>

            <div className={styles.woodTabs}>
              {WOOD_SPECIES.map((species, i) => (
                <button
                  key={species.id}
                  className={`${styles.woodTab} ${i === activeWood ? styles.woodTabActive : ''}`}
                  onClick={() => setActiveWood(i)}
                >
                  <span>{species.name.split(' (')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          <div className={styles.woodDetailsCard}>
            <div className={styles.woodCardLeft}>
              <span className={styles.woodTag}>{currentWood.tag}</span>
              <h4 className={styles.woodName}>{currentWood.name}</h4>
              <p className={styles.woodDesc}>{currentWood.desc}</p>

              <div className={styles.woodFeaturesList}>
                {currentWood.features.map((feat, idx) => (
                  <div key={idx} className={styles.woodFeatItem}>
                    <CheckCircle2 size={16} className={styles.featIcon} />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.woodCardRight}>
              <div className={styles.metricBox}>
                <span className={styles.metricVal}>{currentWood.hardness}</span>
                <span className={styles.metricLabel}>Janka Wood Density</span>
              </div>
              <div className={styles.metricBox}>
                <span className={styles.metricVal}>8–10%</span>
                <span className={styles.metricLabel}>Kiln Moisture Level</span>
              </div>
              <div className={styles.metricBox}>
                <span className={styles.metricVal}>{currentWood.termiteShield}</span>
                <span className={styles.metricLabel}>Treatment Certification</span>
              </div>
            </div>
          </div>
        </div>

        {/* ─── 6 Key Craftsmanship Pillars Grid ─── */}
        <div className={styles.pillarsGrid}>
          {PILLARS.map((p, i) => {
            const Icon = p.icon
            return (
              <div key={i} className={styles.pillarCard}>
                <div className={styles.pillarIconCircle}>
                  <Icon size={24} />
                </div>
                <h3 className={styles.pillarHeading}>{p.title}</h3>
                <p className={styles.pillarText}>{p.desc}</p>
              </div>
            )
          })}
        </div>

        {/* ─── Factory Direct Consultation Banner ─── */}
        <div className={styles.factoryBanner}>
          <div className={styles.bannerContent}>
            <span className={styles.bannerPre}>NEED BESPOKE SIZING OR FINISH?</span>
            <h3 className={styles.bannerHeading}>Bring Your Floorplans — We Build to Order</h3>
            <p className={styles.bannerText}>
              Collaborate directly with our master furniture draughtsman. We match your room dimensions, 
              preferred wood stains (Honey, Walnut, Teak), and fabric textures.
            </p>
          </div>
          <div className={styles.bannerActions}>
            <a 
              href="https://wa.me/919999999999?text=Hi MM Siva, I would like to discuss custom solid wood furniture for my home."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-lg"
            >
              <span>Chat with Wood Master</span>
              <ArrowRight size={16} />
            </a>
            <a href="tel:+919999999999" className="btn btn-dark btn-lg">
              Call Hotline
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
