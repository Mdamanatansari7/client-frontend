import { Users, BookOpen, Heart } from "lucide-react";
import { Link } from "react-router-dom";

export default function GameCard() {
  const games = [
    {
      id: 1,
      name: "Cricket",
      description: "Outdoor team sport played with bat and ball.",
      rules: "Each side bats once; most runs wins.",
      teamSize: 11,
      genderEligibility: "Boys & Girls",
      icon: "🏏",
    },
    {
      id: 2,
      name: "Football",
      description: "Fast-paced game using feet to score goals.",
      rules: "No handball except goalkeeper.",
      teamSize: 11,
      genderEligibility: "Boys & Girls",
      icon: "⚽",
    },
    {
      id: 3,
      name: "Volleyball",
      description: "Played between two teams separated by a net.",
      rules: "Max 3 touches per side, no catching.",
      teamSize: 6,
      genderEligibility: "Boys & Girls",
      icon: "🏐",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {games.map((game) => (
        <div
          key={game.id}
          className="group bg-card rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition transform hover:scale-105 border border-primary border-opacity-10"
        >
          <div className="bg-gradient-to-r from-primary to-primary/80 p-6 flex items-center justify-between">
            <h3 className="text-2xl font-bold text-primary-foreground">{game.name}</h3>
            <span className="text-4xl">{game.icon}</span>
          </div>

          <div className="p-6 space-y-4">
            <p className="text-foreground text-opacity-80">{game.description}</p>

            <div className="bg-secondary bg-opacity-50 p-3 rounded-lg">
              <div className="flex items-start gap-2">
                <BookOpen size={18} className="text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-primary uppercase">Rules</p>
                  <p className="text-sm text-foreground text-opacity-75">{game.rules}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <Users size={18} className="text-primary" />
                <div>
                  <p className="text-xs text-foreground text-opacity-60">Team Size</p>
                  <p className="font-semibold text-foreground">{game.teamSize} players</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Heart size={18} className="text-accent" />
                <div>
                  <p className="text-xs text-foreground text-opacity-60">Eligible</p>
                  <p className="font-semibold text-foreground">{game.genderEligibility}</p>
                </div>
              </div>
            </div>

            <Link
              to="/register"
              className="block w-full mt-4 bg-primary text-primary-foreground font-bold py-3 rounded-lg hover:bg-primary/90 transition text-center"
            >
              Register Now
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
