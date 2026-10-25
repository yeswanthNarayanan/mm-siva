'use client'
import { useState } from 'react'
import { 
  MapPin, 
  Phone, 
  Clock, 
  Calendar, 
  Navigation, 
  CheckCircle2, 
  Sparkles,
  ArrowRight
} from 'lucide-react'
import styles from './ShowroomLocator.module.css'

interface Store {
  id: string
  name: string
  city: string
  address: string
  phone: string
  timing: string
  displaySize: string
  perks: string[]
  mapUrl: string
}

const STORES: Store[] = [
  {
    id: 'chennai-central',
    name: 'Chennai Central Flagship Studio',
    city: 'Chennai',
    address: '142, Grand Southern Trunk Road, Guindy / Anna Nagar, Chennai 600032',
    phone: '+91 99999 99991',
    timing: '10:00 AM – 8:30 PM (All 7 Days)',
    displaySize: '12,000 Sq. Ft. Live Gallery',
    perks: ['Complete Living, Bed & Dining Displays', 'Live Wood Grain & Swatch Library', 'Complimentary 3D Room Visualizer'],
    mapUrl: 'https://maps.google.com/?q=Chennai+Furniture+Store'
  },
  {
    id: 'chennai-omr',
    name: 'OMR IT Corridor Experience Center',
    city: 'Chennai',
    address: 'Plot 48, Rajiv Gandhi Salai (OMR), Perungudi, Chennai 600096',
    phone: '+91 99999 99992',
    timing: '10:30 AM – 9:00 PM (All 7 Days)',
    displaySize: '8,500 Sq. Ft. Studio',
    perks: ['Modern Apartment & Workstation Sets', 'Dedicated Customization Desk', 'Architect & Interior Designer Lounge'],
    mapUrl: 'https://maps.google.com/?q=OMR+Chennai+Furniture'
  },
  {
    id: 'coimbatore',
    name: 'Coimbatore Heritage Studio',
    city: 'Coimbatore',
    address: '78, Avinashi Road, Near Hope College, Peelamedu, Coimbatore 641004',
    phone: '+91 99999 99993',
    timing: '10:00 AM – 8:00 PM (Mon - Sun)',
    displaySize: '10,000 Sq. Ft. Gallery',
    perks: ['Heirloom Teak Carved Collections', 'Full-Scale Hydraulic Storage Beds', 'Direct Factory Price Assistance'],
    mapUrl: 'https://maps.google.com/?q=Coimbatore+Furniture+Store'
  },
  {
    id: 'madurai',
    name: 'Madurai Traditional Wood Atelier',
    city: 'Madurai',
    address: '25, Bypass Road, Ponmeni, Madurai 625016',
    phone: '+91 99999 99994',
    timing: '10:00 AM – 8:00 PM (All 7 Days)',
    displaySize: '7,000 Sq. Ft. Showroom',
    perks: ['Traditional Chettinad & Teak Sofas', 'Custom Pooja & Temple Units', 'Free On-Site Home Measurement'],
    mapUrl: 'https://maps.google.com/?q=Madurai+Furniture'
  }
]

export default function ShowroomLocator() {
  const [activeStoreIdx, setActiveStoreIdx] = useState(0)
  const store = STORES[activeStoreIdx]

  return (
    <section className={styles.section} id="showroom">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-center">
          <span className="section-label">
            <Sparkles size={13} />
            <span>Omnichannel Experience</span>
          </span>
          <h2 className="section-title">Touch, Feel & Experience Solid Wood</h2>
          <p className="section-subtitle">
            Visit our flagship experience studios across Tamil Nadu. Inspect timber thickness, 
            test cushion firmness, and consult with our master wood craftsmen in person.
          </p>
        </div>

        {/* City Filter Tabs */}
        <div className={styles.storeTabs}>
          {STORES.map((s, idx) => (
            <button
              key={s.id}
              className={`${styles.storeTab} ${idx === activeStoreIdx ? styles.storeTabActive : ''}`}
              onClick={() => setActiveStoreIdx(idx)}
            >
              <MapPin size={15} />
              <span>{s.name}</span>
            </button>
          ))}
        </div>

        {/* Store Detail Showcase Card */}
        <div className={styles.storeCard}>
          <div className={styles.cardLeft}>
            <div className={styles.storeBadgeRow}>
              <span className={styles.cityBadge}>{store.city}</span>
              <span className={styles.sizeBadge}>{store.displaySize}</span>
            </div>

            <h3 className={styles.storeTitle}>{store.name}</h3>
            
            <div className={styles.infoList}>
              <div className={styles.infoItem}>
                <MapPin size={18} className={styles.infoIcon} />
                <span>{store.address}</span>
              </div>
              <div className={styles.infoItem}>
                <Clock size={18} className={styles.infoIcon} />
                <span>{store.timing}</span>
              </div>
              <div className={styles.infoItem}>
                <Phone size={18} className={styles.infoIcon} />
                <span>{store.phone} (Showroom Concierge)</span>
              </div>
            </div>

            <div className={styles.perksBox}>
              <h5 className={styles.perksTitle}>What to expect at this location:</h5>
              <div className={styles.perksList}>
                {store.perks.map((perk, i) => (
                  <div key={i} className={styles.perkItem}>
                    <CheckCircle2 size={15} className={styles.checkIcon} />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.actionRow}>
              <a href="#contact" className="btn btn-primary btn-lg">
                <Calendar size={16} />
                <span>Book Store Appointment</span>
              </a>
              <a 
                href={store.mapUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-outline btn-lg"
              >
                <Navigation size={16} />
                <span>Get Directions</span>
              </a>
            </div>
          </div>

          <div className={styles.cardRight}>
            <div className={styles.showcaseVisual}>
              <img 
                src="/images/lifestyle/living.png" 
                alt={store.name} 
                className={styles.visualImg} 
              />
              <div className={styles.visualOverlay}>
                <div className={styles.visualTag}>
                  <span>Live Experience Center</span>
                </div>
                <p className={styles.visualNote}>
                  Over 150+ fully staged living room, bedroom and dining designs ready for immediate inspection.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
