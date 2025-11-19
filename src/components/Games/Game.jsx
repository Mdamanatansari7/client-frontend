// GameCard.jsx
import React from "react";
import { Users, BookOpen, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../footer";

/**
 * Tailwind required.
 */

export default function GameCard() {
  const games = [
    {
      id: 1,
      name: "Cricket",
      emoji: "🏏",
      description: "Experience the thrill of competitive cricket matches.",
      rules: "11 players per team, ODI format, 50 overs per side",
      teamSize: "11",
      genderEligibility: "Boys",
    },
    {
      id: 2,
      name: "Basketball",
      emoji: "🏀",
      description:
        "Fast-paced basketball action with skilled players from all branches.",
      rules: "5 players per team, FIBA rules, 40 minutes per match",
      teamSize: "5",
      genderEligibility: "Boys and Girls",
    },
    {
      id: 3,
      name: "Badminton",
      emoji: "🏸",
      description: "Competitive singles and doubles badminton tournaments.",
      rules: "Best of 3 sets, 21 points per set",
      teamSize: "2",
      genderEligibility: "Boys and Girls",
    },
    {
      id: 4,
      name: "Volleyball",
      emoji: "🏐",
      description: "Dynamic volleyball matches with exciting rallies.",
      rules: "6 players per team, standard volleyball rules",
      teamSize: "6",
      genderEligibility: "Boys and Girls",
    },
    {
      id: 5,
      name: "Tug of War",
      emoji: "💪",
      description: "Test your strength and teamwork in this classic event.",
      rules: "2 teams, best of 3 pulls",
      teamSize: "10",
      genderEligibility: "Boys",
    },
    {
      id: 6,
      name: "Chess",
      emoji: "♟️",
      description: "Battle of minds in strategic chess competitions.",
      rules: "Classical/Blitz categories",
      teamSize: "1",
      genderEligibility: "Boys and Girls",
    },
    {
      id: 7,
      name: "Rangoli",
      emoji: "🎨",
      description:
        "Creative Rangoli making competition showcasing culture & design.",
      rules: "2 players per team",
      teamSize: "2",
      genderEligibility: "Girls",
    },
    {
      id: 8,
      name: "Carrom",
      emoji: "🎯",
      description: "Classic carrom matches — singles and doubles.",
      rules: "2 players (singles) / 4 players (doubles)",
      teamSize: "2",
      genderEligibility: "Boys",
    },
    {
      id: 9,
      name: "Face Painting",
      emoji: "🖌️",
      description: "Expressive face-painting competition.",
      rules: "2 players per team",
      teamSize: "2",
      genderEligibility: "Girls",
    },
  ];

  return (
    <>
      <div
        className="
          bg-blue-950 // ***सुधार: बैकग्राउंड ब्लू किया गया***
          py-16
        "
      >
        <style>{`
          @keyframes bob {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-6px); }
            100% { transform: translateY(0px); }
          }
          .emoji-bob { animation: bob 3s ease-in-out infinite; }
        `}</style>

        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            {/* ***सुधार: हेडिंग का टेक्स्ट कलर बदला गया*** */}
            <h2 className="text-4xl md:text-5xl font-extrabold text-sky-300 drop-shadow">
              LOGICAL 2025 Games
            </h2>
            {/* ***सुधार: पैराग्राफ का टेक्स्ट कलर बदला गया*** */}
            <p className="mt-3 text-white/80 max-w-2xl mx-auto">
              Choose from a variety of sports and cultural events. Register to
              compete with students from all branches.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {games.map((game) => (
              <article
                key={game.id}
                className="group bg-white rounded-2xl overflow-hidden border border-purple-200 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all"
              >
                <div className="flex items-center justify-between p-6 bg-gradient-to-r from-[#2f12a8] to-[#5b39ff]">
                  <h3 className="text-white text-2xl font-extrabold">
                    {game.name}
                  </h3>
                  <div className="text-4xl w-12 h-12 flex items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm">
                    <span className="emoji-bob">{game.emoji}</span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  {/* ***सुधार: डिस्क्रिप्शन का टेक्स्ट कलर बदला गया*** */}
                  <p className="text-white/90">{game.description}</p>

                  <div className="bg-blue-50 p-4 rounded-xl">
                    <div className="flex items-start gap-3">
                      <BookOpen size={20} className="text-blue-800" />
                      <div>
                        <p className="text-xs font-semibold text-blue-800 uppercase">
                          Rules
                        </p>
                        <p className="text-sm text-gray-700">{game.rules}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <Users size={20} className="text-[#4a2fb1]" />
                      <div>
                        {/* ***सुधार: टेक्स्ट कलर बदला गया*** */}
                        <p className="text-xs text-white/70">Team Size</p>
                        {/* ***सुधार: टेक्स्ट कलर बदला गया*** */}
                        <p className="font-semibold text-white">
                          {game.teamSize} players
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Heart size={20} className="text-blue-500" />
                      <div>
                        {/* ***सुधार: टेक्स्ट कलर बदला गया*** */}
                        <p className="text-xs text-white/70">Eligible</p>
                        {/* ***सुधार: टेक्स्ट कलर बदला गया*** */}
                        <p className="font-semibold text-white">
                          {game.genderEligibility}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Link
                    to="/register"
                    className="block mt-2 bg-[#2f12a8] text-white font-semibold py-3 rounded-lg text-center shadow hover:scale-105 transition"
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
