"use client"

import { useState } from "react"
import { Upload, Plus, Trash2 } from "lucide-react"

const scheduleItems = [
  { id: 1, date: "Jan 20, 2025", time: "9:00 AM", event: "Cricket (Boys)", venue: "Main Ground" },
  { id: 2, date: "Jan 20, 2025", time: "2:00 PM", event: "Basketball (Girls)", venue: "Indoor Hall" },
  { id: 3, date: "Jan 21, 2025", time: "10:00 AM", event: "Badminton", venue: "Court" },
]

export default function ScheduleManager() {
  const [newEvent, setNewEvent] = useState({ date: "", time: "", event: "", venue: "" })
  const [items, setItems] = useState(scheduleItems)

  const addEvent = () => {
    if (newEvent.date && newEvent.event) {
      setItems([...items, { id: Date.now(), ...newEvent }])
      setNewEvent({ date: "", time: "", event: "", venue: "" })
    }
  }

  const deleteEvent = (id: number) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const uploadPDF = () => {
    alert("PDF upload functionality will be integrated with Firebase Storage")
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-primary">Schedule Manager</h2>
        <button
          onClick={uploadPDF}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition"
        >
          <Upload size={18} />
          Upload Schedule PDF
        </button>
      </div>

      {/* Add New Event */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-primary border-opacity-10">
        <h3 className="text-lg font-bold text-primary mb-4">Add Event</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <input
            type="date"
            value={newEvent.date}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
            className="px-4 py-2 border-2 border-primary border-opacity-20 rounded-lg focus:outline-none focus:border-primary"
          />
          <input
            type="time"
            value={newEvent.time}
            onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
            className="px-4 py-2 border-2 border-primary border-opacity-20 rounded-lg focus:outline-none focus:border-primary"
          />
          <input
            type="text"
            placeholder="Event name"
            value={newEvent.event}
            onChange={(e) => setNewEvent({ ...newEvent, event: e.target.value })}
            className="px-4 py-2 border-2 border-primary border-opacity-20 rounded-lg focus:outline-none focus:border-primary"
          />
          <input
            type="text"
            placeholder="Venue"
            value={newEvent.venue}
            onChange={(e) => setNewEvent({ ...newEvent, venue: e.target.value })}
            className="px-4 py-2 border-2 border-primary border-opacity-20 rounded-lg focus:outline-none focus:border-primary"
          />
          <button
            onClick={addEvent}
            className="bg-accent text-accent-foreground px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition flex items-center justify-center gap-2"
          >
            <Plus size={18} />
            Add
          </button>
        </div>
      </div>

      {/* Events List */}
      <div className="bg-white rounded-xl shadow-lg border border-primary border-opacity-10 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
              <th className="px-6 py-4 text-left font-bold">Date</th>
              <th className="px-6 py-4 text-left font-bold">Time</th>
              <th className="px-6 py-4 text-left font-bold">Event</th>
              <th className="px-6 py-4 text-left font-bold">Venue</th>
              <th className="px-6 py-4 text-left font-bold">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr
                key={item.id}
                className={`border-t border-primary border-opacity-10 hover:bg-secondary hover:bg-opacity-30 transition ${
                  index % 2 === 0 ? "bg-background" : "bg-secondary bg-opacity-10"
                }`}
              >
                <td className="px-6 py-4 font-semibold text-foreground">{item.date}</td>
                <td className="px-6 py-4 text-foreground text-opacity-80">{item.time}</td>
                <td className="px-6 py-4 text-foreground">{item.event}</td>
                <td className="px-6 py-4 text-foreground text-opacity-80">{item.venue}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => deleteEvent(item.id)}
                    className="text-red-600 hover:bg-red-100 p-2 rounded transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
