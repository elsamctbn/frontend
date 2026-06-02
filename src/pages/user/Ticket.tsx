import {
  Link,
  useNavigate,
} from 'react-router-dom'

import Navbar from "../../components/user/Navbar";

export default function Ticket() {

  const navigate = useNavigate()

   const generateOrderId = () => {

    const chars = 
      'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

    let result = 'ELD-' 

    for (let i = 0; i < 6; i++) {

      result += chars.charAt(
        Math.floor(Math.random() * chars.length)
      )
    }

    return result 

  }

  const tickets = JSON.parse(
  localStorage.getItem('tickets') || '[]'
)

console.log('TICKETS = ', tickets)

  return (

    <div className="min-h-screen bg-[#f3f4f6]">
        <Navbar/>
  
      {/* CONTENT */}
      <div className="max-w-8xl mx-auto py-14 px-4">

        <div className="bg-white rounded-2xl shadow-lg p-10">

          <h1 className="text-4xl font-bold mb-3">
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

                <th className="py-4 text-left">
                  Status Bayar
                </th>

                <th></th>

              </tr>

            </thead>

            <tbody>
              {tickets.map((ticket, index) => (
                
              <tr
                 key={index}
                  className="border-b"
                  >

                <td className= "py-4">
                {index + 1 }
                </td>

                <td>
                   {ticket?.tanggal}
                </td>

                <td>
                {ticket?.orderId}
                </td>


                <td>
                 {ticket?.bus?.from}
                 {' → '}
                 {ticket?.bus?.to}
                </td>

                <td className='font-bold text-green-600'>
                  Sudah Dibayar
                </td>

                <td>

                  <button
                    onClick={() =>
                      navigate(
                        '/ticketdetail',
                        {
                          state: ticket
                        }
                      )

                    }

                    className="bg-[#7B2CBF] text-white px-5 py-2 rounded-lg">
                    Detail Pesanan
                  </button>

                </td>

              </tr>

             ))}

            </tbody>

           </table>

        </div>

      </div>

    </div>
  )
}