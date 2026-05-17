import {
  Link,
  useLocation,
  useNavigate,
} from 'react-router-dom'

import logo from '../../assets/logo.png'

export default function Ticket() {
  const location = useLocation()

  const navigate = useNavigate()

  const data = location.state

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

          <Link to="/search">
            Pesan
          </Link>

          <Link
            to="/ticket"
            className="font-bold"
          >
            Tiket Saya
          </Link>

          <Link to="/profile">
            Profil
          </Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto py-14 px-4">

        <div className="bg-white border rounded-2xl shadow-lg p-10">

          <h1 className="text-4xl font-bold text-[#1d2a44] mb-10">

            Detail Pesanan
          </h1>

          <div className="border rounded-2xl p-8 mb-8">

            <div className="flex justify-between">

              <div className="space-y-6 text-xl">

                <div className="flex items-center gap-3">

                  <span>👤</span>

                  <p>
                    {data?.nama}
                  </p>
                </div>

                <div className="flex items-start gap-3">

                  <span>📍</span>

                  <div>

                    <div className="flex gap-5">

                      <p>Siantar</p>

                      <p>→</p>

                      <p>Amplas</p>
                    </div>

                    <div className="flex gap-5 text-gray-600">

                      <p>05.30</p>

                      <p>→</p>

                      <p>06.06</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">

                  <span>📅</span>

                  <p>
                    Sabtu, 28 Maret 2026
                  </p>
                </div>

                <div className="flex items-center gap-3">

                  <span>🪑</span>

                  <p>
                    Kursi {data?.kursi}
                  </p>
                </div>
              </div>

              <div className="text-center">

                <p className="mb-3 text-gray-600">

                  ID Transaksi :
                  XYZ-23415780
                </p>

                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=EldivoTicket"
                  alt="QR"
                  className="mx-auto"
                />

                <h2 className="font-bold text-xl mt-4">

                  {data?.isStudent
                    ? 'Pelajar/Mahasiswa'
                    : 'Penumpang'}
                </h2>

                <h1 className="text-3xl font-bold text-[#7B2CBF] mt-2">

                  TOTAL :
                  Rp{' '}
                  {data?.totalPrice?.toLocaleString(
                    'id-ID'
                  )}
                </h1>
              </div>
            </div>
          </div>

          <div className="border rounded-2xl p-8">

            <h1 className="text-3xl font-bold mb-6">

              Info Penting & Instruksi
            </h1>

            <div className="space-y-5 text-xl">

              <p>
                &gt; Tunjukkan e-ticket
                atau kode QR saat naik
                bus.
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
                &gt; Reschedule tiket bus
                maksimal dilakukan{' '}
                <span className="font-bold">
                  H-3 jam keberangkatan.
                </span>
              </p>
            </div>
          </div>

          <div className="flex justify-between mt-10">

            <button
              onClick={() => navigate('/')}
              className="bg-[#7B2CBF] hover:bg-[#6A1FB5] transition text-white text-2xl px-10 py-4 rounded-2xl"
            >
              Kembali
            </button>

            <button
              onClick={() =>
                alert(
                  'Fitur Reschedule Segera Hadir'
                )
              }
              className="bg-orange-500 hover:bg-orange-600 transition text-white text-2xl px-10 py-4 rounded-2xl"
            >
              Reschedule
            </button>

            <button
              onClick={() =>
                window.print()
              }
              className="bg-[#7B2CBF] hover:bg-[#6A1FB5] transition text-white text-2xl px-10 py-4 rounded-2xl"
            >
              Cetak Tiket
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}