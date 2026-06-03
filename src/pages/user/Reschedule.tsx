import { useState, useEffect } from 'react'

// ── Semua kursi yang ada di bus ──────────────────────────────────────────────
const ALL_ROWS = [
  ['A5', 'A4', '', 'A3', 'A2', 'A1'],
  ['B5', 'B4', '', 'B3', 'B2', 'B1'],
  ['C5', 'C4', '', 'C3', 'C2', 'C1'],
  ['D5', 'D4', '', 'D3', 'D2', 'D1'],
  ['E5', 'E4', '', 'E3', 'E2', 'E1'],
  ['F5', 'F4', '', 'F3', 'F2', 'F1'],
]
const ROW_H = ['H5', 'H4', '', 'H3', 'H2', 'H1']
const ROW_I = ['I6', 'I5', 'I4', 'I3', 'I2', 'I1']

// ── Helper: ambil kursi terpesan dari localStorage berdasarkan tanggal ────────
//    Saat nanti ada API, ganti fungsi ini saja.
function getBookedSeatsByDate(tanggal: string): string[] {
  try {
    const allTickets: any[] = JSON.parse(
      localStorage.getItem('tickets') || '[]'
    )
    // Kumpulkan semua kursi yang sudah dipesan di tanggal yang sama
    const booked: string[] = []
    allTickets.forEach((t) => {
      if (t.tanggal === tanggal && t.kursi) {
        // kursi bisa string tunggal atau array
        if (Array.isArray(t.kursi)) {
          booked.push(...t.kursi)
        } else {
          booked.push(t.kursi)
        }
      }
    })
    return booked
  } catch {
    return []
  }
}

// ── Props ─────────────────────────────────────────────────────────────────────
interface Props {
  ticketData: any
  onClose: () => void
  onSave: (newDate: string, newSeat: string) => void
}

export default function RescheduleModal({ ticketData, onClose, onSave }: Props) {
  const [selectedDate, setSelectedDate] = useState(ticketData?.tanggal || '')
  const [selectedSeat, setSelectedSeat] = useState<string>(ticketData?.kursi || '')
  const [bookedSeats, setBookedSeats] = useState<string[]>([])
  const [showSeatModal, setShowSeatModal] = useState(false)
  const [error, setError] = useState('')

  // ── Tiap kali tanggal berubah, cek ulang kursi terpesan ────────────────────
  useEffect(() => {
    if (selectedDate) {
      const booked = getBookedSeatsByDate(selectedDate)
      // Jangan masukkan kursi milik tiket ini sendiri ke daftar "booked"
      // supaya kursi lamanya masih bisa dipilih ulang
      const filtered = booked.filter((s) => s !== ticketData?.kursi)
      setBookedSeats(filtered)

      // Kalau kursi yang sudah dipilih ternyata sudah terisi di tanggal baru
      if (selectedSeat && filtered.includes(selectedSeat)) {
        setSelectedSeat('')
        setError('Kursi ' + selectedSeat + ' sudah terisi di tanggal tersebut. Pilih kursi lain.')
      } else {
        setError('')
      }
    }
  }, [selectedDate])

  const handleSeatPick = (seat: string) => {
    if (bookedSeats.includes(seat)) return // sudah terisi, abaikan
    setSelectedSeat(seat)
    setError('')
  }

  const handleSave = () => {
    if (!selectedDate) {
      setError('Pilih tanggal terlebih dahulu.')
      return
    }
    if (!selectedSeat) {
      setError('Pilih kursi terlebih dahulu.')
      return
    }
    // Validasi akhir: kursi masih kosong di tanggal baru?
    const booked = getBookedSeatsByDate(selectedDate).filter(
      (s) => s !== ticketData?.kursi
    )
    if (booked.includes(selectedSeat)) {
      setError('Kursi ' + selectedSeat + ' sudah terisi. Pilih kursi lain.')
      return
    }
    onSave(selectedDate, selectedSeat)
  }

  // ── Render tombol kursi ───────────────────────────────────────────────────
  const SeatBtn = ({ seat }: { seat: string }) => {
    if (!seat) return <div />
    const isBooked = bookedSeats.includes(seat)
    const isSelected = selectedSeat === seat
    return (
      <button
        disabled={isBooked}
        onClick={() => handleSeatPick(seat)}
        title={isBooked ? 'Sudah terisi' : seat}
        className={`
          border rounded-lg py-2 text-sm font-bold transition
          ${isBooked
            ? 'bg-gray-300 text-gray-400 cursor-not-allowed border-gray-300'
            : isSelected
              ? 'bg-[#7B2CBF] text-white border-[#7B2CBF]'
              : 'hover:bg-purple-50 border-gray-300 text-gray-700'
          }
        `}
      >
        {seat}
      </button>
    )
  }

  return (
    <>
      {/* ── MODAL RESCHEDULE UTAMA ─────────────────────────────────────────── */}
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-2xl w-[480px] shadow-xl">

          <h2 className="text-xl font-bold mb-5 text-gray-800">Reschedule Tiket</h2>

          {/* Tanggal */}
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Tanggal Baru
          </label>
          <input
            type="date"
            value={selectedDate}
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => {
              setSelectedDate(e.target.value)
              setSelectedSeat('') // reset kursi saat tanggal ganti
            }}
            className="w-full border border-gray-300 p-3 rounded-xl mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#7B2CBF]"
          />

          {/* Pilih kursi */}
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Kursi
          </label>
          <button
            onClick={() => {
              if (!selectedDate) {
                setError('Pilih tanggal dulu sebelum memilih kursi.')
                return
              }
              setError('')
              setShowSeatModal(true)
            }}
            className={`
              w-full border p-3 rounded-xl mb-1 text-left text-sm font-medium transition
              ${selectedSeat
                ? 'border-[#7B2CBF] text-[#7B2CBF] bg-purple-50'
                : 'border-gray-300 text-gray-400'
              }
            `}
          >
            {selectedSeat ? `Kursi dipilih: ${selectedSeat}` : 'Pilih Kursi →'}
          </button>

          {/* Error message */}
          {error && (
            <p className="text-red-500 text-xs mb-3 mt-1">{error}</p>
          )}

          {/* Info legend */}
          <div className="flex gap-4 text-xs text-gray-500 mb-5 mt-3">
            <span className="flex items-center gap-1">
              <span className="w-4 h-4 rounded border border-gray-300 inline-block" />
              Tersedia
            </span>
            <span className="flex items-center gap-1">
              <span className="w-4 h-4 rounded bg-[#7B2CBF] inline-block" />
              Dipilih
            </span>
            <span className="flex items-center gap-1">
              <span className="w-4 h-4 rounded bg-gray-300 inline-block" />
              Terisi
            </span>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2 border border-gray-300 rounded-xl text-sm text-gray-600 hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              onClick={handleSave}
              className="bg-orange-500 text-white px-5 py-2 rounded-xl text-sm hover:bg-orange-600"
            >
              Simpan Perubahan
            </button>
          </div>

        </div>
      </div>

      {/* ── MODAL PILIH KURSI ─────────────────────────────────────────────── */}
      {showSeatModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999]">
          <div className="bg-white w-[500px] max-h-[90vh] overflow-auto rounded-3xl p-6 shadow-2xl relative">

            {/* Close */}
            <div className="flex justify-end mb-2">
              <button
                onClick={() => setShowSeatModal(false)}
                className="text-2xl font-bold text-gray-400 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {/* Supir */}
            <div className="flex justify-end mb-4">
              <div className="border px-4 py-2 rounded-lg font-bold text-sm text-gray-600">
                Supir
              </div>
            </div>

            {/* Pintu Depan */}
            <div className="mb-4">
              <div className="border inline-block px-4 py-2 rounded-lg font-bold text-sm text-gray-600">
                Pintu Depan
              </div>
            </div>

            {/* Kursi utama A-F */}
            <div className="space-y-3">
              {ALL_ROWS.map((row, idx) => (
                <div key={idx} className="grid grid-cols-6 gap-3">
                  {row.map((seat, i) =>
                    seat === '' ? <div key={i} /> : <SeatBtn key={i} seat={seat} />
                  )}
                </div>
              ))}
            </div>

            {/* Pintu Belakang */}
            <div className="mt-5 mb-3">
              <div className="border inline-block px-4 py-2 rounded-lg font-bold text-sm text-gray-600">
                Pintu Belakang
              </div>
            </div>

            {/* Baris H */}
            <div className="grid grid-cols-6 gap-3 mb-3">
              {ROW_H.map((seat, i) =>
                seat === '' ? <div key={i} /> : <SeatBtn key={i} seat={seat} />
              )}
            </div>

            {/* Baris I */}
            <div className="grid grid-cols-6 gap-3">
              {ROW_I.map((seat, i) => (
                <SeatBtn key={i} seat={seat} />
              ))}
            </div>

            {/* Legend */}
            <div className="flex gap-4 text-xs text-gray-500 mt-5 mb-4">
              <span className="flex items-center gap-1">
                <span className="w-4 h-4 rounded border border-gray-300 inline-block" />
                Tersedia
              </span>
              <span className="flex items-center gap-1">
                <span className="w-4 h-4 rounded bg-[#7B2CBF] inline-block" />
                Dipilih
              </span>
              <span className="flex items-center gap-1">
                <span className="w-4 h-4 rounded bg-gray-300 inline-block" />
                Terisi
              </span>
            </div>

            {/* Tombol Pilih */}
            <div className="flex justify-center">
              <button
                disabled={!selectedSeat}
                onClick={() => setShowSeatModal(false)}
                className={`
                  px-10 py-3 rounded-xl text-lg font-bold transition
                  ${selectedSeat
                    ? 'bg-[#7B2CBF] hover:bg-[#6A1FB5] text-white'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }
                `}
              >
                {selectedSeat ? `Pilih Kursi ${selectedSeat}` : 'Pilih Kursi'}
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  )
}