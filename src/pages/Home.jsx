import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Copy, Check } from 'lucide-react';
import Hero from '../components/ui/animated-shader-hero';
import FadeIn from '../components/animations/FadeIn';
import { Link } from 'react-router-dom';

// ============================================
// GLOBAL GRID BACKGROUND
// ============================================
const GlobalGridBackground = () => (
  <div className="global-grid-bg" />
);

// ============================================
// DATA SHARDS - Scattered Technical Text
// ============================================
const dataShards = [
  { content: '0x4F2A9', top: '15%', left: '8%' },
  { content: 'LAT: 31.52', top: '25%', right: '12%' },
  { content: '0xB7E3F', top: '45%', left: '5%' },
  { content: 'NODE: 0x91', top: '65%', right: '8%' },
  { content: 'SYS: 0xFF', top: '80%', left: '15%' },
  { content: 'PTR: 0x2D4', top: '35%', right: '5%' },
  { content: 'LON: 74.35', top: '55%', left: '10%' },
];

const DataShards = () => (
  <>
    {dataShards.map((shard, index) => (
      <motion.div
        key={index}
        className="absolute font-mono text-[10px] text-white/10 select-none pointer-events-none z-0"
        style={{
          top: shard.top,
          left: shard.left,
          right: shard.right,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.2, duration: 1 }}
      >
        {shard.content}
      </motion.div>
    ))}
  </>
);

// ============================================
// TECHNICAL STACK MANIFEST (Replaces vanity metrics)
// ============================================
const TechnicalStackManifest = () => {
  const stackItems = [
    { label: 'STACK', value: 'NEXT.JS_15' },
    { label: 'LOGIC', value: 'TYPESCRIPT_STRICT' },
    { label: 'STYLING', value: 'TAILWIND_V4' },
    { label: 'ENGINE', value: 'FRAMER_MOTION' },
  ];

  return (
    <section className="relative py-3 md:py-4 px-4 md:px-12 lg:px-24 bg-[#030303] border-t border-b border-white/[0.05]">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex flex-wrap justify-center items-center gap-2 md:gap-8">
          {stackItems.map((item, index) => (
            <motion.div
              key={item.label}
              className="flex items-center"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <span className="font-geist-mono text-[9px] md:text-[11px] text-amber-500/40 tracking-wider">
                [ {item.label}: {item.value} ]
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// SYSTEM LOG TICKER
// ============================================
const SystemLogTicker = () => {
  const logs = [
    '[2026-01-13 14:32:01] INFO: Connection established to node-0x4F2A',
    '[2026-01-13 14:32:02] SUCCESS: Build pipeline v2.6.0 completed',
    '[2026-01-13 14:32:03] INFO: Deploying to production cluster',
    '[2026-01-13 14:32:04] SUCCESS: Health check passed - all systems operational',
    '[2026-01-13 14:32:05] INFO: Cache invalidation triggered',
    '[2026-01-13 14:32:06] SUCCESS: API response time: 23ms',
    '[2026-01-13 14:32:07] INFO: New connection from client-0xB7E3',
    '[2026-01-13 14:32:08] SUCCESS: Database sync completed',
  ];

  const tickerContent = logs.join(' ••• ');

  return (
    <div className="relative h-10 overflow-hidden bg-black/50 border-y border-white/5">
      <div className="ticker-scroll flex items-center h-full whitespace-nowrap">
        <span className="font-mono text-xs text-amber-500/50 px-4">
          {tickerContent}
        </span>
        <span className="font-mono text-xs text-amber-500/50 px-4">
          {tickerContent}
        </span>
      </div>
    </div>
  );
};

// ============================================
// PARTICLE SYSTEM
// ============================================
const ParticleField = ({ density = 50 }) => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef([]);
  const animationRef = useRef(null);

  const initParticles = useCallback((width, height) => {
    const particles = [];
    for (let i = 0; i < density; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }
    return particles;
  }, [density]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      particlesRef.current = initParticles(canvas.width, canvas.height);
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle) => {
        // Mouse repulsion
        const dx = particle.x - mouseRef.current.x;
        const dy = particle.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 100) {
          const force = (100 - dist) / 100;
          particle.vx += (dx / dist) * force * 0.5;
          particle.vy += (dy / dist) * force * 0.5;
        }

        // Apply velocity with damping
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 158, 11, ${particle.opacity})`;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto z-0"
      style={{ opacity: 0.6 }}
    />
  );
};

// ============================================
// THIN-STROKE SVG ICONS (Amber Line Art)
// ============================================
const InterfaceIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="6" width="32" height="24" rx="2" />
    <line x1="4" y1="12" x2="36" y2="12" />
    <circle cx="8" cy="9" r="1" fill="#F59E0B" />
    <circle cx="12" cy="9" r="1" fill="#F59E0B" />
    <circle cx="16" cy="9" r="1" fill="#F59E0B" />
    <rect x="8" y="16" width="12" height="8" rx="1" />
    <line x1="24" y1="16" x2="32" y2="16" />
    <line x1="24" y1="20" x2="30" y2="20" />
    <line x1="24" y1="24" x2="28" y2="24" />
    <line x1="12" y1="34" x2="28" y2="34" />
  </svg>
);

const AIIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="20" cy="20" r="8" />
    <circle cx="20" cy="20" r="3" fill="#F59E0B" />
    <line x1="20" y1="4" x2="20" y2="10" />
    <line x1="20" y1="30" x2="20" y2="36" />
    <line x1="4" y1="20" x2="10" y2="20" />
    <line x1="30" y1="20" x2="36" y2="20" />
    <line x1="8.5" y1="8.5" x2="13" y2="13" />
    <line x1="27" y1="27" x2="31.5" y2="31.5" />
    <line x1="8.5" y1="31.5" x2="13" y2="27" />
    <line x1="27" y1="13" x2="31.5" y2="8.5" />
  </svg>
);

const InfraIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="4" width="28" height="10" rx="2" />
    <rect x="6" y="18" width="28" height="10" rx="2" />
    <rect x="6" y="32" width="28" height="6" rx="1" />
    <circle cx="10" cy="9" r="1.5" fill="#F59E0B" />
    <circle cx="10" cy="23" r="1.5" fill="#F59E0B" />
    <line x1="16" y1="9" x2="30" y2="9" />
    <line x1="16" y1="23" x2="30" y2="23" />
    <line x1="20" y1="14" x2="20" y2="18" />
    <line x1="20" y1="28" x2="20" y2="32" />
  </svg>
);

const DiscoverIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="14" cy="14" r="10" />
    <line x1="22" y1="22" x2="28" y2="28" />
    <circle cx="14" cy="14" r="4" />
    <line x1="14" y1="6" x2="14" y2="10" />
  </svg>
);

const BuildIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 12 4 4 12 4" />
    <polyline points="28 20 28 28 20 28" />
    <line x1="4" y1="4" x2="14" y2="14" />
    <line x1="18" y1="18" x2="28" y2="28" />
    <rect x="12" y="12" width="8" height="8" rx="1" />
  </svg>
);

const DeployIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="16 4 28 12 28 24 16 32 4 24 4 12" />
    <line x1="16" y1="4" x2="16" y2="32" />
    <line x1="4" y1="12" x2="28" y2="12" />
    <line x1="4" y1="24" x2="16" y2="18" />
    <line x1="28" y1="24" x2="16" y2="18" />
  </svg>
);

// ============================================
// BLUEPRINT CARD WITH SPOTLIGHT EFFECT
// ============================================
const BlueprintCard = ({ children, microData, className = '', colSpan = '' }) => {
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      className={`
        relative overflow-hidden rounded-[4px]
        border border-white/10
        bg-[rgba(255,255,255,0.02)]
        backdrop-blur-[12px]
        p-8 md:p-10
        transition-all duration-300
        ${colSpan}
        ${className}
      `}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ 
        y: -5,
        borderColor: 'rgba(245, 158, 11, 0.3)',
        boxShadow: '0 20px 60px rgba(245, 158, 11, 0.1)'
      }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        animate={{ opacity: isHovered ? 1 : 0 }}
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(245, 158, 11, 0.15), transparent 80%)`,
        }}
      />
      
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px'
        }}
      />

      <div className="absolute top-4 right-4 font-mono text-[10px] text-stone-600 tracking-wider z-10">
        {microData}
      </div>

      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

// ============================================
// PIPELINE CARD WITH VERSION TAG
// ============================================
const PipelineCard = ({ icon, version, title, description, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      <div className="
        relative overflow-hidden rounded-[4px]
        border border-white/10
        bg-[rgba(255,255,255,0.02)]
        backdrop-blur-[12px]
        p-8
        transition-all duration-300
        hover:border-amber-500/30
        hover:shadow-[0_20px_60px_rgba(245,158,11,0.1)]
        group
      ">
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

        <div className="mb-4">
          <span className="inline-block px-2.5 py-1 bg-amber-500/10 border border-amber-500/20 rounded-[4px] text-amber-500 font-mono text-xs tracking-wider">
            {version}
          </span>
        </div>

        <div className="mb-5 transition-transform duration-300 group-hover:scale-110">
          {icon}
        </div>

        <h3 className="text-xl font-space font-semibold mb-3 text-white">
          {title}
        </h3>

        <p className="text-sm text-stone-400/70 leading-relaxed">
          {description}
        </p>

        <div className="hidden md:block absolute top-1/2 -translate-y-1/2 -right-2 w-4 h-4 rounded-full border-2 border-stone-700 bg-black z-20" />
        <div className="hidden md:block absolute top-1/2 -translate-y-1/2 -left-2 w-4 h-4 rounded-full border-2 border-stone-700 bg-black z-20" />
      </div>
    </motion.div>
  );
};

// ============================================
// BINARY CODE BACKGROUND
// ============================================
const BinaryCodeBackground = () => {
  const binaryLines = [
    '01001110 01101111 01110110 01100001',
    '10110010 00101001 11010100 01001011',
    '01110011 01111001 01110011 01110100',
    '11001010 00011101 10101010 01110110',
    '01100101 01101101 00101110 01101001',
    '10010110 11011010 00110101 10001001',
    '01101110 01101001 01110100 00101110',
    '00101101 11100110 01010101 10110100',
  ];

  return (
    <div className="relative h-16 overflow-hidden bg-black">
      <div className="absolute inset-0 flex flex-col justify-center items-center">
        <motion.div
          className="font-mono text-[10px] text-white/[0.05] leading-relaxed text-center whitespace-nowrap"
          animate={{ y: [0, -80] }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {[...binaryLines, ...binaryLines, ...binaryLines].map((line, idx) => (
            <div key={idx} className="py-1 tracking-[0.3em]">{line}</div>
          ))}
        </motion.div>
      </div>
      {/* Gradient fades */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />
    </div>
  );
};

// ============================================
// ANIMATED PIPELINE LINE
// ============================================
const PipelineLine = () => {
  const lineRef = useRef(null);
  const isInView = useInView(lineRef, { once: false, margin: '-200px' });
  
  return (
    <div ref={lineRef} className="hidden md:block absolute top-1/2 left-0 right-0 -translate-y-1/2 z-0 px-[8%]">
      <div className="h-[2px] bg-stone-800 w-full" />
      <motion.div
        className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent w-32"
        initial={{ x: '-100%', opacity: 0 }}
        animate={isInView ? {
          x: ['0%', '100%', '200%', '300%'],
          opacity: [0, 1, 1, 0]
        } : { x: '-100%', opacity: 0 }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
          repeatDelay: 1
        }}
      />
    </div>
  );
};

// ============================================
// TERMINAL WIDGET (Infinite Loop with Backspace)
// ============================================
const TerminalWidget = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [phase, setPhase] = useState('typing'); // 'typing' | 'paused' | 'deleting'
  const [copied, setCopied] = useState(false);
  
  const jsonContent = `{
  "studio": "Nova",
  "philosophy": "craftsmanship",
  "rejects": [
    "bloat",
    "templates",
    "mediocrity"
  ],
  "builds": "purpose_driven",
  "status": "operational"
}`;

  const lines = jsonContent.split('\n');

  useEffect(() => {
    let timeout;
    let index = displayedText.length;
    
    if (phase === 'typing') {
      if (index < jsonContent.length) {
        timeout = setTimeout(() => {
          setDisplayedText(jsonContent.slice(0, index + 1));
        }, 25);
      } else {
        // Finished typing, pause for 3 seconds
        setPhase('paused');
        timeout = setTimeout(() => {
          setPhase('deleting');
        }, 3000);
      }
    } else if (phase === 'deleting') {
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, 10); // Faster backspace
      } else {
        // Finished deleting, restart typing
        setPhase('typing');
      }
    }
    
    return () => clearTimeout(timeout);
  }, [displayedText, phase, jsonContent]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(jsonContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Calculate which lines are visible based on displayed text
  const displayedLines = displayedText.split('\n');
  const showCursor = phase === 'paused' || phase === 'typing' || phase === 'deleting';

  return (
    <div className="relative bg-[#0d0d0d] border border-[#333] rounded-[4px] overflow-hidden font-mono text-xs md:text-sm">
      <div className="flex items-center justify-between px-3 md:px-4 py-2 md:py-3 bg-[#1a1a1a] border-b border-[#333]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#febc2e]" />
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#28c840]" />
          </div>
          <span className="text-stone-500 text-[10px] md:text-xs ml-2">nova_values.json</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 rounded-[4px] bg-white/5 hover:bg-white/10 border border-white/10 text-stone-500 hover:text-stone-300 transition-all duration-200"
        >
          {copied ? (
            <>
              <Check size={12} className="text-emerald-400" />
              <span className="text-[10px] text-emerald-400 hidden sm:inline">Copied</span>
            </>
          ) : (
            <>
              <Copy size={12} />
              <span className="text-[10px] hidden sm:inline">Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="flex">
        {/* Line Numbers Column */}
        <div className="py-3 md:py-4 pl-3 md:pl-4 pr-2 md:pr-3 border-r border-[#333] select-none bg-[#0a0a0a]">
          {lines.map((_, idx) => (
            <div 
              key={idx} 
              className={`text-right text-[10px] md:text-[11px] leading-relaxed ${
                idx < displayedLines.length ? 'text-stone-600' : 'text-stone-800'
              }`}
            >
              {idx + 1}
            </div>
          ))}
        </div>
        {/* Code Content */}
        <div className="p-3 md:p-4 text-green-400/90 whitespace-pre leading-relaxed flex-1 overflow-x-auto text-[11px] md:text-sm">
          {displayedText}
          {showCursor && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="inline-block w-1.5 md:w-2 h-3 md:h-4 bg-green-400 ml-0.5"
            />
          )}
        </div>
      </div>
    </div>
  );
};


// ============================================
// MAIN HOME COMPONENT
// ============================================
const Home = () => {
  const handleGetStarted = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreWork = () => {
    const workSection = document.getElementById('work');
    if (workSection) {
      workSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative bg-black text-white">
      {/* Global Grid Background */}
      <GlobalGridBackground />

      {/* Hero Section with Particles */}
      <section className="relative">
        <ParticleField density={40} />
        <Hero
          headline={{
            line1: "Precision Software",
            line2: "for the AI Era"
          }}
          subtitle="Bespoke software solutions engineered with precision. Nova is a product studio based in Lahore, serving a global clientele. We reject bloat. We reject templates. We build purpose-driven software."
          buttons={{
            primary: {
              text: "Start a Project",
              onClick: handleGetStarted
            },
            secondary: {
              text: "View Our Work",
              onClick: handleExploreWork
            }
          }}
        />
      </section>

      {/* ============================================ */}
      {/* CAPABILITIES SECTION - System Blueprint */}
      {/* ============================================ */}
      <section className="relative py-16 md:py-24 px-4 md:px-12 lg:px-24 bg-[#080808]">
        {/* Data Shards */}
        <DataShards />

        <div className="max-w-screen-2xl mx-auto relative z-10">
          <FadeIn>
            <div className="text-center mb-14">
              <span className="inline-block px-3 py-1.5 mb-5 bg-amber-500/10 border border-amber-500/20 rounded-[4px] font-mono text-xs text-amber-500 tracking-widest">
                SYSTEM.CAPABILITIES
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-space font-light tracking-tight bg-gradient-to-r from-white via-stone-300 to-stone-500 bg-clip-text text-transparent">
                The Blueprint
              </h2>
            </div>
          </FadeIn>

          {/* Blueprint Grid with Vertical Separators */}
          <div className="relative">
            {/* Vertical separator lines for blueprint aesthetic */}
            <div className="hidden md:block absolute top-0 bottom-0 left-[66.666%] w-[1px] bg-white/10 z-20" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FadeIn delay={0.1}>
                <BlueprintCard 
                  microData="ID: CAP-001 • STATUS: ACTIVE"
                  colSpan="md:col-span-2"
                >
                  <div className="mb-6">
                    <InterfaceIcon />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-space font-semibold mb-4 text-white">
                    High-Performance Interfaces
                  </h3>
                  <p className="text-base text-stone-400/70 leading-relaxed max-w-xl">
                    Engineered for sub-100ms interaction latency. Type-safe frontends with tactile responsiveness and fluid human-machine interaction patterns.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {['React', 'React Native', 'TypeScript', 'WebGL'].map((tech) => (
                      <span key={tech} className="px-2.5 py-0.5 bg-transparent border border-stone-700 rounded-full text-[10px] font-geist-mono text-stone-500 tracking-wide">
                        {tech}
                      </span>
                    ))}
                  </div>
                </BlueprintCard>
              </FadeIn>

              <FadeIn delay={0.2}>
                <BlueprintCard microData="ID: CAP-002 • STATUS: OPTIMIZED">
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <motion.div
                      className="w-2 h-2 bg-amber-500 rounded-full"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <span className="font-mono text-[10px] text-amber-500/70 tracking-wider">LIVE</span>
                  </div>
                  
                  <div className="mb-6 mt-4">
                    <AIIcon />
                  </div>
                  <h3 className="text-2xl font-space font-semibold mb-4 text-white">
                    Applied AI
                  </h3>
                  <p className="text-base text-stone-400/70 leading-relaxed">
                    Architecting agentic workflows and specialized RAG architectures for enterprise-grade logic and reasoning systems.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {['LLMs', 'RAG', 'Agents', 'Fine-tuning'].map((tech) => (
                      <span key={tech} className="px-2.5 py-0.5 bg-transparent border border-stone-700 rounded-full text-[10px] font-geist-mono text-stone-500 tracking-wide">
                        {tech}
                      </span>
                    ))}
                  </div>
                </BlueprintCard>
              </FadeIn>

              <FadeIn delay={0.3}>
                <BlueprintCard microData="ID: CAP-003 • BUILD: v2.6.0">
                  <div className="mb-6">
                    <InfraIcon />
                  </div>
                  <h3 className="text-2xl font-space font-semibold mb-4 text-white">
                    Core Infrastructure
                  </h3>
                  <p className="text-base text-stone-400/70 leading-relaxed">
                    Robust backends and scalable APIs designed for high-throughput operations and mission-critical reliability.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {['Python', 'Node.js', 'PostgreSQL', 'Redis'].map((tech) => (
                      <span key={tech} className="px-2.5 py-0.5 bg-transparent border border-stone-700 rounded-full text-[10px] font-geist-mono text-stone-500 tracking-wide">
                        {tech}
                      </span>
                    ))}
                  </div>
                </BlueprintCard>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION TRANSITION GRADIENT */}
      {/* ============================================ */}
      <div className="h-8 bg-gradient-to-b from-[#080808] to-[#030303]" />

      {/* ============================================ */}
      {/* TECHNICAL STACK MANIFEST */}
      {/* ============================================ */}
      <TechnicalStackManifest />

      {/* ============================================ */}
      {/* BINARY CODE TRANSITION */}
      {/* ============================================ */}
      <BinaryCodeBackground />

      {/* ============================================ */}
      {/* OUR APPROACH SECTION - Mechanical Pipeline */}
      {/* ============================================ */}
      <section id="work" className="relative py-16 md:py-24 px-4 md:px-12 lg:px-24 bg-black">
        {/* Data Shards */}
        <DataShards />

        <div className="max-w-screen-2xl mx-auto relative z-10">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block px-3 py-1.5 mb-5 bg-amber-500/10 border border-amber-500/20 rounded-[4px] font-mono text-xs text-amber-500 tracking-widest">
                PROCESS.PIPELINE
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-space font-light tracking-tight bg-gradient-to-r from-white via-stone-300 to-stone-500 bg-clip-text text-transparent">
                Our Approach
              </h2>
            </div>
          </FadeIn>

          <div className="relative">
            <PipelineLine />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              <PipelineCard
                icon={<DiscoverIcon />}
                version="v1.0 Strategic Discovery"
                title="Define & Discover"
                description="We start by understanding your business context, user needs, and technical constraints. Every solution begins with deep discovery."
                delay={0}
              />
              <PipelineCard
                icon={<BuildIcon />}
                version="v2.0 Rapid Prototyping"
                title="Design & Build"
                description="Rapid iteration meets careful engineering. We build prototypes, test assumptions, and refine until the solution is exceptional."
                delay={0.2}
              />
              <PipelineCard
                icon={<DeployIcon />}
                version="v3.0 Production Scaling"
                title="Deploy & Evolve"
                description="Launch with confidence, monitor with precision. We ensure your systems scale gracefully and adapt to changing needs."
                delay={0.4}
              />
            </div>
          </div>

          <FadeIn delay={0.6}>
            <div className="mt-14 text-center">
              <Link
                to="/work"
                className="group inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 font-medium transition-all duration-300"
              >
                <span>Explore Our Work</span>
                <motion.span
                  className="inline-block"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight size={20} className="transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
                </motion.span>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ============================================ */}
      {/* VERTICAL CONNECTOR LINE */}
      {/* ============================================ */}
      <div className="relative h-12 bg-black flex justify-center">
        <div className="w-[0.5px] h-full bg-white/[0.1]" />
      </div>

      {/* ============================================ */}
      {/* WHY NOVA SECTION */}
      {/* ============================================ */}
      <section className="relative py-16 md:py-24 px-4 md:px-12 lg:px-24 bg-black">
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <FadeIn>
              <div className="space-y-6">
                <span className="inline-block px-3 py-1.5 mb-2 bg-amber-500/10 border border-amber-500/20 rounded-[4px] font-mono text-xs text-amber-500 tracking-widest">
                  WHY.NOVA
                </span>
                <h2 className="text-3xl md:text-4xl font-space font-light tracking-tight bg-gradient-to-r from-white via-stone-300 to-stone-500 bg-clip-text text-transparent">
                  Built Different.
                </h2>
                <p className="text-lg text-stone-400/70 leading-relaxed">
                  We're not an agency. We're not freelancers. We're a <span className="text-amber-400 font-medium">precision engineering studio</span>—a 
                  small team that embeds with yours to build software that actually works. No handoffs. No surprises. Just clean code and clear communication.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <Link
                    to="/about"
                    className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 font-medium transition-all duration-300"
                  >
                    <span>Learn More About Us</span>
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="lg:pl-8">
                <TerminalWidget />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SYSTEM LOG TICKER */}
      {/* ============================================ */}
      <SystemLogTicker />

      {/* ============================================ */}
      {/* CLOSING CTA SECTION WITH PARTICLES */}
      {/* ============================================ */}
      <section id="contact" className="relative py-20 md:py-28 px-4 md:px-12 lg:px-24 bg-black overflow-hidden">
        {/* Particle Field in Footer */}
        <ParticleField density={30} />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <FadeIn>
            <span className="inline-block px-3 py-1.5 mb-6 bg-amber-500/10 border border-amber-500/20 rounded-[4px] font-mono text-xs text-amber-500 tracking-widest">
              INIT.PROJECT
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-space font-light tracking-tight text-white mb-6">
              Let's Build Together
            </h2>
            <p className="text-lg text-stone-400/70 mb-12 max-w-2xl mx-auto">
              Have a complex problem that needs a precise solution? We're selective about projects—but when we commit, we deliver.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-amber-500 hover:bg-amber-400 text-black rounded-[4px] font-semibold text-lg transition-all duration-300 hover:shadow-[0_15px_50px_rgba(251,191,36,0.3)]"
              >
                Start a Project
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/work"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-transparent border border-white/20 hover:border-amber-500/50 text-white rounded-[4px] font-semibold text-lg transition-all duration-300"
              >
                View Case Studies
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
};

export default Home;
