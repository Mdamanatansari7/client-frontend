"use client"

import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Users, CheckCircle, Calendar, TrendingUp } from "lucide-react"

const registrationData = [
  { branch: "CSE", registrations: 45 },
  { branch: "ECE", registrations: 38 },
  { branch: "EEE", registrations: 32 },
  { branch: "ME", registrations: 28 },
  { branch: "CE", registrations: 25 },
  { branch: "AI-ML", registrations: 22 },
]

const trendData = [
  { day: "Day 1", registrations: 15 },
  { day: "Day 2", registrations: 32 },
  { day: "Day 3", registrations: 58 },
  { day: "Day 4", registrations: 85 },
  { day: "Day 5", registrations: 120 },
  { day: "Day 6", registrations: 155 },
  { day: "Day 7", registrations: 190 },
]

export default function DashboardOverview() {
  const totalRegistrations = registrationData.reduce((sum, item) => sum + item.registrations, 0)
  const totalEvents = 7
  const daysRemaining = 15

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90 mb-1">Total Registrations</p>
              <p className="text-3xl font-bold">{totalRegistrations}</p>
            </div>
            <Users size={32} className="opacity-50" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-accent to-accent/80 text-accent-foreground p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90 mb-1">Active Events</p>
              <p className="text-3xl font-bold">{totalEvents}</p>
            </div>
            <Calendar size={32} className="opacity-50" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90 mb-1">Days Remaining</p>
              <p className="text-3xl font-bold">{daysRemaining}</p>
            </div>
            <TrendingUp size={32} className="opacity-50" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90 mb-1">Completion</p>
              <p className="text-3xl font-bold">78%</p>
            </div>
            <CheckCircle size={32} className="opacity-50" />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Branch-wise Registrations */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-primary border-opacity-10">
          <h3 className="text-lg font-bold text-primary mb-4">Registrations by Branch</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={registrationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="branch" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="registrations" fill="#004AAD" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Registration Trend */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-primary border-opacity-10">
          <h3 className="text-lg font-bold text-primary mb-4">Registration Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="registrations" stroke="#FFD700" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-primary border-opacity-10">
        <h3 className="text-lg font-bold text-primary mb-4">Recent Registrations</h3>
        <div className="space-y-3">
          {[
            { name: "Arjun Kumar", event: "Cricket", time: "2 hours ago" },
            { name: "Priya Singh", event: "Badminton", time: "3 hours ago" },
            { name: "Rahul Gupta", event: "Basketball", time: "5 hours ago" },
            { name: "Neha Sharma", event: "Volleyball", time: "6 hours ago" },
            { name: "Vikram Patel", event: "Tug of War", time: "8 hours ago" },
          ].map((activity, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-3 border-b border-foreground border-opacity-10 last:border-b-0"
            >
              <div>
                <p className="font-semibold text-foreground">{activity.name}</p>
                <p className="text-sm text-foreground text-opacity-60">{activity.event}</p>
              </div>
              <span className="text-xs text-foreground text-opacity-50">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
