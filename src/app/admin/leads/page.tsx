'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import AdminSidebar from '@/components/admin/AdminSidebar/AdminSidebar'
import type { Lead } from '@/lib/types'
import styles from './leads.module.css'

const STATUS_OPTIONS = ['new', 'contacted', 'closed']

export default function AdminLeads() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState<Lead | null>(null)

  async function load() {
    const supabase = createClient()
    const { data } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })
    setLeads(data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function updateStatus(id: string, status: string) {
    const supabase = createClient()
    await supabase.from('leads').update({ status }).eq('id', id)
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l))
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, status } : null)
  }

  const filtered = filter === 'all' ? leads : leads.filter(l => l.status === filter)

  const statusColor: Record<string, string> = {
    new: 'badge-warning',
    contacted: 'badge-primary',
    closed: 'badge-success',
  }

  return (
    <div className={styles.page}>
      <AdminSidebar />
      <main className={styles.main}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Leads</h1>
            <p className={styles.sub}>{leads.filter(l => l.status === 'new').length} new enquiries waiting</p>
          </div>
        </div>

        {/* Filter tabs */}
        <div className={styles.tabs}>
          {['all', ...STATUS_OPTIONS].map(s => (
            <button
              key={s}
              className={`${styles.tab} ${filter === s ? styles.activeTab : ''}`}
              onClick={() => setFilter(s)}
              id={`leads-tab-${s}`}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
              <span className={styles.tabCount}>
                {s === 'all' ? leads.length : leads.filter(l => l.status === s).length}
              </span>
            </button>
          ))}
        </div>

        <div className={styles.content}>
          {/* Leads list */}
          <div className={styles.list}>
            {loading ? (
              <div className={styles.empty}>Loading leads...</div>
            ) : filtered.length === 0 ? (
              <div className={styles.empty}>No leads in this category.</div>
            ) : (
              filtered.map(lead => (
                <div
                  key={lead.id}
                  className={`${styles.leadCard} ${selected?.id === lead.id ? styles.leadSelected : ''}`}
                  onClick={() => setSelected(lead)}
                  id={`lead-${lead.id}`}
                >
                  <div className={styles.leadHead}>
                    <div className={styles.avatar}>{lead.name.charAt(0).toUpperCase()}</div>
                    <div className={styles.leadMeta}>
                      <p className={styles.leadName}>{lead.name}</p>
                      <p className={styles.leadPhone}>{lead.phone}</p>
                    </div>
                    <span className={`badge ${statusColor[lead.status] || 'badge-neutral'}`}>{lead.status}</span>
                  </div>
                  {lead.product_name && <p className={styles.leadProduct}>🛋️ {lead.product_name}</p>}
                  <p className={styles.leadDate}>{new Date(lead.created_at).toLocaleString('en-IN')}</p>
                </div>
              ))
            )}
          </div>

          {/* Detail panel */}
          {selected && (
            <div className={styles.detail}>
              <div className={styles.detailHead}>
                <div className={styles.detailAvatar}>{selected.name.charAt(0)}</div>
                <div>
                  <h3 className={styles.detailName}>{selected.name}</h3>
                  <p className={styles.detailPhone}>{selected.phone}</p>
                </div>
              </div>

              <div className={styles.detailBody}>
                {selected.email && <div className={styles.field}><span>Email</span><a href={`mailto:${selected.email}`}>{selected.email}</a></div>}
                {selected.product_name && <div className={styles.field}><span>Product</span><p>{selected.product_name}</p></div>}
                {selected.message && <div className={styles.field}><span>Message</span><p className={styles.message}>{selected.message}</p></div>}
                <div className={styles.field}><span>Received</span><p>{new Date(selected.created_at).toLocaleString('en-IN')}</p></div>

                <div className={styles.statusRow}>
                  <span className={styles.statusLabel}>Update Status:</span>
                  <div className={styles.statusBtns}>
                    {STATUS_OPTIONS.map(s => (
                      <button
                        key={s}
                        className={`btn btn-sm ${selected.status === s ? 'btn-primary' : 'btn-outline'}`}
                        onClick={() => updateStatus(selected.id, s)}
                        id={`status-${s}-${selected.id}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={styles.contactBtns}>
                  <a href={`https://wa.me/${selected.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">WhatsApp</a>
                  <a href={`tel:${selected.phone}`} className="btn btn-outline btn-sm">Call</a>
                  {selected.email && <a href={`mailto:${selected.email}`} className="btn btn-outline btn-sm">Email</a>}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
