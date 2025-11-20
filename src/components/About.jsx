// About.jsx
import React, { useState, useMemo } from "react";
import { Users, Phone, User } from "lucide-react";
import Footer from "./footer";
//import image from "../../image";

/* --- Data (your provided arrays) --- */
/* NOTE: I set Mou Samaddar's img to your uploaded file path (local). */
const allCoordinators = [
  {
    id: 1,
    name: "Nischay Anand",
    gender: "boy",
    roles: ["Overall"],
    phone: "8210469486",
    img: "../../image/nishchy.jpeg",
  },

  {
    id: 3,
    name: "Mou Samaddar",
    gender: "girl",
    roles: ["Overall"],
    phone: "9142937158",
    img: "../../image/]mou3.jpeg",
  },
  {
    id: 2,
    name: "Satya Prakash Kumar (Prince)",
    gender: "boy",
    roles: ["Overall"],
    phone: "6202412743",
    img: "../../image/prince1.png",
  },
  
  {
    id: 4,
    name: "Rahul Kumar Dangi",
    gender: "boy",
    roles: ["Finance"],
    phone: "7739508816",
    img: "../../image/rahul.jpeg",
  },
  {
    id: 5,
    name: "Shivam Kumar",
    gender: "boy",
    roles: ["Finance", "Discipline", "Tug of War"],
    phone: "6206447088",
    img: "../../image/shivam.jpeg",
  },
  {
    id: 6,
    name: "Syed Naved Hasan",
    gender: "boy",
    roles: ["Finance", "Cricket", "Shot Put"],
    phone: "8051655280",
    img: "../../image/naved3.jpeg",
  },
  {
    id: 7,
    name: "Nitin Kumar",
    gender: "boy",
    roles: ["Drinks", "Football"],
    phone: "6202377289",
    img: "../../image/nitin.jpeg",
  },
  {
    id: 8,
    name: "Suraj Kr Nayak",
    gender: "boy",
    roles: ["Drinks", "Chess", "Discipline"],
    phone: "7004689308",
    img: "../../image/suraj.jpeg",
  },
  {
    id: 9,
    name: "Dayanand Kumar",
    gender: "boy",
    roles: ["Football"],
    phone: "7780043405",
    img: "../../image/dayanand.jpeg",
  },
  {
    id: 10,
    name: "Abhishek Kumar",
    gender: "boy",
    roles: ["Volleyball", "Refreshment"],
    phone: "6205796619",
    img: "../../image/abhishek.jpeg",
  },
  {
    id: 11,
    name: "Archit Kumar",
    gender: "boy",
    roles: ["Volleyball", "Discipline"],
    phone: "7061601402",
    img: "../../image/archit.jpeg",
  },
  {
    id: 12,
    name: "Shreshth kujur",
    gender: "boy",
    roles: ["Basketball", "Discipline"],
    phone: "6205384823",
    img: "../../image/shrest.jpeg",
  },
  {
    id: 13,
    name: "Dheeraj Kumar",
    gender: "boy",
    roles: ["Basketball", "Refreshment"],
    phone: "8252653674",
    img: "../../image/dheeraj.jpeg",
  },
  {
    id: 14,
    name: "Anish Kumar Singh",
    gender: "boy",
    roles: ["Cricket", "Refreshment"],
    phone: "8757848190",
    img: "../../image/anish.jpeg",
  },
  {
    id: 15,
    name: "Md Raiyan",
    gender: "boy",
    roles: ["Badminton", "Discipline"],
    phone: "N/A",
    img: "../../image/raiyan.jpeg",
  },
  {
    id: 38,
    name: "Nikhil Kumar",
    gender: "boy",
    roles: ["Badminton",],
    phone: "6299561212",
    img: "../../image/nikhil.jpeg",
  },
  {
    id: 16,
    name: "Somnath Nayak",
    gender: "boy",
    roles: ["Carrom"],
    phone: "9341928180",
    img: "../../image/somnath.jpeg",
  },
  {
    id: 17,
    name: "Akash Rana",
    gender: "boy",
    roles: ["Chess"],
    phone: "9142027210",
    img: "../../image/akashrana.jpeg",
  },
  {
    id: 18,
    name: "Sachin Kumar",
    gender: "boy",
    roles: ["Rangoli"],
    phone: "8002183553",
    img: "../../image/sachin.jpeg",
  },
  {
    id: 19,
    name: "Rakesh Kumar",
    gender: "boy",
    roles: ["Athletics", "Discipline"],
    phone: "9142967367",
    img: "../../image/rakesh.jpeg",
  },
  {
    id: 20,
    name: "Ayush Kumar Sinha",
    gender: "boy",
    roles: ["Tug of War", "Shot Put", "Refreshment"],
    phone: "8825235461",
    img: "../../image/ayush.jpeg",
  },
  {
    id: 21,
    name: "Md Amanat Ansari",
    gender: "boy",
    roles: ["Tug of War", "Refreshment", "Medical", "Discipline"],
    phone: "7061038508",
    img: "../../image/myself.png",
  },
  {
    id: 23,
    name: "Rishil Aman",
    gender: "boy",
    roles: ["Medical","Carrom"],
    phone: "9142937158",
    img: "../../image/reshi.jpeg",
  },
  {
    id: 34,
    name: "Mou Samaddar",
    gender: "girl",
    roles: ["Basketball"],
    phone: "9142937158",
    img: "../../image/]mou3.jpeg",
  },
  {
    id: 24,
    name: "Aditi Priya",
    gender: "girl",
    roles: ["Volleyball","Finance","Discipline"],
    phone: "8102100356",
    img: "../../image/Aditi.jpg",
  },
  {
    id: 25,
    name: "Prerna Kumari",
    gender: "girl",
    roles: ["Volleyball", "Athletics"],
    phone: "9110930739",
    img: "../../image/perna.jpeg",
  },
  {
    id: 26,
    name: "Sinny Akansha",
    gender: "girl",
    roles: ["Basketball","Discipline"],
    phone: "9798343104",
    img: "../../image/akansha.jpeg",
  },
  {
    id: 27,
    name: "Sifat Jahan",
    gender: "girl",
    roles: ["Badminton", "Chess"],
    phone: "8873956548",
    img: "../../image/sifat.jpeg",
  },
  {
    id: 28,
    name: "Shikha Verma",
    gender: "girl",
    roles: ["Badminton", "Chess"],
    phone: "7070094112",
    img: "../../image/shikha.jpg",
  },
  {
    id: 29,
    name: "Puja Dhara",
    gender: "girl",
    roles: ["Athletics"],
    phone: "9142067397",
    img: "../../image/puja dhara.jpeg",
  },
  {
    id: 30,
    name: "Madhu Shree",
    gender: "girl",
    roles: ["Carrom", "Mehndi","Face Painting"],
    phone: "7209846883",
    img: "../../image/madu.jpeg",
  },
  {
    id: 31,
    name: "Simran Kumari",
    gender: "girl",
    roles: ["Carrom", "Rangoli"],
    phone: "9060753584",
    img: "../../image/simran.jpeg",
  },
  
  {
    id: 32,
    name: "Rashmi Kumari",
    gender: "girl",
    roles: ["Face Painting"],
    phone: "9304016724",
    img: "../../image/rashmi.jpeg",
  },
  {
    id: 33,
    name: "Aparna Sharma",
    gender: "girl",
    roles: ["Face Painting", "Rangoli"],
    phone: "8235067391",
    img: "../../image/aparna.jpeg",
  },
  {
    id: 34,
    name: "Sakshi Kumari",
    gender: "girl",
    roles: [ "Mehndi"],
    phone: "8102086869",
    img: "../../image/sakchi.jpeg",
  },
  {
  id: 35,
  name: "Ankit Prasad",
  gender: "boy",           // <- singular 'boy' (matches your filters)
  roles: ["Football"],
  phone: "9334990991",
  img: "../../image/ankit.jpeg",
},

  
];

const techTeam = [
  {
    id: 1,
    name: "Md Amanat Ansari",
    role: "Developer",
    img: "../../image/myself.png",
  },
  { id: 2, name: "Dhiraj Prajapati", role: "Developer", img: "../../image/dhirajdp.jpeg"},
  { id: 3, name: "Nikhil Kumar", role: "Developer", img: "../../image/nikhil.jpeg" },
];

/* --- role -> color helper --- */
function getRoleClass(role) {
  const r = (role || "").toLowerCase();
  if (r.includes("overall")) return "bg-indigo-100 text-indigo-800";
  if (r.includes("finance") || r.includes("refresh"))
    return "bg-green-100 text-green-800";
  if (r.includes("drinks")) return "bg-cyan-100 text-cyan-800";
  if (r.includes("medical")) return "bg-red-100 text-red-800";
  if (r.includes("discipline")) return "bg-yellow-100 text-yellow-800";
  if (
    r.includes("rangoli") ||
    r.includes("painting") ||
    r.includes("mehndi") ||
    r.includes("art")
  )
    return "bg-pink-100 text-pink-800";
  if (
    r.includes("cricket") ||
    r.includes("football") ||
    r.includes("basketball") ||
    r.includes("badminton") ||
    r.includes("volleyball") ||
    r.includes("athlet")
  )
    return "bg-blue-100 text-blue-800";
  return "bg-slate-100 text-slate-900";
}

function isValidPhone(phone) {
  if (!phone) return false;
  const p = String(phone).toLowerCase();
  if (p.includes("coming") || p.includes("soon") || p.includes("xxxx"))
    return false;
  return true;
}

/* --- Coordinator card component (round image) --- */
function CoordinatorCard({ name, roles = [], phone, img }) {
  const [isPhoneVisible, setIsPhoneVisible] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <div className="relative rounded-2xl p-[2px] overflow-hidden transform transition-all hover:shadow-2xl hover:-translate-y-1 group">
      {/* rainbow glow rim */}
      <div
        className="absolute inset-0 -z-10 rounded-2xl animate-rainbow-glow"
        style={{
          backgroundImage:
            "linear-gradient(90deg, #ef4444, #f59e0b, #eab308, #84cc16, #06b6d4, #a855f7, #ef4444)",
          filter: "blur(18px)",
          opacity: 0.08,
        }}
      />

      <div className="relative bg-gradient-to-b from-[#071028] to-[#072b4f] rounded-[14px] overflow-hidden border border-white/4 pt-6 pb-4">
        {/* ROUND PROFILE IMAGE */}
        <div className="flex items-center justify-center mb-3">
          {img && !imgError ? (
            <img
              src={img}
              alt={name}
              onError={(e) => {
                setImgError(true);
                console.error(`Image failed for ${name}:`, e.currentTarget.src);
              }}
              className="w-24 h-24 rounded-full object-cover border-2 border-sky-400 shadow-md"
              loading="lazy"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-blue-900/60 flex items-center justify-center border border-sky-400/40 shadow-md">
              <User size={48} className="text-sky-300/80" />
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-white mb-2 text-center">
            {name}
          </h3>

          <div className="flex flex-wrap gap-2 mb-4 justify-center">
            {roles.map((role) => (
              <span
                key={role}
                className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getRoleClass(
                  role
                )}`}
              >
                {role}
              </span>
            ))}
          </div>

          <div>
            {isPhoneVisible ? (
              isValidPhone(phone) ? (
                <a
                  href={`tel:${phone}`}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 text-black font-semibold shadow-md hover:bg-emerald-600 transition"
                >
                  <Phone size={14} /> {phone}
                </a>
              ) : (
                <div className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-700 text-gray-200 font-medium">
                  <Phone size={14} /> {phone ?? "N/A"}
                </div>
              )
            ) : (
              <button
                onClick={() => setIsPhoneVisible(true)}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-sky-700 text-white font-medium hover:bg-sky-600 transition"
              >
                <Phone size={14} /> Show Contact
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* --- Main About component --- */
export default function About() {
  const intro = `This is the official group for the CSE department, exclusive to the final year created for the smooth flow of the game trials, meetings and in general coordination for the FROLIC 2K25. Let us support each other one last time. Refrain from adding people other than coordinators without a proper discussion. All the efforts and cooperations are appreciated.`;

  const [selectedRole, setSelectedRole] = useState(null);

  // overall coordinators
  const overall = allCoordinators.filter((p) => p.roles.includes("Overall"));

  // collect unique game/role names except "Overall"
  const allGameRoles = useMemo(() => {
    const set = new Set();
    allCoordinators.forEach((p) => {
      p.roles.forEach((r) => {
        if (r && r.toLowerCase() !== "overall") set.add(r);
      });
    });
    return [...Array.from(set)].sort();
  }, []);

  // filtered coordinators for selected role
  const filteredCoordinators = useMemo(() => {
    if (!selectedRole) return [];
    return allCoordinators.filter(
      (p) => p.roles.includes(selectedRole) && !p.roles.includes("Overall")
    );
  }, [selectedRole]);

  const filteredBoys = filteredCoordinators.filter((p) => p.gender === "boy");
  const filteredGirls = filteredCoordinators.filter((p) => p.gender === "girl");

  const handleRoleClick = (role) => {
    setSelectedRole((s) => (s === role ? null : role));
    // scroll a bit so user sees results
    setTimeout(() => {
      const el = document.querySelector(".role-results");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
  };

  return (
    <>
      <style>{`
        /* rainbow glow background animation */
        @keyframes rainbow-glow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-rainbow-glow { background-size: 400% 400%; animation: rainbow-glow 4s ease-in-out infinite; }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fadeInUp 420ms ease-out both; }
      `}</style>

      <section className="min-h-screen bg-gradient-to-b from-[#071033] via-[#072b4f] to-[#071028] text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-cyan-200 to-indigo-400">
              LOGICAL CSE FROLIC 2K25
            </h1>
            <p className="mt-3 text-white/80 max-w-2xl mx-auto">{intro}</p>
          </div>

          {/* Overall coordinators */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-sky-300 mb-8">
              Overall Coordinators
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {overall.map((person) => (
                <CoordinatorCard
                  key={person.id}
                  name={person.name}
                  roles={person.roles}
                  phone={person.phone}
                  img={person.img}
                />
              ))}
            </div>
          </div>

          <hr className="border-blue-800/40 my-12" />

          {/* Roles */}
          <div>
            <h2 className="text-3xl font-bold text-center text-sky-300 mb-6">
              Game & Role Coordinators
            </h2>

            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {allGameRoles.map((role) => (
                <button
                  key={role}
                  onClick={() => handleRoleClick(role)}
                  className={`px-4 py-2 rounded-full font-semibold text-sm transition-all ${
                    selectedRole === role
                      ? "bg-sky-400 text-black shadow-lg"
                      : "bg-blue-900/40 text-white/90 hover:bg-blue-900/70"
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>

            <div className="role-results animate-fade-in">
              {selectedRole ? (
                <>
                  <div className="mb-10">
                    <h3 className="text-2xl font-semibold text-white/90 mb-4">
                      Boys Coordinators ({filteredBoys.length})
                    </h3>
                    {filteredBoys.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredBoys.map((p) => (
                          <CoordinatorCard
                            key={p.id}
                            name={p.name}
                            roles={p.roles}
                            phone={p.phone}
                            img={p.img}
                          />
                        ))}
                      </div>
                    ) : (
                      <p className="text-center text-white/60">
                        No boys found for this role.
                      </p>
                    )}
                  </div>

                  <div className="mb-8">
                    <h3 className="text-2xl font-semibold text-white/90 mb-4">
                      Girls Coordinators ({filteredGirls.length})
                    </h3>
                    {filteredGirls.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredGirls.map((p) => (
                          <CoordinatorCard
                            key={p.id}
                            name={p.name}
                            roles={p.roles}
                            phone={p.phone}
                            img={p.img}
                          />
                        ))}
                      </div>
                    ) : (
                      <p className="text-center text-white/60">
                        No girls found for this role.
                      </p>
                    )}
                  </div>
                </>
              ) : (
                <p className="text-center text-slate-300">
                  Choose a role above to see its coordinators.
                </p>
              )}
            </div>
          </div>

          <hr className="border-blue-800/40 my-12" />

          {/* Tech team */}
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-center text-sky-300 mb-8">
              Technical Team
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
              {techTeam.map((person) => (
                <div
                  key={person.id}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-32 h-32 rounded-full bg-blue-900/50 border-2 border-sky-400/40 flex items-center justify-center mb-4 transition transform hover:scale-105 hover:border-sky-300 overflow-hidden">
                    {person.img ? (
                      <img
                        src={person.img}
                        alt={person.name}
                        className="w-full h-full rounded-full object-cover"
                        onError={(e) =>
                          (e.currentTarget.style.display = "none")
                        }
                      />
                    ) : (
                      <User size={64} className="text-sky-300/70" />
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    {person.name}
                  </h3>
                  <p className="text-sky-400">{person.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
