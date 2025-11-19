"use client"

import { Download } from "lucide-react"
import { useState } from "react"

const scheduleData = [
  {
    id: 1,
    date: "Jan 20, 2025",
    time: "9:00 AM - 12:00 PM",
    event: "Cricket (Group Stage - Boys)",
    venue: "Main Cricket Ground",
    category: "Sports",
  },
  {
    id: 2,
    date: "Jan 20, 2025",
    time: "2:00 PM - 5:00 PM",
    event: "Basketball (Preliminary - Girls)",
    venue: "Indoor Sports Hall",
    category: "Sports",
  },
  {
    id: 3,
    date: "Jan 21, 2025",
    time: "10:00 AM - 1:00 PM",
    event: "Badminton (Singles - Open)",
    venue: "Badminton Court",
    category: "Sports",
  },
  {
    id: 4,
    date: "Jan 21, 2025",
    time: "3:00 PM - 6:00 PM",
    event: "Chess Tournament",
    venue: "Community Hall",
    category: "Indoor",
  },
  {
    id: 5,
    date: "Jan 22, 2025",
    time: "9:00 AM - 12:00 PM",
    event: "Volleyball (Group Stage)",
    venue: "Volleyball Court",
    category: "Sports",
  },
  {
    id: 6,
    date: "Jan 22, 2025",
    time: "2:00 PM - 5:00 PM",
    event: "Tug of War (Qualifiers)",
    venue: "Open Ground",
    category: "Sports",
  },
  {
    id: 7,
    date: "Jan 23, 2025",
    time: "10:00 AM - 2:00 PM",
    event: "Rangoli Competition",
    venue: "Cultural Block",
    category: "Cultural",
  },
  {
    id: 8,
    date: "Jan 24, 2025",
    time: "4:00 PM - 6:00 PM",
    event: "Finals & Prize Distribution",
    venue: "Main Auditorium",
    category: "Closing",
  },
]

export default function ScheduleTable() {
  const [filterCategory, setFilterCategory] = useState("All")
  const categories = ["All", "Sports", "Indoor", "Cultural", "Closing"]

  const filteredData =
    filterCategory === "All" ? scheduleData : scheduleData.filter((item) => item.category === filterCategory)

  const downloadPDF = () => {
    try {
      const doc = document.createElement("div")
      doc.innerHTML = `
        <h1 style="text-align: center; color: #004AAD; margin-bottom: 20px;">FROLIC 2025 - Schedule</h1>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <thead>
            <tr style="background-color: #004AAD; color: white;">
              <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Date</th>
              <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Time</th>
              <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Event</th>
              <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Venue</th>
              <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Category</th>
            </tr>
          </thead>
          <tbody>
            ${filteredData
              .map(
                (row) => `
              <tr>
                <td style="border: 1px solid #ddd; padding: 10px;">${row.date}</td>
                <td style="border: 1px solid #ddd; padding: 10px;">${row.time}</td>
                <td style="border: 1px solid #ddd; padding: 10px;">${row.event}</td>
                <td style="border: 1px solid #ddd; padding: 10px;">${row.venue}</td>
                <td style="border: 1px solid #ddd; padding: 10px;">${row.category}</td>
              </tr>
            `,
              )
              .join("")}
          </tbody>
        </table>
      `

      const printWindow = window.open("", "", "height=600,width=800")
      printWindow.document.write("<html><head><title>FROLIC 2025 Schedule</title></head><body>")
      printWindow.document.write(doc.innerHTML)
      printWindow.document.write("</body></html>")
      printWindow.document.close()
      printWindow.print()
    } catch (err) {
      alert("Error generating PDF: " + err.message)
    }
  }

  return (
    <div className="space-y-6">
      {/* Filter and Download */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 animate-slideDown">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilterCategory(category)}
              className={`px-4 py-2 rounded-full font-semibold transition transform hover:scale-105 ${
                filterCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground hover:bg-secondary/80"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <button
          onClick={downloadPDF}
          className="flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition transform hover:scale-105"
        >
          <Download size={20} />
          Download PDF
        </button>
      </div>

      {/* Schedule Table */}
      <div
        className="overflow-x-auto bg-white rounded-xl shadow-lg border border-primary border-opacity-10 animate-slideDown"
        style={{ animationDelay: "0.1s" }}
      >
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
              <th className="px-6 py-4 text-left font-bold">Date</th>
              <th className="px-6 py-4 text-left font-bold">Time</th>
              <th className="px-6 py-4 text-left font-bold">Event</th>
              <th className="px-6 py-4 text-left font-bold">Venue</th>
              <th className="px-6 py-4 text-left font-bold">Category</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, index) => (
              <tr
                key={row.id}
                className={`border-t border-primary border-opacity-10 hover:bg-secondary hover:bg-opacity-30 transition transform hover:scale-x-105 ${
                  index % 2 === 0 ? "bg-background" : "bg-secondary bg-opacity-10"
                }`}
              >
                <td className="px-6 py-4 font-semibold text-primary">{row.date}</td>
                <td className="px-6 py-4 text-foreground text-opacity-80">{row.time}</td>
                <td className="px-6 py-4 font-semibold text-foreground">{row.event}</td>
                <td className="px-6 py-4 text-foreground text-opacity-80">{row.venue}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      row.category === "Sports"
                        ? "bg-primary bg-opacity-20 text-primary"
                        : row.category === "Indoor"
                          ? "bg-accent bg-opacity-20 text-accent"
                          : "bg-green-100 text-green-700"
                    }`}
                  >
                    {row.category}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredData.length === 0 && (
        <div className="text-center py-12 bg-secondary bg-opacity-20 rounded-lg">
          <p className="text-foreground text-opacity-60 text-lg">No events found in this category</p>
        </div>
      )}
    </div>
  )
}
