"use client"

import type React from "react"

import { BarChart3, Users, Calendar, Megaphone, Shield, ChevronRight } from "lucide-react"
import Link from "next/link"

type AdminView = "overview" | "registrations" | "schedule" | "announcements" | "admins"

interface MenuItem {
  id: AdminView
  label: string
  icon: React.ReactNode
}

const menuItems: MenuItem[] = [
  { id: "overview", label: "Dashboard Overview", icon: <BarChart3 size={20} /> },
  { id: "registrations", label: "Registrations", icon: <Users size={20} /> },
  { id: "schedule", label: "Schedule Manager", icon: <Calendar size={20} /> },
  { id: "announcements", label: "Announcements", icon: <Megaphone size={20} /> },
  { id: "admins", label: "Admin Users", icon: <Shield size={20} /> },
]

export default function AdminSidebar({
  isOpen,
  currentView,
  onViewChange,
}: {
  isOpen: boolean
  currentView: AdminView
  onViewChange: (view: AdminView) => void
}) {
  return (
    <aside
      className={`bg-primary text-primary-foreground transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      } flex flex-col`}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b border-primary-foreground border-opacity-20">
        <Link href="/" className="font-bold text-xl text-center">
          {isOpen ? "FROLIC Admin" : "FA"}
        </Link>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 overflow-y-auto py-8 px-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              currentView === item.id
                ? "bg-accent text-accent-foreground"
                : "text-primary-foreground hover:bg-primary-foreground hover:bg-opacity-10"
            }`}
          >
            {item.icon}
            {isOpen && <span className="font-semibold text-sm flex-1 text-left">{item.label}</span>}
            {isOpen && currentView === item.id && <ChevronRight size={16} />}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-primary-foreground border-opacity-20 p-4">
        <Link href="/" className="flex items-center gap-2 text-sm hover:opacity-80 transition">
          <span>←</span>
          {isOpen && <span>Back to Site</span>}
        </Link>
      </div>
    </aside>
  )
}
