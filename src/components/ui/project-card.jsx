import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/project/${project.id}`);
  };

  return (
    <motion.div
      className="group relative w-full cursor-pointer"
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onClick={handleClick}
    >
      {/* 3D Card Container */}
      <div className="relative perspective-1000">
        <motion.div
          className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-2xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-[2fr_3fr]"
          whileHover={{ 
            rotateX: 5,
            rotateY: 10,
            scale: 1.02
          }}
          transition={{ duration: 0.3 }}
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
          
          {/* Image Container - No padding, fills left half */}
          <div className="relative overflow-hidden w-full aspect-video md:aspect-auto md:h-full">
            <motion.img
              src={project.image}
              alt={project.name}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
            
            {/* Floating Elements */}
            <motion.div
              className="absolute top-4 right-4 w-3 h-3 bg-green-400 rounded-full shadow-lg"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {project.gallery?.length ? (
              <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/60 text-xs text-white border border-white/10">
                {project.gallery.length} shots
              </div>
            ) : null}
          </div>

          {/* Content - Reduced padding and gaps */}
          <div className="py-4 px-6 relative z-10 flex flex-col justify-center">
            <motion.h3 
              className="text-xl font-bold text-white mb-1.5 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300"
              whileHover={{ x: 5 }}
            >
              {project.name}
            </motion.h3>
            
            <p className="text-gray-300 text-sm mb-3 line-clamp-3">
              {project.description}
            </p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-3">
              {project.technologies?.slice(0, 3).map((tech, index) => (
                <motion.span
                  key={tech}
                  className="px-2 py-1 text-xs bg-white/10 text-white rounded-full border border-white/20"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>

            {/* Action Button */}
            <motion.div
              className="flex items-center text-blue-400 text-sm font-medium group-hover:text-white transition-colors duration-300"
              whileHover={{ x: 5 }}
            >
              View Project
              <motion.svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                whileHover={{ x: 3 }}
                transition={{ duration: 0.2 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </motion.svg>
            </motion.div>
          </div>

          {/* 3D Border Effect */}
          <div className="absolute inset-0 rounded-2xl border border-white/30 group-hover:border-white/50 transition-colors duration-300 pointer-events-none" />
        </motion.div>
      </div>

      {/* Shadow */}
      <motion.div
        className="absolute inset-0 bg-black/20 rounded-2xl blur-xl -z-10"
        whileHover={{ 
          scale: 1.1,
          opacity: 0.3
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default ProjectCard;