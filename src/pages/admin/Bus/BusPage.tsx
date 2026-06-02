import { useState, useEffect } from 'react'

export default function BusPage() {

  const [showModal, setShowModal] =
    useState(false)

  const [editId, setEditId] =
    useState<number | null>(null)

  const [deleteId, setDeleteId] =
    useState<number | null>(null)

  const [showDelete, setShowDelete] =
    useState(false)

  const [busList, setBusList] = useState(() => {
  return JSON.parse(localStorage.getItem('busList')) || [
    {
      id: 1,
      nama: 'Bus Eldivo 1',
      plat: 'BK 2457 BCD',
      kapasitas: '40 orang',
    },
    {
      id: 2,
      nama: 'Bus Eldivo 2',
      plat: 'BK 7777 ETK',
      kapasitas: '36 orang',
    },
    {
      id: 3,
      nama: 'Bus Eldivo 3',
      plat: 'BK 9088 AED',
      kapasitas: '40 orang',
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

  //  SIMPAN BUS 

  const simpanBus = () => {

    // VALIDASI
    if (
      !namaBus ||
      !platNomor ||
      !kapasitas
    ) {

      alert('Isi semua data!')

      return
    }

    //  EDIT 
    if (editId !== null) {

      const updatedBus =
        busList.map((bus) =>

          bus.id === editId
            ? {

                ...bus,

                nama: namaBus,

                plat: platNomor,

                kapasitas: kapasitas,

              }

            : bus
        )

      setBusList(updatedBus)

      setEditId(null)
    }

    //  TAMBAH 
    else {

      const newBus = {

        id: Date.now(),

        nama: namaBus,

        plat: platNomor,

        kapasitas: kapasitas,

      }

      setBusList([
        newBus,
        ...busList,
      ])
    }

    // RESET
    setShowModal(false)

    setNamaBus('')
    setPlatNomor('')
    setKapasitas('')
  }

  // DELETE 

  const confirmDelete = () => {

    const filtered =
      busList.filter(
        (bus) =>
          bus.id !== deleteId
      )

    setBusList(filtered)

    setShowDelete(false)

    setDeleteId(null)
  }

  return (

    <div className="p-10">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">

        <h1 className="text-5xl font-bold text-[#1d2a44]">

          Data Bus

        </h1>

        {/* BUTTON TAMBAH */}
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

      {/* LIST BUS */}
      <div className="space-y-6">

        {
          busList.map((bus) => (

            <div
              key={bus.id}
              className="bg-white rounded-3xl shadow-md p-6 flex justify-between items-center"
            >

              {/* LEFT */}
              <div>

                {/* LOGO */}
                <div className="bg-[#7B2CBF] px-5 py-2 rounded-full inline-block mb-5 text-white font-bold">

                  🚌 Eldivo

                </div>

                <div className="space-y-2 text-lg">

                  <p>

                    Nama Bus :
                    <span className="font-bold ml-2">

                      {bus.nama}

                    </span>

                  </p>

                  <p>

                    Plat Nomor :
                    <span className="font-bold ml-2">

                      {bus.plat}

                    </span>

                  </p>

                  <p>

                    Kapasitas :
                    <span className="font-bold ml-2">

                      {bus.kapasitas}

                    </span>

                  </p>

                </div>

              </div>

              {/* RIGHT */}
              <div className="flex flex-col gap-3">

                {/* UBAH */}
                <button
                  onClick={() => {

                    setShowModal(true)

                    setEditId(bus.id)

                    setNamaBus(bus.nama)

                    setPlatNomor(bus.plat)

                    setKapasitas(bus.kapasitas)

                  }}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg font-semibold"
                >

                  🔄 Ubah

                </button>

                {/* HAPUS */}
                <button
                  onClick={() => {

                    setDeleteId(bus.id)

                    setShowDelete(true)

                  }}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg font-semibold"
                >

                  🗑 Hapus

                </button>

              </div>

            </div>

          ))
        }

      </div>

      {/* MODAL TAMBAH / EDIT */}
      {
        showModal && (

          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white w-[500px] rounded-3xl p-10">

              {/* TITLE */}
              <h1 className="text-4xl font-bold text-center mb-10">

                {
                  editId !== null
                    ? 'Ubah Data Bus'
                    : 'Tambah Data Bus'
                }

              </h1>

              {/* INPUT */}
              <div className="space-y-5">

                {/* NAMA BUS */}
                <input
                  type="text"
                  placeholder="Nama Bus"
                  value={namaBus}
                  onChange={(e) =>
                    setNamaBus(
                      e.target.value
                    )
                  }
                  className="w-full border rounded-xl px-5 py-4 outline-none"
                />

                {/* PLAT */}
                <input
                  type="text"
                  placeholder="Plat Nomor"
                  value={platNomor}
                  onChange={(e) =>
                    setPlatNomor(
                      e.target.value
                    )
                  }
                  className="w-full border rounded-xl px-5 py-4 outline-none"
                />

                {/* KAPASITAS */}
                <input
                  type="text"
                  placeholder="Kapasitas"
                  value={kapasitas}
                  onChange={(e) =>
                    setKapasitas(
                      e.target.value
                    )
                  }
                  className="w-full border rounded-xl px-5 py-4 outline-none"
                />

              </div>

              {/* BUTTON */}
              <div className="flex justify-between mt-10">

                {/* BATAL */}
                <button
                  onClick={() => {

                    setShowModal(false)

                    setEditId(null)

                    setNamaBus('')
                    setPlatNomor('')
                    setKapasitas('')
                  }}
                  className="bg-black text-white px-8 py-3 rounded-xl"
                >

                  Batal

                </button>

                {/* SIMPAN */}
                <button
                  onClick={simpanBus}
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

            <div className="bg-white w-[400px] rounded-3xl p-10">

              {/* TITLE */}
              <h1 className="text-3xl font-bold text-center mb-10">

                Anda yakin ingin menghapus data bus?

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