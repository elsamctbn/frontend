import {
  Link,
  useNavigate,
} from 'react-router-dom'

import logo from '../../assets/logo.png'

export default function Ticket() {

  const navigate = useNavigate()

  const data = JSON.parse(
    localStorage.getItem(
      'ticketData'
    ) || '{}'
  )

  const bus = JSON.parse(
    localStorage.getItem(
      'selectedBus'
    ) || '{}'
  )

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

          <Link to="/search">
            Pesan
          </Link>

          <Link
            to="/ticketsaya"
            className="font-bold"
          >
            Tiket Saya
          </Link>

          <Link to="/profile">
            Profil
          </Link>

        </div>

      </nav>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto py-14 px-4">

        <div className="bg-white rounded-2xl shadow-lg p-10">

          <h1 className="text-4xl font-bold mb-10">

            Tiket Anda

          </h1>

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="py-4 text-left">
                  No.
                </th>

                <th className="py-4 text-left">
                  Tanggal
                </th>

                <th className="py-4 text-left">
                  Nomor Pemesanan
                </th>

                <th className="py-4 text-left">
                  Tujuan Keberangkatan
                </th>

                <th></th>

              </tr>

            </thead>

            <tbody>

              <tr className="border-b">

                <td className="py-6">
                  1.
                </td>

                <td>
                  {data?.tanggal}
                </td>

                <td>
                  XYZ-23415780
                </td>

                <td>

                  {bus?.from}
                  {' → '}
                  {bus?.to}

                </td>

                <td>

                  <button

                    onClick={() =>

                      navigate(
                        '/ticketdetail',
                        {

                          state: {

                            ...data,
                            bus,

                          },

                        }
                      )

                    }

                    className="bg-[#7B2CBF] text-white px-5 py-2 rounded-lg"
                  >

                    Detail Pesanan

                  </button>

                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </div>
  )
}