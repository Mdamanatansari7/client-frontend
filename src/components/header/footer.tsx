import { Mail, MapPin, Phone } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="w-full bg-primary text-primary-foreground py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">FROLIC 2025</h3>
            <p className="text-primary-foreground text-opacity-80 text-sm">
              The ultimate college sports & cultural extravaganza at RVS College of Engineering and Technology Jamshedpur.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2 text-sm">
              <Link href="/games" className="hover:text-accent transition">
                Games
              </Link>
              <Link href="/schedule" className="block hover:text-accent transition">
                Schedule
              </Link>
              <Link href="/participants" className="block hover:text-accent transition">
                Participants
              </Link>
              <Link href="/about" className="block hover:text-accent transition">
                About Us
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <a href="mailto:frolic@rvscet.ac.in" className="hover:text-accent transition">
                  frolic@rvscet.ac.in
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <a href="tel:+919876543210" className="hover:text-accent transition">
                  +91 9876543210
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5" />
                <span>Jamshedpur, Jharkhand</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="space-y-2 text-sm">
              <a href="#" className="block hover:text-accent transition">
                Instagram
              </a>
              <a href="#" className="block hover:text-accent transition">
                Facebook
              </a>
              <a href="#" className="block hover:text-accent transition">
                Twitter
              </a>
              <a href="#" className="block hover:text-accent transition">
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-foreground border-opacity-20 pt-8">
          <p className="text-center text-sm text-primary-foreground text-opacity-70">
            © 2025 FROLIC - RVS College of Engineering & Technology. All rights reserved.| Developed by Md Amanat Ansari.
          </p>
        </div>
      </div>
    </footer>
  )
}
