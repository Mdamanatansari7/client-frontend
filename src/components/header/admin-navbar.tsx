"use client"

import { Menu, Bell, LogOut, Settings } from "lucide-react"

export default function AdminNavbar({ onToggleSidebar }: { onToggleSidebar: () => void }) {
  return (
    <nav className="h-16 bg-white border-b-2 border-primary shadow-md flex items-center justify-between px-6">
      <button onClick={onToggleSidebar} className="p-2 hover:bg-secondary rounded-lg transition text-primary">
        <Menu size={24} />
      </button>

      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-secondary rounded-lg transition relative text-primary">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-3 h-3 bg-accent rounded-full"></span>
        </button>

        <button className="p-2 hover:bg-secondary rounded-lg transition text-primary">
          <Settings size={20} />
        </button>

        <button className="p-2 hover:bg-secondary rounded-lg transition text-primary flex items-center gap-2">
          <LogOut size={20} />
          <span className="text-sm font-semibold hidden sm:inline">Logout</span>
        </button>
      </div>
    </nav>
  )
}
