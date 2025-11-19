import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import trophyImg from "../../public/image/trofi.png";
import Footer from "./footer";

// EVENT TARGET (Asia/Kolkata)
const TARGET_DATE_ISO = "2025-12-21T00:00:00+05:30";
const format = (n) => String(n).padStart(2, "0");

export default function HomeAnimated() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [tick, setTick] = useState(false);

  const achievements = [
    { year: "2019", title: "Overall Champion", note: "Strong comeback", rank: "1st Rank", medal: "gold" },
    { year: "2022", title: "Overall Champion", note: "Strong comeback", rank: "1st Rank", medal: "gold" },
    { year: "2023", title: "Overall Champion", note: "Strong comeback", rank: "1st Rank", medal: "gold" },
  ];

  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((s) => (s + 1) % achievements.length), 3500);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const target = new Date(TARGET_DATE_ISO).getTime();
      const now = Date.now();
      const diff = Math.max(0, target - now);
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    calculateTimeLeft();
    const timer = setInterval(() => {
      calculateTimeLeft();
      setTick((t) => !t);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const isLive = Date.now() >= new Date(TARGET_DATE_ISO).getTime();

  const tiles = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Minutes" },
    { value: timeLeft.seconds, label: "Seconds" },
  ];

  return (
    <>
      <section
        className="relative w-full min-h-screen flex items-center justify-center py-20 px-4 bg-gradient-to-b from-[#071033] via-[#072b4f] to-[#071028] text-white overflow-hidden"
        style={{
          scrollBehavior: "smooth",
          WebkitOverflowScrolling: "touch",
          willChange: "scroll-position",
        }}
      >

        {/* BACKGROUND RIBBONS */}
        <div aria-hidden className="absolute inset-0 -z-10 will-change-transform">
          <div
            className="absolute -left-56 -top-24 w-[52rem] h-[52rem] rounded-full opacity-35 animate-blob-slow"
            style={{
              background:
                "radial-gradient(circle at 20% 25%, rgba(14,165,233,0.18), transparent 18%), radial-gradient(circle at 70% 75%, rgba(124,58,237,0.12), transparent 25%)",
              filter: "blur(110px)",
              transform: "translateZ(0)",
            }}
          />

          <div
            className="absolute -right-56 -bottom-24 w-[52rem] h-[52rem] rounded-full opacity-28 animate-blob-slow animation-delay-2500"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, rgba(59,130,246,0.16), transparent 18%), radial-gradient(circle at 70% 70%, rgba(6,182,212,0.12), transparent 25%)",
              filter: "blur(120px)",
              transform: "translateZ(0)",
            }}
          />

          <div
            className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[40rem] opacity-40 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 50% 35%, rgba(96,165,250,0.14), rgba(14,165,233,0.08) 20%, transparent 45%)",
              filter: "blur(90px)",
              transform: "translateZ(0)",
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
        </div>

        <div className="max-w-6xl w-full mx-auto z-10 px-4 will-change-transform">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

            {/* LEFT PANEL */}
            <div className="space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-3 bg-white/6 backdrop-blur-md px-4 py-2 rounded-full text-sm font-semibold mb-2">
                <svg className="w-5 h-5 text-sky-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L15 8l6 .5-4.5 3 1.5 6L12 15l-6 3 1.5-6L3 8.5 9 8l3-6z" />
                </svg>
                RVS College of Engineering &amp; Technology
              </div>

              {/* FLOATING TITLE */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
                <motion.span
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="block text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-cyan-200 to-indigo-400 will-change-transform"
                  style={{ transform: "translateZ(0)" }}
                >
                  LOGICAL 2025
                  <span className="ml-1 inline-block animate-pulse">|</span>
                </motion.span>
              </h1>

              <p className="max-w-xl text-slate-200">
                Unite Compete Celebrate. The biggest college sports & cultural festival of the year.
              </p>

              <div className="flex flex-wrap items-center gap-3 justify-center lg:justify-start mt-4">
                <Link
                  to={isLive ? "/live" : "/register"}
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-sky-400 via-indigo-500 to-violet-600 text-slate-900 font-semibold shadow-2xl transform transition hover:scale-[1.03]"
                >
                  {isLive ? "Join Live" : "Register Now"}
                </Link>

                <Link
                  to="/schedule"
                  className="inline-flex items-center gap-2 border border-white/10 px-4 py-2 rounded-full text-sm text-slate-200/90 hover:bg-white/6 transition"
                >
                  View Schedule
                </Link>
              </div>

              <div className="mt-4 text-sm text-slate-300">Venue: RVS College • Dec 21, 2025</div>
            </div>

            {/* RIGHT PANEL */}
            <div className="will-change-transform">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white/6 backdrop-blur-md border border-white/8 rounded-2xl p-6 shadow-2xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-sm uppercase tracking-wide text-slate-200/80">Opening in</div>
                    <div className="text-xs text-slate-400">Countdown to LOGICAL 2025</div>
                  </div>

                  {isLive ? (
                    <div className="px-3 py-1 rounded-full bg-emerald-400 text-black font-bold">LIVE</div>
                  ) : (
                    <div className="text-xs text-slate-300/70">Starts on Dec 21</div>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                  {tiles.map((t, i) => (
                    <motion.div
                      key={i}
                      layout
                      whileHover={{ scale: 1.03 }}
                      className="relative rounded-xl p-4 bg-gradient-to-br from-white/6 to-white/3 border border-white/8"
                      style={{ willChange: "transform" }}
                    >
                      <motion.div
                        animate={{ scale: tick ? 1.03 : 0.995 }}
                        transition={{ duration: 0.18 }}
                        className="text-2xl sm:text-3xl font-extrabold text-white/95"
                      >
                        {format(t.value)}
                      </motion.div>
                      <div className="mt-1 text-xs sm:text-sm text-slate-200/70 uppercase tracking-wider">{t.label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* ACHIEVEMENTS SLIDER */}
                <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                  <div className="col-span-1 flex items-center justify-center relative">
                    <div
                      className="absolute -inset-6 rounded-full blur-3xl opacity-60"
                      style={{
                        background:
                          "radial-gradient(circle at 50% 45%, rgba(56,189,248,0.18), rgba(99,102,241,0.06) 30%, transparent 55%)",
                      }}
                    />

                    <div className="w-32 h-32 perspective-1000 relative z-10">
                      <motion.div
                        whileHover={{ rotateY: 14, scale: 1.07 }}
                        animate={{
                          rotateY: [0, 6, -6, 0],
                          y: [0, -4, -2, 0],
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="relative w-full h-full will-change-transform"
                        style={{ transform: "translateZ(0)" }}
                      >
                        <img src={trophyImg} alt="trophy" className="w-full h-full object-contain" />
                      </motion.div>
                    </div>
                  </div>

                  <div className="col-span-2 overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white/4 p-4 rounded-xl border border-white/8 will-change-transform"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-2xl font-bold text-sky-200">{achievements[index].year}</div>
                            <div className="text-sm text-slate-200/80">{achievements[index].title}</div>
                            <div className="text-xs text-slate-300/70 mt-1">{achievements[index].note}</div>
                          </div>

                          <div className="text-right">
                            <div className="text-sm uppercase text-slate-300">{achievements[index].rank}</div>
                            <div className="mt-2 inline-flex items-center gap-2">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                  achievements[index].medal === "gold"
                                    ? "bg-yellow-400"
                                    : achievements[index].medal === "silver"
                                    ? "bg-slate-300"
                                    : "bg-amber-700"
                                }`}
                              >
                                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M12 2l2.6 5.2L20 8l-4 3.5L17 18l-5-2.6L7 18l1-6.5L4 8l5.4-.8L12 2z" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* CURVED DIVIDER */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-28">
            <path d="M0,0 C300,120 900,0 1200,120 L1200,0 L0,0 Z" fill="#071028" />
          </svg>
        </div>

        <style>{`
          html {
            scroll-behavior: smooth !important;
            -webkit-overflow-scrolling: touch;
          }

          @keyframes blob { 
            0% { transform: translateY(0) scale(1) rotate(-12deg); } 
            33% { transform: translateY(-16px) scale(1.03) rotate(-8deg); } 
            66% { transform: translateY(8px) scale(0.99) rotate(-14deg); } 
            100% { transform: translateY(0) scale(1) rotate(-12deg); } 
          }

          .animate-blob-slow { 
            animation: blob 22s ease-in-out infinite; 
            will-change: transform;
          }

          .animation-delay-2500 { animation-delay: 2.5s; }

          .blur-3xl { filter: blur(48px); }

          * {
            backface-visibility: hidden;
            transform: translateZ(0);
          }
        `}</style>
      </section>

      <Footer />
    </>
  );
}
