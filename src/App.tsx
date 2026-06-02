import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

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

function App() {
const isAdminLogin =
  localStorage.getItem('login') === 'true' &&
  localStorage.getItem('role') === 'admin'
  return (

    <BrowserRouter>

      <Routes>

        {/* HOME */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* SEARCH */}
        <Route
          path="/search"
          element={<Search />}
        />

        {/* LOGIN */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* REGISTER */}
        <Route
          path="/register"
          element={<Register />}
        />

        {/* PAYMENT */}
        <Route
          path="/payment"
          element={<Payment />}
        />

        {/* PROFILE */}
        <Route
          path="/profile"
          element={<Profile />}
        />

        {/* TIKET SAYA */}
        <Route
          path="/ticketsaya"
          element={<Ticket />}
        />

        {/* DETAIL TIKET */}
        <Route
          path="/ticketdetail"
          element={<TicketDetail />}
        />

        <Route
          path="/admin"
          element={
            isAdminLogin
              ? <MainLayout />
              : <Navigate to="/login" />
          }
         >

          {/* DASHBOARD */}
          <Route
            path="dashboard"
            element={<Dashboard />}
          />

          {/* PROFILE ADMIN */}
          <Route
            path="profile"
            element={<AdminProfile />}
          />

          {/* SETTINGS ADMIN */}
          <Route
            path="settings"
            element={<AdminSettings />}
          />

          {/* BUS */}
          <Route
            path="bus"
            element={<BusPage/>}
          />

          {/* DRIVER */}
          <Route
            path="Driver"
            element={<DriverPage/>}
          />

        </Route>

      </Routes>

    </BrowserRouter>
  )
}

export default App