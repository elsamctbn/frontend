import {
  useLocation,
  useNavigate,
} from 'react-router-dom'

import {
  useState,
} from 'react'

import logo from '../../assets/logo.png'

export default function TicketDetail() {

  const location = useLocation()

  const navigate = useNavigate()

  const initialData =
    location.state ||

    JSON.parse(
      localStorage.getItem(
        'ticketData'
      ) || '{}'
    )

  const [ticketData, setTicketData] =
    useState(initialData)

  const bus = ticketData?.bus

  const [showReschedule, setShowReschedule] =
    useState(false)

  const [showSeatModal, setShowSeatModal] =
    useState(false)

  const [showSuccess, setShowSuccess] =
    useState(false)

  const [selectedDate, setSelectedDate] =
    useState('')

  const [selectedSeat, setSelectedSeat] =
    useState('')

  return (

    <div className="min-h-screen bg-[#f3f4f6]">

      {/* NAVBAR */}
      <nav className="bg-[#6A1FB5] px-8 py-4 shadow-md">

        <img
          src={logo}
          alt="logo"
          className="h-12"
        />

      </nav>

      {/* CONTENT */}
      <div className="max-w-5xl mx-auto py-14 px-4">

        <div className="print-ticket bg-white rounded-3xl shadow-lg border p-10">

          {/* TITLE */}
          <h1 className="
            text-5xl
            font-bold
            text-[#1d2a44]
            mb-10
          ">

            Detail Pesanan

          </h1>

          {/* CARD */}
          <div className="
            border
            rounded-3xl
            p-8
          ">

            <div className="flex justify-between">

              {/* LEFT */}
              <div className="space-y-7 text-2xl">

                {/* NAMA */}
                <div className="flex gap-4">

                  <span>👤</span>

                  <p>
                    {ticketData?.nama}
                  </p>

                </div>

                {/* TUJUAN */}
                <div className="flex gap-4">

                  <span>📍</span>

                  <div>

                    <div className="flex gap-5">

                      <p>
                        {bus?.from}
                      </p>

                      <p>→</p>

                      <p>
                        {bus?.to}
                      </p>

                    </div>

                    <div className="
                      flex
                      gap-5
                      text-gray-600
                    ">

                      <p>
                        {bus?.fromTime}
                      </p>

                      <p>→</p>

                      <p>
                        {bus?.toTime}
                      </p>

                    </div>

                  </div>

                </div>

                {/* TANGGAL */}
                <div className="flex gap-4">

                  <span>📅</span>

                  <p>
                    {ticketData?.tanggal}
                  </p>

                </div>

                {/* KURSI */}
                <div className="flex gap-4">

                  <span>🪑</span>

                  <p>
                    Kursi {ticketData?.kursi}
                  </p>

                </div>

              </div>

              {/* RIGHT */}
              <div className="text-center">

                <p className="
                  text-gray-600
                  mb-4
                ">

                  ID Transaksi :
                  XYZ-23415780

                </p>

                {/* QR */}
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Eldivo"
                  alt="qr"
                  className="mx-auto"
                />

                <h2 className="
                  font-bold
                  text-2xl
                  mt-5
                ">

                  Penumpang

                </h2>

                {/* TOTAL */}
                <h1 className="
                  text-4xl
                  font-bold
                  text-[#7B2CBF]
                  mt-3
                ">

                  TOTAL :
                  Rp{' '}

                  {ticketData?.totalPrice?.toLocaleString(
                    'id-ID'
                  )}

                </h1>

              </div>

            </div>

          </div>

          {/* INFO */}
          <div className="
            border
            rounded-3xl
            p-8
            mt-8
          ">

            <h1 className="
              text-4xl
              font-bold
              mb-8
            ">

              Info Penting & Instruksi

            </h1>

            <div className="
              space-y-6
              text-2xl
            ">

              <p>
                &gt; Tunjukkan e-ticket
                atau QR saat naik bus.
              </p>

              <p>
                &gt; Datanglah{' '}
                <span className="font-bold">
                  15 menit
                </span>{' '}
                sebelum keberangkatan.
              </p>

              <p>
                &gt; Pembatalan maksimal
                dilakukan{' '}
                <span className="font-bold">
                  H-3 hari keberangkatan.
                </span>
              </p>

              <p>
                &gt; Reschedule maksimal{' '}
                <span className="font-bold">
                  H-3 jam keberangkatan.
                </span>
              </p>

            </div>

          </div>

          {/* BUTTON */}
          <div className="
            flex
            justify-between
            mt-10
          ">

            {/* KEMBALI */}
            <button

              onClick={() =>
                navigate('/ticketsaya')
              }

              className="
                bg-[#7B2CBF]
                hover:bg-[#6A1FB5]
                transition
                text-white
                text-2xl
                px-12
                py-4
                rounded-2xl
              "
            >

              Kembali

            </button>

            {/* RESCHEDULE */}
            <button

              onClick={() =>
                setShowReschedule(true)
              }

              className="
                bg-orange-500
                hover:bg-orange-600
                transition
                text-white
                text-2xl
                px-12
                py-4
                rounded-2xl
              "
            >

              Reschedule

            </button>

            {/* CETAK */}
            <button

              onClick={() =>
                window.print()
              }

              className="
                bg-[#7B2CBF]
                hover:bg-[#6A1FB5]
                transition
                text-white
                text-2xl
                px-12
                py-4
                rounded-2xl
              "
            >

              Cetak Tiket

            </button>

          </div>

        </div>

      </div>

      {/* MODAL RESCHEDULE */}
      {
        showReschedule && (

          <div className="
            fixed
            inset-0
            bg-black/50
            flex
            items-center
            justify-center
            z-50
          ">

            <div className="
              bg-white
              w-[700px]
              rounded-3xl
              p-8
              shadow-2xl
            ">

              {/* TITLE */}
              <h1 className="
                text-4xl
                font-bold
                text-center
                mb-8
              ">

                Informasi Tiket

              </h1>

              {/* CARD */}
              <div className="
                border
                rounded-2xl
                p-6
              ">

                <div className="
                  flex
                  justify-between
                ">

                  {/* LEFT */}
                  <div className="
                    space-y-5
                    text-xl
                  ">

                    <div className="flex gap-3">

                      <span>👤</span>

                      <p>
                        {ticketData?.nama}
                      </p>

                    </div>

                    <div className="flex gap-3">

                      <span>📍</span>

                      <div>

                        <div className="flex gap-4">

                          <p>
                            {bus?.from}
                          </p>

                          <p>→</p>

                          <p>
                            {bus?.to}
                          </p>

                        </div>

                        <div className="
                          flex
                          gap-4
                          text-gray-600
                        ">

                          <p>
                            {bus?.fromTime}
                          </p>

                          <p>→</p>

                          <p>
                            {bus?.toTime}
                          </p>

                        </div>

                      </div>

                    </div>

                  </div>

                  {/* RIGHT */}
                  <div className="
                    space-y-5
                    text-xl
                  ">

                    <div className="flex gap-3">

                      <span>📅</span>

                      <p>
                        {ticketData?.tanggal}
                      </p>

                    </div>

                    <div className="flex gap-3">

                      <span>🪑</span>

                      <p>
                        Kursi {ticketData?.kursi}
                      </p>

                    </div>

                    <p className="
                      text-green-600
                      font-bold
                    ">

                      Biaya Reschedule :
                      Gratis

                    </p>

                  </div>

                </div>

              </div>

              {/* FORM */}
              <div className="
                mt-8
                space-y-5
              ">

                {/* TANGGAL */}
                <input

                  type="date"

                  value={selectedDate}

                  onChange={(e) =>
                    setSelectedDate(
                      e.target.value
                    )
                  }

                  className="
                    w-full
                    border
                    rounded-2xl
                    px-5
                    py-4
                    text-xl
                  "
                />

                {/* PILIH KURSI */}
                <button

                  onClick={() =>
                    setShowSeatModal(true)
                  }

                  className="
                    w-full
                    border
                    rounded-2xl
                    px-5
                    py-4
                    text-left
                    text-xl
                    bg-white
                  "
                >

                  {
                    selectedSeat
                      ? selectedSeat
                      : 'Pilih Kursi'
                  }

                </button>

              </div>

              {/* BUTTON */}
              <div className="
                flex
                justify-between
                mt-10
              ">

                {/* KEMBALI */}
                <button

                  onClick={() =>
                    setShowReschedule(false)
                  }

                  className="
                    bg-[#7B2CBF]
                    hover:bg-[#6A1FB5]
                    transition
                    text-white
                    text-2xl
                    px-12
                    py-4
                    rounded-2xl
                  "
                >

                  Kembali

                </button>

                {/* RESCHEDULE */}
                <button

                  onClick={() => {

                    const updatedData = {

                      ...ticketData,

                      tanggal:
                        selectedDate
                          || ticketData?.tanggal,

                      kursi:
                        selectedSeat
                          || ticketData?.kursi,

                    }

                    localStorage.setItem(
                      'ticketData',
                      JSON.stringify(
                        updatedData
                      )
                    )

                    setTicketData(updatedData)

                    setShowReschedule(false)

                    setShowSuccess(true)

                  }}

                  className="
                    bg-orange-500
                    hover:bg-orange-600
                    transition
                    text-white
                    text-2xl
                    px-12
                    py-4
                    rounded-2xl
                  "
                >

                  Reschedule

                </button>

              </div>

            </div>

          </div>
        )
      }

      {/* MODAL PILIH KURSI */}
      {showSeatModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white w-[500px] max-h-[90vh] overflow-auto rounded-3xl p-6 shadow-2xl relative">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-0">

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
                        onClick={() => {

                          setSelectedSeat(seat)

                        }}
                        className={`border rounded-lg py-2 font-bold transition

                        ${
                          selectedSeat === seat
                            ? 'bg-[#7B2CBF] text-white border-[#7B2CBF]'
                            : 'hover:bg-[#E9D5FF]'
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
                      onClick={() => {

                        setSelectedSeat(seat)

                      }}
                      className={`border rounded-lg py-2 font-bold transition

                      ${
                        selectedSeat === seat
                          ? 'bg-[#7B2CBF] text-white border-[#7B2CBF]'
                          : 'hover:bg-[#E9D5FF]'
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
                    onClick={() => {

                      setSelectedSeat(seat)

                    }}
                    className={`border rounded-lg py-2 font-bold transition

                    ${
                      selectedSeat === seat
                        ? 'bg-[#7B2CBF] text-white border-[#7B2CBF]'
                        : 'hover:bg-[#E9D5FF]'
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

{/* POPUP SUCCESS */}
{
  showSuccess && (

    <div className="
      fixed
      inset-0
      bg-black/50
      flex
      items-center
      justify-center
      z-[999]
    ">

      <div className="
        bg-white
        w-[420px]
        rounded-3xl
        shadow-2xl
        p-8
        text-center
        relative
      ">

        {/* CLOSE */}
        <button

          onClick={() =>
            setShowSuccess(false)
          }

          className="
            absolute
            top-4
            right-4
            text-2xl
            text-gray-500
          "
        >

          ✕

        </button>

        {/* ICON */}
        <div className="
          w-24
          h-24
          border-4
          border-green-500
          rounded-full
          flex
          items-center
          justify-center
          mx-auto
          mb-6
        ">

          <span className="
            text-green-500
            text-6xl
            font-bold
          ">

            ✓

          </span>

        </div>

        {/* TITLE */}
        <h1 className="
          text-4xl
          font-bold
          mb-4
        ">

          Reschedule Berhasil

        </h1>

        {/* DESC */}
        <p className="
          text-gray-500
          text-xl
          mb-8
        ">

          Tiket Anda berhasil
          diubah ke jadwal baru

        </p>

        {/* BUTTON */}
        <button

          onClick={() =>
            setShowSuccess(false)
          }

          className="
            bg-[#7B2CBF]
            hover:bg-[#6A1FB5]
            transition
            text-white
            text-2xl
            px-14
            py-4
            rounded-2xl
          "

        >

          Oke

        </button>

      </div>

    </div>
  )
}

    </div>
  )
} 