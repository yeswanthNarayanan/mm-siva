'use client'
import { useState, useEffect } from 'react'
import { 
  MessageCircle, 
  Phone, 
  X, 
  ArrowUp, 
  ChevronRight, 
  Store, 
  Ruler, 
  Clock
} from 'lucide-react'
import styles from './FloatingConcierge.module.css'

export default function FloatingConcierge() {
  const [isOpen, setIsOpen] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [showBubble, setShowBubble] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBubble(false)
    }, 12000)
    return () => clearTimeout(timer)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className={styles.conciergeWrap}>
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button 
          className={styles.scrollTopBtn} 
          onClick={scrollToTop}
          aria-label="Scroll to top"
          title="Back to top"
        >
          <ArrowUp size={18} />
        </button>
      )}

      {/* Floating Notification Speech Bubble */}
      {showBubble && !isOpen && (
        <div className={styles.speechBubble} onClick={() => setIsOpen(true)}>
          <button 
            className={styles.bubbleClose} 
            onClick={(e) => {
              e.stopPropagation()
              setShowBubble(false)
            }}
            aria-label="Close notification"
          >
            <X size={12} />
          </button>
          <div className={styles.bubbleIcon}>
            <MessageCircle size={15} />
          </div>
          <div className={styles.bubbleText}>
            <strong>Need wood advice?</strong>
            <span>Chat live with our furniture architect</span>
          </div>
        </div>
      )}

      {/* Concierge Trigger / Open Hub */}
      {isOpen ? (
        <div className={styles.popupBox}>
          {/* Header */}
          <div className={styles.popupHead}>
            <div className={styles.headAvatar}>
              <span className={styles.avatarImg}>🪵</span>
              <span className={styles.onlineDot} />
            </div>
            <div className={styles.headInfo}>
              <h4 className={styles.headName}>MM Siva Wood Concierge</h4>
              <p className={styles.headStatus}>Online • Tamil Nadu Atelier</p>
            </div>
            <button 
              className={styles.popupClose} 
              onClick={() => setIsOpen(false)} 
              aria-label="Close concierge"
            >
              <X size={18} />
            </button>
          </div>

          {/* Direct Concierge Body */}
          <div className={styles.popupBody}>
            <p className={styles.popupWelcome}>
              Namaste! 👋 Need help choosing solid teak vs sheesham wood, custom sizing, or booking a showroom walkthrough?
            </p>

            <a
              href="https://wa.me/919999999999?text=Hi MM Siva, I need help selecting solid wood furniture for my home."
              target="_blank"
              rel="noopener noreferrer"
              className={styles.actionBtnWhatsapp}
            >
              <div className={styles.waIconWrap}>
                <MessageCircle size={18} />
              </div>
              <div className={styles.btnText}>
                <strong>Chat on WhatsApp</strong>
                <span>Instant reply within 5 mins</span>
              </div>
              <ChevronRight size={16} />
            </a>

            <a href="tel:+919999999999" className={styles.actionBtnPhone}>
              <div className={styles.phoneIconWrap}>
                <Phone size={16} />
              </div>
              <div className={styles.btnText}>
                <strong>Call Furniture Hotline</strong>
                <span>+91 99999 99999 (10 AM - 9 PM)</span>
              </div>
              <ChevronRight size={16} />
            </a>

            <a 
              href="#showroom" 
              className={styles.actionBtnVisit} 
              onClick={() => setIsOpen(false)}
            >
              <div className={styles.storeIconWrap}>
                <Store size={16} />
              </div>
              <div className={styles.btnText}>
                <strong>Experience Showrooms</strong>
                <span>Chennai, Coimbatore, Madurai</span>
              </div>
              <ChevronRight size={16} />
            </a>

            <a 
              href="#contact" 
              className={styles.actionBtnCustom} 
              onClick={() => setIsOpen(false)}
            >
              <div className={styles.customIconWrap}>
                <Ruler size={16} />
              </div>
              <div className={styles.btnText}>
                <strong>Custom Sizing & Quotes</strong>
                <span>Tailored to your floorplan</span>
              </div>
              <ChevronRight size={16} />
            </a>
          </div>
        </div>
      ) : (
        <button 
          className={styles.mainTrigger} 
          onClick={() => setIsOpen(true)}
          aria-label="Open furniture assistance concierge"
          title="Chat with Furniture Concierge"
        >
          <div className={styles.triggerPulse} />
          <MessageCircle size={24} className={styles.triggerIcon} />
          <span className={styles.onlineStatusRing} />
        </button>
      )}
    </div>
  )
}
