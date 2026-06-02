import { useState } from "react";
import { useNavigate } from "react-router-dom";

const DetailPenumpang = () => {
  const navigate = useNavigate();

  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [telepon, setTelepon] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [selectedSeat, setSelectedSeat] = useState("");
  const [jumlahPenumpang, setJumlahPenumpang] = useState("");

  const handleNext = () => {
    navigate("/payment", {
      state: {
        nama: nama,
        email: email,
        telepon: telepon,
        tanggalLahir: tanggalLahir,
        jumlahPenumpang: jumlahPenumpang,
        kursi: selectedSeat,
      },
    });
  };

  return (
    <button onClick={handleNext}>
      Selanjutnya
    </button>
  );
};

export default DetailPenumpang;