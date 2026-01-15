import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Send, Phone, Mail, MapPin, CheckCircle } from 'lucide-react';
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
// INPUT FIELD COMPONENT
// ============================================
const InputField = ({ label, id, type = 'text', placeholder, value, onChange, required = true }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="space-y-2">
      <label 
        htmlFor={id} 
        className="block font-geist-mono text-xs text-stone-400 tracking-wider uppercase"
      >
        {label} {required && <span className="text-amber-500">*</span>}
      </label>
      <div className="relative">
        <input
          type={type}
          id={id}
          name={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
            w-full px-4 py-3 
            bg-[rgba(255,255,255,0.02)] 
            border rounded-[4px]
            text-white placeholder:text-stone-600
            font-light text-base
            transition-all duration-300
            focus:outline-none
            ${isFocused 
              ? 'border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.1)]' 
              : 'border-white/10 hover:border-white/20'
            }
          `}
        />
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-amber-500 to-amber-400"
          initial={{ width: 0 }}
          animate={{ width: isFocused ? '100%' : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
};

// ============================================
// TEXTAREA FIELD COMPONENT
// ============================================
const TextareaField = ({ label, id, placeholder, value, onChange, required = true, rows = 5 }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="space-y-2">
      <label 
        htmlFor={id} 
        className="block font-geist-mono text-xs text-stone-400 tracking-wider uppercase"
      >
        {label} {required && <span className="text-amber-500">*</span>}
      </label>
      <div className="relative">
        <textarea
          id={id}
          name={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          rows={rows}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
            w-full px-4 py-3 
            bg-[rgba(255,255,255,0.02)] 
            border rounded-[4px]
            text-white placeholder:text-stone-600
            font-light text-base
            transition-all duration-300
            focus:outline-none
            resize-none
            ${isFocused 
              ? 'border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.1)]' 
              : 'border-white/10 hover:border-white/20'
            }
          `}
        />
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-amber-500 to-amber-400"
          initial={{ width: 0 }}
          animate={{ width: isFocused ? '100%' : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
};

// ============================================
// CONTACT INFO ITEM
// ============================================
const ContactInfoItem = ({ icon: Icon, label, value, href }) => (
  <motion.a
    href={href}
    className="flex items-start gap-4 p-4 rounded-[4px] border border-white/5 bg-[rgba(255,255,255,0.01)] hover:border-amber-500/20 hover:bg-[rgba(255,255,255,0.03)] transition-all duration-300 group"
    whileHover={{ x: 5 }}
  >
    <div className="shrink-0 w-10 h-10 rounded-[4px] bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
      <Icon size={18} className="text-amber-500" />
    </div>
    <div>
      <span className="block font-geist-mono text-[10px] text-stone-500 tracking-wider uppercase mb-1">
        {label}
      </span>
      <span className="text-white group-hover:text-amber-400 transition-colors">
        {value}
      </span>
    </div>
  </motion.a>
);

// ============================================
// MAIN CONTACT COMPONENT
// ============================================
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    query: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', query: '' });
  };

  return (
    <div className="relative bg-black text-white min-h-screen">
      <GlobalGridBackground />

      {/* ============================================ */}
      {/* HERO SECTION */}
      {/* ============================================ */}
      <section className="relative pt-32 pb-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-screen-2xl mx-auto">
          <FadeIn>
            <div className="mb-6">
              <span className="inline-block px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-[4px] font-mono text-xs text-amber-500 tracking-widest">
                INIT.CONTACT
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-space font-light tracking-tight mb-6">
              <span className="bg-gradient-to-r from-white via-stone-300 to-stone-500 bg-clip-text text-transparent">
                Let's Connect
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-stone-400/70 max-w-3xl leading-relaxed font-light">
              Have a project in mind? Fill out the form below and our team will get back to you shortly.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ============================================ */}
      {/* CONTACT FORM SECTION */}
      {/* ============================================ */}
      <section className="relative py-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Form - Takes 3 columns */}
            <div className="lg:col-span-3">
              <FadeIn>
                <div className="relative overflow-hidden rounded-[4px] border border-white/10 bg-[rgba(255,255,255,0.02)] backdrop-blur-[12px] p-8 md:p-10">
                  {/* Grid overlay */}
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

                  {/* Form Header */}
                  <div className="relative z-10 mb-8">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-2 py-0.5 bg-amber-500/10 border border-amber-500/20 rounded-[4px] text-amber-500 font-geist-mono text-[10px] tracking-wider">
                        [FORM_001]
                      </span>
                      <span className="font-geist-mono text-xs text-stone-500">Secure Transmission</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-space font-light text-white">
                      Send Us a Message
                    </h2>
                  </div>

                  {isSubmitted ? (
                    <motion.div 
                      className="relative z-10 text-center py-12"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      >
                        <CheckCircle size={64} className="text-emerald-400 mx-auto mb-6" />
                      </motion.div>
                      <h3 className="text-2xl font-space font-semibold text-white mb-4">
                        Message Received!
                      </h3>
                      <p className="text-stone-400 mb-2">
                        Thank you for reaching out to Nova.
                      </p>
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-[4px] mt-4">
                        <Phone size={16} className="text-amber-500" />
                        <span className="font-geist-mono text-sm text-amber-400">
                          You'll receive a call shortly
                        </span>
                      </div>
                      <p className="text-stone-500 text-sm mt-6">
                        Our team typically responds within 24-48 hours.
                      </p>
                      <button
                        onClick={() => setIsSubmitted(false)}
                        className="mt-8 text-amber-500 hover:text-amber-400 font-medium transition-colors"
                      >
                        Send Another Message →
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                      <InputField
                        label="Your Name"
                        id="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                      />

                      <InputField
                        label="Email Address"
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                      />

                      <TextareaField
                        label="Your Query"
                        id="query"
                        placeholder="Tell us about your project or question..."
                        value={formData.query}
                        onChange={handleChange}
                        rows={6}
                      />

                      {/* Call Notice */}
                      <div className="flex items-center gap-3 p-4 bg-amber-500/5 border border-amber-500/10 rounded-[4px]">
                        <Phone size={18} className="text-amber-500 shrink-0" />
                        <p className="font-geist-mono text-xs text-stone-400">
                          After submission, <span className="text-amber-400">you'll receive a call shortly</span> from our team to discuss your project in detail.
                        </p>
                      </div>

                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className={`
                          w-full flex items-center justify-center gap-3 
                          px-8 py-4 
                          bg-amber-500 hover:bg-amber-400 
                          text-black rounded-[4px] 
                          font-semibold text-lg 
                          transition-all duration-300 
                          hover:shadow-[0_15px_50px_rgba(251,191,36,0.3)]
                          disabled:opacity-50 disabled:cursor-not-allowed
                        `}
                        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                      >
                        {isSubmitting ? (
                          <>
                            <motion.div
                              className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send size={20} />
                          </>
                        )}
                      </motion.button>
                    </form>
                  )}
                </div>
              </FadeIn>
            </div>

            {/* Contact Info - Takes 2 columns */}
            <div className="lg:col-span-2">
              <FadeIn delay={0.2}>
                <div className="space-y-6">
                  {/* Info Header */}
                  <div className="mb-8">
                    <span className="inline-block px-3 py-1.5 mb-4 bg-amber-500/10 border border-amber-500/20 rounded-[4px] font-mono text-xs text-amber-500 tracking-widest">
                      CONTACT.INFO
                    </span>
                    <h2 className="text-2xl font-space font-light text-white">
                      Other Ways to Reach Us
                    </h2>
                </div>

                  {/* Contact Items */}
                  <div className="space-y-4">
                    <ContactInfoItem
                      icon={Mail}
                      label="Email"
                      value="hello@nova.studio"
                      href="mailto:hello@nova.studio"
                    />
                    <ContactInfoItem
                      icon={Phone}
                      label="Phone"
                      value="+92 300 123 4567"
                      href="tel:+923001234567"
                    />
                    <ContactInfoItem
                      icon={MapPin}
                      label="Location"
                      value="Lahore, Pakistan"
                      href="https://maps.google.com/?q=Lahore,Pakistan"
                    />
                  </div>

                  {/* Availability Status */}
                  <div className="mt-8 p-6 rounded-[4px] border border-white/10 bg-[rgba(255,255,255,0.02)]">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                      </span>
                      <span className="font-geist-mono text-sm text-emerald-400">Currently Accepting Projects</span>
                    </div>
                    <p className="text-sm text-stone-500">
                      We're selective about projects to ensure quality. Response time is typically 24-48 hours.
                    </p>
                  </div>

                  {/* Terminal Style Info */}
                  <div className="mt-6 p-4 bg-[#0d0d0d] border border-[#333] rounded-[4px] font-mono text-xs">
                    <div className="text-stone-500 mb-2">// timezone</div>
                    <div className="text-emerald-400">PKT (UTC+5)</div>
                    <div className="text-stone-500 mt-3 mb-2">// response_time</div>
                    <div className="text-emerald-400">24-48 hours</div>
                    <div className="text-stone-500 mt-3 mb-2">// availability</div>
                    <div className="text-amber-400">Q1 2026</div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* CTA SECTION */}
      {/* ============================================ */}
      <section className="relative py-20 px-6 md:px-12 lg:px-24 bg-[#050505]">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <p className="text-stone-400 mb-6">
              Prefer to explore our work first?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/work"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border border-white/20 hover:border-amber-500/50 text-white rounded-[4px] font-semibold text-lg transition-all duration-300"
              >
                View Our Work
                <ArrowRight size={20} />
              </Link>
          <Link 
                to="/about"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border border-white/10 hover:border-white/30 text-stone-400 hover:text-white rounded-[4px] font-medium transition-all duration-300"
          >
                Learn About Us
          </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
};

export default Contact;
