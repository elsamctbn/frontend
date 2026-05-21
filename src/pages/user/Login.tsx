import { useState } from 'react'

import {
  Link,
  useNavigate,
} from 'react-router-dom'

export default function Login() {

  const navigate = useNavigate()

  const [email, setEmail] =
    useState('')

  const [password, setPassword] =
    useState('')

  const [role, setRole] =
    useState('user')

  const handleLogin = () => {

    if (
      role === 'admin'
    ) {

      if (
        email !== 'admin@gmail.com' ||
        password !== 'admin123'
      ) {

        alert(
          'Email atau Password Admin salah!'
        )

        return
      }

    }

    localStorage.setItem(
      'login',
      'true'
    )

    localStorage.setItem(
      'role',
      role
    )

    if (role === 'admin') {

      navigate('/admin/dashboard')

    }

    else {

      navigate('/search')

    }

  }

  return (

    <div className="min-h-screen bg-[#f3f4f6] flex flex-col justify-between">

      {/* CONTENT */}
      <div className="flex items-center justify-center flex-1 py-20">

        {/* CARD LOGIN */}
        <div className="bg-white w-[500px] rounded-[35px] px-12 py-14 shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-gray-100">

          {/* TITLE */}
          <h1 className="text-5xl font-bold text-center text-[#1d2a44] mb-10">

            Login

          </h1>

          {/* PILIH ROLE */}
          <div className="flex gap-4 mb-10">

            {/* USER */}
            <button
              onClick={() =>
                setRole('user')
              }
              className={`flex-1 py-4 rounded-2xl text-xl font-bold transition ${
                role === 'user'
                  ? 'bg-[#7B2CBF] text-white'
                  : 'bg-gray-100 text-[#1d2a44]'
              }`}
            >

              Penumpang

            </button>

            {/* ADMIN */}
            <button
              onClick={() =>
                setRole('admin')
              }
              className={`flex-1 py-4 rounded-2xl text-xl font-bold transition ${
                role === 'admin'
                  ? 'bg-[#7B2CBF] text-white'
                  : 'bg-gray-100 text-[#1d2a44]'
              }`}
            >

              Admin

            </button>

          </div>

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

          {/* BUTTON LOGIN */}
          <button
            onClick={handleLogin}
            className="w-full bg-[#7B2CBF] hover:bg-[#6A1FB5] transition text-white text-2xl font-bold py-5 rounded-2xl"
          >

            Login

          </button>

          {/* REGISTER */}
          <p className="text-center text-xl mt-10 text-[#1d2a44]">

            Belum punya akun?{' '}

            <Link
              to="/register"
              className="font-semibold hover:text-[#7B2CBF]"
            >

              Daftar

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