import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Panel — MM Siva Furniture',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F5F5F5', fontFamily: 'var(--font-body)' }}>
      {children}
    </div>
  )
}
