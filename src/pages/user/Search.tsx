import { useState } from 'react'
import {
  Link,
  useNavigate,
} from 'react-router-dom'


import logo from '../../assets/logo.png'

export default function Search() {

 const navigate = useNavigate()

  const isLogin =
    localStorage.getItem('login') === 'true'

  const [showModal, setShowModal] =
    useState(false)

  const [showSeatModal, setShowSeatModal] =
    useState(false)

  const [selectedSeat, setSelectedSeat] =
    useState('')

  const [nama, setNama] = useState('')
  const [email, setEmail] = useState('')
  const [telepon, setTelepon] =
    useState('')

  const [tanggalLahir, setTanggalLahir] =
    useState('')

  const buses = [
    {
      id: 1,
      fromTime: '05.30',
      toTime: '06.06',
      from: 'Siantar',
      to: 'Amplas',
      duration: '1 jam 36 menit',
      price: 'Rp 45.000',
    },

    {
      id: 2,
      fromTime: '17.00',
      toTime: '05.00',
      from: 'Siantar',
      to: 'Pekanbaru',
      duration: '12 jam',
      price: 'Rp 175.000',
    },

    {
      id: 3,
      fromTime: '07.00',
      toTime: '09.00',
      from: 'Siantar',
      to: 'Medan',
      duration: '2 jam',
      price: 'Rp 70.000',
    },
  ]

  const handleNext = () => {

    navigate('/payment', {
      state: {
        nama,
        email,
        telepon,
        tanggalLahir,
        kursi: selectedSeat,
      },
    })
  }

  return (

    <div className="min-h-screen bg-[#f3f4f6]">

      {/* NAVBAR */}
      <nav className="bg-[#6A1FB5] px-8 py-4 flex items-center justify-between shadow-md">

        <img
          src={logo}
          alt="logo"
          className="h-12"
        />

        <div className="flex items-center gap-10 text-white font-semibold text-xl">

          <Link to="/">
            Home
          </Link>

          <Link
            to="/search"
            className="font-bold"
          >
            Pesan
          </Link>

          <Link to="/ticket">
            Tiket Saya
          </Link>

          <Link to="/profile">
            Profil
          </Link>

        </div>

      </nav>

      {/* CONTENT */}
      <div className="max-w-5xl-auto py-10 px-6">
        <div className="space-y-6">
          {buses.map((bus) => (
            <div
              key={bus.id}
              className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition"
            >

              {/* HEADER CARD */}
              <div className="flex items-center gap-4 mb-8">

                <div>
                  <h1 className="text-2xl font-bold">
                    Bus Eldivo
                  </h1>

                  <p className="text-gray-500">
                    Ekonomi (AC)
                  </p>
                </div>
              </div>

              {/* ISI CARD */}
              <div className="grid grid-cols-2 items-center gap-10">
                {/* KIRI */}
                <div className="flex items-center gap-10 flex-1">

                  {/* BERANGKAT */}
                  <div>
                   <h1 className="text-2xl font-bold text-[#1d2a44]"> 
                      {bus.fromTime}
                   </h1>

                    <p className="text-gray-500 mt-3 text-lg">
                      {bus.from}
                    </p>
                  </div>

                  {/* GARIS */}
                  <div className="flex items-center flex-1 min-w-[250px]">
                    <div className="h-[2px] bg-gray-300 flex-1"></div>

                    <p className="mx-4 text-gray-400 whitespace-nowrap">
                      {bus.duration}
                    </p>

                    <div className="h-[2px] bg-gray-300 flex-1"></div>
                  </div>

                  {/* TIBA */}
                  <div>
                    <h1 className="text-2xl font-bold text-[#1d2a44]">
                      {bus.toTime}
                    </h1>

                    <p className="text-gray-500 mt-3 text-lg">
                      {bus.to}
                    </p>
                  </div>
                </div>

                {/* KANAN */}
                <div className="flex flex-col items-end justify-start">
                  <h1 className="text-1xl font-bold">
                    {bus.price}/orang
                  </h1>

                  <button
                    onClick={() => {
                      if (!isLogin) {
                        navigate('/login')
                      } else {
                        setShowModal(true)
                      }
                    }}
                    className="mt-6 bg-orange-500 hover:bg-orange-600 transition text-white font-bold text-xl px-8 py-1 rounded-2xl"
                  >
                    Pesan
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL DATA PENUMPANG */}
      {showModal && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
         
          <div className="bg-white w-[800px] rounded-[30px] p-10 relative shadow-2xl">
            <h1 className="text-4xl font-bold text-center mb-10">
              Data Penumpang
            </h1>

            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-6">
             
                <div>
                  <label className="block mb-2 font-medium">
                    Nama Lengkap
                  </label>

                  <input
                    type="text"
                    value={nama}
                    onChange={(e) =>
                      setNama(
                        e.target.value
                      )
                    }
                    placeholder="Masukkan nama lengkap"
                    className="w-full bg-gray-100 rounded-xl px-4 py-3 outline-none"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">
                    E-Mail
                  </label>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(
                        e.target.value
                      )
                    }
                    placeholder="Masukkan email"
                    className="w-full bg-gray-100 rounded-xl px-4 py-3 outline-none"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">
                    Nomor Telepon
                  </label>

                  <input
                    type="text"
                    value={telepon}
                    onChange={(e) =>
                      setTelepon(
                        e.target.value
                      )
                    }
                    placeholder="Masukkan nomor telepon"
                    className="w-full bg-gray-100 rounded-xl px-4 py-3 outline-none"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">
                    Tanggal Lahir
                  </label>

                  <input
                    type="date"
                    value={tanggalLahir}
                    onChange={(e) =>
                      setTanggalLahir(
                        e.target.value
                      )
                    }
                    className="w-full bg-gray-100 rounded-xl px-4 py-3 outline-none"
                  />
                </div>
              </div>

              {/* PILIH KURSI */}
              <div>
                <label className="block mb-2 font-medium">
                  Pilih kursi anda
                </label>

                <button
                  onClick={() =>
                    setShowSeatModal(true)
                  }
                  className="w-full bg-orange-500 hover:bg-orange-600 transition text-white rounded-xl px-4 py-3"
                >

                  {selectedSeat
                    ? `Kursi ${selectedSeat}`
                    : 'Pilih Kursi'}

                </button>
              </div>
            </div>

            {/* BUTTON */}
            <div className="flex items-center justify-center gap-10 mt-12">

              <button
                onClick={() =>
                  setShowModal(false)
                }
                className="bg-black text-white px-12 py-3 rounded-xl text-2xl"
              >
                Batal
              </button>

              <button
                onClick={handleNext}
                className="bg-[#7B2CBF] text-white px-12 py-3 rounded-xl text-2xl"
              >
                Selanjutnya
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  )
}