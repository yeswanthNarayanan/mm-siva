'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { getImageUrl } from '@/lib/gdrive'
import AdminSidebar from '@/components/admin/AdminSidebar/AdminSidebar'
import type { ProductWithImages } from '@/lib/types'
import styles from './products.module.css'

export default function AdminProducts() {
  const [products, setProducts] = useState<ProductWithImages[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)

  async function load() {
    const supabase = createClient()
    const { data } = await supabase
      .from('products')
      .select('*, product_images(*)')
      .order('created_at', { ascending: false })
    setProducts((data as ProductWithImages[]) || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function toggleActive(id: string, current: boolean) {
    const supabase = createClient()
    await supabase.from('products').update({ is_active: !current }).eq('id', id)
    setProducts(prev => prev.map(p => p.id === id ? { ...p, is_active: !current } : p))
  }

  async function deleteProduct(id: string) {
    if (!confirm('Delete this product? This cannot be undone.')) return
    setDeleting(id)
    const supabase = createClient()
    await supabase.from('products').delete().eq('id', id)
    setProducts(prev => prev.filter(p => p.id !== id))
    setDeleting(null)
  }

  return (
    <div className={styles.page}>
      <AdminSidebar />
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>Products</h1>
          <Link href="/admin/products/new" className="btn btn-primary btn-sm" id="products-add-btn">
            + Add Product
          </Link>
        </div>

        {loading ? (
          <div className={styles.loading}>Loading products...</div>
        ) : products.length === 0 ? (
          <div className={styles.empty}>
            <p>No products yet.</p>
            <Link href="/admin/products/new" className="btn btn-primary">Add your first product</Link>
          </div>
        ) : (
          <div className={styles.grid}>
            {products.map(product => {
              const thumb = product.product_images?.find(i => i.is_primary) || product.product_images?.[0]
              return (
                <div key={product.id} className={styles.card}>
                  <div className={styles.thumb}>
                    {thumb ? (
                      <img src={getImageUrl(thumb.image_url, thumb.image_source)} alt={product.name} className={styles.thumbImg} />
                    ) : (
                      <div className={styles.noThumb}>🪵</div>
                    )}
                    <span className={`badge ${product.is_active ? 'badge-success' : 'badge-neutral'} ${styles.activeBadge}`}>
                      {product.is_active ? 'Active' : 'Hidden'}
                    </span>
                    {product.featured && <span className={`badge badge-primary ${styles.featuredBadge}`}>Featured</span>}
                  </div>
                  <div className={styles.info}>
                    <p className={styles.category}>{product.category}</p>
                    <h3 className={styles.name}>{product.name}</h3>
                    <p className={styles.meta}>{product.material} · {product.price_range}</p>
                    <p className={styles.imgCount}>{product.product_images?.length || 0} image(s)</p>
                  </div>
                  <div className={styles.actions}>
                    <Link href={`/admin/products/${product.id}/edit`} className="btn btn-outline btn-sm" id={`edit-${product.id}`}>
                      Edit
                    </Link>
                    <button
                      className="btn btn-ghost btn-sm"
                      style={{ background: product.is_active ? '#FEF2F2' : '#F0FDF4', color: product.is_active ? '#DC2626' : '#16A34A', border: 'none' }}
                      onClick={() => toggleActive(product.id, product.is_active)}
                      id={`toggle-${product.id}`}
                    >
                      {product.is_active ? 'Hide' : 'Show'}
                    </button>
                    <button
                      className="btn btn-sm"
                      style={{ background: '#FEF2F2', color: '#DC2626', border: 'none' }}
                      onClick={() => deleteProduct(product.id)}
                      disabled={deleting === product.id}
                      id={`delete-${product.id}`}
                    >
                      {deleting === product.id ? '...' : 'Delete'}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
