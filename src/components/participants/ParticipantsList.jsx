// src/components/ParticipantsList.jsx
"use client";

import React, { useMemo, useState, useEffect } from "react";
import { Search, Download, Users, Building2, Trophy } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../../features/ParticipantsSlice"; // adjust path if needed
import Footer from "../footer"; // adjust path if needed

function formatDate(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleString();
  } catch {
    return iso;
  }
}

export default function ParticipantsList() {
  const dispatch = useDispatch();
  const {
    users: allParticipants = [],
    loading,
    error,
  } = useSelector((store) => store.users ?? { users: [], loading: false, error: null });

  // Filters & search
  const [filterBranch, setFilterBranch] = useState("All");
  const [filterYear, setFilterYear] = useState("All");
  const [filterGame, setFilterGame] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination
  const PAGE_SIZE = 10;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (allParticipants.length === 0) {
      dispatch(fetchAllUsers());
    }
  }, [dispatch, allParticipants.length]);

  // derive filter options
  const allBranches = useMemo(() => {
    const s = Array.from(new Set(allParticipants.map((p) => (p.branch || "").toUpperCase()))).filter(Boolean);
    return ["All", ...s.sort()];
  }, [allParticipants]);

  const allYears = useMemo(() => {
    const s = Array.from(new Set(allParticipants.map((p) => p.year || ""))).filter(Boolean);
    const display = s.map((y) => (y ? y.charAt(0).toUpperCase() + y.slice(1) : y));
    return ["All", ...display.sort()];
  }, [allParticipants]);

  const allGames = useMemo(() => {
    const set = new Set();
    allParticipants.forEach((p) => {
      (p.sports || []).forEach((sp) => set.add(sp));
    });
    return ["All", ...Array.from(set).sort()];
  }, [allParticipants]);

  // filtered data based on filters & search
  const filteredData = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return allParticipants.filter((p) => {
      const branchMatch = filterBranch === "All" || (p.branch || "").toUpperCase() === filterBranch;
      const yearDisplay = p.year ? p.year.charAt(0).toUpperCase() + p.year.slice(1) : "";
      const yearMatch = filterYear === "All" || yearDisplay === filterYear;
      const gameMatch =
        filterGame === "All" ||
        (p.sports || []).map((s) => s.toLowerCase()).includes((filterGame || "").toLowerCase());
      const searchMatch =
        !q ||
        (`${p.firstName || ""} ${p.lastName || ""}`.toLowerCase().includes(q)) ||
        (p.rollNumber || "").toLowerCase().includes(q);
      return branchMatch && yearMatch && gameMatch && searchMatch;
    });
  }, [allParticipants, filterBranch, filterYear, filterGame, searchTerm]);

  // reset to first page whenever filters/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [filterBranch, filterYear, filterGame, searchTerm, filteredData.length]);

  // pagination calculations
  const totalFiltered = filteredData.length;
  const totalPages = Math.max(1, Math.ceil(totalFiltered / PAGE_SIZE));
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = Math.min(startIndex + PAGE_SIZE, totalFiltered);
  const paginated = filteredData.slice(startIndex, endIndex);

  // export CSV (exports entire filteredData)
  const exportCSV = () => {
    const headers = ["First Name", "Last Name", "Roll Number", "Branch", "Year", "Sports", "Gender", "Status", "Created At"];
    const rows = filteredData.map((p) => [
      p.firstName ?? "",
      p.lastName ?? "",
      p.rollNumber ?? "",
      (p.branch || "").toUpperCase(),
      p.year ? p.year.charAt(0).toUpperCase() + p.year.slice(1) : "",
      (p.sports || []).join(", "),
      p.gender ?? "",
      p.status ?? "",
      formatDate(p.createdAt) ?? "",
    ]);

    const csvContent =
      headers.join(",") +
      "\n" +
      rows.map((r) => r.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `participants_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const totalParticipants = allParticipants.length;
  const deptCount = "CSE";
  const eventsCount = useMemo(() => new Set(allParticipants.flatMap((p) => p.sports || [])).size, [allParticipants]);

  // page buttons array (simple)
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <>
      <div className="space-y-6 min-h-screen p-6 bg-gradient-to-b from-[#071033] via-[#072b4f] to-[#071028] text-white">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-cyan-200 to-indigo-400">
          All Participants
        </h1>

        {loading && (
          <div className="p-4 rounded-lg bg-blue-900/50 border border-blue-700/50 text-center text-sky-300 animate-pulse">
            Loading participants…
          </div>
        )}
        {error && (
          <div className="p-4 rounded-lg bg-red-900/30 border border-red-700 text-center text-red-300">
            Error: {String(error)}
          </div>
        )}

        {/* Stats (Filtered Results card removed as requested) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: "Total Participants", value: totalParticipants, icon: Users },
            { title: "Departments", value: deptCount, icon: Building2 },
            { title: "Events", value: eventsCount, icon: Trophy },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-blue-900/50 backdrop-blur-md p-5 rounded-2xl border border-blue-700/50 shadow-lg flex items-center gap-4"
            >
              <stat.icon className="w-8 h-8 text-sky-400 flex-shrink-0" />
              <div>
                <p className="text-sm opacity-80 mb-1">{stat.title}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="bg-blue-900/50 backdrop-blur-md rounded-xl p-6 shadow-lg border border-blue-700/50">
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by name or roll number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-blue-900/60 border border-blue-700/50 rounded-lg focus:outline-none focus:border-sky-500 text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: "Branch", value: filterBranch, setter: setFilterBranch, options: allBranches },
              { label: "Year", value: filterYear, setter: setFilterYear, options: allYears },
              { label: "Game", value: filterGame, setter: setFilterGame, options: allGames },
            ].map((filter) => (
              <div key={filter.label}>
                <label className="text-sm font-semibold mb-2 block">{filter.label}</label>
                <select
                  value={filter.value}
                  onChange={(e) => filter.setter(e.target.value)}
                  className="w-full px-4 py-2 bg-blue-900/60 border border-blue-700/50 rounded-lg focus:outline-none text-white"
                >
                  {filter.options.map((opt) => (
                    <option key={opt} value={opt} className="bg-blue-900 text-white">
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>

        {/* Action Row (Export button - DIFFERENT COLOR) */}
        <div className="flex justify-end">
          <button
            onClick={exportCSV}
            className="flex items-center gap-2 bg-amber-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-amber-300 shadow-lg transition"
            title="Export filtered participants as CSV"
          >
            <Download size={18} />
            Export as Excel
          </button>
        </div>

        {/* Table (paginated) */}
        <div className="overflow-x-auto bg-blue-900/50 backdrop-blur-md rounded-xl shadow-lg border border-blue-700/50">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="bg-blue-800/70 text-sky-200">
                <th className="px-6 py-4 text-left font-bold">Name</th>
                <th className="px-6 py-4 text-left font-bold">Roll No</th>
                <th className="px-6 py-4 text-left font-bold">Branch</th>
                <th className="px-6 py-4 text-left font-bold">Year</th>
                <th className="px-6 py-4 text-left font-bold">Sports</th>
                <th className="px-6 py-4 text-left font-bold">Gender</th>
                <th className="px-6 py-4 text-left font-bold">Status</th>
                <th className="px-6 py-4 text-left font-bold">Submitted</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((p, idx) => (
                <tr
                  key={p._id || `${p.rollNumber}-${idx}`}
                  className={`border-t border-blue-800/50 hover:bg-blue-800/60 transition ${idx % 2 === 0 ? "bg-blue-900/40" : "bg-transparent"}`}
                >
                  <td className="px-6 py-4 font-semibold text-white">{`${p.firstName || ""} ${p.lastName || ""}`}</td>
                  <td className="px-6 py-4 text-white/80 font-mono text-sm">{p.rollNumber}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-semibold">
                      {(p.branch || "").toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-white/80">{p.year ? p.year.charAt(0).toUpperCase() + p.year.slice(1) : ""}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      {(p.sports || []).map((s) => (
                        <span key={s} className="px-2 py-1 bg-sky-500/20 text-sky-300 rounded-full text-xs font-medium capitalize">
                          {s}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-white/80">{p.gender ? p.gender.charAt(0).toUpperCase() + p.gender.slice(1) : ""}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        p.status === "accepted"
                          ? "bg-green-600 text-white"
                          : p.status === "rejected"
                          ? "bg-red-600 text-white"
                          : "bg-yellow-500 text-black"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-white/80 text-sm">{formatDate(p.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* No results message */}
        {filteredData.length === 0 && (
          <div className="text-center py-12 bg-blue-900/50 rounded-lg border border-blue-700/50">
            <p className="text-gray-300 text-lg">No participants found matching your filters</p>
          </div>
        )}

        {/* Pagination controls */}
        <div className="flex items-center justify-between gap-4 mt-6">
          <div className="text-sm text-white/70">
            Showing <span className="font-semibold text-white">{paginated.length}</span> of <span className="font-semibold text-white">{totalFiltered}</span> matching results
            {totalFiltered > 0 && <span className="hidden sm:inline"> — page {currentPage} of {totalPages}</span>}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-md ${currentPage === 1 ? "bg-blue-800/40 text-slate-400" : "bg-blue-800/70 hover:bg-blue-800/90 text-white"}`}
            >
              Prev
            </button>

            <div className="hidden sm:flex items-center gap-1">
              {pageNumbers.map((num) => (
                <button
                  key={num}
                  onClick={() => setCurrentPage(num)}
                  className={`px-3 py-1 rounded-md ${num === currentPage ? "bg-sky-400 text-black font-semibold shadow" : "bg-blue-800/60 text-white hover:bg-blue-800/80"}`}
                >
                  {num}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-md ${currentPage === totalPages ? "bg-blue-800/40 text-slate-400" : "bg-blue-800/70 hover:bg-blue-800/90 text-white"}`}
            >
              Next
            </button>
          </div>
        </div>

        {/* Footer summary */}
        <div className="text-sm text-white/70 text-center">
          Showing {paginated.length} entries on this page • Total participants: {totalParticipants}
        </div>
      </div>

      <Footer />
    </>
  );
}
