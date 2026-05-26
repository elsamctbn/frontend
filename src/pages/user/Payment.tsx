import {
  useLocation,
  useNavigate,
} from 'react-router-dom'

import {
  useState,
  useEffect,
} from 'react'

import Navbar from "../../components/user/Navbar";

export default function Payment() {

  const location = useLocation()
  const navigate = useNavigate()
  const data = location.state
  const selectedBus = JSON.parse(localStorage.getItem('selectedBus') || '{}')

  const [selectedPayment, setSelectedPayment] =
    useState('')

  const [showPopup, setShowPopup] =
    useState(false)

  const [isLoading, setIsLoading] =
    useState(false)

  const [minutes, setMinutes] =
    useState(90)

  const [seconds, setSeconds] =
    useState(0)

  const originalPrice = parseInt(
    selectedBus.price
      ?.replace('Rp ', '')
      ?.replace(/\./g, '')
      || '0'
  )

  const discount =
    data?.isStudent === true
      ? 10000
      : 0

  const totalPrice =
    originalPrice - discount

  useEffect(() => {

    let timer: any

    if (showPopup) {
      
      timer = setInterval(() => {

        if (seconds > 0) {

          setSeconds(seconds - 1)

        }

        if (seconds === 0) {

          if (minutes === 0) {

            clearInterval(timer)

          } else {

            setMinutes(minutes - 1)

            setSeconds(59)

          }

        }

      }, 1000)

    }

    return () => clearInterval(timer)

  }, [seconds, minutes, showPopup])

  const handlePayment = () => {

    if (!selectedPayment) {

      alert(
        'Pilih metode pembayaran terlebih dahulu'
      )
      return
    }

    setIsLoading(true)

    setTimeout(() => {

      setIsLoading(false)

      setShowPopup(true)

    }, 2500)

  }

  return (

    <div className="min-h-screen bg-[#f3f4f6]">

      <Navbar />

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto py-14 px-4 whitespace-nowrap">

        <div className="bg-white rounded-[35px] shadow-xl p-10">

          {/* TITLE */}
          <h1 className="text-4xl font-bold text-[#1d2a44] mb-8">
            Rincian Pemesanan
          </h1>

          <div className="border-b mb-8"></div>

          {/* CONTENT */}
          <div className="grid grid-cols-2 gap-16 whitaspace-nowrap">

            {/* KIRI */}
            <div className="space-y-6 text-xl">

              <div className="flex">

                <p className="w-52 font-semibold">
                  Nama
                </p>

                <p>
                  : {data?.nama}
                </p>

              </div>

              <div className="flex">

                <p className="w-52 font-semibold">
                  E-Mail
                </p>

                <p>
                  : {data?.email}
                </p>

              </div>

              <div className="flex">

                <p className="w-52 font-semibold">
                  No. Telp
                </p>

                <p>
                  : {data?.telepon}
                </p>

              </div>

              <div className="flex">

                <p className="w-52 font-semibold">
                  Tanggal Lahir
                </p>

                <p>
                  : {data?.tanggalLahir}
                </p>

              </div>

            </div>

            {/* KANAN */}
            <div className="space-y-6 text-xl">

              <div className="flex">

                <p className="w-56 font-semibold">
                  Tanggal Keberangkatan
                </p>

                <p>
                  : {data?.tanggal}
                </p>

              </div>

              <div className="flex">

                <p className="w-56 font-semibold">
                  Tujuan
                </p>

                <p>
                  : {selectedBus.from}
                  {' → '}
                  {selectedBus.to}
                </p>

              </div>

              <div className="flex">

                <p className="w-56 font-semibold">
                  Jam
                </p>

                <p>
                  : {selectedBus.fromTime}
                  {' → '}
                  {selectedBus.toTime}
                </p>

              </div>

              <div className="flex">

                <p className="w-56 font-semibold">
                  Kursi
                </p>

                <p>
                  : {data?.kursi}
                </p>

              </div>

              <div className="flex">

                <p className="w-56 font-semibold">
                  Harga Awal
                </p>

                <p>
                  : {selectedBus.price}
                </p>

              </div>

              {/* DISKON */}
              {
                data?.isStudent === true && (

                  <div className="flex text-green-600">

                    <p className="w-56 font-semibold">
                      Diskon Pelajar
                    </p>

                    <p>
                      : - Rp 10.000
                    </p>

                  </div>
                )
              }

              {/* TOTAL */}
              <div className="flex text-[#7B2CBF] font-bold text-3xl pt-3">

                <p className="w-56">
                  Total Bayar
                </p>

                <p>
                  
                  : Rp{' '}

                  {
                    totalPrice.toLocaleString(
                      'id-ID'
                    )
                  }

                </p>

              </div>

            </div>

          </div>

          <div className="border-b my-12"></div>

          {/* PAYMENT */}
          <div className="mt-16">

            <h1 className="text-4xl font-bold text-[#1d2a44] mb-10">
              Metode Pembayaran
            </h1>

            <div className="grid grid-cols-2 gap-8">

              {/* BANK */}
              <div className="bg-gray-200 rounded-3xl p-8 border">

                <h2 className="text-2xl font-bold mb-8 text-center">
                  Transfer Bank
                </h2>

                <div className="space-y-5 text-xl">

                  {
                    [
                      'BCA',
                      'BRI',
                      'Mandiri',
                      'BNI',
                    ].map((bank) => (

                      <label
                        key={bank}
                        className="flex items-center gap-3 cursor-pointer">

                        <input
                          type="radio"
                          name="payment"
                          onChange={() =>
                            setSelectedPayment(
                              bank
                            )
                          }
                        />

                        {bank}

                      </label>
                    ))
                  }

                </div>

              </div>

              {/* EWALLET */}
              <div className="bg-gray-200 rounded-3xl p-8 border">

                <h2 className="text-2xl font-bold mb-8 text-center">
                  E-Wallet
                </h2>

                <div className="space-y-5 text-xl">

                  {
                    [
                      'Gopay',
                      'OVO',
                      'Dana',
                      'QRIS',
                    ].map((wallet) => (

                      <label
                        key={wallet}
                        className="flex items-center gap-3 cursor-pointer">

                        <input
                          type="radio"
                          name="payment"
                          onChange={() =>
                            setSelectedPayment(
                              wallet
                            )
                          }
                        />

                        {wallet}

                      </label>
                    ))
                  }

                </div>

              </div>

            </div>

            {/* BUTTON */}
            <div className="flex justify-center mt-14">

              <button
                onClick={handlePayment}
                className="bg-[#7B2CBF] hover:bg-[#6A1FB5] transition text-white text-2xl font-bold px-16 py-4 rounded-2xl">
                Bayar Sekarang
              </button>

            </div>

          </div>

        </div>

      </div>

      {/* LOADING */}
      {
        isLoading && (

          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

            <div className="bg-white rounded-3xl p-10 text-center w-[400px]">

              <div className="w-16 h-16 border-4 border-[#7B2CBF] border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>

              <h1 className="text-2xl font-bold text-[#1d2a44]">
                Memproses Pembayaran...
              </h1>

            </div>

          </div>
        )
      }

      {/* POPUP */}
      {
        showPopup && (

          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

            <div className="bg-white rounded-3xl p-10 w-[500px] text-center">

              <h1 className="text-3xl font-bold mb-6 text-[#1d2a44]">
                Scan QR Pembayaran
              </h1>

              {/* QR */}
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=PembayaranBus"
                alt="QRIS"
                className="mx-auto mb-6"/>

              {/* TOTAL */}
              <p className="text-xl font-semibold mb-2">
                Total Pembayaran
              </p>

              <h1 className="text-4xl font-bold text-[#7B2CBF] mb-6">
                Rp{' '}

                {
                  totalPrice.toLocaleString(
                    'id-ID'
                  )
                }

              </h1>

              {/* TIMER */}
              <p className="text-red-500 font-semibold mb-8">
                Selesaikan pembayaran dalam{' '}
                {minutes}:
                {
                  seconds
                    .toString()
                    .padStart(2, '0')
                }
              </p>

              {/* BUTTON */}
              <button

                onClick={() => {

                  // SAVE TICKET
                  localStorage.setItem(

                    'ticketData',

                    JSON.stringify({
                      nama: data?.nama,
                      email: data?.email,
                      telepon: data?.telepon,
                      tanggalLahir: data?.tanggalLahir,
                      tanggal: data?.tanggal,
                      kursi: data?.kursi,
                      totalPrice,
                      isStudent: data?.isStudent,
                      bus: selectedBus,
                    })

                  )
                  navigate('/ticketsaya')
                }}

                className="bg-[#7B2CBF] hover:bg-[#6A1FB5] transition text-white text-xl font-bold px-10 py-3 rounded-2xl">
                Lihat Tiket
              </button>

            </div>

          </div>
        )
      }

    </div>
  )
}