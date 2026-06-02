import { useState, useEffect } from 'react'

type Bus = {
  id: number
  nama: string
  plat: string
  kapasitas: string
}

export default function BusPage() {

  const [showModal, setShowModal] =
    useState(false)

  const [editId, setEditId] =
    useState<number | null>(null)

  const [deleteId, setDeleteId] =
    useState<number | null>(null)

  const [showDelete, setShowDelete] =
    useState(false)

  const [busList, setBusList] =
    useState<Bus[]>(() => {

      const saved =
        localStorage.getItem('busList')

      if (saved)
        return JSON.parse(saved)

      return [

        {
          id: 1,
          nama: 'Bus Eldivo 1',
          plat: 'BK 2457 BCD',
          kapasitas: '40 Orang',
        },

        {
          id: 2,
          nama: 'Bus Eldivo 2',
          plat: 'BK 7777 ETK',
          kapasitas: '36 Orang',
        },

        {
          id: 3,
          nama: 'Bus Eldivo 3',
          plat: 'BK 9088 AED',
          kapasitas: '40 Orang',
        },

      ]
    })

  useEffect(() => {

    localStorage.setItem(
      'busList',
      JSON.stringify(busList)
    )

  }, [busList])

  const [namaBus, setNamaBus] =
    useState('')

  const [platNomor, setPlatNomor] =
    useState('')

  const [kapasitas, setKapasitas] =
    useState('')

  const simpanBus = () => {

    if (
      !namaBus ||
      !platNomor ||
      !kapasitas
    ) {

      alert('Isi semua data!')

      return
    }

    if (editId !== null) {

      const updated =
        busList.map((bus) =>

          bus.id === editId
            ? {
                ...bus,
                nama: namaBus,
                plat: platNomor,
                kapasitas,
              }
            : bus

        )

      setBusList(updated)

      setEditId(null)

    } else {

      const newBus: Bus = {

        id: Date.now(),

        nama: namaBus,

        plat: platNomor,

        kapasitas,

      }

      setBusList([
        newBus,
        ...busList,
      ])
    }

    setShowModal(false)

    setNamaBus('')
    setPlatNomor('')
    setKapasitas('')
  }

  const confirmDelete = () => {

    setBusList(

      busList.filter(
        (bus) =>
          bus.id !== deleteId
      )

    )

    setDeleteId(null)

    setShowDelete(false)
  }

  return (

    <div className="p-9">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold text-[#1d2a44]">

          Data Bus

        </h1>

        <button
          onClick={() => {

            setShowModal(true)

            setEditId(null)

            setNamaBus('')
            setPlatNomor('')
            setKapasitas('')

          }}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold shadow"
        >

          + Tambah

        </button>

      </div>

      {/* LIST */}
      <div className="space-y-5">

        {busList.map((bus) => (

          <div
            key={bus.id}
            className="
              bg-white
              rounded-2xl
              border
              border-gray-200
              shadow-sm
              p-5
              flex
              justify-between
              items-center
              hover:shadow-md
              transition
            "
          >

            {/* LEFT */}
            <div>

              <div className="
                bg-[#7B2CBF]
                px-4
                py-1.5
                rounded-full
                inline-block
                mb-4
                text-white
                text-sm
                font-medium
              ">

                🚌 Bus Eldivo

              </div>

              <div className="
                space-y-2
                text-base
                text-gray-700
              ">

                <p>

                  Nama Bus :

                  <span className="
                    font-semibold
                    text-[#1d2a44]
                    ml-2
                  ">

                    {bus.nama}

                  </span>

                </p>

                <p>

                  Plat Nomor :

                  <span className="
                    font-semibold
                    text-[#1d2a44]
                    ml-2
                  ">

                    {bus.plat}

                  </span>

                </p>

                <p>
                  Kapasitas :
                  <span className="font-semibold text-[#1d2a44] ml-2">
                    {bus.kapasitas} orang
                  </span>
                </p>

              </div>

            </div>

            {/* RIGHT */}
            <div className="
              flex
              flex-col
              gap-2
            ">

              <button
                onClick={() => {

                  setShowModal(true)

                  setEditId(bus.id)

                  setNamaBus(bus.nama)

                  setPlatNomor(bus.plat)

                  setKapasitas(bus.kapasitas)

                }}
                className="
                  bg-orange-500
                  hover:bg-orange-600
                  text-white
                  px-4
                  py-2
                  rounded-lg
                  text-sm
                  font-medium
                  min-w-[110px]
                "
              >

                🔄 Ubah

              </button>

              <button
                onClick={() => {

                  setDeleteId(bus.id)

                  setShowDelete(true)

                }}
                className="
                  bg-red-500
                  hover:bg-red-600
                  text-white
                  px-4
                  py-2
                  rounded-lg
                  text-sm
                  font-medium
                  min-w-[110px]
                "
              >

                🗑 Hapus

              </button>

            </div>

          </div>

        ))}

      </div>

      {/* MODAL */}
      {showModal && (

        <div className="
          fixed
          inset-0
          bg-black/40
          flex
          items-center
          justify-center
          z-50
        ">

          <div className="
            bg-white
            w-[500px]
            rounded-2xl
            p-10
          ">

            <h1 className="
              text-3xl
              font-bold
              text-center
              mb-8
            ">

              {editId !== null
                ? 'Ubah Bus'
                : 'Tambah Bus'}

            </h1>

            <div className="space-y-5">

              <input
                type="text"
                placeholder="Nama Bus"
                value={namaBus}
                onChange={(e) =>
                  setNamaBus(e.target.value)
                }
                className="
                  w-full
                  border
                  rounded-xl
                  px-4
                  py-3
                "
              />

              <input
                type="text"
                placeholder="Plat Nomor"
                value={platNomor}
                onChange={(e) =>
                  setPlatNomor(e.target.value)
                }
                className="
                  w-full
                  border
                  rounded-xl
                  px-4
                  py-3
                "
              />

              <div className="relative">

                <input
                  type="number"
                  placeholder="Kapasitas"
                  value={kapasitas}
                  onChange={(e) =>
                    setKapasitas(e.target.value)
                  }
                  className="
                    w-full
                    border
                    rounded-xl
                    px-4
                    py-3
                    pr-20
                  "
                />

                <span
                  className="
                    absolute
                    right-4
                    top-1/2
                    -translate-y-1/2
                    text-gray-500
                  "
                >
                  orang
                </span>

              </div>

            </div>

            <div className="
              flex
              justify-between
              mt-10
            ">

              <button
                onClick={() => {

                  setShowModal(false)

                  setEditId(null)

                }}
                className="
                  bg-black
                  text-white
                  px-8
                  py-3
                  rounded-xl
                "
              >

                Batal

              </button>

              <button
                onClick={simpanBus}
                className="
                  bg-[#7B2CBF]
                  text-white
                  px-8
                  py-3
                  rounded-xl
                "
              >

                Simpan

              </button>

            </div>

          </div>

        </div>

      )}

      {/* DELETE */}
      {showDelete && (

        <div className="
          fixed
          inset-0
          bg-black/40
          flex
          items-center
          justify-center
          z-50
        ">

          <div className="
            bg-white
            w-[400px]
            rounded-2xl
            p-8
          ">

            <h1 className="
              text-2xl
              font-bold
              text-center
              mb-8
            ">

              Anda yakin ingin menghapus bus?

            </h1>

            <div className="
              flex
              justify-between
            ">

              <button
                onClick={() => {

                  setShowDelete(false)

                  setDeleteId(null)

                }}
                className="
                  bg-black
                  text-white
                  px-8
                  py-3
                  rounded-xl
                  w-[120px]
                "
              >

                Batal

              </button>

              <button
                onClick={confirmDelete}
                className="
                  bg-[#7B2CBF]
                  text-white
                  px-8
                  py-3
                  rounded-xl
                  w-[120px]
                "
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