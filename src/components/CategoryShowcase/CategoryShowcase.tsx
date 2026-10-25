'use client'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import styles from './CategoryShowcase.module.css'

interface CategoryItem {
  name: string
  subtitle: string
  startingPrice: string
  discount: string
  image: string
  tag?: string
}

const CATEGORIES: CategoryItem[] = [
  { 
    name: 'Solid Wood Sofas', 
    subtitle: '3-Seater, 5-Seater & L-Shape', 
    startingPrice: 'From ₹24,999', 
    discount: 'Up to 45% Off', 
    image: '/images/categories/sofas.png',
    tag: 'Bestseller'
  },
  { 
    name: 'Beds & Bedroom', 
    subtitle: 'King, Queen & Hydraulic Storage', 
    startingPrice: 'From ₹21,999', 
    discount: 'Up to 40% Off', 
    image: '/images/categories/beds.png',
    tag: 'Trending'
  },
  { 
    name: 'Dining Sets', 
    subtitle: '4, 6 & 8-Seater Hardwood Sets', 
    startingPrice: 'From ₹28,999', 
    discount: 'Up to 50% Off', 
    image: '/images/categories/dining.png'
  },
  { 
    name: 'Solid Wood Wardrobes', 
    subtitle: '2, 3 & 4 Door Custom Closets', 
    startingPrice: 'From ₹32,999', 
    discount: 'Up to 35% Off', 
    image: '/images/categories/wardrobes.png'
  },
  { 
    name: 'Accent Chairs & Cane', 
    subtitle: 'Lounge, Wingback & Dining Chairs', 
    startingPrice: 'From ₹8,999', 
    discount: 'Up to 45% Off', 
    image: '/images/categories/chairs.png'
  },
  { 
    name: 'Study & Work Desks', 
    subtitle: 'Executive Workstations & Storage', 
    startingPrice: 'From ₹14,999', 
    discount: 'Up to 40% Off', 
    image: '/images/categories/study.png'
  },
  { 
    name: 'Storage & Bookshelves', 
    subtitle: 'Sideboards, TV Units & Cabinets', 
    startingPrice: 'From ₹11,999', 
    discount: 'Up to 38% Off', 
    image: '/images/categories/storage.png'
  },
  { 
    name: 'Home Décor & Accents', 
    subtitle: 'Carved Mirrors, Lamps & Planters', 
    startingPrice: 'From ₹2,499', 
    discount: 'Up to 55% Off', 
    image: '/images/categories/decor.png',
    tag: 'New'
  },
]

export default function CategoryShowcase() {
  return (
    <section className={styles.section} id="categories">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-center">
          <span className="section-label">
            <Sparkles size={13} />
            <span>Curated Collections</span>
          </span>
          <h2 className="section-title">Explore Furniture By Category</h2>
          <p className="section-subtitle">
            Every piece is architecturally engineered with seasoned Indian hardwoods — Sheesham, 
            Teak, and Mango — designed to elevate every corner of your home.
          </p>
        </div>

        {/* Categories Grid */}
        <div className={styles.grid}>
          {CATEGORIES.map((cat) => (
            <a 
              key={cat.name} 
              href="#products" 
              className={styles.card} 
              id={`cat-card-${cat.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
            >
              <div className={styles.imageWrap}>
                <img src={cat.image} alt={cat.name} className={styles.image} />
                <div className={styles.gradientOverlay} />
                
                {cat.tag && (
                  <span className={styles.tagBadge}>{cat.tag}</span>
                )}
                
                <span className={styles.discountBadge}>{cat.discount}</span>

                <div className={styles.hoverAction}>
                  <span>Explore Collection</span>
                  <ArrowUpRight size={15} />
                </div>
              </div>

              <div className={styles.cardInfo}>
                <div className={styles.nameRow}>
                  <h3 className={styles.catName}>{cat.name}</h3>
                  <span className={styles.priceTag}>{cat.startingPrice}</span>
                </div>
                <p className={styles.catSubtitle}>{cat.subtitle}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
