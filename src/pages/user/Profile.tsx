import { useState } from 'react'
import { Link } from 'react-router-dom'

import logo from '../../assets/logo.png'

export default function Profile() {

  const [profileImage, setProfileImage] =
    useState<string | null>(null)

  const [showEditModal, setShowEditModal] =
    useState(false)

  const [showSuccessPopup, setShowSuccessPopup] =
    useState(false)

  const [showPasswordModal, setShowPasswordModal] =
    useState(false)

  const [showNewPasswordModal, setShowNewPasswordModal] =
    useState(false)

  const [showPasswordSuccess, setShowPasswordSuccess] =
    useState(false)

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const file = e.target.files?.[0]

    if (file) {

      const imageUrl =
        URL.createObjectURL(file)

      setProfileImage(imageUrl)
    }
  }

  const handleSaveProfile = () => {

    setShowEditModal(false)

    setShowSuccessPopup(true)
  }

  return (
    <div className="min-h-screen bg-[#f3f4f6]">
      <nav className="bg-[#6A1FB5] px-8 py-4 flex items-center justify-between">

        <img
          src={logo}
          alt="logo"
          className="h-12"
        />

        <div className="flex items-center gap-10 text-white text-2xl font-semibold">

          <Link to="/">Home</Link>

          <Link to="/search">
            Pesan
          </Link>

          <Link to="/ticketsaya">
            Tiket Saya
          </Link>

          <Link
            to="/profile"
            className="font-bold"
          >
            Profil
          </Link>
        </div>
      </nav>

      <div className="flex justify-center py-20 px-4">

        <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl p-10">

          <h1 className="text-4xl font-bold text-center mb-10">

            Profil
          </h1>

          <div className="flex items-center gap-5 mb-10">

            <div className="flex flex-col items-center gap-3">

              <label
                htmlFor="upload-photo"
                className="cursor-pointer"
              >

                {profileImage ? (

                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-28 h-28 rounded-full object-cover border-4 border-[#7B2CBF]"
                  />

                ) : (

                  <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center text-5xl">

                    👤
                  </div>
                )}
              </label>

              <input
                id="upload-photo"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            <div>

              <h2 className="text-2xl font-bold">

                Nama Pengguna
              </h2>

              <p className="text-gray-500 text-lg">

                email@gmail.com
              </p>
            </div>
          </div>

          <div className="space-y-6">

            <input
              type="text"
              placeholder="Nama Lengkap"
              className="w-full bg-gray-100 rounded-xl px-5 py-4 outline-none"
            />

            <input
              type="email"
              placeholder="E-mail"
              className="w-full bg-gray-100 rounded-xl px-5 py-4 outline-none"
            />

            <div className="grid grid-cols-2 gap-6">

              <input
                type="text"
                placeholder="Nomor Telepon"
                className="w-full bg-gray-100 rounded-xl px-5 py-4 outline-none"
              />

              <select
                className="w-full bg-gray-100 rounded-xl px-5 py-4 outline-none"
              >
                <option>
                  Pilih Jenis Kelamin
                </option>

                <option>
                  Laki-laki
                </option>

                <option>
                  Perempuan
                </option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-6">

              <input
                type="date"
                className="w-full bg-gray-100 rounded-xl px-5 py-4 outline-none"
              />

              <textarea
                placeholder="Alamat"
                rows={3}
                className="w-full bg-gray-100 rounded-xl px-5 py-4 outline-none resize-none"
              />
            </div>
          </div>

          <div className="flex justify-between mt-10">

            <button
              onClick={() =>
                setShowEditModal(true)
              }
              className="bg-[#7B2CBF] hover:bg-[#6A1FB5] transition text-white px-8 py-4 rounded-2xl text-xl font-semibold"
            >
              Edit Profil
            </button>

            <button
              onClick={() =>
                setShowPasswordModal(true)
              }
              className="border border-gray-400 hover:bg-gray-100 transition px-8 py-4 rounded-2xl text-xl font-semibold"
            >
              Ganti Password
            </button>

            <button
              onClick={() => {

                localStorage.clear()

                window.location.href = '/'
              }}
              className="bg-black hover:bg-gray-800 transition text-white px-8 py-4 rounded-2xl text-xl font-semibold"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {showEditModal && (
        <div className="fixed inset-0 z-[9999] bg-black/40 flex items-center justify-center">

          <div className="bg-white w-full max-w-3xl rounded-3xl p-10">

            <h1 className="text-4xl font-bold text-center mb-10">

              Edit Profil
            </h1>

            <div className="flex justify-center mb-10">

              <label
                htmlFor="upload-photo-modal"
                className="cursor-pointer"
              >

                {profileImage ? (

                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-28 h-28 rounded-full object-cover border-4 border-[#7B2CBF]"
                  />

                ) : (

                  <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center text-5xl">

                    👤
                  </div>
                )}
              </label>

              <input
                id="upload-photo-modal"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            <div className="space-y-6">

              <input
                type="text"
                placeholder="Nama Lengkap"
                className="w-full bg-gray-100 rounded-xl px-5 py-4 outline-none"
              />

              <input
                type="email"
                placeholder="E-mail"
                className="w-full bg-gray-100 rounded-xl px-5 py-4 outline-none"
              />

              <div className="grid grid-cols-2 gap-6">

                <input
                  type="text"
                  placeholder="Nomor Telepon"
                  className="w-full bg-gray-100 rounded-xl px-5 py-4 outline-none"
                />

                <select
                  className="w-full bg-gray-100 rounded-xl px-5 py-4 outline-none"
                >
                  <option>
                    Pilih jenis kelamin
                  </option>

                  <option>
                    Laki-laki
                  </option>

                  <option>
                    Perempuan
                  </option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-6">

                <input
                  type="date"
                  className="w-full bg-gray-100 rounded-xl px-5 py-4 outline-none"
                />

                <textarea
                  placeholder="Alamat"
                  rows={3}
                  className="w-full bg-gray-100 rounded-xl px-5 py-4 outline-none resize-none"
                />
              </div>
            </div>

            <div className="flex justify-center gap-10 mt-10">

              <button
                onClick={() =>
                  setShowEditModal(false)
                }
                className="bg-black text-white px-10 py-4 rounded-2xl text-xl"
              >
                Batal
              </button>

              <button
                onClick={handleSaveProfile}
                className="bg-[#7B2CBF] text-white px-10 py-4 rounded-2xl text-xl"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {showSuccessPopup && (

        <div className="fixed inset-0 z-[9999] bg-black/40 flex items-center justify-center">

          <div className="bg-white rounded-3xl p-10 w-[420px] text-center relative">

            <button
              onClick={() =>
                setShowSuccessPopup(false)
              }
              className="absolute top-5 right-5 text-2xl"
            >
              ×
            </button>

            <div className="w-28 h-28 rounded-full bg-green-100 flex items-center justify-center text-6xl text-green-600 mx-auto mb-8">

              ✓
            </div>

            <h1 className="text-4xl font-bold mb-5">

              Pembaharuan Berhasil
            </h1>

            <p className="text-gray-600 text-lg mb-10">

              Profil anda berhasil diganti
            </p>

            <button
              onClick={() =>
                setShowSuccessPopup(false)
              }
              className="bg-[#7B2CBF] hover:bg-[#6A1FB5] transition text-white w-full py-4 rounded-2xl text-2xl font-semibold"
            >
              Oke
            </button>
          </div>
        </div>
      )}

      {showPasswordModal && (

        <div className="fixed inset-0 z-[9999] bg-black/40 flex items-center justify-center">

          <div className="bg-white w-full max-w-xl rounded-3xl p-10 text-center">

            <h1 className="text-4xl font-bold mb-12">

              Ganti Password
            </h1>

            <div className="text-left mb-10">

              <label className="block text-xl mb-4">

                Masukkan Password Anda
              </label>

              <input
                type="password"
                placeholder="Masukkan password"
                className="w-full bg-gray-100 rounded-xl px-5 py-4 text-lg border border-gray-300 focus:border-[#7B2CBF] focus:ring-2 focus:ring-[#7B2CBF] outline-none"
              />
            </div>

            <div className="flex justify-center gap-10">

              <button
                onClick={() =>
                  setShowPasswordModal(false)
                }
                className="bg-black text-white px-10 py-3 rounded-xl text-lg"
              >
                Batal
              </button>

              <button
                onClick={() => {

                  setShowPasswordModal(false)

                  setShowNewPasswordModal(true)
                }}
                className="bg-[#7B2CBF] text-white px-10 py-3 rounded-xl text-lg"
              >
                Lanjut
              </button>
            </div>
          </div>
        </div>
      )}

      {showNewPasswordModal && (

        <div className="fixed inset-0 z-[9999] bg-black/40 flex items-center justify-center">

          <div className="bg-white w-full max-w-xl rounded-3xl p-10 text-center">

            <h1 className="text-4xl font-bold mb-12">

              Ganti Password
            </h1>

            <div className="text-left mb-8">

              <label className="block text-xl mb-4">

                Masukkan Password Baru Anda
              </label>

              <input
                type="password"
                placeholder="Masukkan password baru"
                className="w-full bg-gray-100 rounded-xl px-5 py-4 text-lg border border-gray-300 focus:border-[#7B2CBF] focus:ring-2 focus:ring-[#7B2CBF] outline-none"
              />
            </div>

            <div className="text-left mb-10">

              <label className="block text-xl mb-4">

                Konfirmasi Password Baru Anda
              </label>

              <input
                type="password"
                placeholder="Konfirmasi password baru"
                className="w-full bg-gray-100 rounded-xl px-5 py-4 text-lg border border-gray-300 focus:border-[#7B2CBF] focus:ring-2 focus:ring-[#7B2CBF] outline-none"
              />
            </div>

            <div className="flex justify-center gap-10">

              <button
                onClick={() =>
                  setShowNewPasswordModal(false)
                }
                className="bg-black text-white px-10 py-3 rounded-xl text-lg"
              >
                Batal
              </button>

              <button
                onClick={() => {

                  setShowNewPasswordModal(false)

                  setShowPasswordSuccess(true)
                }}
                className="bg-[#7B2CBF] text-white px-10 py-3 rounded-xl text-lg"
              >
                Lanjut
              </button>
            </div>
          </div>
        </div>
      )}

      {showPasswordSuccess && (

        <div className="fixed inset-0 z-[9999] bg-black/40 flex items-center justify-center">

          <div className="bg-white rounded-3xl p-10 w-[420px] text-center relative">

            <button
              onClick={() =>
                setShowPasswordSuccess(false)
              }
              className="absolute top-5 right-5 text-2xl"
            >
              ×
            </button>

            <div className="w-28 h-28 rounded-full bg-green-100 flex items-center justify-center text-6xl text-green-600 mx-auto mb-8">

              ✓
            </div>

            <h1 className="text-4xl font-bold mb-5">

              Pembaharuan Berhasil
            </h1>

            <p className="text-gray-600 text-lg mb-10">

              Password anda berhasil diganti
            </p>

            <button
              onClick={() =>
                setShowPasswordSuccess(false)
              }
              className="bg-[#7B2CBF] hover:bg-[#6A1FB5] transition text-white w-full py-4 rounded-2xl text-2xl font-semibold"
            >
              Oke
            </button>
          </div>
        </div>
      )}
    </div>
  )
}