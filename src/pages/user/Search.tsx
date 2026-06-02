import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import {
  useNavigate,
} from 'react-router-dom'

import Navbar from "../../components/user/Navbar";

export default function Search() {

  const navigate = useNavigate()

  const location = useLocation()
    const user = JSON.parse(
      localStorage.getItem('user') || '{}'
    )

    const {
      fromCity,
      fromTerminal,
      toCity,
      toTerminal,
      tanggal,
    } = location.state || {}

  const isLogin =
    localStorage.getItem('login') === 'true'

  const [showModal, setShowModal] =
    useState(false)

  const [showSeatModal, setShowSeatModal] =
    useState(false)

  const [selectedSeat, setSelectedSeat] =
    useState<string[]>([])

  const [bookedSeats, setBookedSeats] = 
    useState<string[]>(() => {

    const savedSeats = 
      localStorage.getItem('bookedSeats')
    
    return savedSeats
      ? JSON.parse(savedSeats)
      : []
    })

  const [selectedBus, setSelectedBus] =
    useState<any>(null)

  const [nama, setNama] =
    useState(user.nama || '')

  const [email, setEmail] =
    useState(user.email || '')

  const [telepon, setTelepon] =
    useState(user.telepon || '')

  const [tanggalLahir, setTanggalLahir] = useState('')

  const handleTanggalLahir = (e) => {
    const selectedDate = e.target.value 
    const today = new Date().toISOString().split('T')[0]

    if (selectedDate >= today) {
      alert('Tanggal lahir tidak valid')
      return 
    }
    
    setTanggalLahir(selectedDate)
  }

  const [isStudent, setIsStudent] =
    useState(true)

  const buses = [

    {
      id: 1,
      fromTime: '05.30',
      toTime: '06.06',
      from: fromTerminal,
      to: toTerminal,
      duration: '1 jam 36 menit',
      price: 'Rp 45.000',
    },

    {
      id: 2,
      fromTime: '17.00',
      toTime: '05.00',
      from: fromTerminal,
      to: toTerminal,
      duration: '12 jam',
      price: 'Rp 175.000',
    },

    {
      id: 3,
      fromTime: '07.00',
      toTime: '09.00',
      from: fromTerminal,
      to: toTerminal,
      duration: '2 jam',
      price: 'Rp 70.000',
    },

  ]

  // NEXT
  const handleNext = () => {
    const hargaAsli =
      parseInt(
        selectedBus.price
          .replace('Rp ', '')
          .replace('.', '')
      )

      const hargaPerOrang =
        isStudent 
          ? hargaAsli - 10000
          : hargaAsli

      const totalPrice = hargaPerOrang

    localStorage.setItem(
      'selectedBus',
      JSON.stringify(selectedBus)
    )

    navigate('/payment', {
      state: {
        nama,
        email,
        telepon,
        tanggalLahir,
        tanggal,
        fromCity,
        fromTerminal,
        toCity,
        toTerminal,
        kursi: selectedSeat,
        isStudent,
        totalPrice,
      },
    })
  }

  return (

    <div className="min-h-screen bg-[#f3f4f6]">

      <Navbar />

      {/* CONTENT */}
      <div className="py-10 px-6">

        <div className="space-y-6">

          {buses.map((bus) => (

            <div
              key={bus.id}
              className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition"
            >

              {/* HEADER */}
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

              {/* ISI */}
              <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">

                {/* KIRI */}
                <div className="flex items-center gap-10 flex-1">

                  {/* BERANGKAT */}
                  <div>

                    <h1 className="text-2xl font-bold text-[#1d2a44]">
                      {bus.fromTime}
                    </h1>

                    <p className="text-gray-500 mt-3 text-lg whitespace-nowrap">
                      {bus.from}
                    </p>

                  </div>

                  {/* GARIS */}
                  <div className="flex items-center w-full">

                    <div className="h-[2px] bg-gray-300 w-[clamp(100px,50vw,1200px)]"></div>

                    <p className="mx-4 text-gray-400 whitespace-nowrap">
                      {bus.duration}
                    </p>

                    <div className="h-[2px] bg-gray-300 w-[clamp(100px,50vw,1200px)]"></div>

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

                  <h1 className="text-xl font-bold">
                    {bus.price}/orang
                  </h1>

                  <button

                    onClick={() => {

                      // CEK LOGIN
                      if (!isLogin) {
                        navigate('/login')
                        return
                      }

                      // SIMPAN BUS
                      setSelectedBus(bus)

                      localStorage.setItem(
                        'selectedBus',
                        JSON.stringify(bus)
                      )

                      // BUKA MODAL
                      setShowModal(true)
                    }}
                    className="mt-6 bg-orange-500 hover:bg-orange-600 transition text-white font-bold text-xl px-8 py-2 rounded-2xl">
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

          <div className="bg-white w-[800px] rounded-[30px] p-10 shadow-2xl relative">

            <h1 className="text-4xl font-bold text-center mb-10">
              Data Penumpang
            </h1>

            <div className="grid grid-cols-2 gap-8">

              {/* FORM */}
              <div className="space-y-6">

                {/* NAMA */}
                <div>

                  <label className="block mb-2 font-medium">
                    Nama Lengkap
                  </label>

                  <input
                    type="text"
                    value={nama}
                    onChange={(e) =>
                      setNama(e.target.value)
                    }
                    className="w-full bg-gray-100 rounded-xl px-4 py-3 outline-none"
                  />

                </div>

                {/* EMAIL */}
                <div>

                  <label className="block mb-2 font-medium">
                    E-Mail
                  </label>

                  <input
                    type="email"
                    value={email}
                    readOnly
                    className="w-full bg-gray-100 rounded-xl px-4 py-3 outline-none"/>
                </div>

                {/* TELEPON */}
                <div>

                  <label className="block mb-2 font-medium">
                    Nomor Telepon
                  </label>

                  <input
                    type="text"
                    value={telepon}
                    onChange={(e) =>
                      setTelepon(e.target.value)
                    }
                    className="w-full bg-gray-100 rounded-xl px-4 py-3 outline-none"
                  />

                </div>

                {/* TANGGAL LAHIR */}
                <div>

                  <label className="block mb-2 font-medium">
                    Tanggal Lahir
                  </label>

                  <input
                    type="date"
                    value={tanggalLahir}
                    onChange={handleTanggalLahir}
                    className="w-full bg-gray-100 rounded-xl px-4 py-3 outline-none"
                  />

                </div>

                {/* PELAJAR */}
                <div>

                  <label className="block mb-2 font-medium">
                    Pelajar/Mahasiswa
                  </label>

                  <div className="flex gap-10 mt-3">

                    {/* YA */}
                    <label className="flex items-center gap-2">

                      <input
                        type="radio"
                        checked={isStudent}
                        onChange={() =>
                          setIsStudent(true)
                        }
                      />

                      Ya

                    </label>

                    {/* TIDAK */}
                    <label className="flex items-center gap-2">

                      <input
                        type="radio"
                        checked={!isStudent}
                        onChange={() =>
                          setIsStudent(false)
                        }
                      />

                      Tidak

                    </label>

                  </div>

                </div>

              </div>

              {/* KANAN */}
               <div className="space-y-6">
                
              {/* TANGGAL BERANGKAT */}
                <div>

                  <label className="block mb-2 font-medium">
                    Tanggal Keberangkatan
                  </label>

                  <input
                    type="date"
                    value={tanggal}
                    readOnly
                    className="w-full bg-gray-100 rounded-xl px-4 py-3 outline-none"
                  />
                </div>

              <div>

                <label className="block mb-2 font-medium">
                  Pilih kursi anda
                </label>

                <button
                  onClick={() =>
                    setShowSeatModal(true)
                  }
                  className="w-full bg-orange-500 hover:bg-orange-600 transition text-white rounded-xl px-4 py-3 font-bold"
                >

                  {
                    selectedSeat.length > 0
                      ? selectedSeat.join(', ')
                      : 'Pilih Kursi'
                  }

                </button>

              </div>

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

      {/* MODAL PILIH KURSI */}
      {showSeatModal && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">

          <div className="bg-white w-[500px] max-h-[90vh] overflow-auto rounded-3xl p-6 shadow-2xl relative">

            {/* CLOSE */}
            <div className="flex justify-end mb-4">

              <button
                onClick={() =>
                  setShowSeatModal(false)
                }
                className="text-2xl font-bold"
              >
                ✕
              </button>

            </div>

            {/* SUPIR */}
            <div className="flex justify-end mb-6">

              <div className="border px-4 py-2 rounded-lg font-bold">
                Supir
              </div>

            </div>

            {/* PINTU DEPAN */}
            <div className="mb-5">

              <div className="border inline-block px-4 py-2 rounded-lg font-bold">
                Pintu Depan
              </div>

            </div>

            {/* KURSI */}
            <div className="space-y-4">

              {[
                ['A5', 'A4', '', 'A3', 'A2', 'A1'],
                ['B5', 'B4', '', 'B3', 'B2', 'B1'],
                ['C5', 'C4', '', 'C3', 'C2', 'C1'],
                ['D5', 'D4', '', 'D3', 'D2', 'D1'],
                ['E5', 'E4', '', 'E3', 'E2', 'E1'],
                ['F5', 'F4', '', 'F3', 'F2', 'F1'],
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
                        disabled={bookedSeats.includes(seat)}
                        onClick={() => {

                      if (selectedSeat.includes(seat)) {
                          setSelectedSeat(
                          selectedSeat.filter(
                            s => s !== seat
                          )
                        )
                        return
                      }
                      setSelectedSeat([
                        ...selectedSeat,
                        seat
                      ])
                    }}
                        className={`border rounded-lg py-2 font-bold transition

                        ${
                          bookedSeats.includes(seat)
                            ? 'bg-gray-400 text-white cursor-not-allowed'
                            :  selectedSeat.includes(seat)
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

              {/* PINTU BELAKANG */}
              <div className="pt-4">

                <div className="border inline-block px-4 py-2 rounded-lg font-bold">
                  Pintu Belakang
                </div>

              </div>

              {/* BARIS H */}
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
                      disabled={bookedSeats.includes(seat)}
                      onClick={() => {

                        if (selectedSeat.includes(seat)) {
                          setSelectedSeat(
                            selectedSeat.filter(
                              s => s !== seat
                            )
                          )
                          return
                        }

                        setSelectedSeat([
                          ...selectedSeat,
                          seat
                        ])
                      }}

                      className={`border rounded-lg py-2 font-bold transition
                      ${
                        bookedSeats.includes(seat)
                          ? 'bg-gray-400 text-white cursor-not-allowed'
                          :  selectedSeat.includes(seat)
                          ? 'bg-[#7B2CBF] text-white border-[#7B2CBF]'
                          : 'hover:bg-gray-100'
                      }`}
                    >

                      {seat}

                    </button>

                  )

                )}

              </div>

              {/* BARIS I */}
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
                    disabled={bookedSeats.includes(seat)}
                    onClick={() => {
                      if (selectedSeat.includes(seat)) {
                        setSelectedSeat(
                          selectedSeat.filter(
                            s => s !== seat
                          )
                        )
                        return
                      }

                      setSelectedSeat([
                        ...selectedSeat,
                        seat
                      ])
                    }}
                    className={`border rounded-lg py-2 font-bold transition
                    ${
                      bookedSeats.includes(seat)
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        :  selectedSeat.includes(seat)
                        ? 'bg-[#7B2CBF] text-white border-[#7B2CBF]'
                        : 'hover:bg-gray-100'
                    }`}
                  >

                    {seat}

                  </button>

                ))}

              </div>

            </div>

            {/* BUTTON PILIH */}
            <div className="flex justify-center mt-10">

              <button
                  onClick={() => {
                    const updatedSeats = [
                      ...bookedSeats,
                      ...selectedSeat
                    ]

                    setBookedSeats(updatedSeats)

                    localStorage.setItem(
                      'bookedSeats',
                      JSON.stringify(updatedSeats)
                    )

                    setShowSeatModal(false)
                  }}
          
                className="bg-[#7B2CBF] hover:bg-[#6A1FB5] transition text-white px-10 py-3 rounded-xl text-xl font-bold">
                Pilih
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  )
}