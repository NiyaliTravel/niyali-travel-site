import { useAuth } from '@/contexts/AuthContext'
import { Navigate } from 'react-router-dom'
import AdminLayout from '@/components/layouts/AdminLayout'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

const Admin = () => {
  const { user } = useAuth()

  if (!user) return <Navigate to="/login" />

  return (
    <AdminLayout>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Admin Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">Welcome, {user.email}!</p>
          <p className="mt-2">Manage destinations, blog posts, ferry schedules, and more.</p>
        </CardContent>
      </Card>
    </AdminLayout>
  )
}

export default Admin