import { useState } from 'react'
import {
  Link,
  useNavigate,
} from 'react-router-dom'

export default function Register() {

  const navigate = useNavigate()

  const [nama, setNama] =
    useState('')

  const [email, setEmail] =
    useState('')

  const [password, setPassword] =
    useState('')

  const handleRegister = () => {

    if (
      !email.endsWith('@gmail.com')
    ) {

      alert(
        'Email harus menggunakan @gmail.com'
      )

      return
    }

    const user = {
      nama,
      email,
      password,
    }

    localStorage.setItem(
      'user',
      JSON.stringify(user)
    )

    alert('Daftar berhasil!')

    navigate('/login')
  }

  return (

    <div className="min-h-screen bg-[#f3f4f6] flex flex-col justify-between">

      {/* CONTENT */}
      <div className="flex items-center justify-center flex-1 py-20">

        {/* CARD REGISTER */}
        <div className="bg-white w-[500px] rounded-[35px] px-12 py-14 shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-gray-100">

          {/* TITLE */}
          <h1 className="text-5xl font-bold text-center text-[#1d2a44] mb-14">
            Register
          </h1>

          {/* NAMA */}
          <input
            type="text"
            placeholder="Nama"
            value={nama}
            onChange={(e) =>
              setNama(e.target.value)
            }
            className="w-full border border-gray-300 rounded-2xl px-6 py-5 text-xl outline-none mb-8"
          />

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full border border-gray-300 rounded-2xl px-6 py-5 text-xl outline-none mb-8"
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full border border-gray-300 rounded-2xl px-6 py-5 text-xl outline-none mb-10"
          />

          {/* BUTTON REGISTER */}
          <button
            onClick={handleRegister}
            className="w-full bg-[#7B2CBF] hover:bg-[#6A1FB5] transition text-white text-2xl font-bold py-5 rounded-2xl"
          >
            Daftar
          </button>

          {/* LOGIN */}
          <p className="text-center text-xl mt-10 text-[#1d2a44]">

            Sudah punya akun?{' '}

            <Link
              to="/login"
              className="font-semibold hover:text-[#7B2CBF]"
            >
              Login
            </Link>

          </p>

        </div>

      </div>

      {/* FOOTER */}
      <footer className="bg-white py-8 text-center text-[#1d2a44] text-xl shadow-inner mt-10">

        © 2026 Smart Bus Ticketing System

      </footer>

    </div>
  )
}