import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from "../../components/user/Navbar";

export default function Register() {

  const navigate = useNavigate()

  const [nama, setNama] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  //VALIDASI EMAIL
  const isValidEmail = (email) => {
    return email.endsWith('@gmail.com')
  }

  //VALIDASI PASSWORD
  const isValidPassword = (password) => {
    const hasNumber = /\d/
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/

    return (
      password.length >= 6 &&
      hasNumber.test(password) &&
      hasSymbol.test(password)
    )
  }

  const handleRegister = () => {

    if (!nama) {
      alert('Nama wajib diisi')
      return
    }

    if (!isValidEmail(email)) {
      alert('Email harus menggunakan @gmail.com')
      return
    }

    if (!isValidPassword(password)) {
      alert('Password minimal 6 karakter, harus ada angka & simbol')
      return
    }

    const user = {
      nama,
      email,
      password,
    }

    localStorage.setItem('user', JSON.stringify(user))

    alert('Daftar berhasil!')

    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex flex-col justify-between">

      <Navbar />

      {/* CONTENT */}
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