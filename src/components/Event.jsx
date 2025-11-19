"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// events array (same)
const events = [
  { id: 1, name: "Cricket", description: "High-octane cricket matches featuring all branches", image: "/cricket-match-action.jpg", teamSize: "11 players" },
  { id: 2, name: "Basketball", description: "Fast-paced basketball tournaments for all skill levels", image: "/lively-basketball-game.png", teamSize: "5 players" },
  { id: 3, name: "Badminton", description: "Competitive badminton singles and doubles events", image: "/badminton-court.png", teamSize: "2 players" },
  { id: 4, name: "Volleyball", description: "Dynamic volleyball matches with exciting rallies", image: "/volleyball-net-action.jpg", teamSize: "6 players" },
  { id: 5, name: "Tug of War", description: "Test your strength and teamwork in this classic event", image: "/tug-of-war-strength.jpg", teamSize: "10 players" },
  { id: 6, name: "Chess", description: "Battle of minds in strategic chess competitions", image: "/chess-tournament.png", teamSize: "1-2 players" },
];

export default function EventsCarousel() {
  const [index, setIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const autoplayRef = useRef(null);
  const trackRef = useRef(null);
  const AUTOPLAY_MS = 3000;

  useEffect(() => {
    function updateCount() {
      const w = window.innerWidth;
      if (w < 640) setVisibleCount(1);
      else if (w < 1024) setVisibleCount(2);
      else setVisibleCount(3);
    }
    updateCount();
    window.addEventListener("resize", updateCount);
    return () => window.removeEventListener("resize", updateCount);
  }, []);

  useEffect(() => {
    startAutoplay();
    return stopAutoplay;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleCount]);

  function startAutoplay() {
    stopAutoplay();
    autoplayRef.current = setInterval(() => {
      goToNext();
    }, AUTOPLAY_MS);
  }

  function stopAutoplay() {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }

  const goToPrev = () => setIndex((prev) => (prev - 1 + events.length) % events.length);
  const goToNext = () => setIndex((prev) => (prev + 1) % events.length);
  const goToIndex = (i) => setIndex(i);

  const slideWidthPercent = 100 / visibleCount;
  const translateX = -(index * slideWidthPercent);

  return (
    <section className="w-full py-20 px-4 bg-gradient-to-b from-[#071033] via-[#072b4f] to-[#071028] text-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-3 text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-cyan-200 to-indigo-400 drop-shadow-sm">
          Upcoming Events
        </h2>
        <p className="text-center text-slate-200/80 mb-10 text-lg">
          Explore all the exciting sports and cultural events at LOGICAL 2025
        </p>

        <div
          className="relative"
          onMouseEnter={stopAutoplay}
          onMouseLeave={startAutoplay}
        >
          {/* Spotlight behind carousel to add depth */}
          <div className="absolute left-1/2 top-6 -translate-x-1/2 -z-10 w-[80%] h-40 rounded-full opacity-30 pointer-events-none"
               style={{ background: 'radial-gradient(circle at 50% 30%, rgba(14,165,233,0.12), rgba(99,102,241,0.06) 30%, transparent 60%)', filter: 'blur(48px)' }} />

          {/* viewport */}
          <div className="overflow-hidden">
            {/* track */}
            <div
              ref={trackRef}
              className="flex gap-6 will-change-transform transition-transform duration-700 ease-in-out"
              style={{
                width: `${(events.length * 100) / visibleCount}%`,
                transform: `translateX(${translateX}%)`,
              }}
            >
              {events.map((ev) => (
                <article
                  key={ev.id}
                  className="backdrop-blur-sm rounded-xl shadow-2xl flex-shrink-0"
                  style={{
                    width: `${slideWidthPercent}%`,
                    minWidth: `${slideWidthPercent}%`,
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))',
                    border: '1px solid rgba(255,255,255,0.04)',
                    boxShadow: '0 18px 40px rgba(2,6,23,0.6), 0 6px 24px rgba(6,182,212,0.04)'
                  }}
                >
                  <div className="h-48 overflow-hidden rounded-t-xl bg-slate-800">
                    <img
                      src={ev.image}
                      alt={ev.name}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "../../image/]mou3.jpeg";
                      }}
                      className="w-full h-full object-cover transition-transform duration-700 ease-in-out hover:scale-110"
                    />
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-sky-100 mb-2">{ev.name}</h3>
                    <p className="text-slate-300 mb-4 leading-relaxed">{ev.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-200">Team: {ev.teamSize}</span>
                      <span className="text-xl text-sky-400">→</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Arrows */}
          <button
            onClick={goToPrev}
            aria-label="Previous"
            className="absolute left-0 top-1/2 -translate-y-1/2 transform -translate-x-1/2 md:-translate-x-0 md:left-3 lg:left-6"
            style={{ zIndex: 20 }}
          >
            <div className="bg-sky-400/95 text-[#071028] rounded-full p-3 shadow-lg hover:scale-105 transition transform">
              <ChevronLeft size={20} className="inline-block" />
            </div>
          </button>

          <button
            onClick={goToNext}
            aria-label="Next"
            className="absolute right-0 top-1/2 -translate-y-1/2 transform translate-x-1/2 md:translate-x-0 md:right-3 lg:right-6"
            style={{ zIndex: 20 }}
          >
            <div className="bg-sky-400/95 text-[#071028] rounded-full p-3 shadow-lg hover:scale-105 transition transform">
              <ChevronRight size={20} className="inline-block" />
            </div>
          </button>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {events.map((_, i) => {
              const isActive = i === index;
              return (
                <button
                  key={i}
                  onClick={() => goToIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${isActive ? "w-8 bg-sky-400" : "w-3 bg-slate-700/60"}`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
