import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'

import Navbar_2 from '../../components/user/Navbar_2';

export default function TicketDetail() {

  const location = useLocation()
  const navigate = useNavigate()

 const storageData = JSON.parse(
  localStorage.getItem('ticketData') || '{}'
)

const initialData = {
  ...storageData,
  ...location.state,
}

  const [ticketData, setTicketData] = useState(initialData)

  const bus = ticketData?.bus

  const [showReschedule, setShowReschedule] = useState(false)
  const [showSeatModal, setShowSeatModal] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const [selectedDate, setSelectedDate] = useState('')
  const [selectedSeat, setSelectedSeat] = useState('')

  return (

    <div className="min-h-screen bg-[#f3f4f6]">

      {/* NAVBAR (FIXED) */}
      <Navbar_2 />

      {/* CONTENT */}
      <div className="max-w-4xl mx-auto py-14 px-4">

        {/* TICKET CARD STYLE */}
        <div className="print-ticket bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="flex justify-between px-8 py-6 border-t no-print">
          
        </div>
          {/* HEADER TIKET */}
          <div className="bg-[#7B2CBF] text-white px-8 py-5 flex justify-between items-center">

            <div>
              <h2 className="text-xl font-bold">
                {ticketData?.nama}
              </h2>
              <p className="text-sm opacity-80">
                E-Ticket Eldivo
              </p>
            </div>

            <div className="text-right text-sm">
              <p>ID: {ticketData?.orderId}</p>
              <p>Kursi: {ticketData?.kursi}</p>
            </div>

          </div>

          {/* BODY */}
          <div className="p-8 grid grid-cols-3 gap-6">

            {/* LEFT */}
            <div className="col-span-2 space-y-6">

              <div>
                <p className="text-gray-500 text-sm">Rute</p>
                <p className="text-2xl font-bold">
                  {bus?.from} → {bus?.to}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Waktu</p>
                <p className="text-lg">
                  {bus?.fromTime} - {bus?.toTime}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Tanggal</p>
                <p className="font-semibold">
                  {ticketData?.tanggal}
                </p>
              </div>

              <div className="text-1xl text-gray-500 border-t pt-4">
                <p>• Tunjukkan QR saat boarding</p>
                <p>• Datang 15 menit sebelum keberangkatan</p>
                <p>• Reschedule maksimal H-3 jam</p>
              </div>

            </div>

            {/* RIGHT */}
            <div className="border-l pl-6 flex flex-col items-center justify-between">

              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Eldivo"
                className="w-32 h-32"
              />

              <div className="text-center">
                <p className="text-sm text-gray-500">Total</p>
                <h2 className="text-2xl font-bold text-[#7B2CBF]">
                  Rp {ticketData?.totalPrice?.toLocaleString('id-ID')}
                </h2>
              </div>

            </div>

          </div>

          {/* BUTTON */}
          <div className="flex justify-between px-8 py-6 border-t">

            <button
              onClick={() => navigate('/ticketsaya')}
              className="bg-gray-200 px-6 py-3 rounded-xl"
            >
              Kembali
            </button>

            <button
              onClick={() => setShowReschedule(true)}
              className="bg-orange-500 text-white px-6 py-3 rounded-xl"
            >
              Reschedule
            </button>

            <button
              onClick={() => window.print()}
              className="bg-[#7B2CBF] text-white px-6 py-3 rounded-xl"
            >
              Cetak Tiket
            </button>

          </div>

        </div>
      </div>

      {/* MODAL RESCHEDULE */}
      {showReschedule && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

          <div className="bg-white p-6 rounded-2xl w-[600px]">

            <h1 className="text-xl font-bold mb-4">Reschedule</h1>

            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full border p-3 rounded-xl mb-4"
            />

            <button
              onClick={() => setShowSeatModal(true)}
              className="w-full border p-3 rounded-xl mb-4 text-left"
            >
              {selectedSeat || 'Pilih Kursi'}
            </button>

            <div className="flex justify-between">

              <button onClick={() => setShowReschedule(false)}>
                Batal
              </button>

              <button
                onClick={() => {
                  const updated = {
                    ...ticketData,
                    tanggal: selectedDate || ticketData?.tanggal,
                    kursi: selectedSeat || ticketData?.kursi,
                  }

                  localStorage.setItem('ticketData', JSON.stringify(updated))
                  setTicketData(updated)
                  setShowReschedule(false)
                  setShowSuccess(true)
                }}
                className="bg-orange-500 text-white px-4 py-2 rounded-xl"
              >
                Simpan
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  )
}