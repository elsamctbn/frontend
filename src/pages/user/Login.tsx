import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Login = () => {
  const navigate = useNavigate()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
      e.preventDefault()
    if(!email.endsWith('@gmail.com')) {
      alert(
        'Email harus menggunakan @gmail.com'
      )
      return
    }

    const user = JSON.parse(
     localStorage.getItem('user')
    )

    if (
      user &&
      email === user.email &&
      password === user.password
    ) {
      localStorage.setItem(
            'login',
            'true'
        )

      alert('login berhasil')
      navigate('/search')
    } else {
      alert('Email atau password salah')
    }

}
  return (
    <div className='bg-slate-100 min-h-screen'>

      <Navbar />

      <div className='flex items-center justify-center py-20 px-6'>

        <div className='bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md'>

          <h1 className='text-4xl font-bold text-center mb-10'>
            Login
          </h1>

          <div className='space-y-5'>

          <form className='space-y-5'>
            <input
              type='email'
              name='email'
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder='Email'
              className='w-full border p-4 rounded-2xl'
            />

            <input
              type='password'
              name='password'
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder='Password'
              className='w-full border p-4 rounded-2xl'
            />

            <button
              onClick={handleLogin}
              className='w-full bg-purple-700 text-white py-4 rounded-2xl font-bold hover:bg-purple-800 transition'>
              Login
              </button> 

              <Link
                  to="/register"
                  className="block text-center mt-4 font-semibold">
                  Belum punya akun? Daftar
              </Link>
              
            </form>
          </div>

        </div>

      </div>

      <Footer />

    </div>
  )
}

export default Login
