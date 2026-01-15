import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Timeline } from '../components/ui/timeline';

// Project data
const projectsData = {
  "fleetroute-ca": {
    id: "fleetroute-ca",
    name: "FleetRoute California",
    heroTagline: "Smart Location Intelligence for Food Trucks",
    description:
      "A comprehensive web platform that helps California food truck operators maximize daily revenue with real-time location intelligence, event discovery, and permit management.",
    summary:
      "Interactive maps, foot traffic analytics, weather-aware routing, and compliance tracking in one experience. Deployed across 12 California metros with 340+ active users.",
    image: "/projects/fleetroute/mainscreen.png",
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL + PostGIS",
      "Google Maps API",
      "Weather APIs",
      "Tailwind CSS",
      "AWS"
    ],
    gallery: [
      "/projects/fleetroute/mainscreen.png",
      "/projects/fleetroute/evennts.png",
      "/projects/fleetroute/earnigdashboard.png",
      "/projects/fleetroute/permits.png"
    ],
    features: [
      "Interactive location maps with permitted zones, competitor markers, and foot-traffic overlays",
      "Event calendar surfacing 18,000+ annual events with attendance predictions and deadlines",
      "Weather-aware routing tuned to California microclimates with fallback spots",
      "Sales analytics that reveal best-performing locations by time of day",
      "Permit management and reminders across multiple jurisdictions",
      "Route planning for breakfast, lunch, and dinner shifts"
    ],
    keyResults: [
      "47% average revenue lift for active trucks",
      "340+ trucks across 12 metros",
      "92% permit compliance vs. 62% industry average",
      "Zero double-bookings at major events",
      "$12,400 average annual revenue increase per operator"
    ],
    problem:
      "California’s 7,500+ food trucks juggle permits, events, competition, and weather—forcing daily parking decisions without data.",
    solution:
      "FleetRoute combines mapping, events, analytics, and compliance into a single workflow so operators can choose profitable spots with confidence.",
    targetMarket:
      "Food truck operators, mobile food vendors, and fleet managers navigating California’s complex regulatory environment.",
    timeline: [
      {
        title: "Discovery & Data Modeling",
        content: (
          <div className="space-y-4">
            <p className="text-gray-300 text-base leading-relaxed">
              We partnered with <span className="text-white font-medium">12 pilot food truck operators</span> across California to understand their daily challenges—navigating permits, chasing events, and competing for prime locations.
            </p>
            <p className="text-gray-300 text-base leading-relaxed">
              This research shaped our data architecture: <span className="text-cyan-300">PostGIS-powered geo layers</span> for permitted zones, a normalized event schema with attendance predictions, and real-time weather integrations.
            </p>
            <p className="text-gray-400 text-sm italic">
              The result was a foundation that could answer "where should I park today?" in milliseconds.
            </p>
          </div>
        ),
      },
      {
        title: "Experience & Insight Layers",
        content: (
          <div className="space-y-4">
            <p className="text-gray-300 text-base leading-relaxed">
              With the data backbone in place, we built the <span className="text-white font-medium">interactive map experience</span>. Operators can now see permit overlays, competitor pins, and foot-traffic heatmaps at a glance.
            </p>
            <p className="text-gray-300 text-base leading-relaxed">
              The event calendar surfaces <span className="text-cyan-300">18,000+ annual California events</span> with attendance forecasts and application deadlines. Weather-aware routing suggests fallback spots when conditions change.
            </p>
            <p className="text-gray-400 text-sm italic">
              Every interaction was tuned with Framer Motion micro-animations to keep the UI snappy and intuitive.
            </p>
          </div>
        ),
      },
      {
        title: "Analytics & Launch",
        content: (
          <div className="space-y-4">
            <p className="text-gray-300 text-base leading-relaxed">
              The final phase layered <span className="text-white font-medium">revenue analytics</span>—showing operators which locations, times, and events drive the most sales.
            </p>
            <p className="text-gray-300 text-base leading-relaxed">
              We rolled out to <span className="text-cyan-300">12 California metros</span>, onboarding 340+ trucks. The results spoke for themselves: a 47% average revenue lift, 92% permit compliance (vs. 62% industry average), and zero double-bookings at major events.
            </p>
            <p className="text-gray-400 text-sm italic">
              FleetRoute transformed location decisions from guesswork into data-driven confidence.
            </p>
          </div>
        ),
      },
    ]
  },
  "hoteldesk-pro": {
    id: "hoteldesk-pro",
    name: "HotelDesk Pro",
    heroTagline: "Complete Front Desk Operations Management",
    description:
      "A native Windows desktop app for hotels to streamline front desk operations, cut check-in time, and eliminate billing errors.",
    summary:
      "Designed for 20-150 room properties, HotelDesk Pro replaces paper logs and scattered spreadsheets with a real-time room grid, two-minute check-in/out, and error-free billing. Deployed at 45+ properties across California.",
    image: "/projects/hoteldesk/mainscreen.png",
    technologies: [
      ".NET 6",
      "WPF",
      "C#",
      "SQL Server Express",
      "Crystal Reports",
      "MaterialDesign",
      "OCR/ID Scan Integration",
      "Hardware Integrations"
    ],
    gallery: [
      "/projects/hoteldesk/mainscreen.png",
      "/projects/hoteldesk/roombooking.png"
    ],
    features: [
      "Color-coded room availability grid with filters by floor, room type, and status",
      "Sub-2-minute check-in/out with ID scanning and automated document generation",
      "Reservation management with group bookings, OTA integration, and waitlist handling",
      "Intelligent billing calculating room charges, extras, and taxes with zero errors",
      "Housekeeping coordination and live status updates from mobile devices",
      "Revenue analytics: occupancy, ADR, RevPAR, and seasonal patterns for pricing"
    ],
    keyResults: [
      "78% reduction in check-in time (18 minutes to ~4 minutes)",
      "96% reduction in billing errors (23% to 0.8%)",
      "Zero double bookings across deployed properties",
      "$180K average annual revenue increase per property",
      "44% lift in guest satisfaction from smoother operations"
    ],
    problem:
      "Front desks rely on manual registers, sticky notes, and whiteboards—causing double bookings, billing disputes, slow lines, and missed housekeeping coordination.",
    solution:
      "HotelDesk Pro centralizes room visibility, reservations, billing, and housekeeping updates into one desktop system with automation and auditability.",
    targetMarket:
      "Small to medium hotels, motels, resorts, and guest houses (20-150 rooms) needing reliable on-prem desktop ops without monthly SaaS fees.",
    timeline: [
      {
        title: "Operational Mapping",
        content: (
          <div className="space-y-4">
            <p className="text-gray-300 text-base leading-relaxed">
              We embedded with front-desk teams at <span className="text-white font-medium">six pilot hotels</span> to witness the chaos firsthand: sticky notes for room status, handwritten registers, 15-minute check-in queues, and billing disputes eating into revenue.
            </p>
            <p className="text-gray-300 text-base leading-relaxed">
              We documented every workflow—check-in spikes, housekeeping handoffs, night audit routines—and defined clear SLAs: <span className="text-emerald-300">sub-2-minute transactions</span>, zero double-bookings, and complete audit trails for every folio.
            </p>
          </div>
        ),
      },
      {
        title: "Check-In Automation",
        content: (
          <div className="space-y-4">
            <p className="text-gray-300 text-base leading-relaxed">
              The core innovation was a streamlined check-in flow powered by <span className="text-white font-medium">ID scanning and OCR</span>. Guests hand over their ID, the system auto-fills their profile, calculates rates and taxes instantly, and prints registration cards—all in under two minutes.
            </p>
            <p className="text-gray-300 text-base leading-relaxed">
              <span className="text-emerald-300">Conflict detection</span> prevents double-bookings in real time, while waitlist handling and group reservation tools keep operations smooth even during peak seasons.
            </p>
          </div>
        ),
      },
      {
        title: "Revenue & Housekeeping Insights",
        content: (
          <div className="space-y-4">
            <p className="text-gray-300 text-base leading-relaxed">
              We layered analytics dashboards showing <span className="text-white font-medium">occupancy, ADR, RevPAR</span>, and seasonal patterns so managers could adjust pricing on the fly.
            </p>
            <p className="text-gray-300 text-base leading-relaxed">
              Housekeeping status updates propagate instantly to the front desk—when a room is cleaned, it's immediately bookable.
            </p>
            <p className="text-gray-400 text-sm italic">
              The outcome across 45+ properties: 78% faster check-in, 96% fewer billing errors, zero double-bookings, and an average $180K annual revenue increase per property.
            </p>
          </div>
        ),
      },
    ]
  },
  "deutschmedia": {
    id: "deutschmedia",
    name: "DeutschMedia SubtitleSync",
    heroTagline: "AI-Powered German Subtitle Re-Timing System",
    description:
      "An automated subtitle timing engine optimized for German captions—ensuring every subtitle is comfortably readable without overlapping dialogue or breaking scene continuity.",
    summary:
      "DeutschMedia specializes in German-language media localization. German translations run 20-30% longer than English, making manual re-timing a 4-8 hour chore. Our AI pipeline cuts that to under 10 minutes while meeting broadcast-safe standards.",
    image: "/projects/deutschmedia/editor.png",
    technologies: [
      "Python",
      "OpenAI Whisper",
      "Google Speech-to-Text",
      "React",
      "WebVTT / SRT / ASS Parsers",
      "CPS Timing Algorithm"
    ],
    gallery: [
      "/projects/deutschmedia/dashboard.png",
      "/projects/deutschmedia/editor.png"
    ],
    features: [
      "German-specific characters-per-second thresholds for comfortable reading",
      "Speech-to-text analysis detecting exact speech start/end and silence windows",
      "Automatic cascade re-timing: when a subtitle extends, all following subtitles shift",
      "Scene-aware constraints preventing extensions beyond cuts or speaker changes",
      "Industry-standard import/export: SRT, WebVTT, ASS/SSA with formatting preserved",
      "Web-based review interface with waveform visualization and AI recommendations"
    ],
    keyResults: [
      "Reduced German subtitle timing from 6+ hours to under 10 minutes",
      "Translators complete 3× more German projects",
      "Broadcast-safe output meeting professional readability standards",
      "Consistent quality eliminating human timing errors across large sets"
    ],
    problem:
      "German subtitles often exceed English length by 20-30%, causing unreadable speeds, platform rejections, and 4-8 hours of manual timing work per project.",
    solution:
      "Our engine analyzes audio silence, calculates German CPS-based durations, cascades shifts automatically, and respects scene boundaries—transforming timing from bottleneck to automated workflow.",
    targetMarket:
      "German subtitle translators, media localization agencies, streaming platforms, YouTube channels, and corporate/educational video producers targeting German audiences.",
    timeline: [
      {
        title: "Research & Language Modeling",
        content: (
          <div className="space-y-4">
            <p className="text-gray-300 text-base leading-relaxed">
              We began by analyzing <span className="text-white font-medium">500+ German subtitle files</span> to understand why manual timing takes so long. German sentences naturally expand 20-30% beyond English, pushing reading speeds past comfortable thresholds.
            </p>
            <p className="text-gray-300 text-base leading-relaxed">
              We mapped broadcaster requirements from <span className="text-purple-300">ARD, ZDF, and Netflix DE</span>, then defined German-specific characters-per-second ranges that ensure every viewer can read comfortably without pausing.
            </p>
          </div>
        ),
      },
      {
        title: "Audio Analysis Pipeline",
        content: (
          <div className="space-y-4">
            <p className="text-gray-300 text-base leading-relaxed">
              The breakthrough came from treating <span className="text-white font-medium">audio as the source of truth</span>. We integrated OpenAI Whisper for word-level timestamps, detecting exactly when speakers start and stop talking.
            </p>
            <p className="text-gray-300 text-base leading-relaxed">
              <span className="text-purple-300">Silence windows</span> became the safe zones for extending subtitle durations. Google STT serves as a fallback for edge cases, and we built scene-cut detection using audio energy drops and transcript gaps.
            </p>
          </div>
        ),
      },
      {
        title: "Timing Engine & Cascade Logic",
        content: (
          <div className="space-y-4">
            <p className="text-gray-300 text-base leading-relaxed">
              The core engine evaluates each German subtitle against <span className="text-white font-medium">CPS thresholds</span>, identifies unreadable segments, and extends durations only into verified silence windows.
            </p>
            <p className="text-gray-300 text-base leading-relaxed">
              When one subtitle extends, all following subtitles <span className="text-purple-300">cascade-shift automatically</span> to maintain perfect sync. Scene-aware constraints ensure no extension crosses a cut or speaker change.
            </p>
          </div>
        ),
      },
      {
        title: "Export & Review Interface",
        content: (
          <div className="space-y-4">
            <p className="text-gray-300 text-base leading-relaxed">
              The final piece is a <span className="text-white font-medium">web-based review UI</span> where translators can visually validate timing against waveforms. AI recommendations flag any segments that remain borderline unreadable.
            </p>
            <p className="text-gray-300 text-base leading-relaxed">
              One-click export produces broadcast-ready <span className="text-purple-300">SRT, WebVTT, or ASS/SSA</span> files with all original formatting preserved.
            </p>
            <p className="text-gray-400 text-sm italic">
              What once took 6+ hours now completes in under 10 minutes—and translators can handle 3× more projects.
            </p>
          </div>
        ),
      },
    ]
  }
};

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projectsData[id];

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Project Not Found</h1>
          <button 
            onClick={() => navigate('/work')}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <motion.div 
        className="relative h-96 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <img 
          src={project.image} 
          alt={project.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <motion.button
            onClick={() => navigate('/work')}
            className="mb-4 text-white/70 hover:text-white transition-colors flex items-center gap-2"
            whileHover={{ x: -5 }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Projects
          </motion.button>
          
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-white mb-3"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {project.name}
          </motion.h1>
          
          <motion.p 
            className="text-lg text-gray-200 max-w-3xl"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {project.description}
          </motion.p>
        </div>
      </motion.div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 space-y-16">
        {/* Summary */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-orange-200/80">
            {project.heroTagline}
          </div>
          <h2 className="text-3xl font-bold text-white">{project.name}</h2>
          <p className="text-lg text-gray-300 leading-relaxed max-w-4xl">
            {project.summary}
          </p>
        </motion.div>

        {/* Problem & Solution */}
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            className="p-6 rounded-2xl bg-white/5 border border-white/10"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-2xl font-semibold text-white mb-3">Problem</h3>
            <p className="text-gray-300 leading-relaxed">{project.problem}</p>
          </motion.div>
          <motion.div
            className="p-6 rounded-2xl bg-white/5 border border-white/10"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-2xl font-semibold text-white mb-3">Solution</h3>
            <p className="text-gray-300 leading-relaxed">{project.solution}</p>
          </motion.div>
        </div>

        {/* Technologies */}
        <motion.div 
          className="space-y-4"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <h2 className="text-2xl font-bold text-white">Technologies Used</h2>
          <div className="flex flex-wrap gap-3">
            {project.technologies.map((tech, index) => (
              <motion.span
                key={tech}
                className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white rounded-full border border-white/20"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8 + index * 0.08 }}
                whileHover={{ scale: 1.05 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Features */}
        <motion.div 
          className="space-y-4"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="text-2xl font-bold text-white">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {project.features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-3 p-4 bg-white/5 rounded-lg border border-white/10"
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1 + index * 0.1 }}
              >
                <div className="mt-1 w-2 h-2 bg-green-400 rounded-full shrink-0" />
                <span className="text-gray-300 leading-relaxed">{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Key Results & Target Market */}
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            className="md:col-span-2 p-6 rounded-2xl bg-gradient-to-r from-blue-900/30 to-purple-900/20 border border-white/10"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <h3 className="text-2xl font-semibold text-white mb-4">Key Results</h3>
            <ul className="space-y-3">
              {project.keyResults.map((result, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-200">
                  <span className="mt-1 w-2 h-2 bg-orange-400 rounded-full" />
                  <span>{result}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            className="p-6 rounded-2xl bg-white/5 border border-white/10"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <h3 className="text-2xl font-semibold text-white mb-3">Target Market</h3>
            <p className="text-gray-300 leading-relaxed">{project.targetMarket}</p>
          </motion.div>
        </div>

        {/* Gallery */}
        <motion.div 
          className="space-y-4"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          <h2 className="text-2xl font-bold text-white">Project Gallery</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {project.gallery.map((image, index) => (
              <motion.img
                key={index}
                src={image}
                alt={`${project.name} screenshot ${index + 1}`}
                className="w-full aspect-[16/10] object-cover rounded-lg border border-white/10"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Timeline */}
      <Timeline data={project.timeline} />
    </div>
  );
};

export default ProjectDetail;
