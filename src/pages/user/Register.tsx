import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from "../../components/user/Navbar";

export default function Register() {

  const navigate = useNavigate()

  const [nama, setNama] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const isValidEmail = (email) => email.endsWith('@gmail.com')

  const isValidPassword = (password) => {
    const hasNumber = /\d/
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>-]/
    const hasCapital = /[A-Z]/

    return (
      password.length >= 8 &&
      hasNumber.test(password) &&
      hasSymbol.test(password) &&
      hasCapital.test(password)
    )
  }

  const handleRegister = () => {

    if (!nama) return alert('Nama wajib diisi')
    if (!isValidEmail(email)) return alert('Email harus @gmail.com')
    if (!isValidPassword(password))
      return alert('Password minimal 8 karakter + angka + simbol + huruf besar')

    let users = JSON.parse(localStorage.getItem('users')) || []

    const isExist = users.find(u => u.email === email)
    if (isExist) return alert('Email sudah terdaftar!')

    const newUser = {
      nama,
      email,
      password,
      role: 'user' // default user
    }

    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))

    alert('Daftar berhasil!')
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex flex-col justify-between">

      <Navbar />

      <div className="flex items-center justify-center flex-1 py-20">

        <div className="bg-white w-[500px] rounded-[35px] px-12 py-14 shadow border">

          <h1 className="text-5xl font-bold text-center mb-14">
            Register
          </h1>

          <input
            type="text"
            placeholder="Nama"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="w-full border px-6 py-5 mb-8 rounded-2xl"
          />

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
            onClick={handleRegister}
            className="w-full bg-[#7B2CBF] text-white py-5 rounded-2xl"
          >
            Daftar
          </button>

          <p className="text-center mt-10">
            Sudah punya akun? <Link to="/login">Login</Link>
          </p>

        </div>

      </div>

      <footer className="bg-white py-8 text-center">
        © 2026 Smart Bus Ticketing System
      </footer>

    </div>
  )
}