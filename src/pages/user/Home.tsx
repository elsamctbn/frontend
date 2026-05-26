import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from "../../components/user/Navbar";
import Footer from "../../components/user/Footer";

import instagramLogo from '../../assets/instagram.png'
import contactLogo from '../../assets/contact.png'
import eldivo from '../../assets/eldivo.png'

const Home = () => {
  const navigate = useNavigate()

  const cityData: Record<string, string[]> = {

    Pematangsiantar: [
      'Parluasan',
      'Ramayana',
    ],

    Medan: [
      'Amplas',
      'Setia Budi',
      'Pancing',
    ],

    Dumai: [
      'Terminal Dumai',
    ],

    Pekanbaru: [
      'Terminal Pekanbaru',
    ],

    'Pangkalan Kerinci': [
      'Terminal Kerinci',
    ],

  }

  const [fromCity, setFromCity] =
    useState('')

  const [fromTerminal, setFromTerminal] =
    useState('')

  const [toCity, setToCity] =
    useState('')

  const [toTerminal, setToTerminal] =
    useState('')

  const [tanggal, setTanggal] =
    useState('')

  const [showAllPromo, setShowAllPromo] =
    useState(false)

  const handleSearch = () => {

  // VALIDASI
  if (
    !fromCity ||
    !fromTerminal ||
    !toCity ||
    !toTerminal ||
    !tanggal
  ) {
    alert('Semua data wajib diisi!')
    return
  }

  // ASAL DAN TUJUAN GABOLEH SAMA
  if (
    fromCity === toCity &&
    fromTerminal === toTerminal
  ) {
    alert('Asal dan tujuan tidak boleh sama!')
    return
  }

  // PINDAH HALAMAN
  navigate('/search', {
    state: {
      fromCity,
      fromTerminal,
      toCity,
      toTerminal,
      tanggal,

    }
  })
}
  return (

    <div className='bg-slate-100 min-h-screen'>

      <Navbar />

      {/* HERO */}
      <section className='bg-[#6F1AB6] text-white pb-24 pt-10'>

        <div className='max-w-7xl mx-auto px-5 grid md:grid-cols-2 items-center'>

          {/* LEFT */}
          <div className='w-full px-20'>

            <p className='text-lg'>
              ETA MARBUS
            </p>

            <h1 className='font-bold text-5xl mt-3 w-[550px] leading-tight'>
              Book Bus Tickets Easily & Quickly
            </h1>

            <p className='text-2xl mt-6 leading-relaxed w-[550px]'>
              Bersama Eldivo, nikmati perjalanan yang nyaman,
              aman, dan terpercaya ke berbagai kota tujuan.
            </p>

          </div>

          {/* RIGHT */}
          <div className='hidden md:flex ml-[100px] justify-center'>
            <div className='flex items-center justify-center'>
              
              <img
              src={eldivo}
              alt='Bus Eldivo'
              className='w-[300px] object-contain drop-shadow-2xl'/>
          </div>
        </div>
      </div>

        {/* SEARCH */}
        <div className='max-w-6xl mx-auto mt-16 px-6'>

          <div className='bg-white rounded-3xl shadow-2xl p-8 grid md:grid-cols-2 gap-6'>

            {/* DARI */}
            <div>

              <label className='font-semibold text-slate-700 mb-2 block'>
                Dari
              </label>

              <select
                value={fromCity}
                onChange={(e) => {

                  setFromCity(e.target.value)
                  setFromTerminal('')

                }}
                className='w-full bg-white text-slate-800 border border-purple-200 p-4 rounded-2xl outline-none focus:ring-4 focus:ring-purple-300 transition appearance-none'>
                
                <option value=''>
                  Pilih Kota
                </option>

                {
                  Object.keys(cityData).map((city) => (

                    <option
                      key={city}
                      value={city}>
                      {city}
                    </option>

                  ))
                }

              </select>

              <select
                value={fromTerminal}
                onChange={(e) =>
                  setFromTerminal(
                    e.target.value
                  )
                }
                className='w-full bg-white text-slate-800 border border-purple-200 p-4 rounded-2xl outline-none focus:ring-4 focus:ring-purple-300 transition mt-4 appearance-none'
              >

                <option value=''>
                  Pilih Terminal
                </option>

                {
                  fromCity &&
                  cityData[fromCity].map((terminal) => (

                    <option
                      key={terminal}
                      value={terminal}>
                      {terminal}
                    </option>

                  ))
                }

              </select>

            </div>

            {/* TUJUAN */}
            <div>

              <label className='font-semibold text-slate-700 mb-2 block'>
                Tujuan
              </label>

              <select
                value={toCity}
                onChange={(e) => {

                  setToCity(e.target.value)
                  setToTerminal('')

                }}
                className='w-full bg-white text-slate-800 border border-purple-200 p-4 rounded-2xl outline-none focus:ring-4 focus:ring-purple-300 transition appearance-none'>
                <option value=''>
                  Pilih Kota
                </option>

                {
                  Object.keys(cityData).map((city) => (
                    <option
                      key={city}
                      value={city}>
                      {city}
                    </option>

                  ))
                }

              </select>

              <select
                value={toTerminal}
                onChange={(e) =>
                  setToTerminal(
                    e.target.value
                  )
                }
                className='w-full bg-white text-slate-800 border border-purple-200 p-4 rounded-2xl outline-none focus:ring-4 focus:ring-purple-300 transition mt-4 appearance-none'>
                <option value=''>
                  Pilih Terminal
                </option>

                {
                  toCity &&
                  cityData[toCity].map((terminal) => (
                    <option
                      key={terminal}
                      value={terminal}>
                      {terminal}
                    </option>
                  ))
                }
              </select>
            </div>

            {/* TANGGAL */}
              <div>
                <label className='font-semibold text-slate-700 mb-2 block'>
                  Tanggal
                </label>

                <input
                  type='date'
                  value={tanggal}
                  onChange={(e) =>
                    setTanggal(e.target.value)
                  }
                  className='w-full bg-white text-slate-800 border border-purple-200 p-4 rounded-2xl outline-none focus:ring-4 focus:ring-purple-300 transition'/>
              </div>

              {/* BUTTON */}
              <div className='flex items-end'>
                <button
                  onClick={handleSearch}
                  className='bg-[#7B2CBF] text-white rounded-2xl font-bold w-full py-4 hover:bg-[#6F1AB6] transition duration-300 shadow-lg hover:shadow-purple-400/40'>
                  Cari Bus
                </button>
              </div>
          </div>
        </div>
      </section>

      {/* PROMO */}
      <section className='bg-slate-100 py-24 overflow-hidden'>

        <div className='max-w-7xl mx-auto px-6'>

          {/* HEADER */}
          <div className='flex items-center justify-between mb-12'>

            <div>
              <p className='text-[#7B2CBF] font-semibold uppercase tracking-widest'>
                PROMO ELDIVO
              </p>

              <h1 className='text-5xl font-bold text-slate-800 mt-3'>
                Promo & Informasi Terbaru
              </h1>
            </div>

            {/* BUTTON LIHAT SEMUA */}
            <button
              onClick={() =>
                setShowAllPromo(!showAllPromo)
              }
              className='hidden md:flex items-center gap-2 text-[#7B2CBF] font-semibold hover:gap-4 transition-all'>

              {
                showAllPromo
                  ? 'Tampilkan Sedikit ←'
                  : 'Lihat Semua →'
              }

            </button>
          </div>

          {/* SHOW ALL */}
          {
            showAllPromo ? (

              <div className='grid md:grid-cols-4 gap-8'>

                {/* CARD 1 */}
                <div className='bg-gradient-to-br from-purple-700 to-fuchsia-500 rounded-[35px] p-8 text-white shadow-2xl'>

                  <div className='text-6xl'>
                    🎓
                  </div>

                  <p className='mt-6 text-sm bg-white/20 w-fit px-4 py-2 rounded-full'>
                    Khusus Pelajar & Mahasiswa
                  </p>

                  <h2 className='text-4xl font-extrabold mt-6 leading-tight'>
                    Diskon Rp10.000
                  </h2>

                  <p className='mt-5 text-purple-100 leading-relaxed'>
                    Gunakan kartu pelajar atau KTM
                    untuk mendapatkan potongan harga perjalanan.
                  </p>
                </div>

                {/* CARD 2 */}
                <div className='bg-gradient-to-br from-indigo-700 to-blue-500 rounded-[35px] p-8 text-white shadow-2xl'>
                  <div className='text-6xl'>
                    💳
                  </div>

                  <p className='mt-6 text-sm bg-white/20 w-fit px-4 py-2 rounded-full'>
                    Pembayaran Digital
                  </p>

                  <h2 className='text-4xl font-extrabold mt-6 leading-tight'>
                    Cashback QRIS
                  </h2>

                  <p className='mt-5 text-blue-100 leading-relaxed'>
                    Nikmati cashback spesial untuk pembayaran menggunakan QRIS dan E-Wallet.
                  </p>
                </div>

                {/* CARD 3 */}
                <div className='bg-gradient-to-br from-pink-600 to-rose-500 rounded-[35px] p-8 text-white shadow-2xl'>
                  <div className='text-6xl'>
                    🚌
                  </div>

                  <p className='mt-6 text-sm bg-white/20 w-fit px-4 py-2 rounded-full'>
                    Promo Weekend
                  </p>

                  <h2 className='text-4xl font-extrabold mt-6 leading-tight'>
                    Weekend Hemat
                  </h2>

                  <p className='mt-5 text-pink-100 leading-relaxed'>
                    Dapatkan harga spesial untuk perjalanan akhir pekan bersama Eldivo.
                  </p>
                </div>

                {/* CARD 4 */}
                <div className='bg-gradient-to-br from-amber-500 to-orange-500 rounded-[35px] p-8 text-white shadow-2xl'>
                  <div className='text-6xl'>
                    🎁
                  </div>

                  <p className='mt-6 text-sm bg-white/20 w-fit px-4 py-2 rounded-full'>
                    Pengguna Baru
                  </p>

                  <h2 className='text-4xl font-extrabold mt-6 leading-tight'>
                    Voucher Spesial
                  </h2>

                  <p className='mt-5 text-orange-100 leading-relaxed'>
                    Daftar sekarang dan dapatkan voucher untuk petualangan pertamamu bersama Eldivo.
                  </p>
                </div>
              </div>

            ) : (

              <div className='overflow-x-auto'>

                <div className='flex gap-8 min-w-max pb-4'>

                  {/* CARD 1 */}
                  <div className='w-[320px] bg-gradient-to-br from-purple-700 to-fuchsia-500 rounded-[35px] p-8 text-white shadow-2xl hover:-translate-y-3 transition duration-500'>

                    <div className='text-6xl'>
                      🎓
                    </div>

                    <p className='mt-6 text-sm bg-white/20 w-fit px-4 py-2 rounded-full'>
                      Khusus Pelajar & Mahasiswa
                    </p>

                    <h2 className='text-4xl font-extrabold mt-6 leading-tight'>
                      Diskon Rp10.000
                    </h2>

                    <p className='mt-5 text-purple-100 leading-relaxed'>
                      Gunakan kartu pelajar atau KTM untuk mendapatkan potongan harga perjalanan.
                    </p>

                  </div>

                  {/* CARD 2 */}
                  <div className='w-[320px] bg-gradient-to-br from-indigo-700 to-blue-500 rounded-[35px] p-8 text-white shadow-2xl hover:-translate-y-3 transition duration-500'>6
                    <div className='text-6xl'>
                      💳
                    </div>

                    <p className='mt-6 text-sm bg-white/20 w-fit px-4 py-2 rounded-full'>
                      Pembayaran Digital
                    </p>

                    <h2 className='text-4xl font-extrabold mt-6 leading-tight'>
                      Cashback QRIS
                    </h2>

                    <p className='mt-5 text-blue-100 leading-relaxed'>
                      Nikmati cashback spesial untuk pembayaran menggunakan QRIS dan E-Wallet.
                    </p>
                  </div>

                  {/* CARD 3 */}
                  <div className='w-[320px] bg-gradient-to-br from-pink-600 to-rose-500 rounded-[35px] p-8 text-white shadow-2xl hover:-translate-y-3 transition duration-500'>

                    <div className='text-6xl'>
                      🚌
                    </div>

                    <p className='mt-6 text-sm bg-white/20 w-fit px-4 py-2 rounded-full'>
                      Promo Weekend
                    </p>

                    <h2 className='text-4xl font-extrabold mt-6 leading-tight'>
                      Weekend Hemat
                    </h2>

                    <p className='mt-5 text-pink-100 leading-relaxed'>
                      Dapatkan harga spesial untuk perjalanan akhir pekan bersama Eldivo.
                    </p>

                  </div>

                  {/* CARD 4 */}
                  <div className='w-[320px] bg-gradient-to-br from-amber-500 to-orange-500 rounded-[35px] p-8 text-white shadow-2xl hover:-translate-y-3 transition duration-500'>

                    <div className='text-6xl'>
                      🎁
                    </div>

                    <p className='mt-6 text-sm bg-white/20 w-fit px-4 py-2 rounded-full'>
                      Pengguna Baru
                    </p>

                    <h2 className='text-4xl font-extrabold mt-6 leading-tight'>
                      Voucher Spesial
                    </h2>

                    <p className='mt-5 text-orange-100 leading-relaxed'>
                      Daftar sekarang dan dapatkan voucher untuk petualangan pertamamu bersama Eldivo.
                    </p>

                  </div>

                </div>

              </div>

            )
          }

        </div>

      </section>

      {/* CONTACT */}
      <section className='bg-[#6F1AB6] text-white py-20'>

        <div className='max-w-7xl mx-auto px-6'>

          <div className='text-center'>

            <h1 className='text-5xl font-bold'>
              Contact Us
            </h1>

            <p className='mt-6 text-purple-200 text-lg'>
              Tetap terhubung bersama Eldivo Tunas Arta
            </p>

          </div>

          <div className='grid md:grid-cols-2 gap-8 mt-16'>

            {/* INSTAGRAM */}
            <a
              href='https://www.instagram.com/eldivotunasarta/'
              target='_blank'
              rel='noopener noreferrer'
              className='bg-white/10 p-10 rounded-3xl text-center hover:bg-white/20 hover:-translate-y-2 transition duration-300 block'
            >

              <img
                src={instagramLogo}
                alt='Instagram'
                className='w-24 h-24 mx-auto object-contain'
              />

              <h2 className='text-4xl font-bold mt-6'>
                Instagram
              </h2>

              <p className='mt-4 text-purple-200 text-xl'>
                @eldivotunasarta
              </p>

            </a>

            {/* CONTACT */}
            <a
              href='https://msha.ke/eldivotunasarta'
              target='_blank'
              rel='noopener noreferrer'
              className='bg-white/10 p-10 rounded-3xl text-center hover:bg-white/20 hover:-translate-y-2 transition duration-300 block'
            >

              <img
                src={contactLogo}
                alt='Contact'
                className='w-24 h-24 mx-auto object-contain'/>

              <h2 className='text-4xl font-bold mt-6'>
                WhatsApp
              </h2>

              <p className='mt-4 text-purple-200 text-xl'>
                Eldivo Tunas Arta
              </p>

            </a>

          </div>

        </div>

      </section>

      <Footer />

    </div>

  )
}

export default Home
