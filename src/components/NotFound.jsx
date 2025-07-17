import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { styles } from '../styles';

const NotFound = () => {
  const { isDark } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  // Animated number variants
  const numberVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  };

  // Floating animation for decorative elements
  const floatingAnimation = {
    y: [-20, 20],
    transition: {
      y: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className={`w-full min-h-screen flex items-center justify-center p-6 ${
      isDark ? 'bg-primary' : 'bg-white'
    }`}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-2xl w-full text-center relative"
      >
        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={floatingAnimation}
            className="absolute top-0 left-1/4 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
          />
          <motion.div
            animate={{
              ...floatingAnimation,
              transition: { delay: 0.5, ...floatingAnimation.transition }
            }}
            className="absolute bottom-0 right-1/4 w-64 h-64 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
          />
        </div>

        {/* 404 Numbers */}
        <motion.div
          className="flex justify-center items-center gap-4 mb-8"
          variants={itemVariants}
        >
          {['4', '0', '4'].map((num, index) => (
            <motion.div
              key={index}
              variants={numberVariants}
              className={`text-8xl font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
              whileHover={{
                scale: 1.1,
                rotate: [0, -10, 10, -10, 0],
                transition: { duration: 0.5 }
              }}
            >
              {num}
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content */}
        <motion.h1
          variants={itemVariants}
          className={`${styles.sectionHeadText} mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}
        >
          Page Not Found
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className={`${styles.sectionSubText} mb-8 ${
            isDark ? 'text-secondary' : 'text-gray-600'
          }`}
        >
          Oops! The page you're looking for doesn't exist or has been moved.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-8 py-3 rounded-xl text-white font-bold
                ${isDark ? 'bg-[#915eff] hover:bg-[#915eff]/80' : 'bg-gray-900 hover:bg-gray-800'}
                transition-colors shadow-lg`}
            >
              Go Home
            </motion.button>
          </Link>

          <button
            onClick={() => window.history.back()}
            className={`px-8 py-3 rounded-xl font-bold
              ${isDark 
                ? 'bg-white/10 hover:bg-white/20 text-white' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
              } transition-colors`}
          >
            Go Back
          </button>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          animate={{
            rotate: 360,
            transition: { duration: 20, repeat: Infinity, ease: "linear" }
          }}
          className="absolute -z-10 w-full h-full max-w-md mx-auto opacity-5"
        >
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path
              fill={isDark ? '#ffffff' : '#000000'}
              d="M45.7,-78.3C58.9,-71.9,69.3,-58.7,76.4,-44.2C83.5,-29.7,87.3,-14.9,86.6,-0.4C85.9,14,80.7,28.1,73.5,41.8C66.3,55.5,57.1,68.9,44.4,76.3C31.7,83.7,15.8,85.1,0.2,84.7C-15.5,84.4,-31,82.3,-44.7,75.2C-58.5,68.1,-70.5,56,-77.7,41.8C-84.9,27.5,-87.3,11.2,-85.1,-3.9C-83,-19,-76.3,-33.9,-67.2,-46.7C-58.1,-59.5,-46.6,-70.2,-33.5,-76.8C-20.3,-83.4,-5.7,-85.8,6.4,-96.2C18.5,-106.6,32.5,-84.8,45.7,-78.3Z"
              transform="translate(100 100)"
            />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
