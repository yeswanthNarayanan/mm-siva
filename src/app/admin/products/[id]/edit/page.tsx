'use client'
import { useEffect, useState, useRef } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { isGDriveLink, convertGDriveLink } from '@/lib/gdrive'
import AdminSidebar from '@/components/admin/AdminSidebar/AdminSidebar'
import type { ProductWithImages } from '@/lib/types'
import styles from '../../new/product-form.module.css'

const CATEGORIES = ['Sofa', 'Bed', 'Dining Table', 'Wardrobe', 'Chair', 'Storage', 'Study Table', 'Other']

interface ImageEntry {
  id: string
  dbId?: string
  url: string
  source: 'supabase' | 'gdrive'
  is_primary: boolean
  file?: File
  preview?: string
  existing?: boolean
}

export default function EditProduct() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [form, setForm] = useState({ name: '', description: '', category: '', price_range: '', material: '', featured: false, is_active: true })
  const [images, setImages] = useState<ImageEntry[]>([])
  const [gdriveInput, setGdriveInput] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data } = await supabase.from('products').select('*, product_images(*)').eq('id', id).single()
      if (data) {
        const p = data as ProductWithImages
        setForm({ name: p.name, description: p.description || '', category: p.category || '', price_range: p.price_range || '', material: p.material || '', featured: p.featured, is_active: p.is_active })
        setImages(p.product_images.map(img => ({
          id: img.id, dbId: img.id, url: img.image_url, source: img.image_source as 'supabase'|'gdrive',
          is_primary: img.is_primary, preview: img.image_url, existing: true,
        })))
      }
      setLoading(false)
    }
    load()
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value }))
  }

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const newEntries: ImageEntry[] = files.map((file, i) => ({
      id: Math.random().toString(36).slice(2), url: '', source: 'supabase',
      is_primary: images.length === 0 && i === 0, file, preview: URL.createObjectURL(file),
    }))
    setImages(prev => [...prev, ...newEntries])
  }

  const addGDriveLink = () => {
    if (!gdriveInput.trim()) return
    const url = gdriveInput.trim()
    setImages(prev => [...prev, {
      id: Math.random().toString(36).slice(2),
      url: isGDriveLink(url) ? convertGDriveLink(url) : url,
      source: 'gdrive', is_primary: prev.length === 0,
    }])
    setGdriveInput('')
  }

  const removeImage = async (imgId: string, dbId?: string) => {
    if (dbId) {
      const supabase = createClient()
      await supabase.from('product_images').delete().eq('id', dbId)
    }
    setImages(prev => prev.filter(i => i.id !== imgId))
  }

  const setPrimary = async (imgId: string) => {
    const supabase = createClient()
    await supabase.from('product_images').update({ is_primary: false }).eq('product_id', id)
    const target = images.find(i => i.id === imgId)
    if (target?.dbId) await supabase.from('product_images').update({ is_primary: true }).eq('id', target.dbId)
    setImages(prev => prev.map(i => ({ ...i, is_primary: i.id === imgId })))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    const supabase = createClient()

    const { error: updErr } = await supabase.from('products').update(form).eq('id', id)
    if (updErr) { setError(updErr.message); setSaving(false); return }

    const newImages = images.filter(i => !i.existing)
    for (let i = 0; i < newImages.length; i++) {
      const img = newImages[i]
      let imageUrl = img.url
      if (img.source === 'supabase' && img.file) {
        const ext = img.file.name.split('.').pop()
        const path = `${id}/${Date.now()}-${i}.${ext}`
        const { error: upErr } = await supabase.storage.from('product-images').upload(path, img.file, { upsert: true })
        if (upErr) continue
        const { data: { publicUrl } } = supabase.storage.from('product-images').getPublicUrl(path)
        imageUrl = publicUrl
      }
      await supabase.from('product_images').insert({
        product_id: id, image_url: imageUrl, image_source: img.source,
        is_primary: img.is_primary, display_order: images.length + i,
      })
    }

    setSaving(false)
    router.push('/admin/products')
  }

  if (loading) return <div style={{padding:40,color:'var(--text-muted)'}}>Loading...</div>

  return (
    <div className={styles.page}>
      <AdminSidebar />
      <main className={styles.main}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Edit Product</h1>
            <p className={styles.sub}>Update product details and images</p>
          </div>
          <a href="/admin/products" className="btn btn-outline btn-sm">← Back</a>
        </div>

        {error && <div className={styles.errorBox}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form} id="edit-product-form">
          <div className={styles.twoCol}>
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Product Details</h2>
              <div className={styles.fields}>
                <div className="form-group"><label className="form-label">Product Name *</label><input name="name" type="text" className="form-input" value={form.name} onChange={handleChange} required /></div>
                <div className="form-group"><label className="form-label">Description</label><textarea name="description" className="form-input form-textarea" value={form.description} onChange={handleChange} /></div>
                <div className={styles.row2}>
                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <select name="category" className="form-input form-select" value={form.category} onChange={handleChange}>
                      <option value="">Select</option>
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="form-group"><label className="form-label">Wood Type</label><input name="material" type="text" className="form-input" value={form.material} onChange={handleChange} /></div>
                </div>
                <div className="form-group"><label className="form-label">Price Range</label><input name="price_range" type="text" className="form-input" value={form.price_range} onChange={handleChange} /></div>
                <div className={styles.checkRow}>
                  <label className={styles.checkLabel}><input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} /><span>Featured</span></label>
                  <label className={styles.checkLabel}><input type="checkbox" name="is_active" checked={form.is_active} onChange={handleChange} /><span>Visible on site</span></label>
                </div>
              </div>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Images ({images.length})</h2>
              <div className={styles.uploadArea} onClick={() => fileRef.current?.click()} id="edit-upload-area">
                <span>📤</span><p>Upload more images</p>
                <span className={styles.uploadHint}>PNG, JPG, WEBP</span>
              </div>
              <input ref={fileRef} type="file" accept="image/*" multiple onChange={handleFiles} style={{ display: 'none' }} />
              <div className={styles.gdriveRow}>
                <input type="text" className="form-input" value={gdriveInput} onChange={e => setGdriveInput(e.target.value)} placeholder="Paste Google Drive share link..." />
                <button type="button" className="btn btn-outline btn-sm" onClick={addGDriveLink}>Add</button>
              </div>
              {images.length > 0 && (
                <div className={styles.previews}>
                  {images.map(img => (
                    <div key={img.id} className={`${styles.previewCard} ${img.is_primary ? styles.primary : ''}`}>
                      <img src={img.preview || img.url} alt="preview" className={styles.previewImg}
                        onError={e => { (e.target as HTMLImageElement).style.opacity = '0.3' }} />
                      <div className={styles.previewActions}>
                        <button type="button" className={styles.primaryBtn} onClick={() => setPrimary(img.id)} title="Set as primary">
                          {img.is_primary ? '⭐' : '☆'}
                        </button>
                        <button type="button" className={styles.removeBtn} onClick={() => removeImage(img.id, img.dbId)}>✕</button>
                      </div>
                      <span className={styles.sourceTag}>{img.source === 'gdrive' ? '🔗' : '⬆'}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className={styles.formFooter}>
            <a href="/admin/products" className="btn btn-outline">Cancel</a>
            <button type="submit" className="btn btn-primary" disabled={saving} id="edit-save-btn">
              {saving ? <span className="spinner" /> : null}
              {saving ? 'Saving...' : 'Update Product'}
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
