import { Navigate } from 'react-router-dom'

type Props = {
  children: React.ReactNode
}

export default function AdminRoute({
  children,
}: Props) {

  const isLogin =
    localStorage.getItem('login')

  const role =
    localStorage.getItem('role')

  if (!isLogin || role !== 'admin') {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}