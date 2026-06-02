import { useState } from 'react'

type Rute = {
  id: number
  asal: string
  tujuan: string
  estimasi: string
}

export default function RutePage() {

  // ================= STATE =================

  const [showModal, setShowModal] =
    useState(false)

  const [editId, setEditId] =
    useState<number | null>(null)

  const [deleteId, setDeleteId] =
    useState<number | null>(null)

  const [showDelete, setShowDelete] =
    useState(false)

  const [ruteList, setRuteList] =
    useState<Rute[]>([
      {
        id: 1,
        asal: 'Siantar',
        tujuan: 'Amplas',
        estimasi: '1 Jam 36 Menit',
      },

      {
        id: 2,
        asal: 'Siantar',
        tujuan: 'Pekanbaru',
        estimasi: '12 Jam',
      },

      {
        id: 3,
        asal: 'Siantar',
        tujuan: 'Medan',
        estimasi: '2 Jam',
      },
    ])

  const [asal, setAsal] =
    useState('')

  const [tujuan, setTujuan] =
    useState('')

  const [estimasi, setEstimasi] =
    useState('')

  // ================= SIMPAN =================

  const simpanRute = () => {

    if (
      !asal ||
      !tujuan ||
      !estimasi
    ) {
      alert('Isi semua data!')
      return
    }

    // EDIT
    if (editId !== null) {

      const updated =
        ruteList.map((rute) =>
          rute.id === editId
            ? {
                ...rute,
                asal,
                tujuan,
                estimasi,
              }
            : rute
        )

      setRuteList(updated)

      setEditId(null)

    }

    // TAMBAH
    else {

      const newRute: Rute = {
        id: Date.now(),
        asal,
        tujuan,
        estimasi,
      }

      setRuteList([
        ...ruteList,
        newRute,
      ])
    }

    setShowModal(false)

    setAsal('')
    setTujuan('')
    setEstimasi('')
  }

  // ================= DELETE =================

  const confirmDelete = () => {

    const filtered =
      ruteList.filter(
        (rute) =>
          rute.id !== deleteId
      )

    setRuteList(filtered)

    setShowDelete(false)

    setDeleteId(null)
  }

  return (

    <div className="p-9">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold text-[#1d2a44]">
          Data Rute
        </h1>

        <button
          onClick={() => {

            setShowModal(true)

            setEditId(null)

            setAsal('')
            setTujuan('')
            setEstimasi('')

          }}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold shadow"
        >
          + Tambah
        </button>

      </div>

        {/* LIST RUTE */}
        <div className="space-y-5">

        {ruteList.map((rute) => (

            <div
            key={rute.id}
            className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex justify-between items-center hover:shadow-md transition"
            >

            {/* LEFT */}
            <div>

                <div className="bg-[#7B2CBF] px-4 py-1.5 rounded-full inline-block mb-4 text-white text-sm font-medium">
                🛣️ Rute Eldivo
                </div>

                <div className="space-y-2 text-base text-gray-700">

                <p>
                    Kota Asal :
                    <span className="font-semibold text-[#1d2a44] ml-2">
                    {rute.asal}
                    </span>
                </p>

                <p>
                    Kota Tujuan :
                    <span className="font-semibold text-[#1d2a44] ml-2">
                    {rute.tujuan}
                    </span>
                </p>

                <p>
                    Estimasi :
                    <span className="font-semibold text-[#1d2a44] ml-2">
                    {rute.estimasi}
                    </span>
                </p>

                </div>

            </div>

            {/* RIGHT */}
            <div className="flex flex-col gap-2">

                <button
                onClick={() => {

                    setShowModal(true)

                    setEditId(rute.id)

                    setAsal(rute.asal)

                    setTujuan(rute.tujuan)

                    setEstimasi(rute.estimasi)

                }}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium min-w-[110px]"
                >
                🔄 Ubah
                </button>

                <button
                onClick={() => {

                    setDeleteId(rute.id)

                    setShowDelete(true)

                }}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium min-w-[110px]"
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
                ? 'Ubah Data Rute'
                : 'Tambah Rute'}

            </h1>

            <div className="space-y-5">

              <input
                placeholder="Kota Asal"
                value={asal}
                onChange={(e) =>
                  setAsal(e.target.value)
                }
                className="w-full border rounded-xl px-5 py-4"
              />

              <input
                placeholder="Kota Tujuan"
                value={tujuan}
                onChange={(e) =>
                  setTujuan(e.target.value)
                }
                className="w-full border rounded-xl px-5 py-4"
              />

              <input
                placeholder="Estimasi Waktu"
                value={estimasi}
                onChange={(e) =>
                  setEstimasi(e.target.value)
                }
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
                onClick={simpanRute}
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
              Hapus rute?
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