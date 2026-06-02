import { Link } from 'react-router-dom'

import logo from '../../assets/logo.png'

const Navbar = () => {

  return (

    <nav className="bg-[#6F1AB6] text-white sticky top-0 z-50 shadow-lg">

      {/* CONTAINER */}
      <div className="max-w-8xl mx-auto px-8">

        {/* CONTENT */}
        <div className="h-[90px] flex items-center justify-between">

          {/* LOGO */}
          <Link
            to='/'
            className="flex items-center"
          >

            <img
              src={logo}
              alt="Eldivo Logo"
              className="h-14 object-contain"
            />

          </Link>

          {/* MENU */}
          <div className="hidden md:flex items-center gap-10 text-xl font-semibold">

            {/* HOME */}
            <Link
              to='/'
              className='hover:text-yellow-300 transition duration-300'
            >

              Home

            </Link>

            {/* PESAN */}
            <Link
              to='/search'
              className='hover:text-yellow-300 transition duration-300'
            >

              Pesan

            </Link>

            {/* TIKET */}
            <Link
              to='/ticketsaya'
              className='hover:text-yellow-300 transition duration-300'
            >

              Tiket Saya

            </Link>

            {/* PROFILE */}
            <Link
              to='/profile'
              className='hover:text-yellow-300 transition duration-300'
            >

              Profil

            </Link>

          </div>

        </div>

      </div>

    </nav>

  )
}

export default Navbar