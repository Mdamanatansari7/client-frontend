"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { db } from "@/lib/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"

const branches = ["CSE", "ECE", "EEE", "ME", "CE", "AI-ML", "MCA", "M.Tech", "BCA", "BBA", "Diploma"]
const years = ["1st", "2nd", "3rd", "4th"]
const games = ["Cricket", "Basketball", "Badminton", "Volleyball", "Tug of War", "Chess", "Rangoli"]
const genders = ["Male", "Female"]

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    rollNo: "",
    email: "",
    phone: "",
    branch: "",
    year: "",
    gender: "",
    selectedGames: [],
  })

  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleGameToggle = (game) => {
    setFormData((prev) => ({
      ...prev,
      selectedGames: prev.selectedGames.includes(game)
        ? prev.selectedGames.filter((g) => g !== game)
        : [...prev.selectedGames, game],
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.branch || !formData.selectedGames.length) {
      setError("Please fill all required fields and select at least one game")
      return
    }

    setLoading(true)
    setError("")

    try {
      const registrationsRef = collection(db, "registrations")
      await addDoc(registrationsRef, {
        ...formData,
        createdAt: serverTimestamp(),
        status: "confirmed",
      })

      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
        setFormData({
          name: "",
          rollNo: "",
          email: "",
          phone: "",
          branch: "",
          year: "",
          gender: "",
          selectedGames: [],
        })
      }, 3000)
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-primary border-opacity-20 animate-slideDown">
      {submitted && (
        <div className="mb-6 p-4 bg-green-50 border-l-4 border-primary rounded flex items-center gap-3 animate-slideDown">
          <Check className="text-primary" size={24} />
          <div>
            <h3 className="font-bold text-primary">Registration Successful!</h3>
            <p className="text-sm text-foreground text-opacity-70">
              Your registration has been submitted. We'll contact you soon.
            </p>
          </div>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded animate-slideDown">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div className="animate-slideDown" style={{ animationDelay: "0.05s" }}>
          <label className="block text-sm font-semibold text-foreground mb-2">
            Full Name <span className="text-primary">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="John Doe"
            className="w-full px-4 py-3 border-2 border-primary border-opacity-20 rounded-lg focus:outline-none focus:border-primary focus:shadow-lg transition"
            required
            disabled={loading}
          />
        </div>

        {/* Roll No */}
        <div className="animate-slideDown" style={{ animationDelay: "0.1s" }}>
          <label className="block text-sm font-semibold text-foreground mb-2">
            Roll Number <span className="text-primary">*</span>
          </label>
          <input
            type="text"
            name="rollNo"
            value={formData.rollNo}
            onChange={handleInputChange}
            placeholder="21CSEB001"
            className="w-full px-4 py-3 border-2 border-primary border-opacity-20 rounded-lg focus:outline-none focus:border-primary focus:shadow-lg transition"
            required
            disabled={loading}
          />
        </div>

        {/* Email */}
        <div className="animate-slideDown" style={{ animationDelay: "0.15s" }}>
          <label className="block text-sm font-semibold text-foreground mb-2">
            Email <span className="text-primary">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="john@rvscet.ac.in"
            className="w-full px-4 py-3 border-2 border-primary border-opacity-20 rounded-lg focus:outline-none focus:border-primary focus:shadow-lg transition"
            required
            disabled={loading}
          />
        </div>

        {/* Phone */}
        <div className="animate-slideDown" style={{ animationDelay: "0.2s" }}>
          <label className="block text-sm font-semibold text-foreground mb-2">
            Phone Number <span className="text-primary">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="+91 9876543210"
            className="w-full px-4 py-3 border-2 border-primary border-opacity-20 rounded-lg focus:outline-none focus:border-primary focus:shadow-lg transition"
            required
            disabled={loading}
          />
        </div>

        {/* Branch & Year */}
        <div className="grid grid-cols-2 gap-4">
          <div className="animate-slideDown" style={{ animationDelay: "0.25s" }}>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Branch <span className="text-primary">*</span>
            </label>
            <select
              name="branch"
              value={formData.branch}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-primary border-opacity-20 rounded-lg focus:outline-none focus:border-primary focus:shadow-lg transition"
              required
              disabled={loading}
            >
              <option value="">Select Branch</option>
              {branches.map((branch) => (
                <option key={branch} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
          </div>

          <div className="animate-slideDown" style={{ animationDelay: "0.3s" }}>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Year <span className="text-primary">*</span>
            </label>
            <select
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-primary border-opacity-20 rounded-lg focus:outline-none focus:border-primary focus:shadow-lg transition"
              required
              disabled={loading}
            >
              <option value="">Select Year</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Gender */}
        <div className="animate-slideDown" style={{ animationDelay: "0.35s" }}>
          <label className="block text-sm font-semibold text-foreground mb-2">
            Gender <span className="text-primary">*</span>
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-primary border-opacity-20 rounded-lg focus:outline-none focus:border-primary focus:shadow-lg transition"
            required
            disabled={loading}
          >
            <option value="">Select Gender</option>
            {genders.map((gender) => (
              <option key={gender} value={gender}>
                {gender}
              </option>
            ))}
          </select>
        </div>

        {/* Games Selection */}
        <div className="animate-slideDown" style={{ animationDelay: "0.4s" }}>
          <label className="block text-sm font-semibold text-foreground mb-4">
            Select Games <span className="text-primary">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            {games.map((game, index) => (
              <button
                key={game}
                type="button"
                onClick={() => handleGameToggle(game)}
                disabled={loading}
                className={`p-3 rounded-lg border-2 font-semibold transition text-center animate-slideDown ${
                  formData.selectedGames.includes(game)
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-white text-foreground border-primary border-opacity-20 hover:border-primary"
                }`}
                style={{ animationDelay: `${0.45 + index * 0.05}s` }}
              >
                {game}
              </button>
            ))}
          </div>
          {formData.selectedGames.length > 0 && (
            <p className="text-sm text-primary font-semibold mt-3">{formData.selectedGames.length} game(s) selected</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-bold py-4 rounded-lg hover:shadow-xl transition transform hover:scale-105 text-lg disabled:opacity-50 disabled:cursor-not-allowed animate-slideDown"
          style={{ animationDelay: "0.75s" }}
        >
          {loading ? "Registering..." : "Complete Registration"}
        </button>

        <p className="text-xs text-foreground text-opacity-60 text-center">
          By registering, you agree to participate in FROLIC 2025 and follow all event guidelines.
        </p>
      </form>
    </div>
  )
}
