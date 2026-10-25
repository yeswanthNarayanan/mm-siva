'use client'
import { useState, useEffect } from 'react'
import { Flame, Clock, Copy, Check, ArrowRight } from 'lucide-react'
import styles from './DealBanner.module.css'

export default function DealBanner() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 36,
    seconds: 42
  })
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return { hours: 23, minutes: 59, seconds: 59 }
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const copyCoupon = () => {
    navigator.clipboard.writeText('MMSIVA10')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const formatNumber = (n: number) => n.toString().padStart(2, '0')

  return (
    <section className={styles.dealSection}>
      <div className={`container ${styles.dealInner}`}>
        <div className={styles.leftCol}>
          <div className={styles.flameBadge}>
            <Flame size={16} className={styles.flameIcon} />
            <span>LIMITED TIME FESTIVE OFFER</span>
          </div>
          <h3 className={styles.dealTitle}>
            Flat 50% Off On Solid Sheesham & Teak Wood Sets
          </h3>
          <p className={styles.dealDesc}>
            Upgrade your living room and bedroom with heirloom solid wood craftsmanship. Plus extra 10% instant discount at checkout.
          </p>
        </div>

        <div className={styles.centerCol}>
          <span className={styles.timerLabel}>
            <Clock size={14} />
            <span>Offer Ends In:</span>
          </span>
          <div className={styles.timerBoxes}>
            <div className={styles.timeBox}>
              <span className={styles.timeVal}>{formatNumber(timeLeft.hours)}</span>
              <span className={styles.timeUnit}>Hours</span>
            </div>
            <span className={styles.timeSep}>:</span>
            <div className={styles.timeBox}>
              <span className={styles.timeVal}>{formatNumber(timeLeft.minutes)}</span>
              <span className={styles.timeUnit}>Mins</span>
            </div>
            <span className={styles.timeSep}>:</span>
            <div className={styles.timeBox}>
              <span className={styles.timeVal}>{formatNumber(timeLeft.seconds)}</span>
              <span className={styles.timeUnit}>Secs</span>
            </div>
          </div>
        </div>

        <div className={styles.rightCol}>
          <div className={styles.couponBox} onClick={copyCoupon} title="Click to copy coupon code">
            <span className={styles.couponLabel}>Use Coupon:</span>
            <div className={styles.codeWrap}>
              <span className={styles.codeText}>MMSIVA10</span>
              {copied ? <Check size={14} className={styles.copySuccess} /> : <Copy size={14} className={styles.copyIcon} />}
            </div>
            <span className={styles.copyToast}>{copied ? 'Copied to clipboard!' : 'Click to copy'}</span>
          </div>

          <a href="#products" className={styles.claimBtn}>
            <span>Claim Discount</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  )
}
