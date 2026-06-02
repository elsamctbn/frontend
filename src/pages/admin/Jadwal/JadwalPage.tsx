import { useState } from 'react'

type Jadwal = {
  id: number
  namaBus: string
  route: string
  jam: string
  lama: string
  harga: string
}

export default function JadwalPage() {

  // ================= STATE =================

  const [showModal, setShowModal] =
    useState(false)

  const [editId, setEditId] =
    useState<number | null>(null)

  const [deleteId, setDeleteId] =
    useState<number | null>(null)

  const [showDelete, setShowDelete] =
    useState(false)

  const [jadwalList, setJadwalList] =
    useState<Jadwal[]>([

      {
        id: 1,
        namaBus: 'Bus Eldivo',
        route: 'Siantar - Amplas',
        jam: '05.30 - 06.06',
        lama: '1 jam 36 menit',
        harga: 'Rp 45.000',
      },

      {
        id: 2,
        namaBus: 'Bus Eldivo',
        route: 'Siantar - Pekanbaru',
        jam: '17.00 - 05.00',
        lama: '12 jam',
        harga: 'Rp 175.000',
      },

      {
        id: 3,
        namaBus: 'Bus Eldivo',
        route: 'Siantar - Medan',
        jam: '07.00 - 09.00',
        lama: '2 jam',
        harga: 'Rp 70.000',
      },

    ])

  const [namaBus, setNamaBus] =
    useState('')

  const [route, setRoute] =
    useState('')

  const [jam, setJam] =
    useState('')

  const [lama, setLama] =
    useState('')

  const [harga, setHarga] =
    useState('')

  // ================= SIMPAN =================

  const simpanJadwal = () => {

    if (
      !namaBus ||
      !route ||
      !jam ||
      !lama ||
      !harga
    ) {
      alert('Isi semua data!')
      return
    }

    // EDIT
    if (editId !== null) {

      const updated =
        jadwalList.map((jadwal) =>
          jadwal.id === editId
            ? {
                ...jadwal,
                namaBus,
                route,
                jam,
                lama,
                harga,
              }
            : jadwal
        )

      setJadwalList(updated)
      setEditId(null)
    }

    // TAMBAH
    else {

      const newJadwal: Jadwal = {
        id: Date.now(),
        namaBus,
        route,
        jam,
        lama,
        harga,
      }

      setJadwalList([
        ...jadwalList,
        newJadwal,
      ])
    }

    // RESET
    setShowModal(false)

    setNamaBus('')
    setRoute('')
    setJam('')
    setLama('')
    setHarga('')
  }

  // ================= DELETE =================

  const confirmDelete = () => {

    const filtered =
      jadwalList.filter(
        (jadwal) =>
          jadwal.id !== deleteId
      )

    setJadwalList(filtered)

    setShowDelete(false)
    setDeleteId(null)
  }

  return (

    <div className="p-10">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">

        <h1 className="text-5xl font-bold text-[#1d2a44]">
          Jadwal Bus
        </h1>

        <button
          onClick={() => {
            setShowModal(true)
            setEditId(null)

            setNamaBus('')
            setRoute('')
            setJam('')
            setLama('')
            setHarga('')
          }}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold shadow"
        >
          + Tambah
        </button>

      </div>

      {/* LIST */}
      <div className="space-y-6">

        {jadwalList.map((jadwal) => (

          <div
            key={jadwal.id}
            className="bg-white rounded-3xl shadow-md p-6 flex justify-between items-center"
          >

            {/* LEFT */}
            <div className="flex-1">

              <div className="flex justify-between items-center">

                <div>

                  <h1 className="text-3xl font-bold text-[#1d2a44]">
                    {jadwal.namaBus}
                  </h1>

                  <p className="text-gray-500">
                    Ekonomi (AC)
                  </p>

                </div>

                <div className="text-right">

                  <h1 className="font-bold text-xl">
                    {jadwal.harga}/orang
                  </h1>

                </div>

              </div>

              {/* ROUTE */}
              <div className="flex items-center mt-8">

                <div>
                  <h1 className="text-3xl font-bold">
                    {jadwal.jam?.split('-')[0]}
                  </h1>

                  <p className="text-gray-500 mt-2">
                    {jadwal.route?.split('-')[0]}
                  </p>
                </div>

                <div className="flex-1 mx-8">
                  <div className="border-t border-gray-300 relative">
                    <p className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white px-3 text-gray-400">
                      {jadwal.lama}
                    </p>
                  </div>
                </div>

                <div>
                  <h1 className="text-3xl font-bold">
                    {jadwal.jam?.split('-')[1]}
                  </h1>

                  <p className="text-gray-500 mt-2">
                    {jadwal.route?.split('-')[1]}
                  </p>
                </div>

              </div>

            </div>

            {/* BUTTON */}
            <div className="flex flex-col gap-3 ml-10">

              <button
                onClick={() => {
                  setShowModal(true)
                  setEditId(jadwal.id)

                  setNamaBus(jadwal.namaBus)
                  setRoute(jadwal.route)
                  setJam(jadwal.jam)
                  setLama(jadwal.lama)
                  setHarga(jadwal.harga)
                }}
                className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg font-semibold"
              >
                🔄 Ubah
              </button>

              <button
                onClick={() => {
                  setDeleteId(jadwal.id)
                  setShowDelete(true)
                }}
                className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg font-semibold"
              >
                🗑 Hapus
              </button>

            </div>

          </div>

        ))}

      </div>

      {/* MODAL */}
      {showModal && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white w-[500px] rounded-3xl p-10">

            <h1 className="text-4xl font-bold text-center mb-10">
              {editId !== null
                ? 'Ubah Data Jadwal Bus'
                : 'Tambah Jadwal Bus'}
            </h1>

            <div className="space-y-5">

              <input
                placeholder="Nama Bus"
                value={namaBus}
                onChange={(e) => setNamaBus(e.target.value)}
                className="w-full border rounded-xl px-5 py-4"
              />

              <input
                placeholder="Route"
                value={route}
                onChange={(e) => setRoute(e.target.value)}
                className="w-full border rounded-xl px-5 py-4"
              />

              <input
                placeholder="Jam"
                value={jam}
                onChange={(e) => setJam(e.target.value)}
                className="w-full border rounded-xl px-5 py-4"
              />

              <input
                placeholder="Lama"
                value={lama}
                onChange={(e) => setLama(e.target.value)}
                className="w-full border rounded-xl px-5 py-4"
              />

              <input
                placeholder="Harga"
                value={harga}
                onChange={(e) => setHarga(e.target.value)}
                className="w-full border rounded-xl px-5 py-4"
              />

            </div>

            <div className="flex justify-between mt-10">

              <button
                onClick={() => {
                  setShowModal(false)
                  setEditId(null)
                }}
                className="bg-black text-white px-8 py-3 rounded-xl"
              >
                Batal
              </button>

              <button
                onClick={simpanJadwal}
                className="bg-[#7B2CBF] text-white px-8 py-3 rounded-xl"
              >
                Simpan
              </button>

            </div>

          </div>

        </div>

      )}

      {/* DELETE */}
      {showDelete && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white w-[400px] rounded-3xl p-10">

            <h1 className="text-3xl font-bold text-center mb-10">
              Hapus jadwal bus?
            </h1>

            <div className="flex justify-between">

              <button
                onClick={() => {
                  setShowDelete(false)
                  setDeleteId(null)
                }}
                className="bg-black text-white px-8 py-3 rounded-xl w-[120px]"
              >
                Batal
              </button>

              <button
                onClick={confirmDelete}
                className="bg-[#7B2CBF] text-white px-8 py-3 rounded-xl w-[120px]"
              >
                Ya
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  )
}
