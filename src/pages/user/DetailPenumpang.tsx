import { useState } from "react";
import { useNavigate } from "react-router-dom";

const DetailPenumpang = () => {
  const navigate = useNavigate();

  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [telepon, setTelepon] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [selectedSeat, setSelectedSeat] = useState<string[]>([]);
  const [jumlahPenumpang, setJumlahPenumpang] = useState("1");

  const handleTanggalLahir = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const today = new Date().toISOString().split("T")[0];
    if (val >= today) {
      alert("Tanggal lahir tidak valid");
      return;
    }
    setTanggalLahir(val);
  };

  const handleNext = () => {
    if (
      !nama ||
      !email ||
      !telepon ||
      !tanggalLahir ||
      selectedSeat.length === 0
    ) {
      alert("Lengkapi semua data terlebih dahulu");
      return;
    }

    navigate("/payment", {
      state: {
        nama,
        email,
        telepon,
        tanggalLahir,
        jumlahPenumpang,
        kursi: selectedSeat,
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl p-10 shadow-lg w-full max-w-xl space-y-5">
        <h1 className="text-3xl font-bold text-center mb-6">Data Penumpang</h1>

        {/* NAMA */}
        <div>
          <label className="block mb-1 font-medium text-sm">Nama Lengkap</label>
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            placeholder="Masukkan nama lengkap"
            className="w-full bg-gray-100 rounded-xl px-4 py-3 outline-none text-sm"
          />
        </div>

        {/* EMAIL */}
        <div>
          <label className="block mb-1 font-medium text-sm">E-Mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Masukkan email"
            className="w-full bg-gray-100 rounded-xl px-4 py-3 outline-none text-sm"
          />
        </div>

        {/* TELEPON */}
        <div>
          <label className="block mb-1 font-medium text-sm">Nomor Telepon</label>
          <input
            type="text"
            value={telepon}
            onChange={(e) => setTelepon(e.target.value)}
            placeholder="Contoh: 08123456789"
            className="w-full bg-gray-100 rounded-xl px-4 py-3 outline-none text-sm"
          />
        </div>

        {/* TANGGAL LAHIR */}
        <div>
          <label className="block mb-1 font-medium text-sm">Tanggal Lahir</label>
          <input
            type="date"
            value={tanggalLahir}
            onChange={handleTanggalLahir}
            className="w-full bg-gray-100 rounded-xl px-4 py-3 outline-none text-sm"
          />
        </div>

        {/* JUMLAH PENUMPANG */}
        <div>
          <label className="block mb-1 font-medium text-sm">Jumlah Penumpang</label>
          <select
            value={jumlahPenumpang}
            onChange={(e) => setJumlahPenumpang(e.target.value)}
            className="w-full bg-gray-100 rounded-xl px-4 py-3 outline-none text-sm"
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={String(n)}>
                {n} orang
              </option>
            ))}
          </select>
        </div>

        {/* PILIH KURSI */}
        <div>
          <label className="block mb-1 font-medium text-sm">Kursi Dipilih</label>
          <div className="w-full bg-gray-100 rounded-xl px-4 py-3 text-sm text-gray-500">
            {selectedSeat.length > 0
              ? selectedSeat.join(", ")
              : "Belum ada kursi dipilih"}
          </div>
          {/* 
            Hubungkan ke SeatModal / komponen pilih kursi yang sudah ada.
            Contoh: 
            <button onClick={() => setShowSeatModal(true)}>Pilih Kursi</button>
            Lalu dari modal: setSelectedSeat([...kursiYangDipilih])
          */}
        </div>

        {/* TOMBOL */}
        <div className="flex gap-4 pt-4">
          <button
            onClick={() => navigate(-1)}
            className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-xl font-semibold text-sm hover:bg-gray-50"
          >
            Kembali
          </button>
          <button
            onClick={handleNext}
            className="flex-1 bg-[#7B2CBF] text-white py-3 rounded-xl font-semibold text-sm hover:bg-[#6a22a8]"
          >
            Selanjutnya
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailPenumpang;