import { createContext, useContext, useState, type ReactNode } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Home from './pages/user/Home'
import Search from './pages/user/Search'
import Login from './pages/user/Login'
import Payment from './pages/user/Payment'
import Profile from './pages/user/Profile'
import Ticket from './pages/user/Ticket'
import TicketDetail from './pages/user/TicketDetail'
import Register from './pages/user/Register'

import MainLayout from './components/layout/MainLayout'
import Dashboard from './pages/admin/Dashboard/Dashboard'
import AdminProfile from './pages/admin/Profile/AdminProfile'
import AdminSettings from './pages/admin/Settings/AdminSettings'
import BusPage from './pages/admin/Bus/BusPage'
import DriverPage from './pages/admin/Driver/DriverPage'
import JadwalPage from './pages/admin/Jadwal/JadwalPage'
import LaporanPage from './pages/admin/Bus/Laporan/LaporanPage'

// ─── AUTH CONTEXT ────────────────────────────────────────────
interface AuthContextType {
  role: string | null
  isAdmin: boolean
  login: (role: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<string | null>(() => {
    return localStorage.getItem('login') === 'true'
      ? localStorage.getItem('role')
      : null
  })

  const login = (userRole: string) => {
    localStorage.setItem('login', 'true')
    localStorage.setItem('role', userRole)
    setRole(userRole)
  }

  const logout = () => {
    localStorage.removeItem('login')
    localStorage.removeItem('role')
    setRole(null)
  }

  return (
    <AuthContext.Provider value={{ role, isAdmin: role === 'admin', login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}

// ─── ADMIN GUARD ─────────────────────────────────────────────
function AdminRoutes() {
  const { isAdmin } = useAuth()
  return isAdmin ? <MainLayout /> : <Navigate to="/login" replace />
}

// ─── ROUTES ──────────────────────────────────────────────────
function AppRoutes() {
  return (
    <Routes>
      {/* USER ROUTES */}
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/ticketsaya" element={<Ticket />} />
      <Route path="/ticketdetail" element={<TicketDetail />} />

      {/* ADMIN ROUTES */}
      <Route path="/admin/*" element={<AdminRoutes />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profile" element={<AdminProfile />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route path="bus" element={<BusPage />} />
        <Route path="driver" element={<DriverPage />} />
        <Route path="jadwal" element={<JadwalPage />} />
        <Route path="laporan" element={<LaporanPage />} />
      </Route>

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

// ─── APP ─────────────────────────────────────────────────────
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App