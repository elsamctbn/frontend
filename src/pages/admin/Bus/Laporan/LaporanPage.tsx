import { useState } from 'react'

export default function LaporanPage() {

  // ================= FILTER =================

  const [urutkanTanggal, setUrutkanTanggal] =
    useState(false)

  // ================= MODAL =================

  const [showExport, setShowExport] =
    useState(false)

  // ================= DATA =================

  const laporanData = [

    // ACAK DULU
    {
      id: 5,
      transaksi: 'EFG-21573000',
      nama: 'Halimah',
      tanggal: '29 Desember 2015',
      harga: 'Rp 35.000',
      route: 'Amplas - Siantar',
    },

    {
      id: 1,
      transaksi: 'TYU-99482894',
      nama: 'Luthfia',
      tanggal: '27 Desember 2015',
      harga: 'Rp 35.000',
      route: 'Siantar - Amplas',
    },

    {
      id: 6,
      transaksi: 'QWE-88822001',
      nama: 'Aditia',
      tanggal: '30 Desember 2015',
      harga: 'Rp 40.000',
      route: 'Medan - Binjai',
    },

    {
      id: 3,
      transaksi: 'WQS-44126530',
      nama: 'Bianca Putri',
      tanggal: '27 Desember 2015',
      harga: 'Rp 35.000',
      route: 'Amplas - Siantar',
    },

    {
      id: 2,
      transaksi: 'UBK-43206678',
      nama: 'Putra Pratama',
      tanggal: '27 Desember 2015',
      harga: 'Rp 35.000',
      route: 'Siantar - Amplas',
    },

    {
      id: 4,
      transaksi: 'PTE-03517485',
      nama: 'Elsa',
      tanggal: '28 Desember 2015',
      harga: 'Rp 35.000',
      route: 'Siantar - Amplas',
    },

  ]

  // ================= SORT TANGGAL =================

  const laporanList =
    urutkanTanggal

      ? [...laporanData].sort((a, b) => {

          const bulan: any = {

            Januari: 0,
            Februari: 1,
            Maret: 2,
            April: 3,
            Mei: 4,
            Juni: 5,
            Juli: 6,
            Agustus: 7,
            September: 8,
            Oktober: 9,
            November: 10,
            Desember: 11,

          }

          // TANGGAL A
          const splitA =
            a.tanggal.split(' ')

          const tanggalA =
            new Date(
              Number(splitA[2]),
              bulan[splitA[1]],
              Number(splitA[0])
            )

          // TANGGAL B
          const splitB =
            b.tanggal.split(' ')

          const tanggalB =
            new Date(
              Number(splitB[2]),
              bulan[splitB[1]],
              Number(splitB[0])
            )

          return (
            tanggalA.getTime() -
            tanggalB.getTime()
          )

        })

      : laporanData

  return (

    <div className="p-10">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">

        <h1 className="text-5xl font-bold text-[#1d2a44]">

          Laporan Transaksi

        </h1>

        {/* BUTTON FILTER */}
        <button
          onClick={() =>
            setUrutkanTanggal(true)
          }
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold shadow"
        >

          Filter Data Sesuai Tanggal

        </button>

      </div>

      {/* LIST */}
      <div className="space-y-6">

        {
          laporanList.map((laporan) => (

            <div
              key={laporan.id}
              className="bg-white rounded-3xl shadow-md p-6 flex justify-between items-center"
            >

              {/* LEFT */}
              <div>

                {/* LOGO */}
                <div className="bg-[#7B2CBF] px-5 py-2 rounded-full inline-block mb-5 text-white font-bold">

                  🚌 Eldivo

                </div>

                {/* DATA */}
                <div className="space-y-2 text-lg">

                  <p>

                    ID Transaksi
                    <span className="font-bold ml-2">

                      : {laporan.transaksi}

                    </span>

                  </p>

                  <p>

                    Nama Penumpang
                    <span className="font-bold ml-2">

                      : {laporan.nama}

                    </span>

                  </p>

                  <p>

                    Tanggal
                    <span className="font-bold ml-2">

                      : {laporan.tanggal}

                    </span>

                  </p>

                  <p>

                    Harga
                    <span className="font-bold ml-2">

                      : {laporan.harga}

                    </span>

                  </p>

                  <p>

                    Route
                    <span className="font-bold ml-2">

                      : {laporan.route}

                    </span>

                  </p>

                </div>

              </div>

              {/* RIGHT */}
              <div>

                <button
                  onClick={() =>
                    setShowExport(true)
                  }
                  className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg font-semibold"
                >

                  Export Laporan

                </button>

              </div>

            </div>

          ))
        }

      </div>

      {/* MODAL EXPORT */}
      {
        showExport && (

          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white w-[500px] rounded-3xl p-12">

              {/* TITLE */}
              <h1 className="text-4xl font-bold text-center mb-12">

                Konfirmasi pengunduhan laporan.
                <br />
                Lanjutkan?

              </h1>

              {/* BUTTON */}
              <div className="flex justify-center gap-5">

                {/* BATAL */}
                <button
                  onClick={() =>
                    setShowExport(false)
                  }
                  className="bg-black text-white px-8 py-4 rounded-xl text-xl font-semibold"
                >

                  Batal

                </button>

                {/* LANJUT */}
                <button
                  onClick={() => {

                    alert(
                      'Laporan berhasil diunduh!'
                    )

                    setShowExport(false)

                  }}
                  className="bg-[#7B2CBF] hover:bg-[#6A1FB5] text-white px-8 py-4 rounded-xl text-xl font-semibold"
                >

                  Lanjutkan

                </button>

              </div>

            </div>

          </div>

        )
      }

    </div>
  )
}