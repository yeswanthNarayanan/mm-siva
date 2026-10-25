'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import styles from './LeadForm.module.css'

interface LeadFormProps {
  productId?: string
  productName?: string
  onSuccess?: () => void
}

export default function LeadForm({ productId, productName, onSuccess }: LeadFormProps) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.phone) return
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.from('leads').insert({
      product_id: productId || null,
      product_name: productName || null,
      name: form.name,
      phone: form.phone,
      email: form.email || null,
      message: form.message || null,
      status: 'new',
    })
    setLoading(false)
    if (error) {
      setStatus('error')
    } else {
      setStatus('success')
      setForm({ name: '', phone: '', email: '', message: '' })
      onSuccess?.()
    }
    setTimeout(() => setStatus('idle'), 5000)
  }

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>
        {productName ? `Interested in "${productName}"?` : 'Get in Touch'}
      </h3>
      <p className={styles.sub}>Fill in your details and we'll contact you shortly.</p>

      {status === 'success' && (
        <div className={styles.successBanner}>
          ✅ Thank you! We'll reach out to you within 24 hours.
        </div>
      )}
      {status === 'error' && (
        <div className={styles.errorBanner}>
          ❌ Something went wrong. Please try again or WhatsApp us directly.
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.form} id={`lead-form-${productId || 'general'}`}>
        <div className={styles.row}>
          <div className="form-group">
            <label className="form-label" htmlFor="lead-name">Full Name *</label>
            <input
              id="lead-name"
              name="name"
              type="text"
              className="form-input"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="lead-phone">Phone Number *</label>
            <input
              id="lead-phone"
              name="phone"
              type="tel"
              className="form-input"
              placeholder="+91 99999 99999"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="lead-email">Email Address (optional)</label>
          <input
            id="lead-email"
            name="email"
            type="email"
            className="form-input"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="lead-message">Message (optional)</label>
          <textarea
            id="lead-message"
            name="message"
            className="form-input form-textarea"
            placeholder="Tell us your requirements, size preferences, budget range..."
            value={form.message}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className={`btn btn-primary ${styles.submitBtn}`}
          disabled={loading}
          id="lead-submit-btn"
        >
          {loading ? <span className="spinner" /> : null}
          {loading ? 'Sending...' : 'Send Enquiry'}
        </button>
      </form>
    </div>
  )
}
