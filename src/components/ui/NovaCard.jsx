import React from 'react';
import { motion } from 'framer-motion';

const NovaCard = ({ children, className = '', hoverable = true }) => {
  const baseStyles = `
    bg-[rgba(20,20,22,0.7)] 
    backdrop-blur-xl 
    border border-[#333] 
    rounded-lg 
    p-8 md:p-10
    transition-all duration-300
  `;
  
  if (hoverable) {
    return (
      <motion.div
        className={`${baseStyles} ${className}`}
        whileHover={{ 
          y: -5,
          borderColor: 'rgba(251, 191, 36, 0.5)',
          boxShadow: '0 15px 50px rgba(251, 191, 36, 0.2), 0 0 20px rgba(251, 191, 36, 0.1)'
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    );
  }

  return <div className={`${baseStyles} ${className}`}>{children}</div>;
};

export default NovaCard;
