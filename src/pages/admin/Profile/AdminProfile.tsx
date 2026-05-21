import { useState } from 'react'

export default function AdminProfile() {

  const [nama, setNama] =
    useState('Admin Eldivo')

  const [email, setEmail] =
    useState('admin@gmail.com')

  const [password, setPassword] =
    useState('admin123')

  const [showPassword, setShowPassword] =
    useState(false)

  // SAVE
  const handleSave = () => {

    alert(
      'Profil berhasil diperbarui!'
    )
  }

  return (

    <div className="min-h-screen">

      <div className="mb-10">

        <h1 className="text-5xl font-bold text-[#1d2a44]">

          Profil Admin

        </h1>

        <p className="text-gray-500 text-xl mt-3">

          Kelola informasi akun administrator

        </p>

      </div>

      {/* CARD PROFILE */}
      <div className="bg-white rounded-[40px] shadow-xl overflow-hidden">

        {/* TOP BACKGROUND */}
        <div className="h-[230px] bg-gradient-to-r from-[#7B2CBF] via-[#9D4EDD] to-[#C77DFF] relative">

          {/* CIRCLE */}
          <div className="absolute top-10 right-10 w-40 h-40 bg-white/10 rounded-full"></div>

          <div className="absolute bottom-[-60px] left-12">

            {/* FOTO */}
            <div className="w-[130px] h-[130px] rounded-full bg-white border-[6px] border-white shadow-xl flex items-center justify-center text-[#7B2CBF] text-6xl font-bold">

              A

            </div>

          </div>

        </div>

        {/* CONTENT */}
        <div className="pt-24 px-12 pb-12">

          {/* INFO */}
          <div className="mb-12">

            <h1 className="text-4xl font-bold text-[#1d2a44]">

              Admin Eldivo

            </h1>

            <p className="text-gray-500 text-xl mt-2">

              Super Administrator

            </p>

          </div>

          {/* FORM */}
          <div className="grid grid-cols-2 gap-8">

            {/* NAMA */}
            <div>

              <label className="block text-lg font-semibold mb-3 text-[#1d2a44]">

                Nama Admin

              </label>

              <input
                type="text"
                value={nama}
                onChange={(e) =>
                  setNama(e.target.value)
                }
                className="w-full border border-gray-200 rounded-2xl px-6 py-5 text-lg outline-none focus:border-[#7B2CBF] transition"
              />

            </div>

            {/* EMAIL */}
            <div>

              <label className="block text-lg font-semibold mb-3 text-[#1d2a44]">

                Email

              </label>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="w-full border border-gray-200 rounded-2xl px-6 py-5 text-lg outline-none focus:border-[#7B2CBF] transition"
              />

            </div>

            {/* PASSWORD */}
            <div className="col-span-2">

              <label className="block text-lg font-semibold mb-3 text-[#1d2a44]">

                Password

              </label>

              <div className="relative">

                <input
                  type={
                    showPassword
                      ? 'text'
                      : 'password'
                  }
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  className="w-full border border-gray-200 rounded-2xl px-6 py-5 text-lg outline-none focus:border-[#7B2CBF] transition"
                />

                {/* BUTTON SHOW */}
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-[#7B2CBF] font-bold"
                >

                  {
                    showPassword
                      ? 'Hide'
                      : 'Show'
                  }

                </button>

              </div>

            </div>

          </div>

          {/* BUTTON */}
          <div className="flex justify-end mt-12">

            <button
              onClick={handleSave}
              className="bg-[#7B2CBF] hover:bg-[#6A1FB5] transition text-white px-10 py-5 rounded-2xl text-xl font-bold shadow-lg hover:scale-105"
            >

              Simpan Perubahan

            </button>

          </div>

        </div>

      </div>

      {/* CARD STATISTIK */}
      <div className="grid grid-cols-3 gap-8 mt-10">

        {/* LOGIN */}
        <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition">

          <div className="w-16 h-16 rounded-2xl bg-[#7B2CBF]/10 flex items-center justify-center text-3xl mb-6">

            👤

          </div>

          <h2 className="text-2xl font-bold text-[#1d2a44]">

            Total Login

          </h2>

          <p className="text-5xl font-bold text-[#7B2CBF] mt-4">

            128

          </p>

        </div>

        {/* BUS */}
        <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition">

          <div className="w-16 h-16 rounded-2xl bg-[#7B2CBF]/10 flex items-center justify-center text-3xl mb-6">

            🚌

          </div>

          <h2 className="text-2xl font-bold text-[#1d2a44]">

            Bus Aktif

          </h2>

          <p className="text-5xl font-bold text-[#7B2CBF] mt-4">

            12

          </p>

        </div>

        {/* JADWAL */}
        <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition">

          <div className="w-16 h-16 rounded-2xl bg-[#7B2CBF]/10 flex items-center justify-center text-3xl mb-6">

            📅

          </div>

          <h2 className="text-2xl font-bold text-[#1d2a44]">

            Jadwal Aktif

          </h2>

          <p className="text-5xl font-bold text-[#7B2CBF] mt-4">

            24

          </p>

        </div>

      </div>

    </div>
  )
}