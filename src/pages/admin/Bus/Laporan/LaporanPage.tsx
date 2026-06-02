import { useState, useMemo } from "react";
import {
  ShoppingCart,
  List,
  DollarSign,
  Calculator,
  CalendarDays,
  FileDown,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";

// ── Data dummy ──────────────────────────────────────────────────────────────
const DUMMY_DATA = [
  { kode: "PSN001", nama: "Raka Mahendra",  email: "raka@gmail.com",  rute: "Medan → Pekanbaru", tgl: "20 Jun 2026", jam: "08:00", kursi: "A1", harga: 250000, status: "Lunas" },
  { kode: "PSN002", nama: "Andi Saputra",   email: "andi@gmail.com",  rute: "Medan → Pekanbaru", tgl: "20 Jun 2026", jam: "08:00", kursi: "B2", harga: 250000, status: "Lunas" },
  { kode: "PSN003", nama: "Budi Santoso",   email: "budi@gmail.com",  rute: "Medan → Pekanbaru", tgl: "20 Jun 2026", jam: "08:00", kursi: "C3", harga: 250000, status: "Lunas" },
  { kode: "PSN004", nama: "Siti Aisyah",    email: "siti@gmail.com",  rute: "Medan → Pekanbaru", tgl: "21 Jun 2026", jam: "09:00", kursi: "D4", harga: 250000, status: "Lunas" },
  { kode: "PSN005", nama: "Dedi Kurniawan", email: "dedi@gmail.com",  rute: "Medan → Pekanbaru", tgl: "21 Jun 2026", jam: "09:00", kursi: "E1", harga: 250000, status: "Lunas" },
  { kode: "PSN006", nama: "Lina Marlina",   email: "lina@gmail.com",  rute: "Medan → Pekanbaru", tgl: "21 Jun 2026", jam: "09:00", kursi: "A2", harga: 250000, status: "Menunggu" },
  { kode: "PSN007", nama: "Rizky Pratama",  email: "rizky@gmail.com", rute: "Medan → Pekanbaru", tgl: "22 Jun 2026", jam: "10:00", kursi: "B1", harga: 250000, status: "Lunas" },
  { kode: "PSN008", nama: "Wahyu Setiawan", email: "wahyu@gmail.com", rute: "Medan → Pekanbaru", tgl: "22 Jun 2026", jam: "10:00", kursi: "C2", harga: 250000, status: "Dibatalkan" },
  { kode: "PSN009", nama: "Nanda Putri",    email: "nanda@gmail.com", rute: "Medan → Pekanbaru", tgl: "23 Jun 2026", jam: "11:00", kursi: "D1", harga: 250000, status: "Lunas" },
  { kode: "PSN010", nama: "Fajar Nugroho",  email: "fajar@gmail.com", rute: "Medan → Pekanbaru", tgl: "23 Jun 2026", jam: "11:00", kursi: "E3", harga: 250000, status: "Lunas" },
];

const PAGE_SIZE = 10;

// ── Helpers ──────────────────────────────────────────────────────────────────
const formatRupiah = (n) =>
  "Rp " + n.toLocaleString("id-ID");

const statusStyle = {
  Lunas:      "bg-green-100 text-green-800",
  Menunggu:   "bg-amber-100 text-amber-800",
  Dibatalkan: "bg-red-100 text-red-700",
};

// ── Stat Card ─────────────────────────────────────────────────────────────────
function StatCard({ icon: Icon, iconClass, label, value, sub }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4">
      <div className={`w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 ${iconClass}`}>
        <Icon size={20} />
      </div>
      <div>
        <p className="text-xs text-gray-500 mb-0.5">{label}</p>
        <p className="text-base font-medium text-gray-900 leading-tight">{value}</p>
        {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function RiwayatPenjualan() {
  const [search, setSearch]       = useState("");
  const [status, setStatus]       = useState("");
  const [dateFrom, setDateFrom]   = useState("2026-06-01");
  const [dateTo, setDateTo]       = useState("2026-06-20");
  const [page, setPage]           = useState(1);

  // Filter
  const filtered = useMemo(() => {
    return DUMMY_DATA.filter((r) => {
      const q = search.toLowerCase();
      const matchSearch = !q || r.nama.toLowerCase().includes(q) || r.kode.toLowerCase().includes(q);
      const matchStatus = !status || r.status === status;
      return matchSearch && matchStatus;
    });
  }, [search, status]);

  // Pagination
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSearch = (e) => { setSearch(e.target.value); setPage(1); };
  const handleStatus = (e) => { setStatus(e.target.value); setPage(1); };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <ShoppingCart size={30} className="text-gray-700" />
          <h1 className="text-3xl font-bold text-gray-900">Riwayat Penjualan</h1>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <StatCard icon={List}        iconClass="bg-blue-50 text-blue-700"   label="Total Penjualan"    value="156"             sub="Transaksi" />
        <StatCard icon={DollarSign}  iconClass="bg-green-50 text-green-700" label="Total Pendapatan"   value="Rp 35.000.000"   sub="Semua Transaksi" />
        <StatCard icon={Calculator}  iconClass="bg-amber-50 text-amber-700" label="Rata-rata Transaksi" value="Rp 224.359"     sub="Per Transaksi" />
        <StatCard icon={CalendarDays} iconClass="bg-purple-50 text-purple-700" label="Penjualan Hari Ini" value="Rp 2.350.000" sub="8 Transaksi" />
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4 flex flex-wrap items-end gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-500">Tanggal Mulai</label>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-800 focus:outline-none focus:border-blue-400"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-500">Tanggal Akhir</label>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-800 focus:outline-none focus:border-blue-400"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-500">Status Pembayaran</label>
          <select
            value={status}
            onChange={handleStatus}
            className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-800 focus:outline-none focus:border-blue-400"
          >
            <option value="">Semua Status</option>
            <option value="Lunas">Lunas</option>
            <option value="Menunggu">Menunggu</option>
            <option value="Dibatalkan">Dibatalkan</option>
          </select>
        </div>
        <div className="flex flex-col gap-1 flex-1 min-w-[200px]">
          <label className="text-xs text-gray-500">Cari Nama / Kode Pemesanan</label>
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Masukkan nama atau kode..."
              value={search}
              onChange={handleSearch}
              className="w-full text-sm border border-gray-200 rounded-lg pl-8 pr-3 py-1.5 text-gray-800 focus:outline-none focus:border-blue-400"
            />
          </div>
        </div>
        <button className="ml-auto flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
          <FileDown size={15} />
          Export PDF
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {["No","Kode Pemesanan","Penumpang","Rute","Tanggal Berangkat","Kursi","Total Harga","Status Pembayaran","Aksi"].map((h) => (
                  <th key={h} className="text-left text-xs font-medium text-gray-500 px-4 py-3 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center text-gray-400 py-10 text-sm">
                    Tidak ada data ditemukan
                  </td>
                </tr>
              ) : (
                paginated.map((r, i) => (
                  <tr key={r.kode} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-gray-500">{(page - 1) * PAGE_SIZE + i + 1}</td>
                    <td className="px-4 py-3 font-medium text-gray-900">{r.kode}</td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900">{r.nama}</p>
                      <p className="text-xs text-gray-400">{r.email}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{r.rute}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <p className="text-gray-800">{r.tgl}</p>
                      <p className="text-xs text-gray-400">{r.jam}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-700">{r.kursi}</td>
                    <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{formatRupiah(r.harga)}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-3 py-0.5 rounded-full text-xs font-medium ${statusStyle[r.status]}`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 text-gray-700 hover:bg-gray-100 transition-colors">
                        Detail
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
          <p className="text-xs text-gray-400">
            Menampilkan {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}–{Math.min(page * PAGE_SIZE, filtered.length)} dari {filtered.length} data
          </p>
          <div className="flex gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={14} />
            </button>
            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs border transition-colors ${
                  page === n
                    ? "bg-blue-600 text-white border-blue-600"
                    : "border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {n}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}