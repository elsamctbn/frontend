export default function Dashboard() {

  const busList =
    JSON.parse(localStorage.getItem('busList') || '[]')

  const driverList =
    JSON.parse(localStorage.getItem('driverList') || '[]')

  const jadwalList =
    JSON.parse(localStorage.getItem('jadwalList') || '[]')

  const penumpangList =
    JSON.parse(localStorage.getItem('penumpangList') || '[]')

  const cards = [

    {
      title: 'Total Bus',
      value: busList.length,
      color: 'from-violet-500 to-purple-600',
      icon: '🚌',
    },

    {
      title: 'Total Driver',
      value: driverList.length,
      color: 'from-blue-500 to-cyan-500',
      icon: '🧑‍✈️',
    },

    {
      title: 'Total Jadwal',
      value: jadwalList.length,
      color: 'from-green-500 to-emerald-500',
      icon: '📅',
    },

    {
      title: 'Total Penumpang',
      value: penumpangList.length,
      color: 'from-orange-400 to-orange-500',
      icon: '👥',
    },

  ]

  return (

    <div className="space-y-8">

      {/* HEADER */}
      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-5xl font-bold text-[#1d2a44]">
            Dashboard Admin 👋
          </h1>

          <p className="mt-3 text-gray-500 text-lg">
            Selamat datang kembali di Smart Bus Ticketing System
          </p>

        </div>

        <div className="bg-white px-6 py-4 rounded-2xl shadow border">

          <p className="text-gray-500">
            Selasa, 21 Mei 2026
          </p>

        </div>

      </div>

      {/* CARD SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {cards.map((card, index) => (

          <div
            key={index}
            className={`bg-gradient-to-r ${card.color} rounded-3xl p-7 text-white shadow-xl relative overflow-hidden`}
          >

            <div className="text-5xl mb-5">
              {card.icon}
            </div>

            <p className="text-lg opacity-90">
              {card.title}
            </p>

            <h1 className="text-5xl font-bold mt-2">
              {card.value}
            </h1>

            <div className="absolute -right-6 -bottom-6 text-[120px] opacity-10">
              {card.icon}
            </div>

          </div>

        ))}

      </div>

      {/* CONTENT GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="xl:col-span-2 space-y-6">

          {/* CHART */}
          <div className="bg-white rounded-3xl shadow-lg p-8 border">

            <div className="flex justify-between items-center mb-8">

              <div>

                <h2 className="text-3xl font-bold text-[#1d2a44]">
                  Statistik Penjualan
                </h2>

                <p className="text-gray-500 mt-2">
                  Data tiket 7 hari terakhir
                </p>

              </div>

              <button className="bg-[#7B2CBF] text-white px-5 py-3 rounded-xl">
                Mingguan
              </button>

            </div>

            <div className="h-[300px] flex items-end gap-4">

              {[40, 70, 55, 90, 65, 100, 80].map((value, index) => (

                <div key={index} className="flex-1 flex flex-col items-center">

                  <div
                    style={{ height: `${value}%` }}
                    className="w-full bg-gradient-to-t from-[#7B2CBF] to-[#B983FF] rounded-t-2xl"
                  />

                  <p className="mt-3 text-sm text-gray-500">
                    Hari {index + 1}
                  </p>

                </div>

              ))}

            </div>

          </div>

          {/* TABLE */}
          <div className="bg-white rounded-3xl shadow-lg border p-8">

            <div className="flex justify-between items-center mb-8">

              <h2 className="text-3xl font-bold text-[#1d2a44]">
                Jadwal Terbaru
              </h2>

              <button className="text-[#7B2CBF] font-semibold">
                Lihat Semua →
              </button>

            </div>

            <table className="w-full">

              <thead>

                <tr className="border-b text-left text-gray-500">

                  <th className="pb-5">Bus</th>
                  <th className="pb-5">Asal</th>
                  <th className="pb-5">Tujuan</th>
                  <th className="pb-5">Jam</th>
                  <th className="pb-5">Status</th>

                </tr>

              </thead>

              <tbody>

                <tr className="border-b">

                  <td className="py-5 font-semibold">Eldivo 01</td>
                  <td>Medan</td>
                  <td>Binjai</td>
                  <td>08:00</td>

                  <td>
                    <span className="bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm">
                      Aktif
                    </span>
                  </td>

                </tr>

                <tr className="border-b">

                  <td className="py-5 font-semibold">Eldivo 02</td>
                  <td>Binjai</td>
                  <td>Medan</td>
                  <td>10:00</td>

                  <td>
                    <span className="bg-yellow-100 text-yellow-600 px-4 py-2 rounded-full text-sm">
                      Pending
                    </span>
                  </td>

                </tr>

                <tr>

                  <td className="py-5 font-semibold">Eldivo 03</td>
                  <td>Medan</td>
                  <td>Tebing Tinggi</td>
                  <td>13:00</td>

                  <td>
                    <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm">
                      Berangkat
                    </span>
                  </td>

                </tr>

              </tbody>

            </table>

          </div>

        </div>

        {/* RIGHT */}
        <div className="space-y-6">

          <div className="bg-gradient-to-br from-[#7B2CBF] to-[#B983FF] rounded-3xl p-8 text-white shadow-xl">

            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-4xl mb-6">
              👨‍💼
            </div>

            <h2 className="text-3xl font-bold">Admin</h2>

            <p className="opacity-80 mt-2">
              Super Administrator
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-lg border p-8">

            <h2 className="text-3xl font-bold text-[#1d2a44] mb-8">
              Aktivitas
            </h2>

            <div className="space-y-6">

              <div className="flex items-start gap-4">
                <div className="w-4 h-4 rounded-full bg-green-500 mt-2" />
                <div>
                  <p className="font-semibold">Bus baru ditambahkan</p>
                  <p className="text-gray-500 text-sm">5 menit lalu</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-4 h-4 rounded-full bg-yellow-500 mt-2" />
                <div>
                  <p className="font-semibold">Jadwal diperbarui</p>
                  <p className="text-gray-500 text-sm">20 menit lalu</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-4 h-4 rounded-full bg-blue-500 mt-2" />
                <div>
                  <p className="font-semibold">Driver baru ditambahkan</p>
                  <p className="text-gray-500 text-sm">1 jam lalu</p>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}