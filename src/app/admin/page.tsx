'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import AdminSidebar from '@/components/admin/AdminSidebar/AdminSidebar'
import styles from './dashboard.module.css'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, leads: 0, newLeads: 0, testimonials: 0 })
  const [recentLeads, setRecentLeads] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const today = new Date(); today.setHours(0,0,0,0)

      const [{ count: products }, { count: leads }, { count: newLeads }, { count: testimonials }, { data: recent }] =
        await Promise.all([
          supabase.from('products').select('*', { count: 'exact', head: true }),
          supabase.from('leads').select('*', { count: 'exact', head: true }),
          supabase.from('leads').select('*', { count: 'exact', head: true }).eq('status', 'new'),
          supabase.from('testimonials').select('*', { count: 'exact', head: true }),
          supabase.from('leads').select('*').order('created_at', { ascending: false }).limit(5),
        ])

      setStats({ products: products || 0, leads: leads || 0, newLeads: newLeads || 0, testimonials: testimonials || 0 })
      setRecentLeads(recent || [])
      setLoading(false)
    }
    load()
  }, [])

  const statCards = [
    { icon: '🛋️', label: 'Total Products', value: stats.products, href: '/admin/products' },
    { icon: '📋', label: 'Total Leads', value: stats.leads, href: '/admin/leads' },
    { icon: '🔴', label: 'New Leads', value: stats.newLeads, href: '/admin/leads', highlight: true },
    { icon: '⭐', label: 'Testimonials', value: stats.testimonials, href: '/admin/testimonials' },
  ]

  return (
    <div className={styles.page}>
      <AdminSidebar />
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>Dashboard</h1>
          <a href="/admin/products/new" className="btn btn-primary btn-sm" id="dashboard-add-product">
            + Add Product
          </a>
        </div>

        <div className={styles.statsGrid}>
          {statCards.map((s, i) => (
            <a key={i} href={s.href} className={`${styles.statCard} ${s.highlight ? styles.highlight : ''}`}>
              <span className={styles.statIcon}>{s.icon}</span>
              <div>
                <p className={styles.statValue}>{loading ? '—' : s.value}</p>
                <p className={styles.statLabel}>{s.label}</p>
              </div>
            </a>
          ))}
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>Recent Leads</h2>
            <a href="/admin/leads" className={styles.viewAll}>View all →</a>
          </div>
          <div className={styles.table}>
            <div className={styles.tableHead}>
              <span>Customer</span>
              <span>Product</span>
              <span>Phone</span>
              <span>Status</span>
              <span>Date</span>
            </div>
            {loading ? (
              <div className={styles.emptyState}>Loading...</div>
            ) : recentLeads.length === 0 ? (
              <div className={styles.emptyState}>No leads yet. They'll appear here when customers submit enquiries.</div>
            ) : (
              recentLeads.map(lead => (
                <div key={lead.id} className={styles.tableRow}>
                  <span className={styles.customerName}>{lead.name}</span>
                  <span>{lead.product_name || '—'}</span>
                  <span>{lead.phone}</span>
                  <span>
                    <span className={`badge ${lead.status === 'new' ? 'badge-warning' : lead.status === 'contacted' ? 'badge-primary' : 'badge-success'}`}>
                      {lead.status}
                    </span>
                  </span>
                  <span className={styles.date}>{new Date(lead.created_at).toLocaleDateString('en-IN')}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
