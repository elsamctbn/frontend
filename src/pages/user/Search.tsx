import { useState } from 'react'
import {
  Link,
  useNavigate,
} from 'react-router-dom'

import logo from '../../assets/logo.png'

export default function Search() {
  const navigate = useNavigate()

  const [showModal, setShowModal] = useState(false)
  const [showSeatModal, setShowSeatModal] = useState(false)

  const [selectedSeat, setSelectedSeat] = useState('')

  const [nama, setNama] = useState('')
  const [email, setEmail] = useState('')
  const [telepon, setTelepon] = useState('')
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
      <nav className="bg-[#6A1FB5] px-8 py-4 flex items-center justify-between shadow-md">
        <img
          src={logo}
          alt="logo"
          className="h-12"
        />

        <div className="flex items-center gap-10 text-white font-semibold text-xl">
          <Link to="/">Home</Link>

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

      <div className="max-w-5xl mx-auto py-10 px-4">
        <h1 className="text-5xl font-bold text-[#1d2a44] mb-10">
          Jadwal Bus Eldivo
        </h1>

        <div className="space-y-8">
          {buses.map((bus) => (
            <div
              key={bus.id}
              className="bg-white rounded-[35px] shadow-md p-8 hover:shadow-xl transition duration-300"
            >

              <div className="flex items-center gap-4 mb-8">
                <div className="bg-[#7B2CBF] px-4 py-2 rounded-full">
                  <img
                    src={logo}
                    alt="logo"
                    className="h-6"
                  />
                </div>

                <h2 className="text-3xl font-bold text-[#1d1d1d]">
                  Bus Eldivo
                </h2>
              </div>

              <div className="flex items-center justify-between flex-wrap gap-8">
                <div className="grid grid-cols-3 gap-12">
                  <div className="space-y-6">
                    <h3 className="text-3xl font-bold">
                      {bus.fromTime}
                    </h3>

                    <h3 className="text-3xl font-bold">
                      {bus.toTime}
                    </h3>
                  </div>

                  <div className="space-y-6">
                    <p className="text-2xl text-gray-700">
                      {bus.from}
                    </p>

                    <p className="text-2xl text-gray-700">
                      {bus.to}
                    </p>
                  </div>

                  <div className="space-y-6">
                    <p className="text-2xl font-semibold">
                      {bus.duration}
                    </p>

                    <p className="text-3xl font-bold text-[#6A1FB5]">
                      {bus.price}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() =>
                    setShowModal(true)
                  }
                  className="bg-[#7B2CBF] hover:bg-[#6A1FB5] transition text-white font-bold text-2xl px-10 py-3 rounded-2xl"
                >
                  Pesan
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

 
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

      {showSeatModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-[650px] rounded-3xl p-8 shadow-2xl relative">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold">
                Pilih Kursi
              </h2>

              <button
                onClick={() =>
                  setShowSeatModal(false)
                }
                className="text-2xl font-bold"
              >
                ✕
              </button>
            </div>

            <div className="flex justify-end mb-6">
              <div className="border px-4 py-2 rounded-lg font-bold">
                Supir
              </div>
            </div>

            <div className="mb-5">
              <div className="border inline-block px-4 py-2 rounded-lg font-bold">
                Pintu Depan
              </div>
            </div>

            <div className="space-y-4">
              {[
                [
                  'A5',
                  'A4',
                  '',
                  'A3',
                  'A2',
                  'A1',
                ],

                [
                  'B5',
                  'B4',
                  '',
                  'B3',
                  'B2',
                  'B1',
                ],

                [
                  'C5',
                  'C4',
                  '',
                  'C3',
                  'C2',
                  'C1',
                ],

                [
                  'D5',
                  'D4',
                  '',
                  'D3',
                  'D2',
                  'D1',
                ],

                [
                  'E5',
                  'E4',
                  '',
                  'E3',
                  'E2',
                  'E1',
                ],

                [
                  'F5',
                  'F4',
                  '',
                  'F3',
                  'F2',
                  'F1',
                ],
              ].map((row, index) => (
                <div
                  key={index}
                  className="grid grid-cols-6 gap-4"
                >
                  {row.map((seat, i) =>
                    seat === '' ? (
                      <div key={i}></div>
                    ) : (
                      <button
                        key={i}
                        onClick={() =>
                          setSelectedSeat(
                            seat
                          )
                        }
                        className={`border rounded-lg py-2 font-bold transition
                        ${
                          selectedSeat ===
                          seat
                            ? 'bg-[#7B2CBF] text-white border-[#7B2CBF]'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        {seat}
                      </button>
                    )
                  )}
                </div>
              ))}

              <div className="pt-4">
                <div className="border inline-block px-4 py-2 rounded-lg font-bold">
                  Pintu Belakang
                </div>
              </div>

              <div className="grid grid-cols-6 gap-4 pt-2">
                {[
                  'H5',
                  'H4',
                  '',
                  'H3',
                  'H2',
                  'H1',
                ].map((seat, i) =>
                  seat === '' ? (
                    <div key={i}></div>
                  ) : (
                    <button
                      key={i}
                      onClick={() =>
                        setSelectedSeat(
                          seat
                        )
                      }
                      className={`border rounded-lg py-2 font-bold transition
                      ${
                        selectedSeat ===
                        seat
                          ? 'bg-[#7B2CBF] text-white border-[#7B2CBF]'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {seat}
                    </button>
                  )
                )}
              </div>

              <div className="grid grid-cols-6 gap-4">
                {[
                  'I6',
                  'I5',
                  'I4',
                  'I3',
                  'I2',
                  'I1',
                ].map((seat, i) => (
                  <button
                    key={i}
                    onClick={() =>
                      setSelectedSeat(
                        seat
                      )
                    }
                    className={`border rounded-lg py-2 font-bold transition
                    ${
                      selectedSeat ===
                      seat
                        ? 'bg-[#7B2CBF] text-white border-[#7B2CBF]'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {seat}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-center mt-10">
              <button
                onClick={() =>
                  setShowSeatModal(false)
                }
                className="bg-[#7B2CBF] hover:bg-[#6A1FB5] transition text-white px-10 py-3 rounded-xl text-xl font-bold"
              >
                Pilih
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="text-center py-6 text-gray-500 text-lg">
        © 2026 Smart Bus Ticketing System
      </footer>
    </div>
  )
}