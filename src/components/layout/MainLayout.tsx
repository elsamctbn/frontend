import { useState, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from '../admin/Sidebar'

export default function MainLayout() {
  const navigate = useNavigate()

  const [showProfile, setShowProfile] = useState(false)

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('login')
    const role = localStorage.getItem('role')

    if (!isLoggedIn || role !== 'admin') {
      navigate('/login')
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('login')
    localStorage.removeItem('role')

  const totalLogout =
    Number(localStorage.getItem('totalLogout')) || 0

    localStorage.setItem('totalLogout', totalLogout + 1)

    localStorage.setItem('logoutMessage', 'Anda telah logout, silahkan login terlebih dahulu!')

    navigate('/login')
  }

  return (

    <div className="flex min-h-screen bg-[#eef2f7]">

      {/* SIDEBAR */}
      <Sidebar />

      {/* CONTENT */}
      <div className="flex-1 flex flex-col">

        {/* NAVBAR */}
        <div className="bg-white h-[90px] shadow-sm flex items-center justify-between px-14 border-b relative">

          {/* TITLE */}
          <h1 className="text-4xl font-bold text-[#7B2CBF]">

            Dashboard Admin

          </h1>

          {/* PROFILE */}
          <div className="relative">

            {/* BUTTON PROFILE */}
            <button
              onClick={() =>
                setShowProfile(
                  !showProfile
                )
              }
              className="w-14 h-14 rounded-full bg-[#7B2CBF] text-white text-2xl font-bold flex items-center justify-center shadow-lg hover:scale-105 transition"
            >

              A

            </button>

            {/* DROPDOWN */}
            {
              showProfile && (

                <div className="absolute right-0 mt-4 w-[260px] bg-white rounded-3xl shadow-2xl border p-6 z-50">

                  {/* FOTO */}
                  <div className="flex flex-col items-center">

                    <div className="w-20 h-20 rounded-full bg-[#7B2CBF] flex items-center justify-center text-white text-4xl font-bold">

                      A

                    </div>

                    <h1 className="text-2xl font-bold mt-4 text-[#1d2a44]">

                      Admin

                    </h1>

                    <p className="text-gray-500">

                      Super Administrator

                    </p>

                  </div>

                  {/* GARIS */}
                  <div className="border-t my-5"></div>

                  {/* MENU */}
                  <div className="space-y-3">

                    {/* PROFILE */}
                    <button
                      onClick={() => {

                        navigate('/admin/profile')

                        setShowProfile(false)

                      }}
                      className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-100 transition font-semibold text-[#1d2a44]"
                    >

                      👤 Profil Admin

                    </button>

                    {/* PENGATURAN */}
                    <button
                      onClick={() => {

                        navigate('/admin/settings')

                        setShowProfile(false)

                      }}
                      className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-100 transition font-semibold text-[#1d2a44]"
                    >

                      ⚙ Pengaturan

                    </button>

                    {/* LOGOUT */}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white transition font-semibold"
                    >

                      🚪 Logout

                    </button>

                  </div>

                </div>

              )
            }

          </div>

        </div>

        {/* PAGE */}
        <div className="flex-1 p-10 overflow-y-auto">

          <Outlet />

        </div>

      </div>

    </div>
  )
}