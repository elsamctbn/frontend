import { Link } from 'react-router-dom'
import { Moon } from 'lucide-react'
import logo from '../../assets/logo.png'

const Navbar = () => {
  return (
    <nav className="bg-[#6F1AB6] text-white px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-lg">
      <div className="flex items-center gap-4">
        <img
          src={logo}
          alt="Eldivo Logo"
          className="h-14 object-contain"
        />

      </div>


      <div className="hidden md:flex items-center gap-10 text-xl font-semibold">
        <Link
          to='/'
          className='hover:text-yellow-300 transition'
        >
          Home
        </Link>

        <Link
          to='/search'
          className='hover:text-yellow-300 transition'
        >
          Pesan
        </Link>

        <Link
          to='/ticket'
          className='hover:text-yellow-300 transition'
        >
          Tiket Saya
        </Link>

        <Link
          to='/profile'
          className='hover:text-yellow-300 transition'
        >
          Profil
        </Link>

        <Link
          to='/login'
          className='hover:text-yellow-300 transition'
        >
          Login
        </Link>

        <button className='bg-white/10 hover:bg-white/20 p-3 rounded-2xl transition'>
          <Moon size={22} />
        </button>

      </div>

    </nav>
  )
}

export default Navbar