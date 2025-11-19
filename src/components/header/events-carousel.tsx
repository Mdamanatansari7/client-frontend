"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

const events = [
  {
    id: 1,
    name: "Cricket",
    description: "High-octane cricket matches featuring all branches",
    image: "/cricket-match-action.jpg",
    teamSize: "11 players",
  },
  {
    id: 2,
    name: "Basketball",
    description: "Fast-paced basketball tournaments for all skill levels",
    image: "/lively-basketball-game.png",
    teamSize: "5 players",
  },
  {
    id: 3,
    name: "Badminton",
    description: "Competitive badminton singles and doubles events",
    image: "/badminton-court.png",
    teamSize: "2 players",
  },
  {
    id: 4,
    name: "Volleyball",
    description: "Dynamic volleyball matches with exciting rallies",
    image: "/volleyball-net-action.jpg",
    teamSize: "6 players",
  },
  {
    id: 5,
    name: "Tug of War",
    description: "Test your strength and teamwork in this classic event",
    image: "/tug-of-war-strength.jpg",
    teamSize: "10 players",
  },
  {
    id: 6,
    name: "Chess",
    description: "Battle of minds in strategic chess competitions",
    image: "/chess-tournament.png",
    teamSize: "1-2 players",
  },
]

export default function EventsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + events.length) % events.length)
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length)
  }

  return (
    <section className="w-full py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-primary mb-4">Upcoming Events</h2>
        <p className="text-center text-foreground text-opacity-70 mb-12 text-lg">
          Explore all the exciting sports and cultural events at FROLIC 2025
        </p>

        {/* Carousel */}
        <div className="relative">
          {/* Events Grid - show 3 on desktop, 1 on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.slice(currentIndex, currentIndex + 3).map((event) => (
              <div
                key={event.id}
                className="group bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:scale-105"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={event.image || "/placeholder.svg"}
                    alt={event.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                  />
                </div>
                <div className="p-6 bg-gradient-to-br from-white to-secondary">
                  <h3 className="text-2xl font-bold text-primary mb-2">{event.name}</h3>
                  <p className="text-foreground text-opacity-70 mb-4">{event.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-primary">Team: {event.teamSize}</span>
                    <span className="text-accent font-bold">→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={goToPrevious}
            className="absolute -left-4 md:-left-16 top-1/2 transform -translate-y-1/2 bg-primary text-primary-foreground p-3 rounded-full hover:bg-primary/80 transition shadow-lg"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={goToNext}
            className="absolute -right-4 md:-right-16 top-1/2 transform -translate-y-1/2 bg-primary text-primary-foreground p-3 rounded-full hover:bg-primary/80 transition shadow-lg"
          >
            <ChevronRight size={24} />
          </button>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {events.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition ${
                  index === currentIndex ? "bg-primary w-8" : "bg-primary bg-opacity-30 w-2"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
