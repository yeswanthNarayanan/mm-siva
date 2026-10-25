'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import AdminSidebar from '@/components/admin/AdminSidebar/AdminSidebar'
import type { Testimonial } from '@/lib/types'
import styles from './testimonials.module.css'

export default function AdminTestimonials() {
  const [items, setItems] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ customer_name: '', review: '', rating: 5, product_name: '', is_active: true })
  const [saving, setSaving] = useState(false)

  async function load() {
    const supabase = createClient()
    const { data } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false })
    setItems(data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function save(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const supabase = createClient()
    await supabase.from('testimonials').insert(form)
    setForm({ customer_name: '', review: '', rating: 5, product_name: '', is_active: true })
    setShowForm(false)
    setSaving(false)
    load()
  }

  async function toggle(id: string, current: boolean) {
    const supabase = createClient()
    await supabase.from('testimonials').update({ is_active: !current }).eq('id', id)
    setItems(prev => prev.map(t => t.id === id ? { ...t, is_active: !current } : t))
  }

  async function del(id: string) {
    if (!confirm('Delete this testimonial?')) return
    const supabase = createClient()
    await supabase.from('testimonials').delete().eq('id', id)
    setItems(prev => prev.filter(t => t.id !== id))
  }

  return (
    <div className={styles.page}>
      <AdminSidebar />
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>Testimonials</h1>
          <button className="btn btn-primary btn-sm" onClick={() => setShowForm(!showForm)} id="add-testimonial-btn">
            {showForm ? 'Cancel' : '+ Add Testimonial'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={save} className={styles.addForm} id="testimonial-form">
            <div className={styles.row3}>
              <div className="form-group">
                <label className="form-label">Customer Name *</label>
                <input className="form-input" value={form.customer_name} onChange={e => setForm(p => ({...p, customer_name: e.target.value}))} placeholder="Ramesh Kumar" required />
              </div>
              <div className="form-group">
                <label className="form-label">Product (optional)</label>
                <input className="form-input" value={form.product_name} onChange={e => setForm(p => ({...p, product_name: e.target.value}))} placeholder="Teak Sofa Set" />
              </div>
              <div className="form-group">
                <label className="form-label">Rating</label>
                <select className="form-input form-select" value={form.rating} onChange={e => setForm(p => ({...p, rating: Number(e.target.value)}))}>
                  {[5,4,3,2,1].map(r => <option key={r} value={r}>{r} Stars</option>)}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Review *</label>
              <textarea className="form-input form-textarea" value={form.review} onChange={e => setForm(p => ({...p, review: e.target.value}))} placeholder="Customer review..." required />
            </div>
            <div className={styles.formFooter}>
              <label className={styles.check}>
                <input type="checkbox" checked={form.is_active} onChange={e => setForm(p => ({...p, is_active: e.target.checked}))} />
                <span>Show on website</span>
              </label>
              <button type="submit" className="btn btn-primary btn-sm" disabled={saving} id="testimonial-save-btn">
                {saving ? 'Saving...' : 'Save Testimonial'}
              </button>
            </div>
          </form>
        )}

        {loading ? (
          <div className={styles.loading}>Loading...</div>
        ) : (
          <div className={styles.grid}>
            {items.map(t => (
              <div key={t.id} className={`${styles.card} ${!t.is_active ? styles.inactive : ''}`}>
                <div className={styles.cardHead}>
                  <div className={styles.avatar}>{t.customer_name.charAt(0)}</div>
                  <div>
                    <p className={styles.name}>{t.customer_name}</p>
                    {t.product_name && <p className={styles.product}>{t.product_name}</p>}
                  </div>
                  <div className={styles.stars}>{'★'.repeat(t.rating)}{'☆'.repeat(5-t.rating)}</div>
                </div>
                <p className={styles.review}>{t.review}</p>
                <div className={styles.cardActions}>
                  <button className="btn btn-sm" style={{ background: t.is_active ? '#FEF2F2' : '#F0FDF4', color: t.is_active ? '#DC2626' : '#16A34A', border: 'none' }} onClick={() => toggle(t.id, t.is_active)}>
                    {t.is_active ? 'Hide' : 'Show'}
                  </button>
                  <button className="btn btn-sm" style={{ background: '#FEF2F2', color: '#DC2626', border: 'none' }} onClick={() => del(t.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
