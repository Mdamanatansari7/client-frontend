"use client"

import { useState } from "react"
import { Search, Download } from "lucide-react"

// Mock participant data
const allParticipants = [
  { id: 1, name: "Arjun Kumar", branch: "CSE", year: "3rd", game: "Cricket", rollNo: "21CSEB001" },
  { id: 2, name: "Priya Singh", branch: "ECE", year: "2nd", game: "Badminton", rollNo: "22ECEB015" },
  { id: 3, name: "Rahul Gupta", branch: "EEE", year: "4th", game: "Basketball", rollNo: "20EEEB008" },
  { id: 4, name: "Neha Sharma", branch: "ME", year: "1st", game: "Volleyball", rollNo: "24MECH042" },
  { id: 5, name: "Vikram Patel", branch: "CE", year: "3rd", game: "Tug of War", rollNo: "21CIVEB009" },
  { id: 6, name: "Anjali Verma", branch: "AI-ML", year: "2nd", game: "Chess", rollNo: "22AIMLB023" },
  { id: 7, name: "Deepak Mishra", branch: "CSE", year: "2nd", game: "Cricket", rollNo: "22CSEB047" },
  { id: 8, name: "Kavya Desai", branch: "ECE", year: "3rd", game: "Rangoli", rollNo: "21ECEB028" },
  { id: 9, name: "Rohan Sharma", branch: "EEE", year: "1st", game: "Basketball", rollNo: "24EEEB055" },
  { id: 10, name: "Sneha Prabhu", branch: "ME", year: "4th", game: "Chess", rollNo: "20MECH031" },
  { id: 11, name: "Aman Singh", branch: "CE", year: "2nd", game: "Volleyball", rollNo: "22CIVEB014" },
  { id: 12, name: "Zara Khan", branch: "AI-ML", year: "3rd", game: "Badminton", rollNo: "21AIMLB039" },
]

const branches = ["All", "CSE", "ECE", "EEE", "ME", "CE", "AI-ML"]
const years = ["All", "1st", "2nd", "3rd", "4th"]
const games = ["All", "Cricket", "Basketball", "Badminton", "Volleyball", "Tug of War", "Chess", "Rangoli"]

export default function ParticipantsList() {
  const [filterBranch, setFilterBranch] = useState("All")
  const [filterYear, setFilterYear] = useState("All")
  const [filterGame, setFilterGame] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredData = allParticipants.filter((p) => {
    const matchesBranch = filterBranch === "All" || p.branch === filterBranch
    const matchesYear = filterYear === "All" || p.year === filterYear
    const matchesGame = filterGame === "All" || p.game === filterGame
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.rollNo.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesBranch && matchesYear && matchesGame && matchesSearch
  })

  const downloadData = () => {
    alert("Export feature will be integrated with Firebase and file generation")
  }

  // Count by branch
  const branchCounts = branches.reduce(
    (acc, branch) => {
      if (branch !== "All") {
        acc[branch] = allParticipants.filter((p) => p.branch === branch).length
      }
      return acc
    },
    {} as Record<string, number>,
  )

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-6 rounded-xl">
          <p className="text-sm opacity-90 mb-1">Total Participants</p>
          <p className="text-3xl font-bold">{allParticipants.length}</p>
        </div>
        <div className="bg-gradient-to-br from-accent to-accent/80 text-accent-foreground p-6 rounded-xl">
          <p className="text-sm opacity-90 mb-1">Departments</p>
          <p className="text-3xl font-bold">6</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl">
          <p className="text-sm opacity-90 mb-1">Events</p>
          <p className="text-3xl font-bold">7</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl">
          <p className="text-sm opacity-90 mb-1">Filtered Results</p>
          <p className="text-3xl font-bold">{filteredData.length}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-primary border-opacity-10">
        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 text-primary" size={20} />
            <input
              type="text"
              placeholder="Search by name or roll number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-primary border-opacity-20 rounded-lg focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* Filter Dropdowns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">Branch</label>
            <select
              value={filterBranch}
              onChange={(e) => setFilterBranch(e.target.value)}
              className="w-full px-4 py-2 border-2 border-primary border-opacity-20 rounded-lg focus:outline-none focus:border-primary"
            >
              {branches.map((branch) => (
                <option key={branch} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">Year</label>
            <select
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              className="w-full px-4 py-2 border-2 border-primary border-opacity-20 rounded-lg focus:outline-none focus:border-primary"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">Game</label>
            <select
              value={filterGame}
              onChange={(e) => setFilterGame(e.target.value)}
              className="w-full px-4 py-2 border-2 border-primary border-opacity-20 rounded-lg focus:outline-none focus:border-primary"
            >
              {games.map((game) => (
                <option key={game} value={game}>
                  {game}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex justify-end">
        <button
          onClick={downloadData}
          className="flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition"
        >
          <Download size={20} />
          Export as Excel
        </button>
      </div>

      {/* Participants Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-primary border-opacity-10">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
              <th className="px-6 py-4 text-left font-bold">Name</th>
              <th className="px-6 py-4 text-left font-bold">Roll No</th>
              <th className="px-6 py-4 text-left font-bold">Branch</th>
              <th className="px-6 py-4 text-left font-bold">Year</th>
              <th className="px-6 py-4 text-left font-bold">Game</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((participant, index) => (
              <tr
                key={participant.id}
                className={`border-t border-primary border-opacity-10 hover:bg-secondary hover:bg-opacity-30 transition ${
                  index % 2 === 0 ? "bg-background" : "bg-secondary bg-opacity-10"
                }`}
              >
                <td className="px-6 py-4 font-semibold text-foreground">{participant.name}</td>
                <td className="px-6 py-4 text-foreground text-opacity-80 font-mono text-sm">{participant.rollNo}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-primary bg-opacity-20 text-primary rounded-full text-xs font-semibold">
                    {participant.branch}
                  </span>
                </td>
                <td className="px-6 py-4 text-foreground text-opacity-80">{participant.year}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-accent bg-opacity-20 text-accent rounded-full text-xs font-semibold">
                    {participant.game}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredData.length === 0 && (
        <div className="text-center py-12 bg-secondary bg-opacity-20 rounded-lg">
          <p className="text-foreground text-opacity-60 text-lg">No participants found matching your filters</p>
        </div>
      )}

      {/* Summary */}
      <div className="text-sm text-foreground text-opacity-70 text-center">
        Showing {filteredData.length} of {allParticipants.length} participants
      </div>
    </div>
  )
}
