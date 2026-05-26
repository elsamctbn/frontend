import {
  useState,
  useEffect,
} from 'react'

import Navbar from "../../components/user/Navbar";

export default function Profile() {

  const [profileImage, setProfileImage] =
    useState<string | null>(null)

  const [nama, setNama] =
    useState('')

  const [email, setEmail] =
    useState('')

  const [telepon, setTelepon] =
    useState('')

  const [gender, setGender] =
    useState('')

  const [tanggalLahir, setTanggalLahir] =
    useState('')

  const [alamat, setAlamat] =
    useState('')

  const [oldPassword, setOldPassword] =
    useState('')

  const [newPassword, setNewPassword] =
    useState('')

  const [confirmPassword, setConfirmPassword] =
    useState('')

  const [showEditModal, setShowEditModal] =
    useState(false)

  const [showSuccessPopup, setShowSuccessPopup] =
    useState(false)

  const [showPasswordModal, setShowPasswordModal] =
    useState(false)

  const [showPasswordSuccess, setShowPasswordSuccess] =
    useState(false)

  useEffect(() => {

  const savedProfile = JSON.parse(localStorage.getItem('profileData') || '{}')

  const savedUser = JSON.parse(localStorage.getItem('user') || '{}')

    if (savedProfile) {

      setNama(savedProfile.nama || '')

      setEmail(savedProfile.email || savedUser.email || '')

      setTelepon(savedProfile.telepon || savedUser.telepon || '')

      setGender(savedProfile.gender || '')

      setTanggalLahir(
        savedProfile.tanggalLahir || '')

      setAlamat(savedProfile.alamat || '')

      setProfileImage(
        savedProfile.profileImage || null)
    }
  }, [])

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
    const profileData = {
      nama,
      email,
      telepon,
      gender,
      tanggalLahir,
      alamat,
      profileImage,
    }

    localStorage.setItem(
      'profileData',
      JSON.stringify(profileData)
    )

    setShowEditModal(false)

    setShowSuccessPopup(true)

  }

  const handleSavePassword = () => {
    if (
      !oldPassword ||
      !newPassword ||
      !confirmPassword
    ) {
      alert(
        'Semua field password wajib diisi'
      )
      return
    }

    if (
      newPassword !== confirmPassword
    ) {
      alert(
        'Konfirmasi password tidak cocok'
      )
      return
    }
    setShowPasswordModal(false)
    setShowPasswordSuccess(true)
    setOldPassword('')
    setNewPassword('')
    setConfirmPassword('')
  }

  const handleLogout = () => {
    localStorage.removeItem('login')
    localStorage.removeItem('role')
    window.location.href ='/'
  }

  return (
    <div className="min-h-screen bg-[#f3f4f6]">
      <Navbar />

      {/* CONTENT */}
      <div className="flex justify-center py-20 px-4">
        <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl p-10">
          {/* TITLE */}
          <h1 className="text-4xl font-bold text-center mb-10">
            Profil
          </h1>

          {/* HEADER */}
          <div className="flex items-center gap-5 mb-10">

            {/* FOTO */}
            <div className="flex flex-col items-center gap-3">

              <label
                htmlFor="upload-photo"
                className="cursor-pointer">

                {
                  profileImage ? (

                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-28 h-28 rounded-full object-cover border-4 border-[#7B2CBF]"/>
                  ) : (

                    <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center text-5xl">
                      👤
                    </div>
                  )
                }
              </label>

              <input
                id="upload-photo"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"/>

            </div>

            {/* INFO */}
            <div>

              <h2 className="text-2xl font-bold">
                {
                  nama || 'Nama Pengguna'
                }
              </h2>
              
              <p className="text-gray-500 text-lg">
                {
                  email || 'email@gmail.com'
                }
              </p>

            </div>

          </div>

          {/* FORM */}
          <div className="space-y-6">

            {/* NAMA */}
            <input
              type="text"
              placeholder="Nama Lengkap"
              value={nama}
              onChange={(e) =>
                setNama(e.target.value)
              }
              className="w-full bg-gray-100 rounded-xl px-5 py-4 outline-none"/>

            {/* EMAIL */}
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full bg-gray-100 rounded-xl px-5 py-4 outline-none"/>

            {/* TELEPON + GENDER */}
            <div className="grid grid-cols-2 gap-6">

              <input
                type="text"
                placeholder="Nomor Telepon"
                value={telepon}
                onChange={(e) =>
                  setTelepon(e.target.value)
                }
                className="w-full bg-gray-100 rounded-xl px-5 py-4 outline-none"/>

              <select
                value={gender}
                onChange={(e) =>
                  setGender(e.target.value)
                }
                className="w-full bg-gray-100 rounded-xl px-5 py-4 outline-none">

                <option value="">
                  Pilih Jenis Kelamin
                </option>

                <option value="Laki-laki">
                  Laki-laki
                </option>

                <option value="Perempuan">
                  Perempuan
                </option>

              </select>

            </div>

            {/* TANGGAL DAN ALAMAT */}
            <div className="grid grid-cols-2 gap-6">

              <input
                type="date"
                value={tanggalLahir}
                placeholder='Tanggal Lahir'
                onChange={(e) =>
                  setTanggalLahir(
                    e.target.value
                  )
                }
                className="w-full bg-gray-100 rounded-xl px-5 py-4 outline-none"/>

              <textarea
                placeholder="Alamat"
                rows={3}
                value={alamat}
                onChange={(e) =>
                  setAlamat(e.target.value)
                }
                className="w-full bg-gray-100 rounded-xl px-5 py-4 outline-none resize-none"/>

            </div>

          </div>

          {/* BUTTON */}
          <div className="flex justify-between mt-10">

            {/* EDIT */}
            <button
              onClick={() =>
                setShowEditModal(true)
              }
              className="bg-[#7B2CBF] hover:bg-[#6A1FB5] transition text-white px-8 py-4 rounded-2xl text-xl font-semibold">
              Edit Profil
            </button>

            {/* PASSWORD */}
            <button
              onClick={() =>
                setShowPasswordModal(true)
              }
              className="border border-gray-400 hover:bg-gray-100 transition px-8 py-4 rounded-2xl text-xl font-semibold">
              Ganti Password
            </button>

            {/* LOGOUT */}
            <button
              onClick={handleLogout}
              className="bg-black hover:bg-gray-800 transition text-white px-8 py-4 rounded-2xl text-xl font-semibold">
              Logout
            </button>

          </div>

        </div>

      </div>

      {/* MODAL EDIT */}
      {
        showEditModal && (

          <div className="fixed inset-0 z-[9999] bg-black/40 flex items-center justify-center">

            <div className="bg-white rounded-3xl p-10 w-[450px] text-center">

              <div className="w-28 h-28 rounded-full bg-green-100 flex items-center justify-center text-6xl text-green-600 mx-auto mb-8">
                ✓
              </div>

              <h1 className="text-4xl font-bold mb-5">
                Simpan Perubahan?
              </h1>

              <p className="text-gray-600 text-lg mb-10">
                Pastikan data profile sudah benar
              </p>

              <div className="flex justify-center gap-5">

                <button
                  onClick={() =>
                    setShowEditModal(false)
                  }
                  className="bg-black text-white px-8 py-3 rounded-xl">
                  Batal
                </button>

                <button
                  onClick={handleSaveProfile}
                  className="bg-[#7B2CBF] text-white px-8 py-3 rounded-xl">
                  Simpan
                </button>

              </div>

            </div>

          </div>

        )
      }

      {/* SUCCESS PROFILE */}
      {
        showSuccessPopup && (

          <div className="fixed inset-0 z-[9999] bg-black/40 flex items-center justify-center">

            <div className="bg-white rounded-3xl p-10 w-[420px] text-center relative">

              <button
                onClick={() =>
                  setShowSuccessPopup(false)
                }
                className="absolute top-5 right-5 text-2xl">
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
                className="bg-[#7B2CBF] hover:bg-[#6A1FB5] transition text-white w-full py-4 rounded-2xl text-2xl font-semibold">
                Oke
              </button>

            </div>

          </div>

        )
      }

      {/* MODAL PASSWORD */}
      {
        showPasswordModal && (

          <div className="fixed inset-0 z-[9999] bg-black/40 flex items-center justify-center">

            <div className="bg-white rounded-3xl p-10 w-[450px]">

              <h1 className="text-3xl font-bold text-center mb-8">
                Ganti Password
              </h1>

              <div className="space-y-5">

                <input
                  type="password"
                  placeholder="Password Lama"
                  value={oldPassword}
                  onChange={(e) =>
                    setOldPassword(
                      e.target.value
                    )
                  }
                  className="w-full bg-gray-100 rounded-xl px-5 py-4 outline-none"/>

                <input
                  type="password"
                  placeholder="Password Baru"
                  value={newPassword}
                  onChange={(e) =>
                    setNewPassword(
                      e.target.value
                    )
                  }
                  className="w-full bg-gray-100 rounded-xl px-5 py-4 outline-none"/>

                <input
                  type="password"
                  placeholder="Konfirmasi Password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(
                      e.target.value
                    )
                  }
                  className="w-full bg-gray-100 rounded-xl px-5 py-4 outline-none"/>

              </div>

              {/* BUTTON */}
              <div className="flex justify-between mt-10">

                <button
                  onClick={() =>
                    setShowPasswordModal(false)
                  }
                  className="bg-black text-white px-8 py-3 rounded-xl">
                  Batal
                </button>

                <button
                  onClick={handleSavePassword}
                  className="bg-[#7B2CBF] text-white px-8 py-3 rounded-xl">
                  Simpan
                </button>

              </div>

            </div>

          </div>

        )
      }

      {/* SUCCESS PASSWORD */}
      {
        showPasswordSuccess && (

          <div className="fixed inset-0 z-[9999] bg-black/40 flex items-center justify-center">

            <div className="bg-white rounded-3xl p-10 w-[420px] text-center">

              <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center text-5xl text-green-600 mx-auto mb-6">
                ✓
              </div>

              <h1 className="text-3xl font-bold mb-4">
                Password Berhasil Diganti
              </h1>

              <p className="text-gray-500 mb-8">
                Password baru berhasil disimpan
              </p>

              <button
                onClick={() =>
                  setShowPasswordSuccess(false)
                }
                className="bg-[#7B2CBF] text-white px-10 py-3 rounded-xl">
                Oke
              </button>

            </div>

          </div>

        )
      }

    </div>
  )
}