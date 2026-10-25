'use client'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { isGDriveLink, convertGDriveLink } from '@/lib/gdrive'
import AdminSidebar from '@/components/admin/AdminSidebar/AdminSidebar'
import styles from './product-form.module.css'

const CATEGORIES = ['Sofa', 'Bed', 'Dining Table', 'Wardrobe', 'Chair', 'Storage', 'Study Table', 'Other']

interface ImageEntry {
  id: string
  url: string
  source: 'supabase' | 'gdrive'
  is_primary: boolean
  file?: File
  preview?: string
}

export default function NewProduct() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: '', description: '', category: '', price_range: '', material: '', featured: false, is_active: true
  })
  const [images, setImages] = useState<ImageEntry[]>([])
  const [gdriveInput, setGdriveInput] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value }))
  }

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const newEntries: ImageEntry[] = files.map((file, i) => ({
      id: Math.random().toString(36).slice(2),
      url: '',
      source: 'supabase',
      is_primary: images.length === 0 && i === 0,
      file,
      preview: URL.createObjectURL(file),
    }))
    setImages(prev => [...prev, ...newEntries])
  }

  const addGDriveLink = () => {
    if (!gdriveInput.trim()) return
    const url = gdriveInput.trim()
    setImages(prev => [...prev, {
      id: Math.random().toString(36).slice(2),
      url: isGDriveLink(url) ? convertGDriveLink(url) : url,
      source: 'gdrive',
      is_primary: prev.length === 0,
    }])
    setGdriveInput('')
  }

  const removeImage = (id: string) => {
    setImages(prev => {
      const filtered = prev.filter(i => i.id !== id)
      if (filtered.length > 0 && !filtered.some(i => i.is_primary)) {
        filtered[0].is_primary = true
      }
      return filtered
    })
  }

  const setPrimary = (id: string) => {
    setImages(prev => prev.map(i => ({ ...i, is_primary: i.id === id })))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name) return
    setSaving(true)
    setError('')

    const supabase = createClient()

    // 1. Create product
    const { data: product, error: prodErr } = await supabase
      .from('products')
      .insert(form)
      .select()
      .single()

    if (prodErr || !product) {
      setError(prodErr?.message || 'Failed to create product')
      setSaving(false)
      return
    }

    // 2. Upload files to Supabase Storage, then save all image records
    for (let i = 0; i < images.length; i++) {
      const img = images[i]
      let imageUrl = img.url

      if (img.source === 'supabase' && img.file) {
        const ext = img.file.name.split('.').pop()
        const path = `${product.id}/${Date.now()}-${i}.${ext}`
        const { data: uploadData, error: uploadErr } = await supabase.storage
          .from('product-images')
          .upload(path, img.file, { upsert: true })
        if (uploadErr) { console.error('Upload error:', uploadErr); continue }
        const { data: { publicUrl } } = supabase.storage.from('product-images').getPublicUrl(path)
        imageUrl = publicUrl
      }

      await supabase.from('product_images').insert({
        product_id: product.id,
        image_url: imageUrl,
        image_source: img.source,
        is_primary: img.is_primary,
        display_order: i,
      })
    }

    setSaving(false)
    router.push('/admin/products')
  }

  return (
    <div className={styles.page}>
      <AdminSidebar />
      <main className={styles.main}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Add New Product</h1>
            <p className={styles.sub}>Fill in the details and upload images</p>
          </div>
          <a href="/admin/products" className="btn btn-outline btn-sm">← Back</a>
        </div>

        {error && <div className={styles.errorBox}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form} id="product-form">
          <div className={styles.twoCol}>
            {/* Left: Product Details */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Product Details</h2>
              <div className={styles.fields}>
                <div className="form-group">
                  <label className="form-label" htmlFor="prod-name">Product Name *</label>
                  <input id="prod-name" name="name" type="text" className="form-input" value={form.name} onChange={handleChange} placeholder="e.g. Royal Teak Sofa Set" required />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="prod-desc">Description</label>
                  <textarea id="prod-desc" name="description" className="form-input form-textarea" value={form.description} onChange={handleChange} placeholder="Describe the product in detail..." />
                </div>
                <div className={styles.row2}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="prod-category">Category</label>
                    <select id="prod-category" name="category" className="form-input form-select" value={form.category} onChange={handleChange}>
                      <option value="">Select category</option>
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="prod-material">Wood Type</label>
                    <input id="prod-material" name="material" type="text" className="form-input" value={form.material} onChange={handleChange} placeholder="e.g. Teak, Sheesham" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="prod-price">Price Range</label>
                  <input id="prod-price" name="price_range" type="text" className="form-input" value={form.price_range} onChange={handleChange} placeholder="e.g. ₹25,000 – ₹45,000" />
                </div>
                <div className={styles.checkRow}>
                  <label className={styles.checkLabel}>
                    <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} id="prod-featured" />
                    <span>Mark as Featured</span>
                  </label>
                  <label className={styles.checkLabel}>
                    <input type="checkbox" name="is_active" checked={form.is_active} onChange={handleChange} id="prod-active" />
                    <span>Visible on website</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Right: Images */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Product Images</h2>

              {/* Upload button */}
              <div className={styles.uploadArea} onClick={() => fileRef.current?.click()} id="upload-area">
                <span>📤</span>
                <p>Click to upload images</p>
                <span className={styles.uploadHint}>PNG, JPG, WEBP up to 10MB each</span>
              </div>
              <input ref={fileRef} type="file" accept="image/*" multiple onChange={handleFiles} style={{ display: 'none' }} id="file-input" />

              {/* Google Drive link */}
              <div className={styles.gdriveRow}>
                <input
                  type="text"
                  className="form-input"
                  value={gdriveInput}
                  onChange={e => setGdriveInput(e.target.value)}
                  placeholder="Paste Google Drive share link..."
                  id="gdrive-input"
                />
                <button type="button" className="btn btn-outline btn-sm" onClick={addGDriveLink} id="gdrive-add-btn">Add Link</button>
              </div>

              {/* Image Previews */}
              {images.length > 0 && (
                <div className={styles.previews}>
                  {images.map(img => (
                    <div key={img.id} className={`${styles.previewCard} ${img.is_primary ? styles.primary : ''}`}>
                      <img
                        src={img.preview || img.url}
                        alt="preview"
                        className={styles.previewImg}
                        onError={e => { (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="80" height="60"%3E%3Crect fill="%23f5f5f5" width="80" height="60"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23aaa" font-size="10"%3ELoad failed%3C/text%3E%3C/svg%3E' }}
                      />
                      <div className={styles.previewActions}>
                        <button type="button" className={styles.primaryBtn} onClick={() => setPrimary(img.id)} title={img.is_primary ? 'Primary image' : 'Set as primary'}>
                          {img.is_primary ? '⭐' : '☆'}
                        </button>
                        <button type="button" className={styles.removeBtn} onClick={() => removeImage(img.id)}>✕</button>
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
            <button type="submit" className="btn btn-primary" disabled={saving} id="product-save-btn">
              {saving ? <span className="spinner" /> : null}
              {saving ? 'Saving...' : 'Save Product'}
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
