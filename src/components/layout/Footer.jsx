import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/[0.05] px-4 md:px-12 lg:px-24 py-10 md:py-12">
      <div className="max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8 md:mb-10">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-geist-mono font-medium text-amber-500 mb-3">NOVA.STUDIO</h3>
            <p className="text-stone-500 text-sm leading-relaxed font-geist-mono">
              Precision software engineering for the AI era.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-geist-mono font-medium text-stone-400 tracking-wider mb-4">QUICK_LINKS</h4>
            <div className="flex flex-col gap-2.5">
              <Link to="/" className="text-stone-500 hover:text-amber-500 transition-colors duration-200 font-geist-mono text-sm">
                /home
              </Link>
              <Link to="/about" className="text-stone-500 hover:text-amber-500 transition-colors duration-200 font-geist-mono text-sm">
                /about
              </Link>
              <Link to="/work" className="text-stone-500 hover:text-amber-500 transition-colors duration-200 font-geist-mono text-sm">
                /work
              </Link>
              <Link to="/contact" className="text-stone-500 hover:text-amber-500 transition-colors duration-200 font-geist-mono text-sm">
                /contact
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xs font-geist-mono font-medium text-stone-400 tracking-wider mb-4">GET_IN_TOUCH</h4>
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-3 text-stone-500">
                <Mail size={14} className="text-amber-500/70" />
                <a href="mailto:hello@nova.studio" className="hover:text-amber-500 transition-colors duration-200 font-geist-mono text-sm">
                  hello@nova.studio
                </a>
              </div>
              <div className="flex items-center gap-3 text-stone-500">
                <MapPin size={14} className="text-amber-500/70" />
                <span className="font-geist-mono text-sm">Lahore, Pakistan</span>
              </div>
              <div className="flex items-center gap-3 text-stone-500">
                <Clock size={14} className="text-amber-500/70" />
                <span className="font-geist-mono text-sm">PKT (UTC+5)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/[0.05] pt-6 text-center">
          <p className="text-stone-600 text-xs font-geist-mono">
            © 2026 Nova Studio. Engineered with purpose.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
