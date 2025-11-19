import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSchedules } from "../../features/scheduleSlice";

import Footer from "../footer";
import { MapPin, Clock, PlayCircle, CalendarDays } from "lucide-react";

const ScheduleList = () => {
  const dispatch = useDispatch();
  const { schedules, loading, error } = useSelector((state) => state.schedule);

  useEffect(() => {
    if (!schedules || schedules.length === 0) {
      dispatch(getSchedules());
    }
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#071033] via-[#072b4f] to-[#071028] flex items-center justify-center">
        <p className="text-sky-300 text-xl animate-pulse">Loading Schedules...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#071033] via-[#072b4f] to-[#071028] flex items-center justify-center">
        <p className="text-red-400 text-xl"> {error}</p>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-[#071033] via-[#072b4f] to-[#071028] text-white p-6 py-16">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-cyan-200 to-indigo-400">
            Match Schedules
          </h1>

          <p className="text-center text-slate-300 max-w-2xl mx-auto mb-10">
            Check upcoming matches — venue, time and live streams. Click "Watch Live" when a match is active.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {schedules.map((item) => {
              const start = new Date(item.startTime).getTime();
              const end = new Date(item.endTime).getTime();
              const now =  Date.now();
              const isLive = now >= start && now <= end;

              return (
                <article
                  key={item._id}
                  className="relative rounded-2xl overflow-hidden border border-transparent"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02))",
                    boxShadow:
                      "0 14px 36px rgba(2,6,23,0.6), inset 0 -2px 12px rgba(255,255,255,0.02)",
                    transition: "transform 280ms cubic-bezier(.2,.9,.3,1), box-shadow 280ms",
                  }}
                >
                  {/* Top accent stripe */}
                  <div
                    className="h-2 w-full"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(6,182,212,0.9), rgba(99,102,241,0.9))",
                    }}
                  />

                  {/* Card inner */}
                  <div className="p-6">
                    {/* Header row */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div>
                        <div className="text-sm uppercase text-sky-100/90 tracking-wide flex items-center gap-2">
                          <CalendarDays size={16} className="text-sky-300" />
                          <span className="font-semibold">{item.gameName}</span>
                        </div>
                        <div className="mt-2 text-xs text-slate-300">
                          <span className="inline-flex items-center gap-2">
                            <MapPin size={14} className="text-sky-300" />
                            {item.venue}
                          </span>
                        </div>
                      </div>

                      {/* Live badge */}
                      <div className="flex flex-col items-end gap-2">
                        {isLive ? (
                          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-red-500 to-rose-500 text-white text-xs font-semibold shadow-sm">
                            ● LIVE
                          </span>
                        ) : (
                          <span className="text-xs text-slate-400">{new Date(item.startTime).toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>

                    {/* Teams */}
                    <div className="text-center mb-4">
                      <div className="text-2xl md:text-3xl font-extrabold text-white/95 tracking-tight">
                        {item.teamA.toUpperCase()} <span className="mx-3 text-gray-400/80 text-lg">vs</span> {item.teamB.toUpperCase()}
                      </div>
                    </div>

                    {/* Times */}
                    <div className="grid grid-cols-1 gap-2 text-sm text-slate-200 mb-5">
                      <div className="flex items-center gap-3">
                        <Clock size={16} className="text-sky-300" />
                        <div>
                          <div className="text-xs text-slate-300">Start</div>
                          <div className="text-sm font-medium">
                            {new Date(item.startTime).toLocaleString()}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Clock size={16} className="text-sky-300" />
                        <div>
                          <div className="text-xs text-slate-300">End</div>
                          <div className="text-sm font-medium">
                            {new Date(item.endTime).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-4 flex gap-3">
                      <a
                        href={item.match_live_url || "#"}
                        target="_blank"
                        rel="noreferrer"
                        className={`flex-1 inline-flex items-center justify-center gap-3 px-4 py-2 rounded-lg font-semibold transition transform ${
                          isLive
                            ? "bg-gradient-to-r from-emerald-400 to-green-500 text-black shadow-lg hover:scale-[1.02]"
                            : "bg-sky-500/90 text-black hover:bg-sky-400"
                        }`}
                        aria-disabled={!item.match_live_url}
                      >
                        <PlayCircle size={18} />
                        {isLive ? "Watch Live" : "Watch"}
                      </a>

                      <button
                        type="button"
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        className="px-4 py-2 rounded-lg bg-white/6 text-sky-200 hover:bg-white/8 transition"
                      >
                        Details
                      </button>
                    </div>
                  </div>

                  {/* card hover effects (layer) */}
                  <style>{`
                    article:hover {
                      transform: translateY(-6px);
                      box-shadow: 0 24px 56px rgba(2,6,23,0.7), 0 12px 28px rgba(6,182,212,0.06);
                    }
                    @media (prefers-reduced-motion: reduce) {
                      article { transition: none !important; transform: none !important; }
                    }
                  `}</style>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ScheduleList;
