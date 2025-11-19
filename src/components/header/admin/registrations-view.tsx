"use client"

import { useState } from "react"
import { Download } from "lucide-react"

const allRegistrations = [
  {
    id: 1,
    name: "Arjun Kumar",
    branch: "CSE",
    year: "3rd",
    games: "Cricket, Basketball",
    email: "arjun@rvscet.ac.in",
    status: "Confirmed",
  },
  {
    id: 2,
    name: "Priya Singh",
    branch: "ECE",
    year: "2nd",
    games: "Badminton",
    email: "priya@rvscet.ac.in",
    status: "Confirmed",
  },
  {
    id: 3,
    name: "Rahul Gupta",
    branch: "EEE",
    year: "4th",
    games: "Basketball",
    email: "rahul@rvscet.ac.in",
    status: "Pending",
  },
  {
    id: 4,
    name: "Neha Sharma",
    branch: "ME",
    year: "1st",
    games: "Volleyball",
    email: "neha@rvscet.ac.in",
    status: "Confirmed",
  },
  {
    id: 5,
    name: "Vikram Patel",
    branch: "CE",
    year: "3rd",
    games: "Tug of War",
    email: "vikram@rvscet.ac.in",
    status: "Confirmed",
  },
]

export default function RegistrationsView() {
  const [filterBranch, setFilterBranch] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredRegistrations = allRegistrations.filter((reg) => {
    const matchesBranch = filterBranch === "All" || reg.branch === filterBranch
    const matchesSearch = reg.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesBranch && matchesSearch
  })

  const exportData = () => {
    alert("Export functionality will be implemented with Firebase")
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-primary">Registrations</h2>
        <button
          onClick={exportData}
          className="flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition"
        >
          <Download size={18} />
          Export Branch-wise
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-lg border border-primary border-opacity-10 flex gap-4 items-end">
        <div className="flex-1">
          <label className="text-sm font-semibold text-foreground mb-2 block">Search</label>
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border-2 border-primary border-opacity-20 rounded-lg focus:outline-none focus:border-primary"
          />
        </div>
        <div className="w-40">
          <label className="text-sm font-semibold text-foreground mb-2 block">Branch</label>
          <select
            value={filterBranch}
            onChange={(e) => setFilterBranch(e.target.value)}
            className="w-full px-4 py-2 border-2 border-primary border-opacity-20 rounded-lg focus:outline-none focus:border-primary"
          >
            <option>All</option>
            <option>CSE</option>
            <option>ECE</option>
            <option>EEE</option>
            <option>ME</option>
            <option>CE</option>
            <option>AI-ML</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-primary border-opacity-10">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
              <th className="px-6 py-4 text-left font-bold">Name</th>
              <th className="px-6 py-4 text-left font-bold">Branch</th>
              <th className="px-6 py-4 text-left font-bold">Year</th>
              <th className="px-6 py-4 text-left font-bold">Games</th>
              <th className="px-6 py-4 text-left font-bold">Email</th>
              <th className="px-6 py-4 text-left font-bold">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredRegistrations.map((reg, index) => (
              <tr
                key={reg.id}
                className={`border-t border-primary border-opacity-10 hover:bg-secondary hover:bg-opacity-30 transition ${
                  index % 2 === 0 ? "bg-background" : "bg-secondary bg-opacity-10"
                }`}
              >
                <td className="px-6 py-4 font-semibold text-foreground">{reg.name}</td>
                <td className="px-6 py-4 text-foreground text-opacity-80">{reg.branch}</td>
                <td className="px-6 py-4 text-foreground text-opacity-80">{reg.year}</td>
                <td className="px-6 py-4 text-sm text-foreground text-opacity-80">{reg.games}</td>
                <td className="px-6 py-4 text-sm text-foreground text-opacity-80">{reg.email}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      reg.status === "Confirmed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {reg.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-sm text-foreground text-opacity-70">
        Showing {filteredRegistrations.length} of {allRegistrations.length} registrations
      </p>
    </div>
  )
}
