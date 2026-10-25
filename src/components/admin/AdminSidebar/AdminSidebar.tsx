'use client'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import styles from './AdminSidebar.module.css'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: '📊', exact: true },
  { href: '/admin/products', label: 'Products', icon: '🛋️' },
  { href: '/admin/leads', label: 'Leads', icon: '📋' },
  { href: '/admin/testimonials', label: 'Testimonials', icon: '⭐' },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <span>🪵</span>
        <div>
          <span className={styles.logoName}>MM Siva</span>
          <span className={styles.logoSub}>Admin Panel</span>
        </div>
      </div>

      <nav className={styles.nav}>
        {navItems.map(item => {
          const active = item.exact ? pathname === item.href : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navItem} ${active ? styles.active : ''}`}
              id={`sidebar-${item.label.toLowerCase()}`}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className={styles.bottom}>
        <a href="/" target="_blank" className={styles.viewSite} id="sidebar-view-site">
          🌐 View Website
        </a>
        <button onClick={handleLogout} className={styles.logout} id="sidebar-logout">
          🚪 Sign Out
        </button>
      </div>
    </aside>
  )
}
