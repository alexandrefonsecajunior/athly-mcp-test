import { Outlet } from 'react-router-dom'
import { Sidebar } from '@/components/Sidebar'
import { BottomNav } from '@/components/BottomNav'
import { Toaster } from 'react-hot-toast'

export function MainLayout() {
  return (
    <div className="min-h-screen bg-[var(--color-background-dark)]">
      <Sidebar />
      <main className="pb-20 md:pb-0 md:pl-64">
        <div className="mx-auto max-w-4xl px-4 py-6 md:px-6 md:py-8">
          <Outlet />
        </div>
      </main>
      <BottomNav />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'var(--color-surface-card)',
            color: 'var(--color-text-primary)',
            border: '1px solid var(--color-border-dark)',
            borderRadius: '1rem',
            boxShadow: 'var(--shadow-neon)',
          },
        }}
      />
    </div>
  )
}
