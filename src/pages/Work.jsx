import React from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '../components/ui/project-card';

// Project data
const projects = [
  {
    id: "fleetroute-ca",
    name: "FleetRoute California",
    label: "Featured",
    description:
      "FleetRoute California delivers data-driven location intelligence for food trucks. Operators pick profitable spots with live foot-traffic overlays, event intel, weather-aware routing, and permit automation.",
    image: "/projects/fleetroute/mainscreen.png",
    logo: "/projects/fleetroute/logo.png",
    technologies: ["React", "TypeScript", "PostGIS", "Google Maps", "Tailwind", "AWS"],
    gallery: [
      "/projects/fleetroute/mainscreen.png",
      "/projects/fleetroute/evennts.png",
      "/projects/fleetroute/earnigdashboard.png",
      "/projects/fleetroute/permits.png"
    ],
    metrics: [
      "47% avg revenue lift",
      "340+ trucks live",
      "92% permit compliance"
    ],
    accentFrom: "from-blue-500/30",
    accentTo: "to-cyan-400/20"
  },
  {
    id: "hoteldesk-pro",
    name: "HotelDesk Pro",
    label: "Desktop",
    description:
      "HotelDesk Pro digitizes front-desk operations for 20-150 room hotels: sub-2-minute check-in with ID scan, error-free billing, live room grid, and housekeeping coordination.",
    image: "/projects/hoteldesk/mainscreen.png",
    logo: "/projects/hoteldesk/logo.png",
    technologies: [".NET 6", "WPF", "C#", "SQL Server", "Crystal Reports", "OCR"],
    gallery: [
      "/projects/hoteldesk/mainscreen.png",
      "/projects/hoteldesk/roombooking.png"
    ],
    metrics: [
      "78% faster check-in",
      "96% fewer billing errors",
      "$180K avg annual uplift"
    ],
    accentFrom: "from-emerald-500/25",
    accentTo: "to-teal-400/15"
  },
  {
    id: "deutschmedia",
    name: "DeutschMedia SubtitleSync",
    label: "AI / Media",
    description:
      "AI-powered German subtitle re-timing engine that auto-adjusts durations for German reading speeds, speech pauses, and scene cuts—turning 6+ hours of manual work into under 10 minutes.",
    image: "/projects/deutschmedia/editor.png",
    logo: "/projects/deutschmedia/logo.png",
    technologies: ["Python", "OpenAI Whisper", "Google STT", "React", "WebVTT", "SRT/ASS Parsers"],
    gallery: [
      "/projects/deutschmedia/dashboard.png",
      "/projects/deutschmedia/editor.png"
    ],
    metrics: [
      "6h → 10min timing",
      "3× translator throughput",
      "Broadcast-safe output"
    ],
    accentFrom: "from-purple-500/25",
    accentTo: "to-violet-400/15"
  }
];

const Work = () => {
  return (
    <div className="relative min-h-screen bg-nova-void overflow-hidden">
      {/* Void Background - deep warm charcoal */}
      <div className="absolute inset-0 bg-nova-void">
        {/* Subtle warm amber glow accents */}
        <div className="absolute top-10 right-32 w-56 sm:w-80 h-56 sm:h-80 bg-nova-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 left-24 w-48 sm:w-72 h-48 sm:h-72 bg-nova-primary/8 rounded-full blur-3xl"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-10 pt-28 md:pt-32 pb-16 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="mb-16 space-y-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[4px] bg-amber-500/10 border border-amber-500/20 text-xs uppercase tracking-[0.15em] text-amber-500 font-mono">
            PORTFOLIO.SHOWCASE
          </div>

          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-space font-light tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-white via-stone-300 to-stone-500 bg-clip-text text-transparent">
              Our Work
            </span>
          </motion.h1>
          
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-lg md:text-xl lg:text-2xl text-stone-300 leading-relaxed mb-3 md:mb-4">
              A glimpse into some of our <span className="text-amber-400 font-medium">masterpieces</span>—hand-picked from dozens of successful projects we've delivered.
            </p>
            <p className="text-sm md:text-base text-stone-500 leading-relaxed">
              What you see here is just the tip of the iceberg. From stealth startups to enterprise clients, we've built solutions across industries—these are the ones we can <span className="text-stone-400">share publicly</span>.
            </p>
          </motion.div>

          {/* Decorative line */}
          <motion.div 
            className="flex items-center gap-4 pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="h-[1px] w-16 bg-gradient-to-r from-amber-500/50 to-transparent"></div>
            <span className="font-mono text-[10px] text-stone-600 tracking-widest">FEATURED • {projects.length} OF 24+ PROJECTS</span>
          </motion.div>
        </motion.div>

        {/* Feature Layouts */}
        <div className="space-y-16">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="group relative overflow-hidden rounded-3xl border border-white/5 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.5)] hover:border-orange-500/50 hover:shadow-[0_20px_80px_rgba(217,119,6,0.15)] transition-all duration-300"
              style={{
                background: 'radial-gradient(ellipse at top center, rgba(38, 38, 38, 0.5), rgba(10, 10, 10, 1))'
              }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.7, ease: "easeOut" }}
            >
              <div className="relative grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-0">
                {/* Logo Display */}
                <div className="relative overflow-hidden bg-neutral-900 aspect-[4/3] md:aspect-auto md:h-auto min-h-[200px] md:min-h-[280px]">
                  <motion.img
                    src={project.logo}
                    alt={`${project.name} logo`}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                  <div className="absolute bottom-3 left-3 flex items-center gap-2 text-xs text-nova-text-heading">
                    <span className="px-2.5 py-1 rounded-full bg-nova-glass-bg backdrop-blur-sm border border-nova-glass-border">
                      {project.gallery.length} shots
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-nova-glass-bg backdrop-blur-sm border border-nova-glass-border">
                      {project.label}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3 self-center p-6 sm:p-8 md:py-8 md:px-10 relative z-10">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="px-2.5 py-0.5 rounded-full bg-transparent border border-neutral-700 text-nova-text-highlight font-mono text-xs">{project.label}</span>
                    <span className="text-nova-text-highlight text-xs">Case Study</span>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-semibold text-nova-text-heading">{project.name}</h2>

                  <p className="text-sm sm:text-base text-stone-400 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Metrics / Bento row */}
                  <div className="grid sm:grid-cols-3 gap-2">
                    {project.metrics.map((metric) => (
                      <div key={metric} className="rounded-lg border border-nova-glass-border bg-nova-void-light px-2.5 py-2 text-xs text-stone-300">
                        {metric}
                      </div>
                    ))}
                  </div>

                  {/* Tech badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-xs rounded-full bg-transparent border border-neutral-700 text-stone-300 font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-4 pt-1">
                    <motion.a
                      href={`/project/${project.id}`}
                      className="inline-flex items-center gap-2 text-nova-text-highlight hover:text-nova-primary-light transition-colors underline-offset-4 hover:underline"
                      whileHover={{ x: 4 }}
                    >
                      View Project
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div 
          className="text-left mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <p className="text-stone-400 mb-4">
            Have a complex product to bring to life?
          </p>
          <motion.a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-nova-primary hover:bg-nova-primary-dark text-black rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-xl hover:shadow-nova-primary/25"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Let's Talk
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default Work;
