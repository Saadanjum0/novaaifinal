"use client";
import {
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export const Timeline = ({ data, title = "How It Came to Life", subtitle = "The journey from concept to deployed product" }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 20%", "end 60%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-black font-sans"
      ref={containerRef}
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto pt-20 pb-12 px-4 md:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs uppercase tracking-[0.12em] text-cyan-200/80">
            Project Timeline
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white max-w-4xl">
            {title}
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl">
            {subtitle}
          </p>
        </motion.div>
      </div>

      {/* Timeline Content */}
      <div ref={ref} className="relative max-w-7xl mx-auto pb-24 px-4 md:px-8 lg:px-10">
        {data.map((item, index) => (
          <motion.div
            key={index}
            className="flex justify-start pt-16 md:pt-24 md:gap-12"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            {/* Left: Sticky Phase Title */}
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-32 self-start max-w-xs lg:max-w-sm md:w-full">
              {/* Node */}
              <div className="h-12 w-12 absolute left-0 md:left-0 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-white/10 backdrop-blur-sm flex items-center justify-center">
                <span className="text-sm font-bold text-white/80">{String(index + 1).padStart(2, '0')}</span>
              </div>
              {/* Title (desktop) */}
              <h3 className="hidden md:block text-2xl md:text-3xl lg:text-4xl md:pl-20 font-semibold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                {item.title}
              </h3>
            </div>

            {/* Right: Content */}
            <div className="relative pl-20 pr-4 md:pl-6 w-full">
              {/* Title (mobile) */}
              <h3 className="md:hidden block text-xl mb-4 font-semibold text-white">
                {item.title}
              </h3>
              {/* Content Card */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                {item.content}
              </div>
            </div>
          </motion.div>
        ))}

        {/* Animated Progress Line */}
        <div
          style={{ height: height + "px" }}
          className="absolute left-6 md:left-6 top-0 overflow-hidden w-[2px] bg-gradient-to-b from-transparent via-white/10 to-transparent"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-b from-cyan-400 via-purple-500 to-transparent rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
