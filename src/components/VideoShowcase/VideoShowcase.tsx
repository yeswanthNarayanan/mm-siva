'use client'
import { useState, useRef, useEffect } from 'react'
import { 
  ChevronLeft, 
  ChevronRight, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  X, 
  Sparkles, 
  MessageCircle, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Maximize2
} from 'lucide-react'
import styles from './VideoShowcase.module.css'

interface ReelItem {
  id: string
  videoSrc: string
  poster: string
  productTitle: string
  fullProductName: string
  editorialText?: string
  editorialSub?: string
  category: string
  woodType: string
  price: string
  mrp: string
  discount: string
  rating: number
  reviewsCount: number
}

const REELS: ReelItem[] = [
  {
    id: 'reel-1',
    videoSrc: '/videos/reel-1.mp4',
    poster: '/images/categories/chairs.png',
    productTitle: 'Shriyam Modern 6 Seater Sheesham...',
    fullProductName: 'Shriyam Modern Solid Sheesham Dining Chair Set',
    editorialText: 'Crafted with passion',
    editorialSub: 'Seasoned natural wood grain',
    category: 'Dining & Chairs',
    woodType: '100% Solid Sheesham Wood',
    price: '₹14,999',
    mrp: '₹24,999',
    discount: '40% OFF',
    rating: 4.9,
    reviewsCount: 88,
  },
  {
    id: 'reel-2',
    videoSrc: '/videos/reel-2.mp4',
    poster: '/images/lifestyle/bedroom.png',
    productTitle: 'Lotus Premium Sheesham Wood Be...',
    fullProductName: 'Lotus Premium Sheesham Wood Hydraulic Bed',
    editorialText: 'Your sanctuary of calm',
    editorialSub: 'Heirloom joinery & zero noise',
    category: 'Master Bedroom',
    woodType: 'Grade-A Sheesham Hardwood',
    price: '₹38,999',
    mrp: '₹64,999',
    discount: '40% OFF',
    rating: 4.8,
    reviewsCount: 112,
  },
  {
    id: 'reel-3',
    videoSrc: '/videos/reel-3.mp4',
    poster: '/images/lifestyle/living.png',
    productTitle: 'Shashwat 2 Seater Sheesham Wood...',
    fullProductName: 'Shashwat 2-Seater Solid Sheesham Swing & Sofa',
    editorialText: 'Slow down a little',
    editorialSub: 'The art of peaceful living',
    category: 'Living & Balcony',
    woodType: '100% Solid Teak & Sheesham',
    price: '₹28,999',
    mrp: '₹48,999',
    discount: '41% OFF',
    rating: 4.9,
    reviewsCount: 94,
  },
  {
    id: 'reel-4',
    videoSrc: '/videos/reel-4.mp4',
    poster: '/images/products/sofa.png',
    productTitle: 'Albus L-Shape 5 Seater Right Aligne...',
    fullProductName: 'Albus L-Shape 5-Seater Royal Velvet Sectional Sofa',
    editorialText: 'Up, there’s pure bliss',
    editorialSub: 'Plush high-resilience comfort',
    category: 'Living Room Suite',
    woodType: 'Solid Teak Inner Frame',
    price: '₹45,999',
    mrp: '₹79,999',
    discount: '42% OFF',
    rating: 4.9,
    reviewsCount: 146,
  },
  {
    id: 'reel-5',
    videoSrc: '/videos/reel-5.mp4',
    poster: '/images/lifestyle/dining.png',
    productTitle: 'Eldric 3 Seater Velvet Solid Wood...',
    fullProductName: 'Eldric 3-Seater Olive Velvet Sofa & Wall Console',
    editorialText: 'Artisanal elegance',
    editorialSub: 'Handcrafted in Tamil Nadu',
    category: 'Living & Dining',
    woodType: 'Kiln-Dried Mango & Teak',
    price: '₹32,999',
    mrp: '₹56,999',
    discount: '42% OFF',
    rating: 4.8,
    reviewsCount: 79,
  },
  {
    id: 'reel-6',
    videoSrc: '/videos/reel-6.mp4',
    poster: '/images/products/bed.png',
    productTitle: 'Adolph Solid Teak Storage Bed...',
    fullProductName: 'Adolph Solid Teak Wood King Bed with Drawers',
    editorialText: 'Built for generations',
    editorialSub: 'German soft-close hardware',
    category: 'Bedroom Suite',
    woodType: '100% Burma Teak Wood',
    price: '₹42,999',
    mrp: '₹69,999',
    discount: '38% OFF',
    rating: 4.9,
    reviewsCount: 104,
  },
]

export default function VideoShowcase() {
  const [activeModalReel, setActiveModalReel] = useState<ReelItem | null>(null)
  const [modalPlaying, setModalPlaying] = useState(true)
  const [modalMuted, setModalMuted] = useState(false)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const carouselRef = useRef<HTMLDivElement>(null)
  const modalVideoRef = useRef<HTMLVideoElement>(null)

  // Scroll carousel
  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 320
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  // Update arrow states on scroll
  const handleScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current
      setCanScrollLeft(scrollLeft > 10)
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10)
    }
  }

  useEffect(() => {
    const el = carouselRef.current
    if (el) {
      el.addEventListener('scroll', handleScroll, { passive: true })
      handleScroll()
      return () => el.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Auto ensure muted autoplay on cards
  useEffect(() => {
    const videos = document.querySelectorAll<HTMLVideoElement>('[data-reel-video]')
    videos.forEach(v => {
      v.muted = true
      v.play().catch(() => {
        // Autoplay policy fallback: handled gracefully
      })
    })
  }, [])

  // Modal video controls
  const toggleModalPlay = () => {
    if (modalVideoRef.current) {
      if (modalVideoRef.current.paused) {
        modalVideoRef.current.play()
        setModalPlaying(true)
      } else {
        modalVideoRef.current.pause()
        setModalPlaying(false)
      }
    }
  }

  const toggleModalMute = () => {
    if (modalVideoRef.current) {
      modalVideoRef.current.muted = !modalVideoRef.current.muted
      setModalMuted(modalVideoRef.current.muted)
    }
  }

  return (
    <section className={styles.section} id="videos">
      <div className="container">
        {/* Section Header (Matches Wooden Street "See Before You Choose") */}
        <div className={styles.headerWrap}>
          <h2 className={styles.sectionTitle}>See Before You Choose</h2>
          <p className={styles.sectionSubtitle}>
            Watch authentic video reels of our handcrafted solid wood furniture. 
            Inspect cushion firmness, wood grain reflections, and smooth hydraulic mechanisms.
          </p>
        </div>

        {/* ─── Reels Carousel Stage ─── */}
        <div className={styles.carouselContainer}>
          {/* Scroll Left Button */}
          {canScrollLeft && (
            <button 
              className={`${styles.navBtn} ${styles.navBtnLeft}`}
              onClick={() => scroll('left')}
              aria-label="Scroll left"
            >
              <ChevronLeft size={22} />
            </button>
          )}

          {/* Reel Cards Horizontal Row */}
          <div className={styles.carousel} ref={carouselRef}>
            {REELS.map((reel) => (
              <div 
                key={reel.id} 
                className={styles.reelCard}
                onClick={() => {
                  setActiveModalReel(reel)
                  setModalPlaying(true)
                  setModalMuted(false)
                }}
              >
                {/* Autoplaying Vertical Video with Poster Fallback */}
                <div className={styles.videoWrap}>
                  <video
                    data-reel-video
                    src={reel.videoSrc}
                    poster={reel.poster}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className={styles.videoElement}
                  />

                  {/* Gradient Masks */}
                  <div className={styles.topVignette} />
                  <div className={styles.bottomVignette} />

                  {/* Top Right Brand Watermark (Exact Wooden Street placement) */}
                  <div className={styles.brandWatermark}>
                    <span className={styles.watermarkMain}>MM Siva</span>
                    <span className={styles.watermarkSub}>Furniture... Bonded to be with here</span>
                  </div>

                  {/* Center / Upper Editorial Atmosphere Text */}
                  {reel.editorialText && (
                    <div className={styles.centerEditorial}>
                      <span className={styles.editorialQuote}>"{reel.editorialText}"</span>
                      {reel.editorialSub && (
                        <span className={styles.editorialSubQuote}>{reel.editorialSub}</span>
                      )}
                    </div>
                  )}

                  {/* Autoplay Pulse Bar (Instagram Story / Reel indicator) */}
                  <div className={styles.reelProgressBar}>
                    <span className={styles.progressBarFill} />
                  </div>

                  {/* Bottom Bar: Product Title & White Circle Arrow */}
                  <div className={styles.bottomBar}>
                    <span className={styles.productTitle} title={reel.fullProductName}>
                      {reel.productTitle}
                    </span>
                    <button 
                      className={styles.circleArrowBtn} 
                      aria-label={`View ${reel.fullProductName}`}
                      onClick={(e) => {
                        e.stopPropagation()
                        setActiveModalReel(reel)
                      }}
                    >
                      <ArrowRight size={14} className={styles.arrowIcon} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll Right Button (matches screenshot circle button with arrow) */}
          {canScrollRight && (
            <button 
              className={`${styles.navBtn} ${styles.navBtnRight}`}
              onClick={() => scroll('right')}
              aria-label="Scroll right"
            >
              <ChevronRight size={22} />
            </button>
          )}
        </div>
      </div>

      {/* ─── Full-Screen Reel Modal (Interactive Video Player + Buy Overlay) ─── */}
      {activeModalReel && (
        <div className={styles.modalBackdrop} onClick={() => setActiveModalReel(null)}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button 
              className={styles.closeBtn} 
              onClick={() => setActiveModalReel(null)}
              aria-label="Close video"
            >
              <X size={20} />
            </button>

            {/* Video Stage */}
            <div className={styles.modalVideoStage} onClick={toggleModalPlay}>
              <video
                ref={modalVideoRef}
                src={activeModalReel.videoSrc}
                poster={activeModalReel.poster}
                autoPlay
                loop
                muted={modalMuted}
                playsInline
                className={styles.modalVideo}
              />

              {/* Pause/Play Center Overlay Icon */}
              {!modalPlaying && (
                <div className={styles.playCenterIcon}>
                  <Play size={44} fill="#FFFFFF" color="#FFFFFF" style={{ marginLeft: 4 }} />
                </div>
              )}

              {/* Top Video Header in Modal */}
              <div className={styles.modalTopControls}>
                <div className={styles.modalBrand}>
                  <strong>MM Siva Furniture</strong>
                  <span>Authentic Solid Wood Reel</span>
                </div>
                <button 
                  className={styles.muteBtn}
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleModalMute()
                  }}
                  aria-label={modalMuted ? 'Unmute' : 'Mute'}
                >
                  {modalMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
              </div>
            </div>

            {/* Product Details Drawer on Side/Bottom */}
            <div className={styles.modalDrawer}>
              <div className={styles.drawerHead}>
                <span className={styles.drawerCategory}>{activeModalReel.category}</span>
                <h3 className={styles.drawerTitle}>{activeModalReel.fullProductName}</h3>
                <span className={styles.drawerWoodTag}>
                  <ShieldCheck size={14} />
                  <span>{activeModalReel.woodType}</span>
                </span>
              </div>

              <div className={styles.drawerPriceRow}>
                <span className={styles.drawerPrice}>{activeModalReel.price}</span>
                <span className={styles.drawerMrp}>{activeModalReel.mrp}</span>
                <span className={styles.drawerDiscount}>{activeModalReel.discount}</span>
              </div>

              <p className={styles.drawerNote}>
                ⚡ Handcrafted in solid timber with 10-Year structural durability warranty and free white-glove assembly across Tamil Nadu.
              </p>

              <div className={styles.drawerActions}>
                <a
                  href={`https://wa.me/919999999999?text=Hi MM Siva, I watched your video reel for "${encodeURIComponent(activeModalReel.fullProductName)}" and would like to order / get best discount.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.waOrderBtn}
                >
                  <MessageCircle size={18} />
                  <span>Order on WhatsApp</span>
                </a>
                <a 
                  href="#products" 
                  className={styles.specsBtn}
                  onClick={() => setActiveModalReel(null)}
                >
                  <span>Explore Catalog</span>
                  <ArrowRight size={15} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
