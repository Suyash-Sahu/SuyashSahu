import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { isDark } = useTheme();

  // Handle scroll visibility and progress
  useEffect(() => {
    const toggleVisibility = () => {
      const scrolled = document.documentElement.scrollTop;
      const maxScroll = 
        document.documentElement.scrollHeight - 
        document.documentElement.clientHeight;
      
      // Calculate scroll progress
      const progress = (scrolled / maxScroll) * 100;
      setScrollProgress(progress);

      // Show button when page is scrolled more than 300px
      if (scrolled > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Button variants for animation
  const buttonVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      rotate: -180 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotate: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.9
    }
  };

  // Progress circle variants
  const circleVariants = {
    hidden: { 
      opacity: 0,
      pathLength: 0 
    },
    visible: { 
      opacity: 1,
      pathLength: scrollProgress / 100,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-8 right-8 z-50"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={buttonVariants}
        >
          <motion.button
            onClick={scrollToTop}
            className={`relative w-12 h-12 rounded-full flex items-center justify-center
              ${isDark 
                ? 'bg-[#915eff] hover:bg-[#915eff]/80' 
                : 'bg-gray-900 hover:bg-gray-800'
              } shadow-lg transition-colors`}
            whileHover="hover"
            whileTap="tap"
            aria-label="Scroll to top"
          >
            {/* Progress Circle */}
            <svg
              className="absolute w-full h-full"
              viewBox="0 0 100 100"
            >
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke={isDark ? '#ffffff33' : '#00000033'}
                strokeWidth="4"
                className="opacity-20"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke={isDark ? '#fff' : '#000'}
                strokeWidth="4"
                variants={circleVariants}
                style={{
                  strokeDasharray: "283",
                  transformOrigin: "center",
                  rotate: "-90deg"
                }}
              />
            </svg>

            {/* Arrow Icon */}
            <motion.svg
              className={`w-6 h-6 ${isDark ? 'text-white' : 'text-white'}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              initial={{ y: 0 }}
              animate={{ y: [-2, 2, -2] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </motion.svg>

            {/* Tooltip */}
            <div className={`absolute bottom-full mb-2 px-2 py-1 text-sm rounded
              ${isDark 
                ? 'bg-white text-gray-900' 
                : 'bg-gray-900 text-white'
              } opacity-0 group-hover:opacity-100 transition-opacity`}
            >
              Scroll to top
            </div>
          </motion.button>

          {/* Progress Text */}
          <motion.div
            className={`absolute -left-16 top-1/2 -translate-y-1/2 text-sm font-medium
              ${isDark ? 'text-white' : 'text-gray-900'}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            {Math.round(scrollProgress)}%
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
