"use client"

import { Menu, X } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b-2 border-primary shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <span className="font-bold text-lg text-primary">LOGICAL 2025</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-foreground hover:text-primary font-medium transition">
              Home
            </Link>
            <Link href="/games" className="text-foreground hover:text-primary font-medium transition">
              Games
            </Link>
            <Link href="/schedule" className="text-foreground hover:text-primary font-medium transition">
              Schedule
            </Link>
            <Link href="/participants" className="text-foreground hover:text-primary font-medium transition">
              Participants
            </Link>
            <Link href="/about" className="text-foreground hover:text-primary font-medium transition">
              About
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex gap-4 items-center">
            <Link
              href="/register"
              className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition transform hover:scale-105"
            >
              Register Now
            </Link>
            <Link href="/admin" className="text-primary font-semibold hover:underline">
              Admin
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground hover:bg-secondary rounded"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t-2 border-primary py-4">
            <div className="flex flex-col gap-4 px-2">
              <Link href="/" className="text-foreground hover:text-primary font-medium py-2">
                Home
              </Link>
              <Link href="/games" className="text-foreground hover:text-primary font-medium py-2">
                Games
              </Link>
              <Link href="/schedule" className="text-foreground hover:text-primary font-medium py-2">
                Schedule
              </Link>
              <Link href="/participants" className="text-foreground hover:text-primary font-medium py-2">
                Participants
              </Link>
              <Link href="/about" className="text-foreground hover:text-primary font-medium py-2">
                About
              </Link>
              <Link
                href="/register"
                className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold text-center"
              >
                Register Now
              </Link>
              <Link href="/admin" className="text-primary font-semibold py-2">
                Admin
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
