// GameCard.jsx
import React from "react";
import { Users, BookOpen, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../footer";

export default function GameCard() {
  const games = [
    {
      id: 1,
      name: "Cricket",
      emoji: "🏏",
      description: "Experience the thrill of competitive cricket matches.",
      rules: "11 players per team, T10 format, 10 overs per side",
      teamSize: "11 | 4 Extra",
      genderEligibility: "Boys",
      color: "from-orange-600 to-yellow-500",
    },
    {
      id: 2,
      name: "Basketball",
      emoji: "🏀",
      description: "Fast-paced basketball action.",
      rules: "5 players per team, FIBA rules, 40 mins match",
      teamSize: "5",
      genderEligibility: "Boys & Girls",
      color: "from-red-600 to-orange-500",
    },
    {
      id: 3,
      name: "Badminton",
      emoji: "🏸",
      description: "Singles & doubles badminton tournaments.",
      rules: "Best of 3 sets, 21 points",
      teamSize: "2",
      genderEligibility: "Boys & Girls",
      color: "from-teal-500 to-blue-500",
    },
    {
      id: 4,
      name: "Volleyball",
      emoji: "🏐",
      description: "Dynamic volleyball matches.",
      rules: "6 players per team",
      teamSize: "6",
      genderEligibility: "Boys & Girls",
      color: "from-indigo-600 to-purple-600",
    },
    {
      id: 5,
      name: "Tug of War",
      emoji: "💪",
      description: "Test your strength & teamwork.",
      rules: "2 teams, best of 3 pulls",
      teamSize: "10",
      genderEligibility: "Boys",
      color: "from-yellow-600 to-amber-500",
    },
    {
      id: 6,
      name: "Chess",
      emoji: "♟️",
      description: "Battle of minds in chess competitions.",
      rules: "Classical/Blitz",
      teamSize: "1",
      genderEligibility: "Boys & Girls",
      color: "from-gray-700 to-gray-900",
    },
    {
      id: 7,
      name: "Rangoli",
      emoji: "🎨",
      description: "Creative rangoli making event.",
      rules: "2 players per team",
      teamSize: "2",
      genderEligibility: "Girls",
      color: "from-pink-500 to-rose-500",
    },
    {
      id: 8,
      name: "Carrom",
      emoji: "🎯",
      description: "Classic carrom – singles & doubles.",
      rules: "Singles/Doubles",
      teamSize: "2",
      genderEligibility: "Boys",
      color: "from-amber-700 to-yellow-600",
    },
    {
      id: 9,
      name: "Face Painting",
      emoji: "🖌️",
      description: "Express your creativity through painting.",
      rules: "2 players per team",
      teamSize: "2",
      genderEligibility: "Girls",
      color: "from-fuchsia-600 to-pink-500",
    },
    {
      id: 10,
      name: "Football",
      emoji: "⚽",
      description: "Competitive football tournament.",
      rules: "11 players per team",
      teamSize: "11 | 4 Extra",
      genderEligibility: "Boys",
      color: "from-green-600 to-emerald-500",
    },
    {
      id: 11,
      name: "Athletics",
      emoji: "🏃‍♂️",
      description: "Track and field athletic events.",
      rules: "6 players",
      teamSize: "6",
      genderEligibility: "Boys & Girls",
      color: "from-blue-600 to-sky-500",
    },
    {
      id: 12,
      name: "Mehndi",
      emoji: "🌿",
      description: "Traditional Mehndi competition.",
      rules: "2 players per team",
      teamSize: "2",
      genderEligibility: "Girls",
      color: "from-rose-600 to-red-500",
    },
    {
      id: 13,
      name: "Shot Put",
      emoji: "🥇",
      description: "Strength-based shot put competition.",
      rules: "2 players per team",
      teamSize: "2",
      genderEligibility: "Boys",
      color: "from-slate-600 to-gray-700",
    },
  ];

  return (
    <>
      <div
        className="bg-blue-950 py-16"
        style={{ scrollBehavior: "smooth" }} // smooth scroll for anchors/navigation
      >
        <style>{`
          /* entrance animation for cards (staggered via inline style) */
          @keyframes cardIn {
            from { opacity: 0; transform: translateY(10px) scale(0.995); }
            to   { opacity: 1; transform: translateY(0) scale(1); }
          }

          @keyframes bob {
            0% { transform: translateY(0); }
            50% { transform: translateY(-6px); }
            100% { transform: translateY(0); }
          }

          .emoji-bob { animation: bob 3s ease-in-out infinite; }

          /* Respect reduced motion preferences */
          @media (prefers-reduced-motion: reduce) {
            .emoji-bob { animation: none !important; }
            .card-animated { animation: none !important; }
            * { scroll-behavior: auto !important; }
          }
        `}</style>

        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-extrabold text-sky-300">
              LOGICAL 2025 Games
            </h2>
            <p className="mt-3 text-white/80 text-lg">
              Choose your event and represent your branch with pride.
            </p>
          </div>

          {/* CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {games.map((game, i) => (
              <article
                key={game.id}
                className="
                  card-animated bg-[#0f172a] rounded-2xl overflow-hidden border border-white/10 
                  shadow-lg transition-transform transition-shadow duration-300 ease-out
                  hover:shadow-2xl hover:-translate-y-2 focus-within:-translate-y-2
                  focus:outline-none
                "
                // stagger entrance
                style={{
                  animationName: "cardIn",
                  animationDuration: "420ms",
                  animationTimingFunction: "cubic-bezier(.16,.84,.44,1)",
                  animationFillMode: "forwards",
                  animationDelay: `${i * 70}ms`,
                  opacity: 0,
                  willChange: "transform, opacity",
                }}
                tabIndex={0} // make focusable so keyboard users also see smooth focus transform
              >
                {/* HEADER */}
                <div
                  className={`p-6 bg-gradient-to-r ${game.color} flex justify-between items-center`}
                >
                  <h3 className="text-white text-2xl font-bold">{game.name}</h3>
                  <div
                    className="text-4xl w-12 h-12 flex items-center justify-center bg-white/20 rounded-xl"
                    aria-hidden="true"
                  >
                    <span className="emoji-bob">{game.emoji}</span>
                  </div>
                </div>

                {/* BODY */}
                <div className="p-6 text-white space-y-5">
                  <p className="text-white/80">{game.description}</p>

                  <div className="bg-white/10 p-4 rounded-xl border border-white/10">
                    <div className="flex items-start gap-3">
                      <BookOpen className="text-sky-300" />
                      <div>
                        <p className="text-xs font-semibold text-sky-300 uppercase">
                          Rules
                        </p>
                        <p className="text-sm text-white/80">{game.rules}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <Users className="text-purple-300" />
                      <div>
                        <p className="text-xs text-white/60">Team Size</p>
                        <p className="font-semibold">{game.teamSize}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Heart className="text-red-400" />
                      <div>
                        <p className="text-xs text-white/60">Eligible</p>
                        <p className="font-semibold">
                          {game.genderEligibility}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Link
                    to="/register"
                    className="block bg-sky-700 hover:bg-sky-600 active:scale-98 transform-gpu text-white font-semibold py-3 rounded-lg text-center transition-all duration-200 shadow-md"
                    aria-label={`Register for ${game.name}`}
                  >
                    Register Now
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
