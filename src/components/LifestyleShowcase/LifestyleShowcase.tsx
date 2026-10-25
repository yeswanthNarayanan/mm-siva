'use client'
import { useState } from 'react'
import { Sparkles, Eye, ArrowRight, Check, Plus } from 'lucide-react'
import styles from './LifestyleShowcase.module.css'

interface Hotspot {
  id: string
  top: string // percentage
  left: string // percentage
  title: string
  price: string
  category: string
  tag: string
}

interface RoomLook {
  id: string
  name: string
  tagline: string
  image: string
  description: string
  hotspots: Hotspot[]
}

const ROOM_LOOKS: RoomLook[] = [
  {
    id: 'living',
    name: 'The Royal Teak Living Suite',
    tagline: 'Warm amber tones, solid teak frames, and bespoke neutral fabric',
    image: '/images/lifestyle/living.png',
    description: 'A curated living arrangement featuring seasoned CP Teak with natural honey lacquer. Designed for comfort, entertaining, and generational longevity.',
    hotspots: [
      {
        id: 'hs-1',
        top: '58%',
        left: '42%',
        title: 'Royal Teak 5-Seater Sofa',
        price: '₹45,999',
        category: 'Sofa Set',
        tag: 'Bestseller'
      },
      {
        id: 'hs-2',
        top: '72%',
        left: '65%',
        title: 'Solid Carved Coffee Table',
        price: '₹14,999',
        category: 'Coffee Table',
        tag: 'Solid Wood'
      },
      {
        id: 'hs-3',
        top: '52%',
        left: '18%',
        title: 'Heritage Cane Armchair',
        price: '₹12,999',
        category: 'Accent Chair',
        tag: 'Hand-Woven'
      }
    ]
  },
  {
    id: 'bedroom',
    name: 'The Sheesham Sanctuary Bedroom',
    tagline: 'Deep walnut luster with concealed hydraulic storage',
    image: '/images/lifestyle/bedroom.png',
    description: 'Transform your master bedroom into a 5-star suite. Includes a heavy-duty hydraulic king bed and matching solid wood bedside organizers.',
    hotspots: [
      {
        id: 'hs-4',
        top: '60%',
        left: '50%',
        title: 'King Hydraulic Storage Bed',
        price: '₹38,999',
        category: 'King Bed',
        tag: '10-Yr Warranty'
      },
      {
        id: 'hs-5',
        top: '50%',
        left: '82%',
        title: 'Solid Teak 3-Door Armoire',
        price: '₹35,999',
        category: 'Wardrobe',
        tag: 'Pure Teak'
      },
      {
        id: 'hs-6',
        top: '68%',
        left: '22%',
        title: 'Walnut Dual-Drawer Nightstand',
        price: '₹6,499',
        category: 'Bedside Table',
        tag: 'Soft-Close'
      }
    ]
  },
  {
    id: 'dining',
    name: 'The Artisan Banquet Dining Room',
    tagline: 'Generous 6-seater dining table with contoured seating',
    image: '/images/lifestyle/dining.png',
    description: 'Host memorable dinners around solid timber with satin heat-resistant coating. Each chair is hand-joined with mortise and tenon joinery.',
    hotspots: [
      {
        id: 'hs-7',
        top: '64%',
        left: '48%',
        title: 'Solid Wood 6-Seater Table',
        price: '₹42,999',
        category: 'Dining Table',
        tag: 'Heat Resistant'
      },
      {
        id: 'hs-8',
        top: '45%',
        left: '26%',
        title: 'Solid Wood Crockery Cabinet',
        price: '₹26,999',
        category: 'Storage',
        tag: 'Tempered Glass'
      }
    ]
  }
]

export default function LifestyleShowcase() {
  const [activeTab, setActiveTab] = useState(0)
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null)

  const currentRoom = ROOM_LOOKS[activeTab]

  return (
    <section className={styles.section} id="lifestyle">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-center">
          <span className="section-label">
            <Sparkles size={13} />
            <span>Editorial Staging</span>
          </span>
          <h2 className="section-title">Shop The Look — Curated Room Concepts</h2>
          <p className="section-subtitle">
            See how our master artisans configure complete room suites. Click or hover on the 
            interactive pulse pins to inspect and customize individual furniture pieces.
          </p>
        </div>

        {/* Room Tab Selectors */}
        <div className={styles.roomTabs}>
          {ROOM_LOOKS.map((room, idx) => (
            <button
              key={room.id}
              className={`${styles.roomTab} ${idx === activeTab ? styles.roomTabActive : ''}`}
              onClick={() => {
                setActiveTab(idx)
                setActiveHotspot(null)
              }}
            >
              <span>{room.name}</span>
            </button>
          ))}
        </div>

        {/* Interactive Staging Stage */}
        <div className={styles.stageWrap}>
          <div className={styles.imageContainer}>
            <img 
              src={currentRoom.image} 
              alt={currentRoom.name} 
              className={styles.mainImage}
            />
            <div className={styles.imageOverlay} />

            {/* Interactive Hotspot Pins */}
            {currentRoom.hotspots.map((hs) => {
              const isOpen = activeHotspot?.id === hs.id
              return (
                <div
                  key={hs.id}
                  className={styles.pinWrapper}
                  style={{ top: hs.top, left: hs.left }}
                  onMouseEnter={() => setActiveHotspot(hs)}
                  onClick={() => setActiveHotspot(isOpen ? null : hs)}
                >
                  <button 
                    className={`${styles.pinButton} ${isOpen ? styles.pinButtonActive : ''}`}
                    aria-label={`View ${hs.title}`}
                  >
                    <Plus size={16} className={`${styles.pinIcon} ${isOpen ? styles.pinIconOpen : ''}`} />
                    <span className={styles.pulseRing} />
                  </button>

                  {/* Hotspot Floating Tooltip Card */}
                  {isOpen && (
                    <div className={styles.hotspotTooltip}>
                      <span className={styles.tooltipTag}>{hs.tag}</span>
                      <h4 className={styles.tooltipTitle}>{hs.title}</h4>
                      <div className={styles.tooltipPriceRow}>
                        <span className={styles.tooltipPrice}>{hs.price}</span>
                        <a href="#products" className={styles.tooltipLink}>
                          <span>View Item</span>
                          <ArrowRight size={12} />
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Staging Details Sidebar Card */}
          <div className={styles.stageSidebar}>
            <div className={styles.sidebarBadge}>Complete Suite Inspiration</div>
            <h3 className={styles.sidebarTitle}>{currentRoom.name}</h3>
            <p className={styles.sidebarTagline}>{currentRoom.tagline}</p>
            <p className={styles.sidebarDesc}>{currentRoom.description}</p>

            <div className={styles.itemsSummary}>
              <h5 className={styles.itemsHeading}>Included in this look:</h5>
              <div className={styles.itemsList}>
                {currentRoom.hotspots.map(hs => (
                  <div key={hs.id} className={styles.summaryItem} onClick={() => setActiveHotspot(hs)}>
                    <div className={styles.summaryLeft}>
                      <Check size={14} className={styles.checkIcon} />
                      <span className={styles.summaryName}>{hs.title}</span>
                    </div>
                    <span className={styles.summaryPrice}>{hs.price}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.sidebarCtaWrap}>
              <a href="#contact" className="btn btn-primary" style={{ width: '100%' }}>
                Get Complete Suite Consultation
              </a>
              <span className={styles.consultantSub}>
                Includes 3D room render and timber finish matching
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
