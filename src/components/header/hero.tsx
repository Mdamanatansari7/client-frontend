"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    // Calculate countdown to January 20, 2025
    const calculateTimeLeft = () => {
      const targetDate = new Date("2025-01-20").getTime()
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-gradient-to-b from-primary via-primary to-secondary flex items-center justify-center py-20 px-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-96 h-96 bg-accent rounded-full mix-blend-multiply blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent rounded-full mix-blend-multiply blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto text-center z-10">
        <div className="mb-6 animate-slideDown">
          <div className="inline-block bg-accent bg-opacity-20 text-accent font-semibold px-6 py-2 rounded-full text-sm mb-6">
            RVS College of Engineering & Technology
          </div>
        </div>

        <h1
          className="text-5xl md:text-7xl font-bold text-white mb-4 animate-slideDown"
          style={{ animationDelay: "0.1s" }}
        >
          LOGICAL 2025
        </h1>

        <p
          className="text-xl md:text-2xl text-white text-opacity-90 mb-8 font-light animate-slideDown"
          style={{ animationDelay: "0.2s" }}
        >
          Unite, Compete, Celebrate!
        </p>

        <p
          className="text-lg md:text-xl text-white text-opacity-80 mb-12 max-w-2xl mx-auto animate-slideDown"
          style={{ animationDelay: "0.3s" }}
        >
          Join us for the most exciting college sports & cultural extravaganza featuring cricket, basketball, badminton,
          volleyball, and more!
        </p>

        {/* Countdown Timer */}
        <div className="mb-12 animate-slideDown" style={{ animationDelay: "0.4s" }}>
          <p className="text-white text-opacity-75 mb-6 font-semibold uppercase tracking-wide">Opening in</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {[
              { value: timeLeft.days, label: "Days" },
              { value: timeLeft.hours, label: "Hours" },
              { value: timeLeft.minutes, label: "Minutes" },
              { value: timeLeft.seconds, label: "Seconds" },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 border border-white border-opacity-20"
              >
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">
                  {String(item.value).padStart(2, "0")}
                </div>
                <div className="text-sm md:text-base text-white text-opacity-75 uppercase font-semibold tracking-wide">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center animate-slideDown"
          style={{ animationDelay: "0.5s" }}
        >
          <Link
            href="/register"
            className="bg-accent text-accent-foreground px-8 py-4 rounded-lg font-bold text-lg hover:shadow-xl transition transform hover:scale-105 inline-block"
          >
            Register Now
          </Link>
          <Link
            href="/schedule"
            className="bg-white bg-opacity-20 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-opacity-30 transition border-2 border-white inline-block"
          >
            View Schedule
          </Link>
        </div>
      </div>

      {/* Curved bottom divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-32">
          <path d="M0,50 Q300,100 600,50 T1200,50 L1200,120 L0,120 Z" fill="white" fillOpacity="1"></path>
        </svg>
      </div>
    </section>
  )
}
