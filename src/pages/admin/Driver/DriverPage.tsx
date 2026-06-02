import { useState, useEffect } from 'react'

export default function DriverPage() {

  // STATE 

  const [showModal, setShowModal] =
    useState(false)

  const [editId, setEditId] =
    useState<number | null>(null)

  const [deleteId, setDeleteId] =
    useState<number | null>(null)

  const [showDelete, setShowDelete] =
    useState(false)

  const [driverList, setDriverList] = useState(() => {
    return JSON.parse(localStorage.getItem('driverList')) || [
        {
        id: 1,
        nama: 'Bagas Pratama',
        nohp: '0856778331',
        alamat: 'Jl. Jakarta no.8',
      },

      {
        id: 2,
        nama: 'Dika Putra',
        nohp: '081765438',
        alamat: 'Jl. Cengkareng no 9',
      },

      {
        id: 3,
        nama: 'Adit',
        nohp: '081278869',
        alamat: 'Jl. Sumber no.10',
      },
    ]

  })

        useEffect(() => {
          localStorage.setItem(
            'driverList',
            JSON.stringify(driverList)
          )
        }, [driverList])

        
  const [namaDriver, setNamaDriver] =
    useState('')

  const [noHp, setNoHp] =
    useState('')

  const [alamat, setAlamat] =
    useState('')

  // SIMPAN DRIVER 

  const simpanDriver = () => {

    // VALIDASI
    if (
      !namaDriver ||
      !noHp ||
      !alamat
    ) {

      alert('Isi semua data!')

      return
    }

    // EDIT 
    if (editId !== null) {

      const updatedDriver =
        driverList.map((driver) =>

          driver.id === editId
            ? {

                ...driver,

                nama: namaDriver,

                nohp: noHp,

                alamat: alamat,

              }

            : driver
        )

      setDriverList(updatedDriver)

      setEditId(null)
    }

    //  TAMBAH 
    else {

      const newDriver = {

        id: Date.now(),

        nama: namaDriver,

        nohp: noHp,

        alamat: alamat,

      }

      setDriverList([
        newDriver,
        ...driverList,
      ])
    }

    // RESET
    setShowModal(false)

    setNamaDriver('')
    setNoHp('')
    setAlamat('')
  }

  // DELETE

  const confirmDelete = () => {

    const filtered =
      driverList.filter(
        (driver) =>
          driver.id !== deleteId
      )

    setDriverList(filtered)

    setShowDelete(false)

    setDeleteId(null)
  }

  return (

    <div className="p-9">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold text-[#1d2a44]">

          Data Driver

        </h1>

        {/* BUTTON TAMBAH */}
        <button
          onClick={() => {

            setShowModal(true)

            setEditId(null)

            setNamaDriver('')
            setNoHp('')
            setAlamat('')
          }}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold shadow"
        >

          + Tambah

        </button>

      </div>

      {/* LIST DRIVER */}
      <div className="space-y-5">

        {driverList.map((driver) => (

          <div
            key={driver.id}
            className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex justify-between items-center hover:shadow-md transition"
          >

            {/* LEFT */}
            <div>

              {/* BADGE */}
              <div className="bg-[#7B2CBF] px-4 py-1.5 rounded-full inline-block mb-4 text-white text-sm font-medium">
                🧑‍✈️ Driver Eldivo
              </div>

              {/* DATA */}
              <div className="space-y-2 text-base text-gray-700">

                <p>
                  Nama Driver :
                  <span className="font-semibold text-[#1d2a44] ml-2">
                    {driver.nama}
                  </span>
                </p>

                <p>
                  No. HP :
                  <span className="font-semibold text-[#1d2a44] ml-2">
                    {driver.nohp}
                  </span>
                </p>

                <p>
                  Alamat :
                  <span className="font-semibold text-[#1d2a44] ml-2">
                    {driver.alamat}
                  </span>
                </p>

              </div>

            </div>

            {/* RIGHT */}
            <div className="flex flex-col gap-2">

              <button
                onClick={() => {

                  setShowModal(true)

                  setEditId(driver.id)

                  setNamaDriver(driver.nama)

                  setNoHp(driver.nohp)

                  setAlamat(driver.alamat)

                }}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium min-w-[110px]"
              >
                🔄 Ubah
              </button>

              <button
                onClick={() => {

                  setDeleteId(driver.id)

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

      {/* MODAL TAMBAH / EDIT */}
      {
        showModal && (

          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white w-[500px] rounded-2xl p-10">

              {/* TITLE */}
              <h1 className="text-3xl font-bold text-center mb-8">

                {
                  editId !== null
                    ? 'Ubah Driver'
                    : 'Tambah Driver'
                }

              </h1>

              {/* INPUT */}
              <div className="space-y-5">

                {/* NAMA DRIVER */}
                <input
                  type="text"
                  placeholder="Nama Driver"
                  value={namaDriver}
                  onChange={(e) =>
                    setNamaDriver(
                      e.target.value
                    )
                  }
                  className="w-full border rounded-xl px-4 py-3 outline-none"
                />

                {/* NO HP */}
                <input
                  type="text"
                  placeholder="No.hp"
                  value={noHp}
                  onChange={(e) =>
                    setNoHp(
                      e.target.value
                    )
                  }
                  className="w-full border rounded-xl px-4 py-3 outline-none"
                />

                {/* ALAMAT */}
                <input
                  type="text"
                  placeholder="Alamat"
                  value={alamat}
                  onChange={(e) =>
                    setAlamat(
                      e.target.value
                    )
                  }
                  className="w-full border rounded-xl px-4 py-3 outline-none"
                />

              </div>

              {/* BUTTON */}
              <div className="flex justify-between mt-10">

                {/* BATAL */}
                <button
                  onClick={() => {

                    setShowModal(false)

                    setEditId(null)

                    setNamaDriver('')
                    setNoHp('')
                    setAlamat('')
                  }}
                  className="bg-black text-white px-8 py-3 rounded-xl"
                >

                  Batal

                </button>

                {/* SIMPAN */}
                <button
                  onClick={simpanDriver}
                  className="bg-[#7B2CBF] text-white px-8 py-3 rounded-xl"
                >

                  Simpan

                </button>

              </div>

            </div>

          </div>

        )
      }

      {/* POPUP DELETE */}
      {
        showDelete && (

          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white w-[400px] rounded-2xl p-8">

              {/* TITLE */}
              <h1 className="text-2xl font-bold text-center mb-8">

                Anda yakin ingin menghapus driver?

              </h1>

              {/* BUTTON */}
              <div className="flex justify-between">

                {/* BATAL */}
                <button
                  onClick={() => {

                    setShowDelete(false)

                    setDeleteId(null)

                  }}
                  className="bg-black text-white px-8 py-3 rounded-xl w-[120px]"
                >

                  Batal

                </button>

                {/* YA */}
                <button
                  onClick={confirmDelete}
                  className="bg-[#7B2CBF] text-white px-8 py-3 rounded-xl w-[120px]"
                >

                  Ya

                </button>

              </div>

            </div>

          </div>

        )
      }

    </div>
  )
}