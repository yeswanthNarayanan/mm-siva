'use client'
import { useState, useEffect } from 'react'
import { MessageCircle, Phone, X, Sparkles, ArrowUp, ChevronRight } from 'lucide-react'
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

  // Auto hide bubble after 8 seconds if not clicked
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
            <Sparkles size={14} className={styles.sparkle} />
          </div>
          <div className={styles.bubbleText}>
            <strong>Need wood advice?</strong>
            <span>Chat live with our furniture architect on WhatsApp!</span>
          </div>
        </div>
      )}

      {/* Concierge Trigger / Open Hub */}
      {isOpen ? (
        <div className={styles.popupBox}>
          <div className={styles.popupHead}>
            <div className={styles.headAvatar}>
              <span className={styles.avatarImg}>🪵</span>
              <span className={styles.onlineDot} />
            </div>
            <div className={styles.headInfo}>
              <h4 className={styles.headName}>MM Siva Wood Concierge</h4>
              <p className={styles.headStatus}>Online • Tamil Nadu Atelier</p>
            </div>
            <button className={styles.popupClose} onClick={() => setIsOpen(false)} aria-label="Close concierge">
              <X size={18} />
            </button>
          </div>

          <div className={styles.popupBody}>
            <p className={styles.popupWelcome}>
              Namaste! 👋 Need help selecting solid teak sofa sizes, custom hydraulic beds, or booking a showroom walkthrough?
            </p>

            <a
              href="https://wa.me/919999999999?text=Hi MM Siva, I need help selecting furniture for my home."
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
                <span>+91 99999 99999</span>
              </div>
              <ChevronRight size={16} />
            </a>

            <a href="#contact" className={styles.actionBtnVisit} onClick={() => setIsOpen(false)}>
              <span>Book In-Store Walkthrough</span>
              <ChevronRight size={16} />
            </a>
          </div>
        </div>
      ) : (
        <button 
          className={styles.mainTrigger} 
          onClick={() => setIsOpen(true)}
          aria-label="Open furniture assistance concierge"
        >
          <div className={styles.triggerPulse} />
          <MessageCircle size={26} className={styles.triggerIcon} />
          <span className={styles.onlineStatusRing} />
        </button>
      )}
    </div>
  )
}
