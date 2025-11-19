"use client"

import { useState } from "react"
import { Trash2, Send } from "lucide-react"

const announcements = [
  {
    id: 1,
    title: "Registration Open",
    message: "FROLIC 2025 registrations are now open!",
    date: "Jan 1, 2025",
    status: "Published",
  },
  {
    id: 2,
    title: "Schedule Released",
    message: "The complete event schedule is now available.",
    date: "Jan 5, 2025",
    status: "Published",
  },
]

export default function AnnouncementsManager() {
  const [newAnnouncement, setNewAnnouncement] = useState({ title: "", message: "" })
  const [items, setItems] = useState(announcements)

  const addAnnouncement = () => {
    if (newAnnouncement.title && newAnnouncement.message) {
      setItems([
        ...items,
        {
          id: Date.now(),
          ...newAnnouncement,
          date: new Date().toLocaleDateString(),
          status: "Published",
        },
      ])
      setNewAnnouncement({ title: "", message: "" })
    }
  }

  const deleteAnnouncement = (id: number) => {
    setItems(items.filter((item) => item.id !== id))
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary">Announcements</h2>

      {/* Create Announcement */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-primary border-opacity-10">
        <h3 className="text-lg font-bold text-primary mb-4">Create New Announcement</h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Announcement title"
            value={newAnnouncement.title}
            onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
            className="w-full px-4 py-3 border-2 border-primary border-opacity-20 rounded-lg focus:outline-none focus:border-primary"
          />
          <textarea
            placeholder="Announcement message"
            value={newAnnouncement.message}
            onChange={(e) => setNewAnnouncement({ ...newAnnouncement, message: e.target.value })}
            rows={4}
            className="w-full px-4 py-3 border-2 border-primary border-opacity-20 rounded-lg focus:outline-none focus:border-primary resize-none"
          />
          <button
            onClick={addAnnouncement}
            className="bg-accent text-accent-foreground px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition flex items-center gap-2"
          >
            <Send size={18} />
            Publish Announcement
          </button>
        </div>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {items.map((announcement) => (
          <div
            key={announcement.id}
            className="bg-white p-6 rounded-xl shadow-lg border border-primary border-opacity-10"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-primary">{announcement.title}</h3>
                <p className="text-sm text-foreground text-opacity-60 mt-1">{announcement.date}</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                {announcement.status}
              </span>
            </div>
            <p className="text-foreground text-opacity-80 mb-4">{announcement.message}</p>
            <button
              onClick={() => deleteAnnouncement(announcement.id)}
              className="text-red-600 hover:bg-red-100 p-2 rounded transition flex items-center gap-2"
            >
              <Trash2 size={18} />
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
