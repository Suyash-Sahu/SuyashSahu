import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  // SVG path animations
  const sunPathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 0.5, ease: "easeOut" },
        opacity: { duration: 0.25 }
      }
    }
  };

  const moonPathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 0.5, ease: "easeOut" },
        opacity: { duration: 0.25 }
      }
    }
  };

  // Stars animation for dark mode
  const starsVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        type: "spring",
        stiffness: 200,
        damping: 10
      }
    })
  };

  // Rays animation for light mode
  const raysVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        type: "spring",
        stiffness: 200,
        damping: 10
      }
    })
  };

  const buttonVariants = {
    hover: {
      scale: 1.1,
      rotate: isDark ? [-5, 5, 0] : [0, 360],
      transition: {
        rotate: {
          duration: isDark ? 0.3 : 2,
          ease: "linear",
          repeat: isDark ? 0 : Infinity
        }
      }
    },
    tap: { scale: 0.9 }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="fixed bottom-8 right-8 z-50"
      data-magnetic
      data-cursor-variant="button"
    >
      <motion.button
        onClick={toggleTheme}
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        className={`relative p-4 rounded-full shadow-lg backdrop-blur-md
          ${isDark 
            ? 'bg-white/10 hover:bg-white/20' 
            : 'bg-gray-900/10 hover:bg-gray-900/20'
          } transition-colors`}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      >
        <div className="w-8 h-8 relative">
          <AnimatePresence mode="wait">
            {isDark ? (
              // Moon and stars
              <motion.div
                key="moon"
                initial={{ opacity: 0, rotate: -45 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 45 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-full h-full text-white"
                >
                  <motion.path
                    variants={moonPathVariants}
                    initial="hidden"
                    animate="visible"
                    d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                  />
                  {[...Array(5)].map((_, i) => (
                    <motion.circle
                      key={i}
                      variants={starsVariants}
                      custom={i}
                      cx={4 + i * 4}
                      cy={4}
                      r={0.5}
                      fill="currentColor"
                    />
                  ))}
                </motion.svg>
              </motion.div>
            ) : (
              // Sun and rays
              <motion.div
                key="sun"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.5 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-full h-full text-gray-900"
                >
                  <motion.circle
                    variants={sunPathVariants}
                    initial="hidden"
                    animate="visible"
                    cx="12"
                    cy="12"
                    r="5"
                  />
                  {[...Array(8)].map((_, i) => (
                    <motion.line
                      key={i}
                      variants={raysVariants}
                      custom={i}
                      x1="12"
                      y1="1"
                      x2="12"
                      y2="3"
                      transform={`rotate(${i * 45} 12 12)`}
                    />
                  ))}
                </motion.svg>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Ripple effect on click */}
        <div className="absolute inset-0 overflow-hidden rounded-full">
          <div className="absolute inset-0 bg-current opacity-0 group-active:opacity-10 transition-opacity" />
        </div>

        {/* Hover glow effect */}
        <div
          className={`absolute inset-0 rounded-full transition-opacity duration-300
            ${isDark
              ? 'bg-gradient-to-r from-blue-500 to-purple-500'
              : 'bg-gradient-to-r from-yellow-400 to-orange-500'
            } opacity-0 group-hover:opacity-20 blur-xl`}
        />
      </motion.button>

      {/* Theme label tooltip */}
      <div
        className={`absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1 rounded text-sm font-medium
          opacity-0 group-hover:opacity-100 transition-opacity duration-200
          ${isDark
            ? 'bg-white/10 text-white'
            : 'bg-gray-900/10 text-gray-900'
          }`}
      >
        {isDark ? 'Light Mode' : 'Dark Mode'}
      </div>
    </motion.div>
  );
};

export default ThemeToggle;
