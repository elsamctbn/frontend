import {
  Link,
  useLocation,
} from 'react-router-dom'

const Sidebar = () => {

  const location = useLocation()

  const menus = [

    {
      name: 'Dashboard',
      path: '/admin/dashboard',
    },

    {
      name: 'Bus',
      path: '/admin/bus',
    },

    {
      name: 'Driver',
      path: '/admin/driver',
    },

    {
      name: 'Jadwal',
      path: '/admin/jadwal',
    },

    {
      name: 'Laporan',
      path: '/admin/laporan',
    },

  ]

  return (

    <div className='w-64 bg-[#7B2CBF] text-white min-h-screen p-6'>

      {/* TITLE */}
      <h1 className='text-3xl font-bold mb-10'>

        Admin Panel

      </h1>

      {/* MENU */}
      <div className='flex flex-col gap-3'>

        {
          menus.map((menu) => (

            <Link
              key={menu.path}
              to={menu.path}
              className={`px-4 py-3 rounded-xl transition font-semibold ${
                location.pathname === menu.path
                  ? 'bg-white text-[#7B2CBF]'
                  : 'hover:bg-white/20'
              }`}
            >

              {menu.name}

            </Link>

          ))
        }

      </div>

    </div>

  )
}

export default Sidebar