import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Terminal, Cpu, Code2, Layers, Zap, Shield, Target, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import FadeIn from '../components/animations/FadeIn';

// ============================================
// GLOBAL GRID BACKGROUND
// ============================================
const GlobalGridBackground = () => (
  <div className="fixed inset-0 pointer-events-none z-0">
    <div 
      className="absolute inset-0 opacity-[0.015]"
      style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px'
      }}
    />
  </div>
);

// ============================================
// SPEC CARD COMPONENT
// ============================================
const SpecCard = ({ id, label, value, description, icon: Icon, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden rounded-[4px] border border-white/10 bg-[rgba(255,255,255,0.02)] backdrop-blur-[12px] p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ delay, duration: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ 
        borderColor: 'rgba(245, 158, 11, 0.3)',
        boxShadow: '0 10px 40px rgba(245, 158, 11, 0.08)'
      }}
    >
      {/* Spotlight effect */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        animate={{ opacity: isHovered ? 1 : 0 }}
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(245, 158, 11, 0.12), transparent 70%)`,
        }}
      />
      
      {/* Grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '16px 16px'
        }}
      />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <span className="px-2 py-0.5 bg-amber-500/10 border border-amber-500/20 rounded-[4px] text-amber-500 font-geist-mono text-[10px] tracking-wider">
            [{id}]
          </span>
          {Icon && <Icon size={20} className="text-amber-500/50" />}
        </div>
        <div className="mb-2">
          <span className="font-geist-mono text-xs text-stone-500">{label}:</span>
        </div>
        <h3 className="font-space text-xl font-semibold text-white mb-2">{value}</h3>
        <p className="font-geist-mono text-xs text-stone-500/70 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

// ============================================
// PRINCIPLE ITEM
// ============================================
const PrincipleItem = ({ icon: Icon, title, description, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      className="flex items-start gap-4"
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ delay, duration: 0.5 }}
    >
      <div className="shrink-0 w-10 h-10 rounded-[4px] bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
        <Icon size={18} className="text-amber-500" />
      </div>
      <div>
        <h4 className="font-space text-lg font-semibold text-white mb-1">{title}</h4>
        <p className="text-sm text-stone-400/70 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
};

// ============================================
// TIMELINE ITEM
// ============================================
const TimelineItem = ({ year, title, description, isLast = false, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      className="relative flex gap-6"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ delay, duration: 0.5 }}
    >
      {/* Timeline line */}
      <div className="flex flex-col items-center">
        <div className="w-3 h-3 rounded-full bg-amber-500 border-2 border-black" />
        {!isLast && <div className="w-[1px] flex-1 bg-white/10 mt-2" />}
      </div>
      
      {/* Content */}
      <div className="pb-10">
        <span className="font-geist-mono text-xs text-amber-500/70">{year}</span>
        <h4 className="font-space text-lg font-semibold text-white mt-1 mb-2">{title}</h4>
        <p className="text-sm text-stone-400/70 leading-relaxed max-w-md">{description}</p>
      </div>
    </motion.div>
  );
};

// ============================================
// TECH BADGE
// ============================================
const TechBadge = ({ name, delay = 0 }) => (
  <motion.span
    className="px-3 py-1 bg-transparent border border-stone-700 rounded-full text-[11px] font-geist-mono text-stone-500 tracking-wide hover:border-amber-500/30 hover:text-stone-400 transition-all duration-200"
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: false, amount: 0.3 }}
    transition={{ delay, duration: 0.3 }}
  >
    {name}
  </motion.span>
);

// ============================================
// MAIN ABOUT COMPONENT
// ============================================
const About = () => {
  const specs = [
    {
      id: 'SPEC_001',
      label: 'ORIGIN',
      value: 'Lahore → Global',
      description: 'Product studio based in Pakistan, serving clients across North America, Europe, and Asia.',
      icon: Target
    },
    {
      id: 'SPEC_002',
      label: 'DIRECTIVE',
      value: 'Eliminate Bloat',
      description: 'Every dependency justified. Every line of code purposeful. Zero tolerance for technical debt.',
      icon: Zap
    },
    {
      id: 'SPEC_003',
      label: 'PHILOSOPHY',
      value: 'Form Follows Function',
      description: 'Beautiful software emerges from precise engineering, not superficial decoration.',
      icon: Layers
    },
    {
      id: 'SPEC_004',
      label: 'SPECIALIZATION',
      value: 'AI + High-Performance UI',
      description: 'Agentic systems, LLM integration, and interfaces engineered for sub-100ms latency.',
      icon: Cpu
    },
  ];

  const principles = [
    {
      icon: Shield,
      title: 'Against Bloat',
      description: 'We reject unnecessary dependencies and heavy frameworks that compromise performance. Every package must earn its place.'
    },
    {
      icon: Code2,
      title: 'Against Templates',
      description: 'Unique problems demand unique solutions. We architect from first principles, not pre-packaged themes.'
    },
    {
      icon: Zap,
      title: 'For Precision',
      description: 'Sub-100ms interaction latency. 100% type-safety. Zero runtime errors. These are non-negotiable.'
    },
    {
      icon: Users,
      title: 'For Partnership',
      description: 'We embed with your team, not around it. True collaboration means shared ownership of outcomes.'
    },
  ];

  const timeline = [
    {
      year: '2024',
      title: 'Studio Founded',
      description: 'Nova was established with a singular mission: build software that respects both users and engineers.'
    },
    {
      year: '2024 Q3',
      title: 'First Enterprise Client',
      description: 'Delivered a custom AI-powered analytics platform for a Fortune 500 logistics company.'
    },
    {
      year: '2025',
      title: 'Agentic AI Focus',
      description: 'Pivoted to specialize in agentic workflows, RAG architectures, and LLM-integrated applications.'
    },
    {
      year: '2026',
      title: 'Global Expansion',
      description: 'Now serving clients across 12 countries with a focus on enterprise AI and high-performance interfaces.'
    },
  ];

  const techStack = {
    frontend: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Three.js'],
    backend: ['Node.js', 'Python', 'FastAPI', 'tRPC', 'Prisma'],
    ai: ['OpenAI', 'Anthropic', 'LangChain', 'Pinecone', 'Vercel AI SDK'],
    infrastructure: ['Vercel', 'AWS', 'PostgreSQL', 'Redis', 'Docker'],
  };

  return (
    <div className="relative bg-black text-white min-h-screen">
      <GlobalGridBackground />

      {/* ============================================ */}
      {/* HERO SECTION */}
      {/* ============================================ */}
      <section className="relative pt-32 pb-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-screen-2xl mx-auto">
          <FadeIn>
            <div className="mb-6">
              <span className="inline-block px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-[4px] font-mono text-xs text-amber-500 tracking-widest">
                SYSTEM.ABOUT
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-space font-light tracking-tight mb-6">
              <span className="bg-gradient-to-r from-white via-stone-300 to-stone-500 bg-clip-text text-transparent">
                Studio_Specs
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-stone-400/70 max-w-3xl leading-relaxed font-light">
              Nova is a precision software studio. We architect bespoke systems for companies that refuse to compromise on quality.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ============================================ */}
      {/* SPECIFICATIONS GRID */}
      {/* ============================================ */}
      <section className="relative py-16 px-6 md:px-12 lg:px-24 bg-[#080808]">
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {specs.map((spec, index) => (
              <SpecCard key={spec.id} {...spec} delay={index * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* MANIFESTO SECTION */}
      {/* ============================================ */}
      <section className="relative py-24 px-6 md:px-12 lg:px-24 bg-black">
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left - Manifesto Text */}
            <div>
              <FadeIn>
                <div className="mb-8">
                  <span className="inline-block px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-[4px] font-mono text-xs text-amber-500 tracking-widest">
                    MANIFESTO.TXT
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-space font-light tracking-tight mb-8">
                  <span className="bg-gradient-to-r from-white via-stone-300 to-stone-500 bg-clip-text text-transparent">
                    The Antidote to Mediocrity
                  </span>
                </h2>
              </FadeIn>
              
              <FadeIn delay={0.2}>
                <div className="space-y-6 text-stone-400/80 leading-relaxed">
                  <p>
                    In an era of AI-generated templates and cookie-cutter solutions, we chose a different path. 
                    Nova exists because we believe software should be <span className="text-amber-500">engineered</span>, 
                    not assembled.
                  </p>
                  <p>
                    We're a small team of engineers and designers who left comfortable positions at tech giants 
                    because we wanted to build things that matter. Things that work. Things that last.
                  </p>
                  <p>
                    Every project we take on becomes an obsession. We don't ship until it's right—not right enough, 
                    but <span className="text-amber-500">right</span>. This means saying no to most opportunities. 
                    It means long nights debugging edge cases. It means caring about details no user will ever consciously notice.
                  </p>
                  <p className="font-geist-mono text-sm text-stone-500 border-l-2 border-amber-500/30 pl-4">
                    "The details are not the details. They make the design."
                    <br />
                    <span className="text-amber-500/60">— Charles Eames</span>
                  </p>
                </div>
              </FadeIn>
            </div>

            {/* Right - Terminal Visual */}
            <FadeIn delay={0.3}>
              <div className="relative bg-[#0d0d0d] border border-[#333] rounded-[4px] overflow-hidden font-mono text-sm">
                <div className="flex items-center gap-2 px-4 py-3 bg-[#1a1a1a] border-b border-[#333]">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                    <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                  </div>
                  <span className="text-stone-500 text-xs ml-2">studio_profile.yaml</span>
                </div>
                <div className="p-6 text-emerald-400/90 whitespace-pre leading-relaxed">
{`# Nova Studio Configuration
# Last updated: 2026-01-14

studio:
  name: Nova
  founded: 2024
  location: Lahore, PK
  timezone: PKT (UTC+5)

team:
  size: small_by_design
  model: embedded_collaboration
  avg_tenure: 4+ years industry

engagement:
  project_duration: 3-6 months
  communication: async_first
  meetings: weekly_sync

principles:
  - no_unnecessary_abstractions
  - type_safety_everywhere
  - performance_by_default
  - documentation_as_code

current_status: accepting_q1_2026`}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* PRINCIPLES SECTION */}
      {/* ============================================ */}
      <section className="relative py-24 px-6 md:px-12 lg:px-24 bg-[#050505]">
        <div className="max-w-screen-2xl mx-auto">
          <FadeIn>
            <div className="mb-12">
              <span className="inline-block px-3 py-1.5 mb-5 bg-amber-500/10 border border-amber-500/20 rounded-[4px] font-mono text-xs text-amber-500 tracking-widest">
                CORE.PRINCIPLES
              </span>
              <h2 className="text-3xl md:text-4xl font-space font-light tracking-tight">
                <span className="bg-gradient-to-r from-white via-stone-300 to-stone-500 bg-clip-text text-transparent">
                  What We Stand For
                </span>
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {principles.map((principle, index) => (
              <PrincipleItem key={principle.title} {...principle} delay={index * 0.15} />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* TIMELINE SECTION */}
      {/* ============================================ */}
      <section className="relative py-24 px-6 md:px-12 lg:px-24 bg-black">
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <FadeIn>
                <div className="mb-12">
                  <span className="inline-block px-3 py-1.5 mb-5 bg-amber-500/10 border border-amber-500/20 rounded-[4px] font-mono text-xs text-amber-500 tracking-widest">
                    CHANGELOG.MD
                  </span>
                  <h2 className="text-3xl md:text-4xl font-space font-light tracking-tight">
                    <span className="bg-gradient-to-r from-white via-stone-300 to-stone-500 bg-clip-text text-transparent">
                      Studio Timeline
                    </span>
                  </h2>
                </div>
              </FadeIn>

              <div className="space-y-0">
                {timeline.map((item, index) => (
                  <TimelineItem 
                    key={item.year} 
                    {...item} 
                    isLast={index === timeline.length - 1}
                    delay={index * 0.15}
                  />
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="lg:pl-8">
              <FadeIn delay={0.2}>
                <div className="relative overflow-hidden rounded-[4px] border border-white/10 bg-[rgba(255,255,255,0.02)] backdrop-blur-[12px] p-8">
                  <div 
                    className="absolute inset-0 opacity-[0.02] pointer-events-none"
                    style={{
                      backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
                      `,
                      backgroundSize: '20px 20px'
                    }}
                  />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-8">
                      <span className="px-2 py-0.5 bg-amber-500/10 border border-amber-500/20 rounded-[4px] text-amber-500 font-geist-mono text-[10px] tracking-wider">
                        [METRICS]
                      </span>
                      <span className="font-geist-mono text-xs text-stone-500">Real-time Stats</span>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <div className="font-geist-mono text-4xl font-light text-white mb-1">24</div>
                        <div className="font-geist-mono text-xs text-stone-500">Projects Delivered</div>
                      </div>
                      <div>
                        <div className="font-geist-mono text-4xl font-light text-white mb-1">12</div>
                        <div className="font-geist-mono text-xs text-stone-500">Countries Served</div>
                      </div>
                      <div>
                        <div className="font-geist-mono text-4xl font-light text-white mb-1">99.9%</div>
                        <div className="font-geist-mono text-xs text-stone-500">Uptime Delivered</div>
                      </div>
                      <div>
                        <div className="font-geist-mono text-4xl font-light text-white mb-1">&lt;50ms</div>
                        <div className="font-geist-mono text-xs text-stone-500">Avg. API Latency</div>
                      </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-white/10">
                      <div className="font-geist-mono text-xs text-stone-500 mb-4">// OPERATING STATUS</div>
                      <div className="flex items-center gap-3">
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                        </span>
                        <span className="font-geist-mono text-sm text-emerald-400">Accepting New Projects</span>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* TECH STACK SECTION */}
      {/* ============================================ */}
      <section className="relative py-24 px-6 md:px-12 lg:px-24 bg-[#080808]">
        <div className="max-w-screen-2xl mx-auto">
          <FadeIn>
            <div className="mb-12">
              <span className="inline-block px-3 py-1.5 mb-5 bg-amber-500/10 border border-amber-500/20 rounded-[4px] font-mono text-xs text-amber-500 tracking-widest">
                DEPENDENCIES.LOCK
              </span>
              <h2 className="text-3xl md:text-4xl font-space font-light tracking-tight">
                <span className="bg-gradient-to-r from-white via-stone-300 to-stone-500 bg-clip-text text-transparent">
                  Battle-Tested Stack
                </span>
              </h2>
              <p className="mt-4 text-stone-400/70 max-w-2xl">
                We don't chase trends. Every technology in our stack has been vetted through hundreds of hours of production use.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(techStack).map(([category, techs], catIdx) => (
              <FadeIn key={category} delay={catIdx * 0.1}>
                <div className="space-y-4">
                  <span className="font-geist-mono text-xs text-amber-500/60 uppercase tracking-wider">
                    // {category === 'ai' ? 'AI & ML' : category.toUpperCase()}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {techs.map((tech, techIdx) => (
                      <TechBadge key={tech} name={tech} delay={catIdx * 0.1 + techIdx * 0.05} />
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* CTA SECTION */}
      {/* ============================================ */}
      <section className="relative py-28 px-6 md:px-12 lg:px-24 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <span className="inline-block px-3 py-1.5 mb-6 bg-amber-500/10 border border-amber-500/20 rounded-[4px] font-mono text-xs text-amber-500 tracking-widest">
              CONNECT.INIT
            </span>
            <h2 className="text-4xl md:text-5xl font-space font-light tracking-tight text-white mb-6">
              Interested in Working Together?
            </h2>
            <p className="text-lg text-stone-400/70 mb-12 max-w-2xl mx-auto">
              We're selective about projects to ensure we can fully commit. If you have a challenging problem that requires deep technical expertise, let's talk.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-400 text-black rounded-[4px] font-semibold text-lg transition-all duration-300 hover:shadow-[0_15px_50px_rgba(251,191,36,0.3)]"
              >
                Get in Touch
                <ArrowRight size={20} />
              </Link>
              <Link 
                to="/work"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border border-white/20 hover:border-amber-500/50 text-white rounded-[4px] font-semibold text-lg transition-all duration-300"
              >
                See Our Work
              </Link>
            </div>

            {/* Contact Info */}
            <div className="mt-12 font-geist-mono text-sm text-stone-500">
              <span className="text-stone-600">// </span>
              <span>hello@nova.studio</span>
              <span className="mx-3 text-stone-700">|</span>
              <span>Lahore, Pakistan</span>
              <span className="mx-3 text-stone-700">|</span>
              <span className="text-emerald-500">Available Q1 2026</span>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
};

export default About;
