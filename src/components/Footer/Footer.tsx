'use client'
import { useState } from 'react'
import Link from 'next/link'
import { 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Truck, 
  TreePine, 
  Clock, 
  ArrowRight, 
  Check, 
  Heart
} from 'lucide-react'
import styles from './Footer.module.css'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const currentYear = new Date().getFullYear()

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
    }
  }

  return (
    <footer className={styles.footer}>
      {/* ─── Top Trust Guarantee Strip ─── */}
      <div className={styles.trustStrip}>
        <div className={`container ${styles.trustInner}`}>
          <div className={styles.trustItem}>
            <TreePine size={22} className={styles.trustIcon} />
            <div>
              <h5 className={styles.trustTitle}>100% Solid Seasoned Wood</h5>
              <p className={styles.trustDesc}>Zero particle board, plywood or MDF</p>
            </div>
          </div>

          <div className={styles.trustItem}>
            <ShieldCheck size={22} className={styles.trustIcon} />
            <div>
              <h5 className={styles.trustTitle}>10-Year Structural Warranty</h5>
              <p className={styles.trustDesc}>Factory certified durability guarantee</p>
            </div>
          </div>

          <div className={styles.trustItem}>
            <Truck size={22} className={styles.trustIcon} />
            <div>
              <h5 className={styles.trustTitle}>Free Delivery & Assembly</h5>
              <p className={styles.trustDesc}>White-glove room setup by our technicians</p>
            </div>
          </div>

          <div className={styles.trustItem}>
            <Clock size={22} className={styles.trustIcon} />
            <div>
              <h5 className={styles.trustTitle}>Direct Workshop Pricing</h5>
              <p className={styles.trustDesc}>Save 30-40% compared to luxury retail</p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Main Footer Content ─── */}
      <div className={`container ${styles.mainFooter}`}>
        <div className={styles.footerGrid}>
          {/* Brand Column */}
          <div className={styles.brandCol}>
            <Link href="/" className={styles.logo}>
              <span className={styles.logoWood}>🪵</span>
              <div className={styles.logoText}>
                <span className={styles.logoName}>MM SIVA</span>
                <span className={styles.logoTagline}>FINE SOLID WOOD FURNITURE</span>
              </div>
            </Link>

            <p className={styles.brandDesc}>
              Tamil Nadu’s premier solid hardwood atelier since 1998. Handcrafting bespoke living, 
              bedroom, and dining furniture from seasoned Teak, Sheesham, and Mango wood.
            </p>

            <div className={styles.brandContact}>
              <div className={styles.contactRow}>
                <MapPin size={16} className={styles.contactIcon} />
                <span>142, GST Road, Guindy, Chennai 600032</span>
              </div>
              <div className={styles.contactRow}>
                <Phone size={16} className={styles.contactIcon} />
                <a href="tel:+919999999999">+91 99999 99999 / +91 99999 99990</a>
              </div>
              <div className={styles.contactRow}>
                <Mail size={16} className={styles.contactIcon} />
                <a href="mailto:concierge@mmsiva.com">concierge@mmsiva.com</a>
              </div>
            </div>

            <div className={styles.socialRow}>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="Instagram">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="Facebook">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="YouTube">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><polygon points="10 15 15 12 10 9 10 15"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Living & Lounge</h4>
            <ul className={styles.linkList}>
              <li><a href="#products">Solid Teak 3-Seater Sofas</a></li>
              <li><a href="#products">5-Seater Living Room Sets</a></li>
              <li><a href="#products">L-Shaped Sectional Sofas</a></li>
              <li><a href="#products">Carved Solid Wood Coffee Tables</a></li>
              <li><a href="#products">Contemporary TV Consoles</a></li>
              <li><a href="#products">Heritage Cane Armchairs</a></li>
              <li><a href="#products">Display Cabinets & Bookshelves</a></li>
            </ul>
          </div>

          {/* Bedroom & Dining Column */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Bedroom & Dining</h4>
            <ul className={styles.linkList}>
              <li><a href="#products">King Size Hydraulic Beds</a></li>
              <li><a href="#products">Queen Size Solid Wood Beds</a></li>
              <li><a href="#products">3 & 4 Door Teak Wardrobes</a></li>
              <li><a href="#products">Dressing Tables with Mirror</a></li>
              <li><a href="#products">6-Seater Solid Wood Dining Sets</a></li>
              <li><a href="#products">4-Seater Compact Dining</a></li>
              <li><a href="#products">Crockery Units & Bar Cabinets</a></li>
            </ul>
          </div>

          {/* Experience Stores & Support */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Experience Studios</h4>
            <ul className={styles.linkList}>
              <li><a href="#showroom">Chennai Central Studio (Guindy)</a></li>
              <li><a href="#showroom">OMR IT Corridor (Perungudi)</a></li>
              <li><a href="#showroom">Coimbatore Studio (Avinashi Rd)</a></li>
              <li><a href="#showroom">Madurai Atelier (Bypass Rd)</a></li>
              <li><a href="#why-us">The Solid Wood Difference</a></li>
              <li><a href="#about">Heritage Story (Since 1998)</a></li>
              <li><a href="#contact">Custom Sizing Consultation</a></li>
            </ul>
          </div>

          {/* Newsletter / Discount Column */}
          <div className={styles.newsletterCol}>
            <h4 className={styles.colTitle}>Join Our Connoisseur Club</h4>
            <p className={styles.newsletterSub}>
              Subscribe to receive preview invites for private woodcraft auctions and an instant ₹1,500 voucher.
            </p>

            {subscribed ? (
              <div className={styles.subSuccess}>
                <Check size={16} />
                <span>Coupon code <strong>WELCOME1500</strong> sent to your inbox!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className={styles.newsForm}>
                <input 
                  type="email" 
                  required 
                  placeholder="Enter your email address" 
                  className={styles.newsInput}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" className={styles.newsSubmit} aria-label="Subscribe">
                  <ArrowRight size={16} />
                </button>
              </form>
            )}

            <div className={styles.storeHoursBox}>
              <span className={styles.hoursTitle}>Studio Hours:</span>
              <p>Mon – Sun: 10:00 AM – 8:30 PM</p>
              <p className={styles.holidayNote}>Open on all public holidays</p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Bottom Copyright & Admin Strip ─── */}
      <div className={styles.bottomBar}>
        <div className={`container ${styles.bottomInner}`}>
          <p className={styles.copyright}>
            © {currentYear} MM Siva Furniture & Interiors Pvt. Ltd. All rights reserved. Handcrafted in Tamil Nadu, India.
          </p>

          <div className={styles.bottomLinks}>
            <a href="#about">Privacy Policy</a>
            <span>•</span>
            <a href="#why-us">Warranty Terms</a>
            <span>•</span>
            <a href="#contact">Shipping & Returns</a>
            <span>•</span>
            <Link href="/admin" className={styles.adminLink}>
              Atelier Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
