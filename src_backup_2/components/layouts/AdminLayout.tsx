import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Dashboard', path: '/admin' },
  { label: 'Destinations', path: '/admin/destinations' },
  { label: 'Blog Posts', path: '/admin/blog' },
  { label: 'Ferry Schedules', path: '/admin/ferries' },
  { label: 'Settings', path: '/admin/settings' },
]

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation()

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white border-r p-4">
        <h2 className="text-xl font-bold mb-6">Niyali Admin</h2>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'block px-3 py-2 rounded hover:bg-blue-50',
                location.pathname === item.path ? 'bg-blue-100 font-semibold' : ''
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  )
}

export default AdminLayout