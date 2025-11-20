import React from "react";
import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative w-full text-blue-100 pt-20 pb-10 px-4 overflow-hidden">

      {/* 🌈 Background Gradient + Glow Lights */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(to bottom, #07122b, #071d3f, #062b4f, #07122a)",
        }}
      />

      {/* Floating glow orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20 blur-[100px]"
        style={{ background: "radial-gradient(circle, #38bdf8, transparent 70%)" }} />

      <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] rounded-full opacity-10 blur-[130px]"
        style={{ background: "radial-gradient(circle, #818cf8, transparent 70%)" }} />


      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto relative z-10">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-14">

          {/* About */}
          <div>
            <h3 className="text-3xl font-extrabold text-sky-300 tracking-wide drop-shadow">
              LOGICAL 2025
            </h3>
            <p className="mt-4 text-blue-200/80 leading-relaxed text-sm">
              The ultimate sports & cultural festival of RVS College of Engineering & Technology, Jamshedpur.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xl font-bold mb-4 border-l-4 border-sky-400 pl-3 text-white">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                { to: "/games", label: "Games" },
                { to: "/schedule", label: "Schedule" },
                { to: "/participants", label: "Participants" },
                { to: "/about", label: "About Us" },
              ].map((item, i) => (
                <li key={i}>
                  <Link
                    to={item.to}
                    className="hover:text-sky-300 transition-all hover:pl-1"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xl font-bold mb-4 border-l-4 border-sky-400 pl-3 text-white">
              Contact
            </h4>

            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-sky-400" />
                <a href="mailto:frolic@rvscet.ac.in" className="hover:text-sky-300 transition">
                  frolic@rvscet.ac.in
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={18} className="text-sky-400" />
                <a href="tel:+919876543210" className="hover:text-sky-300 transition">
                  +91 9876543210
                </a>
              </div>

              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-sky-400" />
                <span>Jamshedpur, Jharkhand</span>
              </div>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-xl font-bold mb-4 border-l-4 border-sky-400 pl-3 text-white">
              Follow Us
            </h4>

            <div className="space-y-3 text-sm">
              {["Instagram", "Facebook", "Twitter", "LinkedIn"].map((s, i) => (
                <a
                  key={i}
                  href="#"
                  className="block hover:text-sky-300 hover:pl-1 transition-all"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-blue-800 to-transparent" />

        {/* Bottom */}
        <div className="pt-8 text-center">
          <p className="text-sm text-blue-200/70">
            © 2025 LOGICAL – RVS College of Engineering & Technology. All rights reserved.
           <br />
Developed by |
<a 
    href="https://github.com/Mdamanatansari7" 
    target="_blank" 
    rel="noopener noreferrer" 
    class="text-sky-300 font-semibold hover:text-sky-400 transition"
>
     | Md Amanat Ansari ||
</a>
            
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
