'use client'
import { useState } from 'react'
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Calendar, 
  Send, 
  CheckCircle2, 
  Sparkles,
  ArrowRight
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import styles from './Contact.module.css'

const PHONE = '+91 99999 99999'
const EMAIL = 'concierge@mmsiva.com'
const WHATSAPP = '919999999999'
const ADDRESS = '142, Grand Southern Trunk Road, Guindy, Chennai, Tamil Nadu 600032'

export default function Contact() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('Chennai')
  const [service, setService] = useState('Custom Wood Furniture')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const supabase = createClient()
      await supabase.from('leads').insert({
        name,
        phone,
        message: `[City: ${city} | Service: ${service}] ${message}`,
        status: 'new'
      })
    } catch {
      // ignore if demo mode
    }
    setSubmitting(false)
    setSubmitted(true)
  }

  return (
    <section id="contact" className={styles.section}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header-center">
          <span className="section-label">
            <Sparkles size={13} />
            <span>Consult With Wood Artisans</span>
          </span>
          <h2 className="section-title">Schedule A Free Design Consultation</h2>
          <p className="section-subtitle">
            Whether you want custom dimensions for an apartment or an entire villa furnished in solid teak, 
            our interior and woodcraft specialists are ready to guide you.
          </p>
        </div>

        <div className={styles.grid}>
          {/* Left Column: Direct Contact & Showroom Cards */}
          <div className={styles.leftCol}>
            <div className={styles.contactCard}>
              <div className={styles.contactHead}>
                <span className={styles.headTag}>IMMEDIATE ASSISTANCE</span>
                <h3 className={styles.contactTitle}>Direct Customer & Wood Concierge</h3>
              </div>

              <div className={styles.channelsList}>
                <a 
                  href={`https://wa.me/${WHATSAPP}?text=Hi MM Siva, I would like to schedule a furniture consultation.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.channelItem}
                >
                  <div className={`${styles.channelIcon} ${styles.waBg}`}>
                    <MessageCircle size={20} />
                  </div>
                  <div className={styles.channelText}>
                    <span className={styles.channelLabel}>Instant WhatsApp Help</span>
                    <span className={styles.channelValue}>{PHONE}</span>
                    <span className={styles.channelSub}>Typically responds within 5 minutes</span>
                  </div>
                  <ArrowRight size={16} className={styles.channelArrow} />
                </a>

                <a href={`tel:${PHONE.replace(/\s/g, '')}`} className={styles.channelItem}>
                  <div className={`${styles.channelIcon} ${styles.phoneBg}`}>
                    <Phone size={20} />
                  </div>
                  <div className={styles.channelText}>
                    <span className={styles.channelLabel}>Showroom Phone Hotline</span>
                    <span className={styles.channelValue}>{PHONE}</span>
                    <span className={styles.channelSub}>Mon – Sun: 9:30 AM to 8:30 PM</span>
                  </div>
                  <ArrowRight size={16} className={styles.channelArrow} />
                </a>

                <a href={`mailto:${EMAIL}`} className={styles.channelItem}>
                  <div className={`${styles.channelIcon} ${styles.emailBg}`}>
                    <Mail size={20} />
                  </div>
                  <div className={styles.channelText}>
                    <span className={styles.channelLabel}>Architect & Custom Orders Email</span>
                    <span className={styles.channelValue}>{EMAIL}</span>
                    <span className={styles.channelSub}>Send your CAD drawings / floorplans</span>
                  </div>
                  <ArrowRight size={16} className={styles.channelArrow} />
                </a>
              </div>

              {/* Showroom Address Box */}
              <div className={styles.addressBox}>
                <div className={styles.addrHeader}>
                  <MapPin size={18} className={styles.addrIcon} />
                  <strong>Chennai Central Flagship Studio</strong>
                </div>
                <p className={styles.addrText}>{ADDRESS}</p>
                <div className={styles.addrTiming}>
                  <Clock size={14} />
                  <span>Open 7 Days a Week: 10:00 AM – 8:30 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: High-End Booking Form */}
          <div className={styles.formCol}>
            <div className={styles.formCard}>
              <div className={styles.formHeader}>
                <h3 className={styles.formTitle}>Book An Expert Appointment</h3>
                <p className={styles.formSub}>
                  Share your furniture requirements and our team will get in touch with 3D concepts and wood samples.
                </p>
              </div>

              {submitted ? (
                <div className={styles.successState}>
                  <CheckCircle2 size={52} className={styles.successIcon} />
                  <h4 className={styles.successTitle}>Thank You! Request Received</h4>
                  <p className={styles.successDesc}>
                    Our lead furniture designer will call you on <strong>{phone}</strong> shortly to discuss your custom furniture specifications and send timber swatches.
                  </p>
                  <button 
                    className="btn btn-outline" 
                    onClick={() => {
                      setSubmitted(false)
                      setName('')
                      setPhone('')
                      setMessage('')
                    }}
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.formRow}>
                    <div className="form-group" style={{ flex: 1 }}>
                      <label className="form-label">Full Name *</label>
                      <input
                        type="text"
                        required
                        className="form-input"
                        placeholder="e.g. Suresh Kumar"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="form-group" style={{ flex: 1 }}>
                      <label className="form-label">Mobile Number (WhatsApp) *</label>
                      <input
                        type="tel"
                        required
                        className="form-input"
                        placeholder="+91 98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className="form-group" style={{ flex: 1 }}>
                      <label className="form-label">Your City / Location</label>
                      <select 
                        className="form-input form-select"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      >
                        <option value="Chennai">Chennai</option>
                        <option value="Coimbatore">Coimbatore</option>
                        <option value="Madurai">Madurai</option>
                        <option value="Salem">Salem</option>
                        <option value="Trichy">Trichy</option>
                        <option value="Bengaluru">Bengaluru</option>
                        <option value="Other">Other (All-India Delivery)</option>
                      </select>
                    </div>

                    <div className="form-group" style={{ flex: 1 }}>
                      <label className="form-label">Service Required</label>
                      <select 
                        className="form-input form-select"
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                      >
                        <option value="Custom Wood Furniture">Custom Wood Furniture</option>
                        <option value="Living Room Suite">Living Room Suite</option>
                        <option value="Hydraulic Bed & Bedroom">Hydraulic Bed & Bedroom</option>
                        <option value="Complete Home Woodwork">Complete Home Woodwork</option>
                        <option value="Showroom Visit Booking">Showroom Visit Booking</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Tell us about your space or preferred wood species</label>
                    <textarea
                      className="form-input form-textarea"
                      placeholder="e.g. Looking for a 7-seater L-shape sofa in teak wood and a 6-seater dining table for our new flat..."
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary btn-lg" 
                    disabled={submitting}
                    style={{ width: '100%' }}
                  >
                    {submitting ? 'Connecting with Workshop...' : 'Request Free Consultation & Catalog'}
                  </button>

                  <p className={styles.formFooterDisclaimer}>
                    🔒 Your details are 100% confidential. No spam, ever.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
