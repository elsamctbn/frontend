import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'

import Home from './pages/user/Home'
import Search from './pages/user/Search'
import Login from './pages/user/Login'
import Payment from './pages/user/Payment'
import Profile from './pages/user/Profile'
import Ticket from './pages/user/Ticket'
import Register from './pages/user/Register'
import { useState } from 'react'

function App() {
  const [darkMode, setDarkMode] =
    useState(false)

  return (
    
    <BrowserRouter>

      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/search"
          element={<Search />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />} 
        />

        <Route
          path="/payment"
          element={<Payment />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/ticketsaya"
          element={<Ticket />}
        />

        <Route
          path="/ticket"
          element={<Ticket />}
        />

      </Routes>

    </BrowserRouter>
  )
}

export default App