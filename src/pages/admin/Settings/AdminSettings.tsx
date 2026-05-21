import { useState } from 'react'

export default function AdminSettings() {

  const [darkMode, setDarkMode] =
    useState(false)

  const [notif, setNotif] =
    useState(true)

  const [bahasa, setBahasa] =
    useState('Indonesia')

  const handleSave = () => {

    alert(
      'Pengaturan berhasil disimpan!'
    )
  }

  return (

    <div className="min-h-screen">

      {/* HEADER */}
      <div className="mb-10">

        <h1 className="text-5xl font-bold text-[#1d2a44]">

          Pengaturan Admin

        </h1>

        <p className="text-gray-500 text-xl mt-3">

          Kelola pengaturan dashboard administrator

        </p>

      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 gap-8">

        {/* CARD THEME */}
        <div className="bg-white rounded-[35px] shadow-xl p-10">

          <div className="flex items-center justify-between">

            <div>

              <h1 className="text-3xl font-bold text-[#1d2a44]">

                🌙 Dark Mode

              </h1>

              <p className="text-gray-500 mt-3 text-lg">

                Aktifkan tampilan gelap untuk dashboard

              </p>

            </div>

            {/* SWITCH */}
            <button
              onClick={() =>
                setDarkMode(!darkMode)
              }
              className={`w-[90px] h-[45px] rounded-full transition flex items-center px-2 ${
                darkMode
                  ? 'bg-[#7B2CBF] justify-end'
                  : 'bg-gray-300 justify-start'
              }`}
            >

              <div className="w-[35px] h-[35px] rounded-full bg-white shadow"></div>

            </button>

          </div>

        </div>

        {/* CARD NOTIF */}
        <div className="bg-white rounded-[35px] shadow-xl p-10">

          <div className="flex items-center justify-between">

            <div>

              <h1 className="text-3xl font-bold text-[#1d2a44]">

                🔔 Notifikasi

              </h1>

              <p className="text-gray-500 mt-3 text-lg">

                Aktifkan notifikasi sistem admin

              </p>

            </div>

            {/* SWITCH */}
            <button
              onClick={() =>
                setNotif(!notif)
              }
              className={`w-[90px] h-[45px] rounded-full transition flex items-center px-2 ${
                notif
                  ? 'bg-[#7B2CBF] justify-end'
                  : 'bg-gray-300 justify-start'
              }`}
            >

              <div className="w-[35px] h-[35px] rounded-full bg-white shadow"></div>

            </button>

          </div>

        </div>

      </div>

      {/* CARD BAHASA */}
      <div className="bg-white rounded-[35px] shadow-xl p-10 mt-8">

        <h1 className="text-3xl font-bold text-[#1d2a44] mb-6">

          🌐 Bahasa Sistem

        </h1>

        <select
          value={bahasa}
          onChange={(e) =>
            setBahasa(e.target.value)
          }
          className="w-full border border-gray-200 rounded-2xl px-6 py-5 text-xl outline-none focus:border-[#7B2CBF]"
        >

          <option>
            Indonesia
          </option>

          <option>
            English
          </option>

          <option>
            Melayu
          </option>

        </select>

      </div>

      {/* CARD KEAMANAN */}
      <div className="bg-white rounded-[35px] shadow-xl p-10 mt-8">

        <h1 className="text-3xl font-bold text-[#1d2a44] mb-8">

          🔒 Keamanan Akun

        </h1>

        <div className="grid grid-cols-2 gap-6">

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Password Baru"
            className="border border-gray-200 rounded-2xl px-6 py-5 text-lg outline-none focus:border-[#7B2CBF]"
          />

          {/* KONFIRM */}
          <input
            type="password"
            placeholder="Konfirmasi Password"
            className="border border-gray-200 rounded-2xl px-6 py-5 text-lg outline-none focus:border-[#7B2CBF]"
          />

        </div>

      </div>

      {/* SAVE BUTTON */}
      <div className="flex justify-end mt-10">

        <button
          onClick={handleSave}
          className="bg-[#7B2CBF] hover:bg-[#6A1FB5] transition text-white px-10 py-5 rounded-2xl text-2xl font-bold shadow-lg"
        >

          Simpan Pengaturan

        </button>

      </div>

    </div>
  )
}