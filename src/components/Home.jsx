import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import trophyImg from "../../public/image/trofi.png";
import Footer from "./footer";

// EVENT TARGET (Asia/Kolkata)
const TARGET_DATE_ISO = "2025-12-21T00:00:00+05:30";
const format = (n) => String(n).padStart(2, "0");

// Typing hook (simple) -----------------------------------------------------
function useTyping(text, speed = 80, loop = false) {
  const [display, setDisplay] = useState("");
  const iRef = useRef(0);
  useEffect(() => {
    let mounted = true;
    iRef.current = 0;
    setDisplay("");
    const tick = () => {
      if (!mounted) return;
      iRef.current += 1;
      setDisplay(text.slice(0, iRef.current));
      if (iRef.current >= text.length) {
        if (loop) {
          setTimeout(() => {
            iRef.current = 0;
            setDisplay("");
            setTimeout(tick, 300);
          }, 1200);
        }
        return;
      }
      setTimeout(tick, speed);
    };
    tick();
    return () => {
      mounted = false;
    };
  }, [text, speed, loop]);
  return display;
}

export default function HomeAnimated() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [tick, setTick] = useState(false);

  // Achievements to show below countdown
  const achievements = [
   
    
    { year: "2019", title: "Overall Champion", note: "Strong comeback", rank: "1st Rank", medal: "gold" },
    { year: "2022", title: "Overall Champion", note: "Strong comeback", rank: "1st Rank", medal: "gold" },
    { year: "2023", title: "Overall Champion", note: "Strong comeback", rank: "1st Rank", medal: "gold" },
   
  ];

  // auto-slide index
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((s) => (s + 1) % achievements.length), 3500); // slow auto slide
    return () => clearInterval(id);
  }, []);

  // countdown
  useEffect(() => {
    const calculateTimeLeft = () => {
      const target = new Date(TARGET_DATE_ISO).getTime();
      const now = Date.now();
      const diff = Math.max(0, target - now);
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setTimeLeft({ days, hours, minutes, seconds });
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

  // typed title
  const typed = useTyping("LOGICAL 2025", 130, true);

  return (
    <>
      <section className="relative w-full min-h-screen flex items-center justify-center py-20 px-4 bg-gradient-to-b from-[#071033] via-[#072b4f] to-[#071028] text-white overflow-hidden">

        {/* Stronger background with subtle animated spotlight and CSE sky-blue accents */}
        <div aria-hidden className="absolute inset-0 -z-10">
          {/* moving gradient ribbons (soft, slower) */}
          <div className="absolute -left-56 -top-24 w-[52rem] h-[52rem] rounded-full opacity-35 animate-blob-slow" style={{ background: 'radial-gradient(circle at 20% 25%, rgba(14,165,233,0.18), transparent 18%), radial-gradient(circle at 70% 75%, rgba(124,58,237,0.12), transparent 25%)', filter: 'blur(110px)', transform: 'rotate(-12deg)' }} />

          <div className="absolute -right-56 -bottom-24 w-[52rem] h-[52rem] rounded-full opacity-28 animate-blob-slow animation-delay-2500" style={{ background: 'radial-gradient(circle at 30% 30%, rgba(59,130,246,0.16), transparent 18%), radial-gradient(circle at 70% 70%, rgba(6,182,212,0.12), transparent 25%)', filter: 'blur(120px)', transform: 'rotate(10deg)' }} />

          {/* large soft spotlight behind main card (to create depth) */}
          <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[40rem] rounded-full pointer-events-none opacity-40" style={{ background: 'radial-gradient(circle at 50% 35%, rgba(96,165,250,0.14), rgba(14,165,233,0.08) 20%, transparent 45%)', filter: 'blur(90px)' }} />

          {/* subtle vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
        </div>

        <div className="max-w-6xl w-full mx-auto z-10 px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

            {/* LEFT: Heading + CTA */}
            <div className="space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-3 bg-white/6 backdrop-blur-md px-4 py-2 rounded-full text-sm font-semibold mb-2">
                <svg className="w-5 h-5 text-sky-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L15 8l6 .5-4.5 3 1.5 6L12 15l-6 3 1.5-6L3 8.5 9 8l3-6z"/></svg>
                RVS College of Engineering &amp; Technology
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-cyan-200 to-indigo-400">{typed}<span className="ml-1 inline-block animate-pulse">|</span></span>
              </h1>

              <p className="max-w-xl text-slate-200">Unite Compete Celebrate. The biggest college sports &amp; cultural festival of the year.</p>

              <div className="flex flex-wrap items-center gap-3 justify-center lg:justify-start mt-4">
                <Link to={isLive ? "/live" : "/register"} className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-sky-400 via-indigo-500 to-violet-600 text-slate-900 font-semibold shadow-2xl transform transition hover:scale-[1.03]" style={{ boxShadow: '0 10px 30px rgba(45,118,255,0.18), inset 0 -2px 8px rgba(255,255,255,0.02)' }}>
                  {isLive ? 'Join Live' : 'Register Now'}
                </Link>

                <Link to="/schedule" className="inline-flex items-center gap-2 border border-white/10 px-4 py-2 rounded-full text-sm text-slate-200/90 hover:bg-white/6 transition">View Schedule</Link>
              </div>

              <div className="mt-4 text-sm text-slate-300">Venue: RVS College • Dec 21, 2025</div>
            </div>

            {/* RIGHT: Countdown + achievements slider */}
            <div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="bg-white/6 backdrop-blur-md border border-white/8 rounded-2xl p-6 shadow-2xl" style={{ boxShadow: '0 18px 40px rgba(2,6,23,0.6), 0 6px 30px rgba(14,165,233,0.06)' }}>

                {/* top row: live or opening */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-sm uppercase tracking-wide text-slate-200/80">Opening in</div>
                    <div className="text-xs text-slate-400">Countdown to LOGICAL 2025</div>
                  </div>
                  {isLive ? <div className="px-3 py-1 rounded-full bg-emerald-400 text-black font-bold">LIVE</div> : <div className="text-xs text-slate-300/70">Starts on Dec 21</div>}
                </div>

                {/* countdown tiles */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                  {tiles.map((t, i) => (
                    <motion.div key={i} layout whileHover={{ scale: 1.03 }} className="relative rounded-xl p-4 bg-gradient-to-br from-white/6 to-white/3 border border-white/8 tile-pop" style={{ boxShadow: 'inset 0 -6px 18px rgba(255,255,255,0.02), 0 8px 24px rgba(12,74,120,0.06)' }}>
                      <motion.div animate={{ scale: tick ? 1.03 : 0.995 }} transition={{ duration: 0.18 }} className="text-2xl sm:text-3xl font-extrabold text-white/95" aria-live="polite">{format(t.value)}</motion.div>
                      <div className="mt-1 text-xs sm:text-sm text-slate-200/70 uppercase tracking-wider">{t.label}</div>
                      <div className="absolute -top-3 -right-3 w-9 h-9 rounded-full opacity-15" style={{ background: 'conic-gradient(from 90deg, rgba(255,255,255,0.16), transparent 40%)', filter: 'blur(6px)' }} />
                    </motion.div>
                  ))}
                </div>

                {/* achievements slider with 3D trophy */}
                <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                  <div className="col-span-1 flex items-center justify-center relative">
                    {/* spotlight behind trophy */}
                    <div className="absolute -inset-6 rounded-full blur-3xl opacity-60" style={{ background: 'radial-gradient(circle at 50% 45%, rgba(56,189,248,0.18), rgba(99,102,241,0.06) 30%, transparent 55%)' }} />

                    {/* trophy image (animated 3D-like) */}
                    <div className="w-32 h-32 perspective-1000 relative z-10">
                      <motion.div whileHover={{ rotateY: 18, scale: 1.07 }} animate={{ rotateY: [0, 8, -8, 0], y: [0, -6, -3, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} className="relative w-full h-full transform-style-preserve-3d">
                        <img src={trophyImg} alt="trophy" className="w-full h-full object-contain drop-shadow-3xl transform-gpu" style={{ transformStyle: 'preserve-3d' }} />

                        {/* rim light */}
                        <div className="absolute inset-0 rounded-full pointer-events-none" style={{ background: 'linear-gradient(120deg, rgba(255,255,255,0.14), transparent)' }} />
                      </motion.div>
                    </div>
                  </div>

                  <div className="col-span-2">
                    <div className="overflow-hidden">
                      <AnimatePresence initial={false} mode="wait">
                        <motion.div key={index} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.7 }} className="bg-white/4 p-4 rounded-xl border border-white/8" style={{ boxShadow: '0 6px 20px rgba(14,165,233,0.06)' }}>
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-2xl font-bold text-sky-200">{achievements[index].year}</div>
                              <div className="text-sm text-slate-200/80">{achievements[index].title}</div>
                              <div className="text-xs text-slate-300/70 mt-1">{achievements[index].note}</div>
                            </div>

                            <div className="text-right">
                              <div className="text-sm uppercase text-slate-300">{achievements[index].rank}</div>
                              <div className="mt-2 inline-flex items-center gap-2">
                                {/* medal visual */}
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${achievements[index].medal === 'gold' ? 'bg-yellow-400' : achievements[index].medal === 'silver' ? 'bg-slate-300' : 'bg-amber-700'}`}>
                                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.6 5.2L20 8l-4 3.5L17 18l-5-2.6L7 18l1-6.5L4 8l5.4-.8L12 2z"/></svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

              </motion.div>
            </div>

          </div>

        </div>

        {/* curved divider */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-28">
            <path d="M0,0 C300,120 900,0 1200,120 L1200,0 L0,0 Z" fill="#071028" />
          </svg>
        </div>

        {/* inline styles for animations */}
        <style>{`
          @keyframes blob { 0% { transform: translateY(0) scale(1) rotate(-12deg); } 33% { transform: translateY(-20px) scale(1.05) rotate(-8deg); } 66% { transform: translateY(10px) scale(0.98) rotate(-14deg); } 100% { transform: translateY(0) scale(1) rotate(-12deg); } }
          .animate-blob-slow { animation: blob 18s ease-in-out infinite; }
          .animation-delay-2500 { animation-delay: 2.5s; }
          @media (prefers-reduced-motion: no-preference) { .tile-pop { transition: transform 220ms cubic-bezier(.2,.9,.3,1); } }
          .perspective-1000 { perspective: 1000px; }
          .transform-style-preserve-3d { transform-style: preserve-3d; }
          .drop-shadow-3xl { filter: drop-shadow(0 20px 30px rgba(8,145,178,0.18)); }
          .blur-3xl { filter: blur(48px); }
        `}</style>
      </section>

      <Footer />
    </>
  );
}
