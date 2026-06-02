import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {

  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('user')
  const [logoutMessage, setLogoutMessage] = useState('')

  useEffect(() => {
    const msg = localStorage.getItem('logoutMessage')
    if (msg) {
      setLogoutMessage(msg)
      localStorage.removeItem('logoutMessage')
    }
  }, [])

  const handleLogin = () => {

    const users = JSON.parse(localStorage.getItem('users')) || []

    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    )

    if (!foundUser) {
      alert('Email atau Password salah!')
      return
    }

    // 🔥 ROLE DARI TOMBOL (INI KUNCI)
    localStorage.setItem('login', 'true')
    localStorage.setItem('user', JSON.stringify(foundUser))
    localStorage.setItem('role', role)

    // 🔥 VALIDASI ROLE BIAR GA BISA SALAH MASUK
    if (role === 'admin') {
      navigate('/admin/dashboard')
    } else {
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex flex-col justify-between">

      <div className="flex items-center justify-center flex-1 py-20">

        <div className="bg-white w-[500px] rounded-[35px] px-12 py-14 shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-gray-100">

          <h1 className="text-5xl font-bold text-center text-[#1d2a44] mb-10">
            Login
          </h1>

          {/* ROLE BUTTON (TETEP UI) */}
          <div className="flex gap-4 mb-10">

            <button
              onClick={() => setRole('user')}
              className={`flex-1 py-4 rounded-2xl text-xl font-bold ${
                role === 'user'
                  ? 'bg-[#7B2CBF] text-white'
                  : 'bg-gray-100 text-[#1d2a44]'
              }`}
            >
              Penumpang
            </button>

            <button
              onClick={() => setRole('admin')}
              className={`flex-1 py-4 rounded-2xl text-xl font-bold ${
                role === 'admin'
                  ? 'bg-[#7B2CBF] text-white'
                  : 'bg-gray-100 text-[#1d2a44]'
              }`}
            >
              Admin
            </button>

          </div>

          {logoutMessage && (
            <div className="mb-6 p-3 bg-green-100 text-green-700 rounded-xl text-center">
              {logoutMessage}
            </div>
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-6 py-5 mb-8 rounded-2xl"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border px-6 py-5 mb-10 rounded-2xl"
          />

          <button
            onClick={handleLogin}
            className="w-full bg-[#7B2CBF] text-white py-5 rounded-2xl"
          >
            Login
          </button>

          <p className="text-center mt-10">
            Belum punya akun? <Link to="/register">Daftar</Link>
          </p>

        </div>

      </div>

      <footer className="bg-white py-8 text-center">
        © 2026 Smart Bus Ticketing System
      </footer>

    </div>
  )
}