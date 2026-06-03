import { useState, useMemo, useEffect } from "react";
import {
  CalendarDays,
  RefreshCcw,
  List,
  Clock3,
  Search,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────
interface Reschedule {
  id: number;
  kode_tiket: string;
  rute: string;
  kursi_lama: string;
  kursi_baru: string;
  tanggal: string;
}

interface Stats {
  total: number;
  hari_ini: number;
  minggu_ini: number;
  bulan_ini: number;
}

const PAGE_SIZE = 10;

// ── Stat Card ─────────────────────────────────────────────────────────────────
function StatCard({
  icon: Icon,
  iconClass,
  label,
  value,
  sub,
}: {
  icon: any;
  iconClass: string;
  label: string;
  value: string;
  sub?: string;
}) {
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
export default function RiwayatReschedule() {
  const [data, setData]       = useState<Reschedule[]>([]);
  const [stats, setStats]     = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState("");
  const [search, setSearch]   = useState("");
  const [page, setPage]       = useState(1);

  // ── Fetch dari Laravel ──────────────────────────────────────────────────────
  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      };

      const [resData, resStats] = await Promise.all([
        fetch("/api/admin/riwayat-reschedule", { headers }),
        fetch("/api/admin/riwayat-reschedule/stats", { headers }),
      ]);

      if (!resData.ok)  throw new Error("Gagal memuat data reschedule");
      if (!resStats.ok) throw new Error("Gagal memuat statistik");

      const jsonData  = await resData.json();
      const jsonStats = await resStats.json();

      // Laravel pagination → .data, kalau return array langsung → langsung
      setData(jsonData.data ?? jsonData);
      setStats(jsonStats);
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ── Filter search sisi client ───────────────────────────────────────────────
  const filtered = useMemo(() => {
    if (!search) return data;
    const q = search.toLowerCase();
    return data.filter((item) =>
      item.kode_tiket.toLowerCase().includes(q)
    );
  }, [data, search]);

  // ── Pagination ──────────────────────────────────────────────────────────────
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated  = filtered.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <RefreshCcw size={30} className="text-gray-700" />
        <h1 className="text-3xl font-bold text-gray-900">Riwayat Reschedule</h1>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <StatCard
          icon={List}
          iconClass="bg-blue-50 text-blue-700"
          label="Total Reschedule"
          value={stats ? String(stats.total) : "-"}
          sub="Semua Data"
        />
        <StatCard
          icon={Clock3}
          iconClass="bg-green-50 text-green-700"
          label="Hari Ini"
          value={stats ? String(stats.hari_ini) : "-"}
          sub="Reschedule"
        />
        <StatCard
          icon={CalendarDays}
          iconClass="bg-amber-50 text-amber-700"
          label="Minggu Ini"
          value={stats ? String(stats.minggu_ini) : "-"}
          sub="Reschedule"
        />
        <StatCard
          icon={RefreshCcw}
          iconClass="bg-purple-50 text-purple-700"
          label="Bulan Ini"
          value={stats ? String(stats.bulan_ini) : "-"}
          sub="Reschedule"
        />
      </div>

      {/* Filter */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
        <label className="text-xs text-gray-500">Cari Kode Tiket</label>
        <div className="relative mt-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Masukkan kode tiket..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full text-sm border border-gray-200 rounded-lg pl-8 pr-3 py-2 text-gray-800 focus:outline-none focus:border-blue-400"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {["No", "Kode Tiket", "Rute", "Kursi Lama", "Kursi Baru", "Tanggal Reschedule", "Aksi"].map((h) => (
                  <th key={h} className="text-left text-xs font-medium text-gray-500 px-4 py-3 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-12">
                    <div className="flex items-center justify-center gap-2 text-gray-400">
                      <Loader2 size={18} className="animate-spin" />
                      <span className="text-sm">Memuat data...</span>
                    </div>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={7} className="text-center py-12">
                    <p className="text-sm text-red-500 mb-2">{error}</p>
                    <button
                      onClick={fetchData}
                      className="text-xs text-blue-600 underline"
                    >
                      Coba lagi
                    </button>
                  </td>
                </tr>
              ) : paginated.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-gray-400 text-sm">
                    Tidak ada data ditemukan
                  </td>
                </tr>
              ) : (
                paginated.map((item, i) => (
                  <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-gray-500">
                      {(page - 1) * PAGE_SIZE + i + 1}
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {item.kode_tiket}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {item.rute}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {item.kursi_lama}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {item.kursi_baru}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {item.tanggal}
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

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
          <p className="text-xs text-gray-400">
            Menampilkan{" "}
            {filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}–
            {Math.min(page * PAGE_SIZE, filtered.length)} dari {filtered.length} data
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