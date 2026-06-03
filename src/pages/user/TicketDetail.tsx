import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Navbar_2 from '../../components/user/Navbar_2'
import RescheduleModal from './Reschedule'

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
  const [showSuccess, setShowSuccess] = useState(false)

  const handleRescheduleSave = (newDate: string, newSeat: string) => {
    const updated = {
      ...ticketData,
      tanggal: newDate || ticketData?.tanggal,
      kursi: newSeat || ticketData?.kursi,
    }
    localStorage.setItem('ticketData', JSON.stringify(updated))
    setTicketData(updated)
    setShowReschedule(false)
    setShowSuccess(true)
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Navbar_2 />

      <div className="max-w-3xl mx-auto py-10 px-4">

        {/* ACTION BUTTONS */}
        <div className="flex justify-between mb-4 no-print">
          <button
            onClick={() => navigate('/ticketsaya')}
            className="bg-white border border-gray-300 text-gray-700 px-5 py-2 rounded-lg text-sm hover:bg-gray-50"
          >
            ← Kembali
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => setShowReschedule(true)}
              className="bg-orange-500 text-white px-5 py-2 rounded-lg text-sm hover:bg-orange-600"
            >
              Reschedule
            </button>
            <button
              onClick={() => window.print()}
              className="bg-[#7B2CBF] text-white px-5 py-2 rounded-lg text-sm hover:bg-[#6a22a8]"
            >
              Cetak / Unduh
            </button>
          </div>
        </div>

        {/* TICKET DOCUMENT */}
        <div className="print-ticket bg-white shadow-md rounded-md overflow-hidden border border-gray-200">

          {/* Header */}
          <div className="flex items-start justify-between px-8 pt-8 pb-4 border-b border-gray-200">
            <div>
              <p className="text-2xl font-bold text-[#7B2CBF] tracking-tight">E-Tiket Bus</p>
              <p className="text-xs text-gray-500 mt-0.5">ELDIVO TRANSPORT</p>
            </div>
            <span className="text-2xl font-black text-[#7B2CBF] tracking-tighter">eldivo</span>
          </div>

          {/* Payment info row */}
          <div className="grid grid-cols-2 px-8 py-3 bg-gray-50 border-b border-gray-200 text-sm">
            <div>
              <span className="text-gray-500">Tanggal Pemesanan</span>
              <span className="ml-2 font-medium text-gray-800">{ticketData?.tanggal || '-'}</span>
            </div>
            <div className="text-right">
              <span className="text-gray-500">Status</span>
              <span className="ml-2 font-semibold text-green-600">Sudah Dibayar</span>
            </div>
          </div>

          {/* Rincian box */}
          <div className="mx-8 my-5 border border-gray-300 rounded-md overflow-hidden">
            <div className="bg-[#7B2CBF] text-white text-sm font-semibold px-4 py-2">Rincian</div>
            <div className="p-4">
              <p className="font-bold text-gray-800 text-base">{bus?.name || 'ELDIVO EXPRESS'}</p>
              <p className="text-sm text-gray-500 mb-3">{bus?.class || 'EKONOMI'}</p>

              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-sm font-semibold text-gray-700">PT Eldivo Transport</p>
                  <p className="text-xs text-gray-500">Kode Pemesanan : {ticketData?.orderId}</p>
                </div>
                <span className="text-xs font-black text-[#7B2CBF] tracking-tighter">eldivo</span>
              </div>

              <hr className="my-3 border-gray-200" />

              <div className="flex justify-between text-sm">
                <div>
                  <p className="text-gray-500 text-xs mb-0.5">Penumpang</p>
                  <p className="font-semibold text-gray-800">
                    {ticketData?.nama || '-'}
                    <span className="text-gray-400 font-normal ml-1">(Dewasa)</span>
                  </p>
                  {ticketData?.kursi && (
                    <p className="text-xs text-gray-500 mt-0.5">Kursi: {ticketData.kursi}</p>
                  )}
                </div>
                <p className="font-semibold text-gray-800">
                  Rp {ticketData?.totalPrice?.toLocaleString('id-ID') || '0'}
                </p>
              </div>

              <hr className="my-3 border-gray-200" />

              <div className="flex justify-between text-sm font-bold">
                <p>Total Pembayaran</p>
                <p className="text-[#7B2CBF] text-base">
                  Rp {ticketData?.totalPrice?.toLocaleString('id-ID') || '0'}
                </p>
              </div>
              <p className="text-xs text-gray-400 mt-1">Harga sudah termasuk pajak.</p>
            </div>
          </div>

          {/* Kode Pemesanan + QR */}
          <div className="grid grid-cols-2 items-center px-8 py-5 border-t border-gray-200">
            <div>
              <p className="text-sm text-gray-500 mb-1">Kode Pemesanan</p>
              <p className="text-3xl font-black tracking-widest text-gray-900">
                {ticketData?.orderId?.replace('ELD-', '') || '------'}
              </p>
            </div>
            <div className="flex justify-end">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${ticketData?.orderId || 'ELDIVO'}`}
                alt="QR Code"
                className="w-28 h-28"
              />
            </div>
          </div>

          {/* Pemesanan */}
          <div className="px-8 py-4 border-t border-gray-200">
            <p className="text-base font-bold text-gray-800 mb-3">Pemesanan</p>
            <div className="grid grid-cols-2 gap-y-2 text-sm">
              <InfoRow label="Nama" value={ticketData?.nama} />
              <InfoRow label="No. Telepon" value={ticketData?.telepon || '-'} />
              <InfoRow label="Email" value={ticketData?.email || '-'} />
              <InfoRow label="Tanggal Pesan" value={ticketData?.tanggal} />
              <InfoRow label="Pemesanan Melalui" value="Eldivo Web" />
            </div>
          </div>

          {/* Detail Pemesanan table */}
          <div className="px-8 pb-8">
            <p className="text-base font-bold text-gray-800 mb-3">Detail Pemesanan</p>
            <div className="overflow-x-auto rounded-md border border-gray-300">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#7B2CBF] text-white">
                    <th className="px-4 py-2 text-left font-semibold">Bus</th>
                    <th className="px-4 py-2 text-left font-semibold">Kelas</th>
                    <th className="px-4 py-2 text-left font-semibold">Keberangkatan</th>
                    <th className="px-4 py-2 text-left font-semibold">Tujuan</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-200">
                    <td className="px-4 py-3 font-medium text-gray-800">{bus?.name || 'ELDIVO EXPRESS'}</td>
                    <td className="px-4 py-3 text-gray-600">{bus?.class || 'Ekonomi'}</td>
                    <td className="px-4 py-3 text-gray-700">
                      {bus?.from} ({bus?.fromCode || 'DEP'})<br />
                      <span className="text-xs text-gray-500">{ticketData?.tanggal}, {bus?.fromTime}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {bus?.to} ({bus?.toCode || 'ARR'})<br />
                      <span className="text-xs text-gray-500">{ticketData?.tanggal}, {bus?.toTime}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 text-xs text-gray-500 space-y-1">
              <p>• Tunjukkan QR Code atau kode pemesanan saat boarding.</p>
              <p>• Harap tiba 15 menit sebelum keberangkatan.</p>
              <p>• Reschedule dapat dilakukan maksimal H-3 jam sebelum keberangkatan.</p>
            </div>
          </div>

        </div>
      </div>

      {/* RESCHEDULE MODAL */}
      {showReschedule && (
        <RescheduleModal
          ticketData={ticketData}
          onClose={() => setShowReschedule(false)}
          onSave={handleRescheduleSave}
        />
      )}

      {/* SUCCESS MODAL */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl w-80 text-center shadow-xl">
            <div className="text-5xl mb-3">✅</div>
            <h2 className="text-xl font-bold mb-2 text-gray-800">Reschedule Berhasil</h2>
            <p className="text-sm text-gray-500 mb-5">Tiket Anda telah diperbarui.</p>
            <button
              onClick={() => setShowSuccess(false)}
              className="bg-[#7B2CBF] text-white px-6 py-2 rounded-xl text-sm hover:bg-[#6a22a8]"
            >
              OK
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
          .print-ticket { box-shadow: none !important; border: none !important; }
        }
      `}</style>
    </div>
  )
}

function InfoRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex gap-2">
      <span className="text-gray-500 w-36 shrink-0">{label}</span>
      <span className="text-gray-700 font-medium">: {value || '-'}</span>
    </div>
  )
}