import {
  useLocation,
  useNavigate,
} from 'react-router-dom'

import {
  useState,
  useEffect,
} from 'react'

import Navbar from '../../components/layout/Navbar'

export default function Payment() {

  const location = useLocation()

  const navigate = useNavigate()

  const data = location.state

  const [isStudent, setIsStudent] =
    useState(true)

  const [selectedPayment, setSelectedPayment] =
    useState('')

  const [showPopup, setShowPopup] =
    useState(false)

  const [isLoading, setIsLoading] =
    useState(false)

  const [minutes, setMinutes] =
    useState(15)

  const [seconds, setSeconds] =
    useState(0)

  const originalPrice = 45000

  const discount =
    isStudent ? 10000 : 0

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
    <Navbar/>
      <div
        className="
          max-w-5xl
          mx-auto
          py-14
          px-4
        "
      >

        <div
          className="
            bg-white
            rounded-[35px]
            shadow-xl
            p-10
          "
        >

          <h1
            className="
              text-4xl
              font-bold
              text-[#1d2a44]
              mb-8
            "
          >
            Rincian Pemesanan
          </h1>

          <div className="border-b mb-8"></div>

          <div className="grid grid-cols-2 gap-16">

            <div
              className="
                space-y-6
                text-xl
              "
            >

              <div className="flex">

                <p
                  className="
                    w-52
                    font-semibold
                  "
                >
                  Nama
                </p>

                <p>
                  : {data?.nama}
                </p>
              </div>

              <div className="flex">

                <p
                  className="
                    w-52
                    font-semibold
                  "
                >
                  E-Mail
                </p>

                <p>
                  : {data?.email}
                </p>
              </div>

              <div className="flex">

                <p
                  className="
                    w-52
                    font-semibold
                  "
                >
                  No. Telp
                </p>

                <p>
                  : {data?.telepon}
                </p>
              </div>

              <div className="flex">

                <p
                  className="
                    w-52
                    font-semibold
                  "
                >
                  Tanggal Lahir
                </p>

                <p>
                  : {data?.tanggalLahir}
                </p>
              </div>
            </div>

            <div
              className="
                space-y-6
                text-xl
              "
            >

              <div className="flex">

                <p
                  className="
                    w-56
                    font-semibold
                  "
                >
                  Tanggal Keberangkatan
                </p>

                <p>
                  : Sabtu, 28 Maret 2026
                </p>
              </div>

              <div className="flex">

                <p
                  className="
                    w-56
                    font-semibold
                  "
                >
                  Tujuan
                </p>

                <p>
                  : Siantar → Amplas
                </p>
              </div>

              <div className="flex">

                <p
                  className="
                    w-56
                    font-semibold
                  "
                >
                  Jam
                </p>

                <p>
                  : 05.30 → 06.06
                </p>
              </div>

              <div className="flex">

                <p
                  className="
                    w-56
                    font-semibold
                  "
                >
                  Kursi
                </p>

                <p>
                  : {data?.kursi}
                </p>
              </div>

              <div className="flex">

                <p
                  className="
                    w-56
                    font-semibold
                  "
                >
                  Harga Awal
                </p>

                <p>
                  : Rp 45.000
                </p>
              </div>

              {
                isStudent && (

                  <div
                    className="
                      flex
                      text-green-600
                    "
                  >

                    <p
                      className="
                        w-56
                        font-semibold
                      "
                    >
                      Diskon Pelajar
                    </p>

                    <p>
                      : - Rp 10.000
                    </p>
                  </div>
                )
              }

              <div
                className="
                  flex
                  text-[#7B2CBF]
                  font-bold
                  text-3xl
                  pt-3
                "
              >

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

          <div>

            <h1
              className="
                text-4xl
                font-bold
                text-[#1d2a44]
                mb-6
              "
            >
              Pelajar / Mahasiswa
            </h1>

            <p
              className="
                text-lg
                text-gray-600
                mb-6
              "
            >
              Dapatkan potongan diskon
              Rp 10.000 khusus pelajar
              dan mahasiswa.
            </p>

            <div
              className="
                flex
                gap-10
                text-xl
              "
            >

              <label
                className="
                  flex
                  items-center
                  gap-3
                  cursor-pointer
                "
              >

                <input
                  type="radio"
                  checked={isStudent}
                  onChange={() =>
                    setIsStudent(true)
                  }
                />

                Ya
              </label>

              <label
                className="
                  flex
                  items-center
                  gap-3
                  cursor-pointer
                "
              >

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

          <div className="mt-16">

            <h1
              className="
                text-4xl
                font-bold
                text-[#1d2a44]
                mb-10
              "
            >
              Metode Pembayaran
            </h1>

            <div className="grid grid-cols-2 gap-8">

              <div
                className="
                  bg-gray-50
                  rounded-3xl
                  p-8
                  border
                "
              >

                <h2
                  className="
                    text-2xl
                    font-bold
                    mb-8
                    text-center
                  "
                >
                  Transfer Bank
                </h2>

                <div
                  className="
                    space-y-5
                    text-xl
                  "
                >

                  {
                    [
                      'BCA',
                      'BRI',
                      'Mandiri',
                      'BNI',
                    ].map((bank) => (

                      <label
                        key={bank}
                        className="
                          flex
                          items-center
                          gap-3
                          cursor-pointer
                        "
                      >

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

              <div
                className="
                  bg-gray-50
                  rounded-3xl
                  p-8
                  border
                "
              >

                <h2
                  className="
                    text-2xl
                    font-bold
                    mb-8
                    text-center
                  "
                >
                  E-Wallet
                </h2>

                <div
                  className="
                    space-y-5
                    text-xl
                  "
                >

                  {
                    [
                      'Gopay',
                      'OVO',
                      'Dana',
                      'QRIS',
                    ].map((wallet) => (

                      <label
                        key={wallet}
                        className="
                          flex
                          items-center
                          gap-3
                          cursor-pointer
                        "
                      >

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

            <div
              className="
                flex
                justify-center
                mt-14
              "
            >

              <button
                onClick={handlePayment}
                className="
                  bg-[#7B2CBF]
                  hover:bg-[#6A1FB5]
                  transition
                  text-white
                  text-2xl
                  font-bold
                  px-16
                  py-4
                  rounded-2xl
                "
              >
                Bayar Sekarang
              </button>
            </div>
          </div>
        </div>
      </div>

      {
        isLoading && (

          <div
            className="
              fixed
              inset-0
              bg-black/50
              flex
              items-center
              justify-center
              z-50
            "
          >

            <div
              className="
                bg-white
                rounded-3xl
                p-10
                text-center
                w-[400px]
              "
            >

              <div
                className="
                  w-16
                  h-16
                  border-4
                  border-[#7B2CBF]
                  border-t-transparent
                  rounded-full
                  animate-spin
                  mx-auto
                  mb-6
                "
              ></div>

              <h1
                className="
                  text-2xl
                  font-bold
                  text-[#1d2a44]
                "
              >
                Memproses Pembayaran...
              </h1>

              <p
                className="
                  text-gray-500
                  mt-2
                "
              >
                Mohon tunggu sebentar
              </p>
            </div>
          </div>
        )
      }

      {
        showPopup && (

          <div
            className="
              fixed
              inset-0
              bg-black/60
              flex
              items-center
              justify-center
              z-50
            "
          >

            <div
              className="
                bg-white
                rounded-[35px]
                p-10
                w-[500px]
                text-center
              "
            >

              <div
                className="
                  w-24
                  h-24
                  bg-green-100
                  rounded-full
                  flex
                  items-center
                  justify-center
                  mx-auto
                  mb-6
                "
              >

                <span className="text-5xl">
                  ✅
                </span>
              </div>

              <h1
                className="
                  text-4xl
                  font-bold
                  text-[#1d2a44]
                  mb-3
                "
              >
                Pembayaran Berhasil
              </h1>

              <p
                className="
                  text-gray-500
                  text-lg
                  mb-8
                "
              >
                Tiket Eldivo kamu berhasil
                dipesan
              </p>

              <div
                className="
                  bg-gray-100
                  rounded-3xl
                  p-6
                  mb-8
                "
              >

                <h2
                  className="
                    text-2xl
                    font-bold
                    mb-4
                  "
                >
                  QRIS Pembayaran
                </h2>

                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=EldivoPayment"
                  alt="QRIS"
                  className="
                    mx-auto
                    rounded-2xl
                  "
                />

                <p
                  className="
                    mt-4
                    text-gray-500
                  "
                >
                  Scan QR untuk pembayaran
                </p>
              </div>

              <div
                className="
                  bg-[#f3f4f6]
                  rounded-2xl
                  p-5
                  mb-8
                "
              >

                <p
                  className="
                    text-lg
                    text-gray-500
                    mb-2
                  "
                >
                  Selesaikan pembayaran dalam
                </p>

                <h1
                  className="
                    text-5xl
                    font-bold
                    text-[#7B2CBF]
                  "
                >

                  {
                    String(minutes).padStart(
                      2,
                      '0'
                    )
                  }

                  :

                  {
                    String(seconds).padStart(
                      2,
                      '0'
                    )
                  }
                </h1>
              </div>

              <button
                onClick={() =>
                  navigate('/ticket', {
                    state: {
                      ...data,
                      isStudent,
                      totalPrice,
                    },
                  })
                }
                className="
                  bg-[#7B2CBF]
                  hover:bg-[#6A1FB5]
                  transition
                  text-white
                  text-2xl
                  font-bold
                  px-12
                  py-4
                  rounded-2xl
                "
              >
                Lihat Tiket
              </button>
            </div>
          </div>
        )
      }
    </div>
  )
}