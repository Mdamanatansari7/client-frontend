// import { Menu, X } from "lucide-react";
// import { useEffect, useRef, useState } from "react";
// import { Link } from "react-router-dom";

// /**
//  * Updated Header — matches HomeAnimated theme (deep navy + sky-blue accents)
//  * Paste this file as your Header component (Header.jsx).
//  */

// export default function Header() {
//   const [isOpen, setIsOpen] = useState(false);
//   const btnRef = useRef(null);

//   useEffect(() => {
//     // Prevent scrolling when menu open and toggle class for fold animation
//     document.body.style.overflow = isOpen ? "hidden" : "";
//     if (isOpen) document.body.classList.add("menu-open");
//     else document.body.classList.remove("menu-open");

//     return () => {
//       document.body.style.overflow = "";
//       document.body.classList.remove("menu-open");
//     };
//   }, [isOpen]);

//   const closeMenu = () => setIsOpen(false);

//   // small press blink on button
//   const pressButton = () => {
//     const el = btnRef.current;
//     if (!el) return;
//     el.classList.add("btn-pressed");
//     setTimeout(() => el.classList.remove("btn-pressed"), 220);
//   };

//   const toggleMenu = () => {
//     pressButton();
//     // tiny delay so blink is seen before fold
//     setTimeout(() => setIsOpen((s) => !s), 80);
//   };

//   return (
//     <>
//       <header className="sticky top-3 z-50">
//         {/* neon side bars */}
//         <div
//           aria-hidden
//           className="pointer-events-none absolute inset-y-0 left-0 w-3 -z-10"
//         >
//           <div className="neon-bar-left h-full" />
//         </div>
//         <div
//           aria-hidden
//           className="pointer-events-none absolute inset-y-0 right-0 w-3 -z-10"
//         >
//           <div className="neon-bar-right h-full" />
//         </div>

//         <nav
//           className="mx-4 md:mx-auto md:max-w-7xl rounded-2xl
//                      backdrop-blur-xl
//                      bg-gradient-to-r from-[#071033]/80 via-[#072b4f]/70 to-[#071028]/80
//                      border border-white/10 shadow-2xl"
//           aria-label="Main Navigation"
//         >
//           <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
//             {/* Logo with your image */}
//             <Link
//               to="/"
//               className="flex items-center gap-3"
//               onClick={closeMenu}
//             >
//               <div
//                 className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center shadow-lg"
//                 style={{
//                   background:
//                     "linear-gradient(135deg, rgba(14,165,233,0.09), rgba(124,58,237,0.08))",
//                   boxShadow: "0 10px 30px rgba(14,165,233,0.06)",
//                 }}
//               >
//                 <img
//                   src="../../image/logological.png"
//                   alt="Logical logo"
//                   className="w-full h-full object-cover"
//                 />
//               </div>

//               <div className="leading-tight select-none">
//                 <div className="text-white font-extrabold tracking-tight text-sm">
//                   LOGICAL
//                 </div>
//                 <div className="text-white/60 text-xs -mt-0.5">2025</div>
//               </div>
//             </Link>

//             {/* Desktop menu */}
//             <div className="hidden md:flex items-center gap-8">
//               <NavLink to="/games">Games</NavLink>
//               <NavLink to="/schedule">Schedule</NavLink>
//               <NavLink to="/participants">Participants</NavLink>
//               <NavLink to="/about">About</NavLink>
//             </div>

//             {/* CTA */}
//             <div className="hidden md:flex items-center gap-4">
//               <Link
//                 to="/register"
//                 ref={btnRef}
//                 onPointerDown={pressButton}
//                 className="px-5 py-2 rounded-md font-semibold shadow-md transition transform hover:scale-[1.02] inline-flex items-center"
//                 style={{
//                   background: "linear-gradient(90deg,#06b6d4,#7c3aed)",
//                   color: "#071124",
//                   boxShadow: "0 10px 30px rgba(6,182,212,0.08)",
//                 }}
//               >
//                 Register
//               </Link>
//             </div>

//             {/* mobile button */}
//             <button
//               onClick={toggleMenu}
//               aria-controls="mobile-menu"
//               aria-expanded={isOpen}
//               aria-label={isOpen ? "Close menu" : "Open menu"}
//               className="md:hidden p-2 rounded-lg text-white/95 hover:bg-white/6 focus:outline-none focus:ring-2 focus:ring-white/10"
//             >
//               {isOpen ? <X size={22} /> : <Menu size={22} />}
//             </button>
//           </div>

//           {/* Mobile animated panel */}
//           <div
//             id="mobile-menu"
//             className={`md:hidden overflow-hidden transition-[max-height,opacity,transform] duration-400 ease-in-out ${
//               isOpen
//                 ? "max-h-[420px] opacity-100 translate-y-0"
//                 : "max-h-0 opacity-0 -translate-y-2"
//             }`}
//             aria-hidden={!isOpen}
//           >
//             <div
//               className="px-4 pb-6 pt-3"
//               role="menu"
//               aria-label="Mobile Navigation"
//             >
//               <div className="flex flex-col gap-3">
//                 <Link
//                   to="/"
//                   onClick={closeMenu}
//                   className="py-2 px-3 rounded-md text-white/95 hover:bg-white/6 transition"
//                 >
//                   Home
//                 </Link>
//                 <Link
//                   to="/games"
//                   onClick={closeMenu}
//                   className="py-2 px-3 rounded-md text-white/95 hover:bg-white/6 transition"
//                 >
//                   Games
//                 </Link>
//                 <Link
//                   to="/schedule"
//                   onClick={closeMenu}
//                   className="py-2 px-3 rounded-md text-white/95 hover:bg-white/6 transition"
//                 >
//                   Schedule
//                 </Link>
//                 <Link
//                   to="/participants"
//                   onClick={closeMenu}
//                   className="py-2 px-3 rounded-md text-white/95 hover:bg-white/6 transition"
//                 >
//                   Participants
//                 </Link>
//                 <Link
//                   to="/about"
//                   onClick={closeMenu}
//                   className="py-2 px-3 rounded-md text-white/95 hover:bg-white/6 transition"
//                 >
//                   About
//                 </Link>

//                 <div className="pt-2">
//                   <Link
//                     to="/register"
//                     onClick={closeMenu}
//                     className="block text-center rounded-md px-4 py-2 font-semibold"
//                     style={{
//                       background: "linear-gradient(90deg,#06b6d4,#7c3aed)",
//                       color: "#071124",
//                     }}
//                   >
//                     Register Now
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </nav>
//       </header>

//       {/* Styles: neon bars, button blink, fold animation */}
//       <style>{`
//         /* NEON BARS (left & right) - tuned to CSE sky-blue */
//         .neon-bar-left, .neon-bar-right {
//           background: linear-gradient(180deg, rgba(14,165,233,0.28), rgba(99,102,241,0.18));
//           box-shadow: 0 0 24px rgba(14,165,233,0.25), 0 0 48px rgba(99,102,241,0.12);
//           transform: translateZ(0);
//           animation: neonSlide 3.8s linear infinite;
//           border-radius: 9999px;
//           opacity: 0.95;
//         }
//         .neon-bar-right { animation-direction: reverse; }

//         @keyframes neonSlide {
//           0% { background-position: 0% 0%; box-shadow: 0 0 16px rgba(14,165,233,0.12); transform: translateY(0) scaleY(1); }
//           50% { background-position: 100% 100%; box-shadow: 0 0 36px rgba(14,165,233,0.22); transform: translateY(6px) scaleY(1.02); }
//           100% { background-position: 0% 0%; box-shadow: 0 0 16px rgba(14,165,233,0.12); transform: translateY(0) scaleY(1); }
//         }

//         /* NAV LINKS neon underline on hover */
//         nav a { position: relative; }
//         nav a::after {
//           content: "";
//           position: absolute;
//           left: 0;
//           right: 0;
//           bottom: -6px;
//           height: 3px;
//           background: linear-gradient(90deg,#06b6d4,#7c3aed);
//           transform-origin: left center;
//           transform: scaleX(0);
//           opacity: 0.0;
//           transition: transform 220ms ease, opacity 220ms ease;
//           border-radius: 99px;
//         }
//         nav a:hover::after, nav a:focus::after {
//           transform: scaleX(1);
//           opacity: 1;
//         }

//         /* BUTTON BLINK (on press) - CSS class toggled via JS & :active fallback */
//         .btn-pressed {
//           animation: blink 200ms ease-in-out 1;
//         }
//         @keyframes blink {
//           0% { filter: brightness(1) drop-shadow(0 0 0 rgba(255,255,255,0)); transform: scale(1); }
//           50% { filter: brightness(1.25) drop-shadow(0 0 18px rgba(6,182,212,0.35)); transform: scale(0.99); }
//           100% { filter: brightness(1) drop-shadow(0 0 0 rgba(255,255,255,0)); transform: scale(1); }
//         }
//         /* also apply :active for immediate native feedback */
//         a:active, button:active { transform: translateY(0.5px); }

//         /* FOLD (3D) animation for site-main when menu opens */
//         body.menu-open .site-main {
//           transform-origin: top center;
//           transform: perspective(1100px) rotateX(8deg) translateY(14px) scale(0.986);
//           filter: saturate(0.95) contrast(0.98) blur(0.4px);
//           transition: transform 420ms cubic-bezier(.2,.9,.3,1), filter 420ms ease;
//           pointer-events: none;
//           user-select: none;
//         }
//         .site-main {
//           transition: transform 420ms cubic-bezier(.2,.9,.3,1), filter 420ms ease;
//           transform-origin: top center;
//         }

//         /* subtle overlay shading while menu open */
//         body.menu-open::after {
//           content: "";
//           position: fixed;
//           inset: 0;
//           background: linear-gradient(to bottom, rgba(0,0,0,0.12), rgba(0,0,0,0.24));
//           z-index: 40;
//           pointer-events: none;
//         }

//         /* mobile menu panel animation smoother */
//         #mobile-menu { will-change: max-height, opacity, transform; }

//         /* Reduced motion preference support */
//         @media (prefers-reduced-motion: reduce) {
//           .neon-bar-left, .neon-bar-right, nav a::after, .btn-pressed, body.menu-open .site-main, .site-main {
//             animation: none !important;
//             transition: none !important;
//             transform: none !important;
//             filter: none !important;
//           }
//         }

//         /* responsive: hide neon bars on small screens to avoid glare */
//         @media (max-width: 768px) {
//           .neon-bar-left, .neon-bar-right { display: none; }
//         }
//       `}</style>
//     </>
//   );
// }

// /* helper NavLink for consistent styling */
// function NavLink({ to, children }) {
//   return (
//     <Link
//       to={to}
//       className="text-white/90 hover:text-white font-medium transition"
//     >
//       {children}
//     </Link>
//   );
// }





import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const btnRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    if (isOpen) document.body.classList.add("menu-open");
    else document.body.classList.remove("menu-open");

    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("menu-open");
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  const pressButton = () => {
    const el = btnRef.current;
    if (!el) return;
    el.classList.add("btn-pressed");
    setTimeout(() => el.classList.remove("btn-pressed"), 220);
  };

  const toggleMenu = () => {
    pressButton();
    setTimeout(() => setIsOpen((s) => !s), 80);
  };

  return (
    <>
      <header className="sticky top-3 z-50">
        {/* neon side bars */}
        <div aria-hidden className="absolute inset-y-0 left-0 w-3 -z-10">
          <div className="neon-bar-left h-full rounded-full" />
        </div>
        <div aria-hidden className="absolute inset-y-0 right-0 w-3 -z-10">
          <div className="neon-bar-right h-full rounded-full" />
        </div>

        <nav className="mx-4 md:mx-auto md:max-w-7xl rounded-2xl backdrop-blur-xl bg-gradient-to-r from-[#071033]/80 via-[#072b4f]/70 to-[#071028]/80 border border-white/10 shadow-2xl">
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3" onClick={closeMenu}>
              <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center shadow-lg bg-gradient-to-br from-cyan-400/10 to-purple-600/10">
                <img
                  src="../../image/logological.png"
                  alt="Logical logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="leading-tight select-none">
                <div className="text-white font-extrabold tracking-tight text-sm">
                  LOGICAL
                </div>
                <div className="text-white/60 text-xs -mt-0.5">2025</div>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <NavLink to="/games">Games</NavLink>
              <NavLink to="/schedule">Schedule</NavLink>
              <NavLink to="/participants">Participants</NavLink>
              <NavLink to="/about">About</NavLink>
            </div>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                to="/register"
                ref={btnRef}
                onPointerDown={pressButton}
                className="px-5 py-2 rounded-md font-semibold shadow-md inline-flex items-center bg-gradient-to-r from-cyan-400 to-purple-600 text-[#071124] hover:scale-[1.02] transition-transform"
              >
                Register
              </Link>
            </div>

            {/* Mobile Button */}
            <button
              onClick={toggleMenu}
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              className="md:hidden p-2 rounded-lg text-white/95 hover:bg-white/6 focus:outline-none focus:ring-2 focus:ring-white/10"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            id="mobile-menu"
            className={`md:hidden overflow-hidden transition-[max-height,opacity,transform] duration-200 will-change-scroll ease-in-out ${
              isOpen
                ? "max-h-[420px] opacity-100 translate-y-0"
                : "max-h-0 opacity-0 -translate-y-2"
            }`}
            aria-hidden={!isOpen}
          >
            <div className="px-4 pb-6 pt-3 flex flex-col gap-3">
              <Link to="/" onClick={closeMenu} className="py-2 px-3 rounded-md text-white/95 hover:bg-white/6 transition">
                Home
              </Link>
              <Link to="/games" onClick={closeMenu} className="py-2 px-3 rounded-md text-white/95 hover:bg-white/6 transition">
                Games
              </Link>
              <Link to="/schedule" onClick={closeMenu} className="py-2 px-3 rounded-md text-white/95 hover:bg-white/6 transition">
                Schedule
              </Link>
              <Link to="/participants" onClick={closeMenu} className="py-2 px-3 rounded-md text-white/95 hover:bg-white/6 transition">
                Participants
              </Link>
              <Link to="/about" onClick={closeMenu} className="py-2 px-3 rounded-md text-white/95 hover:bg-white/6 transition">
                About
              </Link>
              <Link
                to="/register"
                onClick={closeMenu}
                className="block text-center rounded-md px-4 py-2 font-semibold bg-gradient-to-r from-cyan-400 to-purple-600 text-[#071124]"
              >
                Register Now
              </Link>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

function NavLink({ to, children }) {
  return (
    <Link
      to={to}
      className="text-white/90 hover:text-white font-medium transition relative after:absolute after:left-0 after:bottom-0 after:h-1 after:bg-gradient-to-r after:from-cyan-400 after:to-purple-600 after:rounded-full after:scale-x-0 after:opacity-0 after:transition-transform after:duration-200 hover:after:scale-x-100 hover:after:opacity-100"
    >
      {children}
    </Link>
  );
}
