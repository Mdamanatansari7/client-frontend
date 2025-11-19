"use client"

import { useState } from "react"
import AdminNavbar from "@/components/admin-navbar"
import AdminSidebar from "@/components/admin-sidebar"
import DashboardOverview from "@/components/admin/dashboard-overview"
import RegistrationsView from "@/components/admin/registrations-view"
import ScheduleManager from "@/components/admin/schedule-manager"
import AnnouncementsManager from "@/components/admin/announcements-manager"

type AdminView = "overview" | "registrations" | "schedule" | "announcements" | "admins"

export default function AdminDashboard() {
  const [currentView, setCurrentView] = useState<AdminView>("overview")
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar isOpen={sidebarOpen} currentView={currentView} onViewChange={setCurrentView} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminNavbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-auto p-6">
          {currentView === "overview" && <DashboardOverview />}
          {currentView === "registrations" && <RegistrationsView />}
          {currentView === "schedule" && <ScheduleManager />}
          {currentView === "announcements" && <AnnouncementsManager />}
        </main>
      </div>
    </div>
  )
}
